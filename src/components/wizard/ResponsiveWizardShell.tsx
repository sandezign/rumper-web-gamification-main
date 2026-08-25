import React from 'react'
import { useWizardState } from '../../store/useWizardStore'
import DesktopSidebar from './DesktopSidebar'
import MobileHeader from './MobileHeader'
import MobileStickyFooter from './MobileStickyFooter'
import Stage1FrictionDiscovery from './stages/Stage1FrictionDiscovery'
import Stage2ValueProof from './stages/Stage2ValueProof'
import Stage3EmpathyStatement from './stages/Stage3EmpathyStatement'
import Stage4Comparison from './stages/Stage4Comparison'
import Step1HouseholdWork from './steps/Step1HouseholdWork'
import Step2LocationAnchors from './steps/Step2LocationAnchors'
import Step3BudgetRange from './steps/Step3BudgetRange'
import Step4CorridorSummary from './steps/Step4CorridorSummary'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'

interface ResponsiveWizardShellProps {
  onComplete?: () => void
  onCancel?: () => void
}

export default function ResponsiveWizardShell({ onComplete, onCancel }: ResponsiveWizardShellProps) {
  const {
    flowStage,
    parameterStep,
    formData,
    updateFormData,
    toggleCorridor,
    nextStage,
    prevStage,
    skipToParameterSetup,
    goToFlowStage,
    goToParameterStep,
  } = useWizardState()

  // Total display step calculation (1..8 total sub-steps for smooth progress)
  const currentTotalProgress = flowStage < 5 ? flowStage : 4 + parameterStep
  const totalDisplaySteps = 8

  const handleNext = () => {
    if (flowStage === 5 && parameterStep === 4) {
      if (onComplete) {
        onComplete()
      } else {
        alert('Profil pencarian dan batasan harian Anda berhasil disimpan.')
      }
    } else {
      nextStage()
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col md:flex-row antialiased font-sans text-[#001E2B]">
      {/* Desktop / Tablet Sidebar Container */}
      <div className="hidden md:block shrink-0 bg-[#001E2B] self-stretch">
        <DesktopSidebar
          flowStage={flowStage}
          parameterStep={parameterStep}
          onStepClick={(step) => goToParameterStep(step)}
          onStageClick={(stage) => goToFlowStage(stage)}
          onSkipToSetup={skipToParameterSetup}
        />
      </div>

      {/* Mobile Top Header */}
      <MobileHeader
        flowStage={flowStage}
        parameterStep={parameterStep}
        currentStep={currentTotalProgress}
        totalSteps={totalDisplaySteps}
        onBack={prevStage}
      />

      {/* Right Column Canvas & Full-Width Sticky Footer */}
      <div className="flex-1 flex flex-col min-h-screen relative justify-between">
        {/* Main Content Form Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl mx-auto w-full pb-28 md:pb-8">
          <div>
            {/* Top Canvas Bar for Desktop */}
            <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-[#D7E1E5]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#004F38] bg-[#DCEEE7] px-3.5 py-1 rounded-full border border-[#318266]/30">
                  {flowStage === 1
                    ? 'Babak 1 · Kendala Pencarian'
                    : flowStage >= 2 && flowStage <= 4
                    ? `Babak 2 · Uji Prioritas (Skenario ${flowStage - 1} dari 3)`
                    : `Babak 3 · Detail Profil (Langkah ${parameterStep} dari 4)`}
                </span>
                <span className="text-xs font-semibold text-[#5C6C7A]">
                  {Math.round((currentTotalProgress / totalDisplaySteps) * 100)}% Selesai
                </span>
              </div>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  aria-label="Tutup"
                  title="Tutup"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#5C6C7A] hover:text-[#001E2B] bg-white border border-[#D7E1E5] hover:bg-[#F4F7F6] transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Render 5 Psychological Flow Stages */}
            {flowStage === 1 && (
              <Stage1FrictionDiscovery
                onSelect={(friction) => {
                  updateFormData({ selectedFriction: friction })
                }}
              />
            )}

            {flowStage === 2 && <Stage2ValueProof />}

            {flowStage === 3 && <Stage3EmpathyStatement />}

            {flowStage === 4 && <Stage4Comparison />}

            {/* Stage 5: Parameter Setup (Steps 1 to 4) */}
            {flowStage === 5 && (
              <>
                {parameterStep === 1 && (
                  <Step1HouseholdWork
                    householdType={formData.householdType}
                    workPattern={formData.workPattern}
                    onChange={updateFormData}
                  />
                )}

                {parameterStep === 2 && (
                  <Step2LocationAnchors
                    mainAnchor={formData.mainAnchor}
                    secondAnchor={formData.secondAnchor}
                    onChange={updateFormData}
                  />
                )}

                {parameterStep === 3 && (
                  <Step3BudgetRange
                    budgetPreset={formData.budgetPreset}
                    budgetMin={formData.budgetMin}
                    budgetMax={formData.budgetMax}
                    onChange={updateFormData}
                  />
                )}

                {parameterStep === 4 && (
                  <Step4CorridorSummary
                    formData={formData}
                    onToggleCorridor={toggleCorridor}
                  />
                )}
              </>
            )}
          </div>
        </main>

        {/* Full-Width Sticky Desktop Action Bar */}
        <div className="hidden md:block sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D7E1E5] py-4 px-6 md:px-8 lg:px-12 w-full shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={prevStage}
              disabled={flowStage === 1}
              className={`min-h-[46px] px-6 rounded-full font-bold text-sm flex items-center gap-2 border transition-all cursor-pointer ${
                flowStage === 1
                  ? 'opacity-40 cursor-not-allowed border-[#E1E5E8] text-[#7C8C9A] bg-[#F4F7F6]'
                  : 'border-[#D7E1E5] text-[#3D4F5B] bg-white hover:bg-[#F4F7F6] hover:border-[#C1CCD6] active:scale-95 shadow-xs'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[46px] px-8 rounded-full font-bold text-sm flex items-center gap-2 bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] shadow-md transition-all active:scale-95 ring-4 ring-[#00ED64]/20 cursor-pointer"
            >
              {flowStage === 1 ? (
                <>
                  <span>Mulai 3 Skenario Singkat</span>
                  <ArrowRight size={16} />
                </>
              ) : flowStage >= 2 && flowStage <= 4 ? (
                <>
                  <span>{flowStage === 4 ? 'Lanjut ke Detail Profil' : 'Skenario Berikutnya'}</span>
                  <ArrowRight size={16} />
                </>
              ) : flowStage === 5 && parameterStep === 4 ? (
                <>
                  <Check size={16} className="stroke-[3] text-[#001E2B]" />
                  <span>Simpan & Mulai Riset Lokasi</span>
                </>
              ) : (
                <>
                  <span>Langkah Berikutnya</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Footer */}
      <MobileStickyFooter
        flowStage={flowStage}
        parameterStep={parameterStep}
        onNext={handleNext}
      />
    </div>
  )
}
