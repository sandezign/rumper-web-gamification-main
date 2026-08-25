import { useState, useCallback } from 'react'

export type HouseholdType = 'single' | 'pasangan' | 'keluarga-muda'
export type WorkPattern = 'wfo' | 'hybrid' | 'remote'
export type ScenarioChoice = 'A' | 'B' | 'neither' | 'reject'

export interface WizardFormData {
  householdType: HouseholdType
  workPattern: WorkPattern
  mainAnchor: string
  secondAnchor: string
  budgetPreset: string
  budgetMin: number // in millions e.g. 600
  budgetMax: number // in millions e.g. 1800
  selectedCorridors: string[]
  selectedFriction?: string
  relatesToEmpathy?: boolean
  scenarioResponses: Record<string, ScenarioChoice>
}

export const initialWizardData: WizardFormData = {
  householdType: 'pasangan',
  workPattern: 'hybrid',
  mainAnchor: 'Sudirman / SCBD (Jaksel)',
  secondAnchor: 'Mega Kuningan / Rasuna Said (Jaksel)',
  budgetPreset: '800-1200',
  budgetMin: 600,
  budgetMax: 1800,
  selectedCorridors: [
    'Tangerang Selatan (Bintaro, BSD, Serpong)',
    'Bogor & Cibubur (Cibinong, Sentul, LRT)',
  ],
  selectedFriction: 'Khawatir risiko banjir & jalan akses tergenang saat musim hujan',
  scenarioResponses: {},
}

export function useWizardState() {
  const [flowStage, setFlowStage] = useState<number>(1) // 1..5
  const [parameterStep, setParameterStep] = useState<number>(1) // 1..4 when in Stage 5
  const [formData, setFormData] = useState<WizardFormData>(initialWizardData)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const updateFormData = useCallback((fields: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }, [])

  const setScenarioResponse = useCallback((scenarioId: string, choice: ScenarioChoice) => {
    setFormData((prev) => ({
      ...prev,
      scenarioResponses: {
        ...prev.scenarioResponses,
        [scenarioId]: choice,
      },
    }))
  }, [])

  const toggleCorridor = useCallback((corridor: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCorridors.includes(corridor)
      const newCorridors = exists
        ? prev.selectedCorridors.filter((c) => c !== corridor)
        : [...prev.selectedCorridors, corridor]
      return { ...prev, selectedCorridors: newCorridors }
    })
  }, [])

  const nextStage = useCallback(() => {
    setFlowStage((prevStage) => {
      if (prevStage < 5) {
        return prevStage + 1
      }
      // If at Stage 5, advance parameter steps
      setParameterStep((prevStep) => {
        if (prevStep < 4) return prevStep + 1
        setIsCompleted(true)
        return prevStep
      })
      return 5
    })
  }, [])

  const prevStage = useCallback(() => {
    if (flowStage === 5 && parameterStep > 1) {
      setParameterStep((prev) => prev - 1)
    } else {
      setFlowStage((prev) => Math.max(1, prev - 1))
    }
  }, [flowStage, parameterStep])

  const skipToParameterSetup = useCallback(() => {
    setFlowStage(5)
    setParameterStep(1)
  }, [])

  const goToFlowStage = useCallback((stage: number) => {
    if (stage >= 1 && stage <= 5) {
      setFlowStage(stage)
      if (stage < 5) {
        setParameterStep(1)
      }
    }
  }, [])

  const goToParameterStep = useCallback((step: number) => {
    setFlowStage(5)
    setParameterStep(step)
  }, [])

  return {
    flowStage,
    parameterStep,
    formData,
    isCompleted,
    updateFormData,
    setScenarioResponse,
    toggleCorridor,
    nextStage,
    prevStage,
    skipToParameterSetup,
    goToFlowStage,
    goToParameterStep,
  }
}
