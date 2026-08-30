import { useState, useRef, useEffect, useCallback } from "react"
import AppHeader from "./components/AppHeader"
import SubHeaderTabs from "./components/SubHeaderTabs"
import MobileBottomSheet from "./components/MobileBottomSheet"
import MobileBottomNav, { type MobileTab } from "./components/MobileBottomNav"
import type { TimelineNode } from "./components/VerticalTimeline"
import ScoreCard from "./components/ScoreCard"
import FactorRisksCard from "./components/FactorRisksCard"
import UpgradeBanner from "./components/UpgradeBanner"
import MapPanel from "./components/MapPanel"
import UpgradeDrawer from "./components/UpgradeDrawer"
import InAppCheckoutModal, { type PricingTierKey } from "./components/InAppCheckoutModal"
import ZeroQuotaModal from "./components/ZeroQuotaModal"
import AccountSettingsScreen from "./components/account/AccountSettingsScreen"
import AuthModal, { type UserProfile } from "./components/auth/AuthModal"
import PDFDueDiligencePreviewModal from "./components/export/PDFDueDiligencePreviewModal"
import AssistantDrawer from "./components/AssistantDrawer"
import PropertyModal from "./components/PropertyModal"
import ResponsiveWizardShell from "./components/wizard/ResponsiveWizardShell"
import LocationDataLoadingScreen from "./components/curated-areas/LocationDataLoadingScreen"
import CuratedAreasMapScreen from "./components/curated-areas/CuratedAreasMapScreen"
import type { CuratedArea } from "./data/mockCuratedAreas"
import DeepDiveEvidenceWorkspace from "./components/DeepDiveEvidenceWorkspace"
import CommuteWorkspace from "./components/CommuteWorkspace"
import ChecklistWorkspace from "./components/ChecklistWorkspace"
import FasilitasWorkspace from "./components/FasilitasWorkspace"
import { initialProperties, PropertyLocation } from "./data/mockProperties"
import { Lock, CheckCircle2 } from "lucide-react"
import {
  type AssistantContextPayload,
  type AssistantDomainCategory,
} from "./data/aiAssistantKnowledge"
import { type ChecklistItemData } from "./components/ChecklistWorkspace"

// ── Step / nav types ──────────────────────────────────────────────────────────

export type WorkspaceStep = "ringkasan" | "faktor-risiko" | "perjalanan" | "checklist" | "fasilitas"

const STEPS: {
  id: WorkspaceStep
  step: number
  label: string
  tabLabel: string
}[] = [
  { id: "ringkasan", step: 1, label: "Ringkasan", tabLabel: "Ringkasan" },
  {
    id: "faktor-risiko",
    step: 2,
    label: "Faktor Risiko",
    tabLabel: "Faktor risiko",
  },
  { id: "perjalanan", step: 3, label: "Perjalanan", tabLabel: "Perjalanan" },
  { id: "checklist", step: 4, label: "Checklist", tabLabel: "Checklist" },
  { id: "fasilitas", step: 5, label: "Fasilitas", tabLabel: "Fasilitas" },
]

const TAB_TO_STEP: Record<string, WorkspaceStep> = {
  Ringkasan: "ringkasan",
  "Faktor risiko": "faktor-risiko",
  Perjalanan: "perjalanan",
  Checklist: "checklist",
  Fasilitas: "fasilitas",
}

// ── Locked section teaser ─────────────────────────────────────────────────────

function LockedSectionTeaser({
  step,
  label,
  onUpgrade,
}: {
  step: number
  label: string
  onUpgrade: () => void
}) {
  return (
    <div
      className="w-full rounded-2xl flex items-center justify-between px-5 py-4"
      style={{ background: "#F8FAFC", border: "1px dashed #CBD5E1" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
          <Lock size={15} color="#475569" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Tahap {step}
          </p>
          <p className="text-sm font-semibold text-slate-700">{label}</p>
        </div>
      </div>
      <button
        onClick={onUpgrade}
        className="min-h-[44px] min-w-[44px] text-xs font-semibold px-4 py-2 rounded-full transition-colors hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00684a]"
        style={{
          background: "#e3fcef",
          color: "#00684a",
          border: "1px solid #00ed64",
        }}
      >
        Buka
      </button>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [propertyModalOpen, setPropertyModalOpen] = useState(false)
  const [appFlowState, setAppFlowState] =
    useState<"wizard" | "loading" | "curated-areas" | "workspace" | "account">("wizard")
  const [wizardInitialStage, setWizardInitialStage] =
    useState<number | undefined>(undefined)
  const [wizardInitialStep, setWizardInitialStep] =
    useState<number | undefined>(undefined)

  const handleLoadingComplete = useCallback(() => {
    setAppFlowState("curated-areas")
  }, [])

  // Property locations state
  const [propertiesList, setPropertiesList] =
    useState<PropertyLocation[]>(initialProperties)
  const [activePropertyId, setActivePropertyId] = useState<string>(
    initialProperties[0]?.id || "prop-bintaro"
  )
  const [totalQuota, setTotalQuota] = useState<number>(5)
  const remainingQuota = Math.max(0, totalQuota - propertiesList.length)
  const activeProperty =
    propertiesList.find((p) => p.id === activePropertyId) || propertiesList[0]

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [zeroQuotaOpen, setZeroQuotaOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: "Andi Wijaya",
    email: "andi.wijaya@gmail.com",
    phone: "+62 812-3456-7890",
    avatarInitials: "AW",
    isAuthenticated: true,
  })
  const [selectedTier, setSelectedTier] = useState<PricingTierKey>("bundle")
  const [unlockedPropertyIds, setUnlockedPropertyIds] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastMessage(msg)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }, [])

  const handleSelectProperty = (id: string) => {
    setActivePropertyId(id)
    const targetProp = propertiesList.find((p) => p.id === id)
    if (targetProp) {
      showToast(`Beralih ke ${targetProp.name} · Data risiko BNPB & komut dimuat`)
    }
  }

  const handleAddProperty = (name: string, location: string) => {
    if (remainingQuota <= 0) {
      setPropertyModalOpen(false)
      setZeroQuotaOpen(true)
      return
    }
    const newProp: PropertyLocation = {
      id: `prop-${Date.now()}`,
      name,
      subdistrict: location || "Indonesia",
      city: "Kota Baru",
      status: "INVESTIGASI",
      statusBadge: "warning",
      score: 72,
      riskSummary: "Perlu analisis faktor risiko awal lokasi baru",
      evidenceCount: 2,
      gapCount: 1,
      latLng: [-6.25, 106.8],
      elevationDpl: "25 mdpl",
      commuteMinutes: 40,
    }
    setPropertiesList((prev) => [newProp, ...prev])
    setActivePropertyId(newProp.id)
    showToast(`Properti ${newProp.name} berhasil ditambahkan ke workspace`)
  }

  const [mapFullscreen, setMapFullscreen] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [activeStep, setActiveStep] = useState<WorkspaceStep>("ringkasan")
  const [mobileView, setMobileView] =
    useState<"workspace" | "map-panel" | "full-map">("workspace")
  const [sheetHeight, setSheetHeight] = useState<number>(300)
  const [sheetSnap, setSheetSnap] =
    useState<"peek" | "compact" | "half" | "full">("compact")
  const [selectedFactorId, setSelectedFactorId] = useState<string>("banjir")
  const [facilityVisible, setFacilityVisible] =
    useState<Record<FacilityCategoryKey, boolean>>({
      kesehatan: true,
      pendidikan: true,
      belanja: true,
      stasiun: true,
    })

  const handleMobileNavSelect = useCallback((tab: MobileTab) => {
    if (tab === "workspace") {
      setMobileView("workspace")
    } else if (tab === "map-panel") {
      setMobileView("map-panel")
    } else if (tab === "ai-assistant") {
      handleOpenAssistant("overview")
    } else if (tab === "profile") {
      setAppFlowState("account")
    }
  }, [])

  // ── AI Assistant Context & Dynamic Checklist State ───────────────────────────
  const [assistantContext, setAssistantContext] =
    useState<AssistantContextPayload>({
      propertyName: activeProperty?.name || "Grand Galaxy City Block R",
      subdistrict: activeProperty?.subdistrict || "Jaka Setia, Bekasi Selatan",
      overallScore: activeProperty?.score || 68,
      activeCategory: "overview",
      categoryScore: activeProperty?.score || 68,
      coordinates: [-6.2681, 106.9742],
    })

  const [dynamicChecklistItems, setDynamicChecklistItems] = useState<
    ChecklistItemData[]
  >([])

  useEffect(() => {
    if (activeProperty) {
      setAssistantContext((prev) => ({
        ...prev,
        propertyName: activeProperty.name,
        subdistrict: activeProperty.subdistrict,
        overallScore: activeProperty.score,
        categoryScore:
          prev.activeCategory === "overview"
            ? activeProperty.score
            : prev.categoryScore,
      }))
    }
  }, [activeProperty])

  const handleOpenAssistant = useCallback(
    (
      category: AssistantDomainCategory = "overview",
      score?: number | null,
      summary?: string
    ) => {
      setAssistantContext({
        propertyName: activeProperty?.name || "Grand Galaxy City Block R",
        subdistrict: activeProperty?.subdistrict || "Jaka Setia, Bekasi Selatan",
        overallScore: activeProperty?.score || 68,
        activeCategory: category,
        categoryScore: score !== undefined ? score : activeProperty?.score,
        evidenceSummary: summary,
        coordinates: [-6.2681, 106.9742],
      })
      setAssistantOpen(true)
    },
    [activeProperty]
  )

  const handleAddChecklistItem = useCallback(
    (item: {
      title: string
      category: "banjir" | "perjalanan" | "akses" | "fasilitas" | "lingkungan"
      priority: "high" | "medium" | "low"
      tip: string
    }) => {
      const newItem: ChecklistItemData = {
        id: `dyn-chk-${Date.now()}`,
        text: item.title,
        category: item.category,
        priority: item.priority,
        tip: item.tip,
        defaultChecked: false,
      }
      setDynamicChecklistItems((prev) => [newItem, ...prev])
      setToastMessage(`Tersimpan ke checklist: "${item.title.slice(0, 36)}..."`)
      setTimeout(() => setToastMessage(null), 3500)
    },
    []
  )

  const handleHighlightMap = useCallback((layerId?: string) => {
    if (layerId === "poi-kesehatan") {
      setFacilityVisible((prev) => ({ ...prev, kesehatan: true }))
    } else if (layerId === "poi-pendidikan") {
      setFacilityVisible((prev) => ({ ...prev, pendidikan: true }))
    }
    setToastMessage("Menyorot layer spasial pada panel peta.")
    setTimeout(() => setToastMessage(null), 3000)
  }, [])

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setAssistantOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  // Refs for section tops (used by VerticalTimeline + scroll navigation)
  const containerRef = useRef<HTMLDivElement>(null)

  // Desktop section refs
  const s1Ref = useRef<HTMLDivElement>(null) // Ringkasan
  const s2Ref = useRef<HTMLDivElement>(null) // Faktor Risiko
  const s3Ref = useRef<HTMLDivElement>(null) // Perjalanan
  const s4Ref = useRef<HTMLDivElement>(null) // Checklist
  const s5Ref = useRef<HTMLDivElement>(null) // Fasilitas

  // Mobile workspace section refs
  const ms1Ref = useRef<HTMLDivElement>(null)
  const ms2Ref = useRef<HTMLDivElement>(null)
  const ms3Ref = useRef<HTMLDivElement>(null)
  const ms4Ref = useRef<HTMLDivElement>(null)
  const ms5Ref = useRef<HTMLDivElement>(null)

  // Bottom sheet section refs
  const bs1Ref = useRef<HTMLDivElement>(null)
  const bs2Ref = useRef<HTMLDivElement>(null)
  const bs3Ref = useRef<HTMLDivElement>(null)
  const bs4Ref = useRef<HTMLDivElement>(null)
  const bs5Ref = useRef<HTMLDivElement>(null)

  const desktopSectionRefs: Record<WorkspaceStep, React.RefObject<HTMLDivElement | null>> =
    {
      ringkasan: s1Ref,
      "faktor-risiko": s2Ref,
      perjalanan: s3Ref,
      checklist: s4Ref,
      fasilitas: s5Ref,
    }

  const mobileSectionRefs: Record<WorkspaceStep, React.RefObject<HTMLDivElement | null>> =
    {
      ringkasan: ms1Ref,
      "faktor-risiko": ms2Ref,
      perjalanan: ms3Ref,
      checklist: ms4Ref,
      fasilitas: ms5Ref,
    }

  const bottomSheetSectionRefs: Record<WorkspaceStep, React.RefObject<HTMLDivElement | null>> =
    {
      ringkasan: bs1Ref,
      "faktor-risiko": bs2Ref,
      perjalanan: bs3Ref,
      checklist: bs4Ref,
      fasilitas: bs5Ref,
    }

  // ── Node positions for VerticalTimeline (Dynamic ResizeObserver) ───────────────────

  const [nodePositions, setNodePositions] = useState([20, 280, 540, 800, 1060])

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const parentTop = containerRef.current.getBoundingClientRect().top
      const refs = [s1Ref, s2Ref, s3Ref, s4Ref, s5Ref]

      const positions = refs.map((ref, i) => {
        if (ref.current) {
          return ref.current.getBoundingClientRect().top - parentTop + 16
        }
        const s1Top = s1Ref.current
          ? s1Ref.current.getBoundingClientRect().top - parentTop + 16
          : 20
        return s1Top + i * 160
      })
      setNodePositions(positions)
    }

    measure()
    window.addEventListener("resize", measure)

    let observer: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        measure()
      })
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", measure)
      if (observer) observer.disconnect()
    }
  }, [isPremium])

  // ── Programmatic navigation ───────────────────────────────────────────────

  const isNavigating = useRef(false)
  const STICKY_OFFSET = 184 // AppHeader (52) + sticky tabs header (~124) + visual clearance (8)

  const isPremiumRef = useRef(isPremium)
  useEffect(() => {
    isPremiumRef.current = isPremium
  }, [isPremium])

  const navigateToStep = useCallback(
    (step: WorkspaceStep) => {
      if (!isPremiumRef.current && step !== "ringkasan") {
        setUpgradeOpen(true)
        return
      }
      setActiveStep(step)

      const isMobile = window.innerWidth < 1024

      if (mobileView === "map-panel" && isMobile) {
        setSheetSnap("full")
        setTimeout(() => {
          const ref = bottomSheetSectionRefs[step]
          if (ref.current) {
            isNavigating.current = true
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
            setTimeout(() => {
              isNavigating.current = false
            }, 900)
          }
        }, 60)
      } else {
        const refs = isMobile ? mobileSectionRefs : desktopSectionRefs
        const offset = isMobile ? 112 : STICKY_OFFSET
        const ref = refs[step]
        if (ref.current) {
          isNavigating.current = true
          const y =
            ref.current.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
          setTimeout(() => {
            isNavigating.current = false
          }, 900)
        }
      }
    },
    [mobileView],
  )

  const handleSelectFactor = useCallback(
    (factorId?: string) => {
      if (factorId) {
        setSelectedFactorId(factorId)
      }
      navigateToStep("faktor-risiko")
    },
    [navigateToStep],
  )

  // ── Scroll spy (premium only) ─────────────────────────────────────────────

  useEffect(() => {
    if (!isPremium) return

    const stepIds: WorkspaceStep[] = [
      "ringkasan",
      "faktor-risiko",
      "perjalanan",
      "checklist",
      "fasilitas",
    ]
    const isMobile = window.innerWidth < 1024
    const refs = isMobile
      ? [ms1Ref, ms2Ref, ms3Ref, ms4Ref, ms5Ref]
      : [s1Ref, s2Ref, s3Ref, s4Ref, s5Ref]

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating.current) return
        let topEntry: IntersectionObserverEntry | null = null
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              !topEntry ||
              entry.boundingClientRect.top < topEntry.boundingClientRect.top
            ) {
              topEntry = entry
            }
          }
        })
        if (topEntry) {
          const idx = refs.findIndex(
            (r) => r.current === (topEntry as IntersectionObserverEntry).target,
          )
          if (idx !== -1) setActiveStep(stepIds[idx])
        }
      },
      {
        rootMargin: isMobile ? "-15% 0px -60% 0px" : "-20% 0px -55% 0px",
        threshold: 0,
      },
    )

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })
    return () => observer.disconnect()
  }, [isPremium, mobileView])

  // ── Upgrade & Checkout Handlers ───────────────────────────────────────────

  const handleProceedToCheckout = (tier: PricingTierKey) => {
    setSelectedTier(tier)
    setUpgradeOpen(false)
    setCheckoutOpen(true)
  }

  const handlePaymentSuccess = (tier: PricingTierKey) => {
    setIsPremium(true)
    if (tier === "bundle" || tier === "consultation") {
      setTotalQuota((prev) => Math.max(prev, 8))
    }
    setUnlockedPropertyIds((prev) =>
      prev.includes(activePropertyId) ? prev : [...prev, activePropertyId]
    )
    showToast("Upgrade Berhasil! Seluruh tahap & fitur analisis telah terbuka.")
    navigateToStep("faktor-risiko")
  }

  // ── Build timeline nodes ───────────────────────────────────────────────────

  const activeIdx = STEPS.findIndex((s) => s.id === activeStep)

  const timelineNodes: TimelineNode[] = STEPS.map((s, i) => {
    const isCompleted = i < activeIdx
    const isActive = i === activeIdx
    const isLocked = !isPremium && s.id !== "ringkasan"

    let status: TimelineNode["status"]
    if (isCompleted && isPremium) status = "completed"
    else if (isActive) status = "active"
    else if (isLocked) status = "locked"
    else status = "future"

    return {
      status,
      top: nodePositions[i] ?? 20 + i * 200,
      stepNumber: s.step,
      label: s.label,
      onClick: () => navigateToStep(s.id),
    }
  })

  // ── Derived tab label ──────────────────────────────────────────────────────

  const activeTabLabel =
    STEPS.find((s) => s.id === activeStep)?.tabLabel ?? "Ringkasan"

  // ── Render ─────────────────────────────────────────────────────────────────

  if (appFlowState === "wizard") {
    return (
      <ResponsiveWizardShell
        initialStage={wizardInitialStage}
        initialStep={wizardInitialStep}
        onComplete={() => {
          setWizardInitialStage(undefined)
          setWizardInitialStep(undefined)
          setAppFlowState("loading")
        }}
        onCancel={() => {
          setWizardInitialStage(undefined)
          setWizardInitialStep(undefined)
          setAppFlowState("curated-areas")
        }}
      />
    )
  }

  if (appFlowState === "loading") {
    return <LocationDataLoadingScreen onComplete={handleLoadingComplete} />
  }

  if (appFlowState === "curated-areas") {
    return (
      <div className="h-screen w-full relative">
        <CuratedAreasMapScreen
          userRemainingQuota={remainingQuota}
          isPremium={isPremium}
          onEditPreferences={(step = 1, stage = 6) => {
            setWizardInitialStep(step)
            setWizardInitialStage(stage)
            setAppFlowState("wizard")
          }}
          onUnlockArea={(area: CuratedArea) => {
            const existingProp = propertiesList.find(
              (p) => p.areaId === area.id || p.name.includes(area.name.split("&")[0].trim()),
            )

            if (existingProp) {
              setActivePropertyId(existingProp.id)
              setAppFlowState("workspace")
              showToast(`Membuka workspace untuk ${existingProp.name}`)
              return
            }

            if (remainingQuota <= 0) {
              setZeroQuotaOpen(true)
              return
            }

            const areaSubdistrict = area.name.includes("&")
              ? area.name.split("&")[1].trim()
              : area.name
            const baseScore =
              area.category === "strong-fit"
                ? 84
                : area.category === "interesting-tradeoff"
                  ? 74
                  : 66
            const newProp: PropertyLocation = {
              id: `prop-${area.id}-${Date.now()}`,
              name: `Kandidat ${area.name.split("&")[0].trim()}`,
              subdistrict: areaSubdistrict,
              city: area.region,
              status:
                area.category === "strong-fit" ? "LANJUTKAN" : "INVESTIGASI",
              statusBadge: area.category === "strong-fit" ? "success" : "warning",
              score: baseScore,
              riskSummary: `Kesesuaian: ${area.categoryLabel} • Elevasi ${area.elevationDpl} (${area.elevationScore}) • Commute ${area.commuteTime}`,
              evidenceCount: 6,
              gapCount: 1,
              active: true,
              latLng: area.latLng,
              elevationDpl: area.elevationDpl,
              areaId: area.id,
              commuteMinutes: area.commuteMinutes,
              priceRange: area.priceRange,
            }
            setPropertiesList((prev) => [newProp, ...prev])
            setActivePropertyId(newProp.id)
            setAppFlowState("workspace")
            showToast(`Lokasi ${newProp.name} berhasil ditambahkan ke workspace!`)
          }}
          onCancel={() => setAppFlowState("workspace")}
        />

        <ZeroQuotaModal
          isOpen={zeroQuotaOpen}
          onClose={() => setZeroQuotaOpen(false)}
          onSelectTier={(tier) => {
            setSelectedTier(tier)
            setCheckoutOpen(true)
          }}
          onOpenArchive={() => {
            setZeroQuotaOpen(false)
            setAppFlowState("account")
          }}
          auditedCount={propertiesList.length}
        />

        <UpgradeDrawer
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          onProceedToCheckout={handleProceedToCheckout}
          propertyName={activeProperty?.name}
          initialTier={selectedTier}
        />

        <InAppCheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          tier={selectedTier}
          propertyName={activeProperty?.name}
        />
      </div>
    )
  }

  if (appFlowState === "account") {
    return (
      <div
        className="min-h-screen antialiased flex flex-col"
        style={{
          backgroundColor: "#F4F7F8",
          fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <AppHeader
          userName={currentUser?.name || "Andi Wijaya"}
          activePropertyName={activeProperty.name}
          activePropertySubdistrict={activeProperty.subdistrict}
          onOpenPropertyModal={() => setPropertyModalOpen(true)}
          onOpenAccount={() => setAppFlowState("account")}
          onOpenWizard={() => {
            setWizardInitialStage(1)
            setWizardInitialStep(1)
            setAppFlowState("wizard")
          }}
        />

        <AccountSettingsScreen
          onBack={() => setAppFlowState("workspace")}
          propertiesList={propertiesList}
          activePropertyId={activePropertyId}
          onSelectProperty={handleSelectProperty}
          remainingQuota={remainingQuota}
          totalQuota={totalQuota}
          isPremium={isPremium}
          onOpenUpgrade={(tier) => {
            if (tier) setSelectedTier(tier)
            setUpgradeOpen(true)
          }}
          onOpenPdfPreview={() => setPdfPreviewOpen(true)}
        />

        <UpgradeDrawer
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          onProceedToCheckout={handleProceedToCheckout}
          propertyName={activeProperty?.name}
          initialTier={selectedTier}
        />

        <InAppCheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          tier={selectedTier}
          propertyName={activeProperty?.name}
        />

        <ZeroQuotaModal
          isOpen={zeroQuotaOpen}
          onClose={() => setZeroQuotaOpen(false)}
          onSelectTier={(tier) => {
            setSelectedTier(tier)
            setCheckoutOpen(true)
          }}
          onOpenArchive={() => {
            setZeroQuotaOpen(false)
            setPropertyModalOpen(true)
          }}
          auditedCount={propertiesList.length}
        />

        <PropertyModal
          isOpen={propertyModalOpen}
          onClose={() => setPropertyModalOpen(false)}
          properties={propertiesList}
          activePropertyId={activePropertyId}
          onSelectProperty={handleSelectProperty}
          onAddProperty={handleAddProperty}
          totalQuota={totalQuota}
          remainingQuota={remainingQuota}
          onOpenUpgrade={() => setUpgradeOpen(true)}
          onOpenZeroQuotaModal={() => setZeroQuotaOpen(true)}
          onOpenCuratedAreas={() => {
            setPropertyModalOpen(false)
            setAppFlowState("curated-areas")
          }}
        />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user)
            showToast(`Berhasil masuk sebagai ${user.name}`)
          }}
        />

        <PDFDueDiligencePreviewModal
          isOpen={pdfPreviewOpen}
          onClose={() => setPdfPreviewOpen(false)}
          propertyName={activeProperty?.name}
          subdistrict={activeProperty?.subdistrict}
          city={activeProperty?.city}
          score={activeProperty?.score}
        />

        {toastMessage && (
          <div className="fixed bottom-6 inset-x-0 z-[4000] flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="bg-[#001E2B] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5 max-w-md pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#00ED64] animate-pulse shrink-0" />
              <span className="truncate">{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: "#F4F7F8",
        fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <AppHeader
        userName={currentUser?.name || "Andi Wijaya"}
        activePropertyName={activeProperty.name}
        activePropertySubdistrict={activeProperty.subdistrict}
        onOpenPropertyModal={() => setPropertyModalOpen(true)}
        onOpenAccount={() => setAppFlowState("account")}
        onOpenWizard={() => {
          setWizardInitialStage(1)
          setWizardInitialStep(1)
          setAppFlowState("wizard")
        }}
      />

      {/* ── Mobile Layout (<lg) ── */}
      {mobileView === "full-map" && (
        <div className="fixed top-[94px] sm:top-[52px] inset-x-0 bottom-0 z-[40] bg-white lg:hidden">
          <MapPanel
            fullscreen={true}
            timelineNodes={timelineNodes}
            isPremium={isPremium}
            activeTab={activeTabLabel}
            facilityVisible={facilityVisible}
            onUpgrade={() => setUpgradeOpen(true)}
            onTabChange={(tab) =>
              navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
            }
            onFullscreenChange={(fs) => {
              if (!fs) setMobileView("map-panel")
            }}
            heightOverride="calc(100vh - 94px)"
            flat
          />
        </div>
      )}

      {mobileView === "workspace" && (
        <div className="flex flex-col lg:hidden pb-20">
          <div className="bg-[#F4F7F8]/95 backdrop-blur-md px-4 py-2 sticky top-[52px] z-30 border-b border-slate-200/80 shadow-xs">
            <SubHeaderTabs
              isPremium={isPremium}
              activeTab={activeTabLabel}
              onTabChange={(tab) =>
                navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
              }
              onUpgrade={() => setUpgradeOpen(true)}
              showAssistant={false}
            />
          </div>

          <div className="flex flex-col gap-4 p-4">
            {/* Section 1: Ringkasan */}
            <div
              ref={ms1Ref}
              data-section="ringkasan"
              style={{ scrollMarginTop: 112 }}
            >
              <ScoreCard
                score={activeProperty.score}
                statusText={
                  activeProperty.status === "LANJUTKAN"
                    ? "Sangat Layak"
                    : activeProperty.status === "TUNDA"
                      ? "Perlu Pertimbangan"
                      : "Layak dengan catatan"
                }
                description={`${activeProperty.name} (${activeProperty.subdistrict}) — ${activeProperty.riskSummary}.`}
                onOpenAssistant={handleOpenAssistant}
              />
              <div className="mt-4">
                <FactorRisksCard
                  onSelectFactor={handleSelectFactor}
                  onOpenAssistant={handleOpenAssistant}
                />
              </div>
              <div className="mt-4 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white relative">
                <div className="h-[240px] relative">
                  <MapPanel
                    timelineNodes={timelineNodes}
                    isPremium={isPremium}
                    activeTab={activeTabLabel}
                    facilityVisible={facilityVisible}
                    onUpgrade={() => setUpgradeOpen(true)}
                    onTabChange={(tab) =>
                      navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
                    }
                    onExpandMap={() => setMobileView("map-panel")}
                    hideMapLayers
                    hideInfoChip
                    heightOverride="100%"
                    flat
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Faktor Risiko */}
            {isPremium ? (
              <div
                ref={ms2Ref}
                data-section="faktor-risiko"
                style={{ scrollMarginTop: 112 }}
              >
                <DeepDiveEvidenceWorkspace
                  activeCategory={selectedFactorId}
                  onSelectCategory={setSelectedFactorId}
                  onSwitchToChecklist={() => navigateToStep("checklist")}
                  onOpenAssistant={handleOpenAssistant}
                />
              </div>
            ) : (
              <div
                ref={ms2Ref}
                data-section="faktor-risiko"
                style={{ scrollMarginTop: 112 }}
              >
                <UpgradeBanner onUpgrade={() => setUpgradeOpen(true)} />
                <div className="mt-3 flex flex-col gap-3">
                  {STEPS.slice(1).map((s) => (
                    <LockedSectionTeaser
                      key={s.id}
                      step={s.step}
                      label={s.label}
                      onUpgrade={() => setUpgradeOpen(true)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Perjalanan */}
            {isPremium && (
              <div
                ref={ms3Ref}
                data-section="perjalanan"
                style={{ scrollMarginTop: 112 }}
              >
                <CommuteWorkspace
                  onSwitchToChecklist={() => navigateToStep("checklist")}
                  onOpenAssistant={handleOpenAssistant}
                />
              </div>
            )}

            {/* Section 4: Checklist */}
            {isPremium && (
              <div
                ref={ms4Ref}
                data-section="checklist"
                style={{ scrollMarginTop: 112 }}
              >
                <ChecklistWorkspace
                  activeCategory={selectedFactorId}
                  onSelectCategory={setSelectedFactorId}
                  dynamicItems={dynamicChecklistItems}
                  onOpenAssistant={handleOpenAssistant}
                />
              </div>
            )}

            {/* Section 5: Fasilitas */}
            {isPremium && (
              <div
                ref={ms5Ref}
                data-section="fasilitas"
                style={{ scrollMarginTop: 112, paddingBottom: 40 }}
              >
                <FasilitasWorkspace
                  visible={facilityVisible}
                  onToggle={(key) =>
                    setFacilityVisible((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  onOpenAssistant={handleOpenAssistant}
                />
              </div>
            )}
          </div>

          <MobileBottomNav
            activeTab="workspace"
            onTabSelect={handleMobileNavSelect}
          />
        </div>
      )}

      {mobileView === "map-panel" && (
        <div
          className="flex flex-col lg:hidden relative overflow-hidden"
          style={{ height: "calc(100vh - 52px)" }}
        >
          <MapPanel
            timelineNodes={timelineNodes}
            isPremium={isPremium}
            activeTab={activeTabLabel}
            facilityVisible={facilityVisible}
            onUpgrade={() => setUpgradeOpen(true)}
            onTabChange={(tab) =>
              navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
            }
            onBack={() => setMobileView("workspace")}
            onFullscreenChange={(fs) => {
              if (fs) setMobileView("full-map")
            }}
            sheetInset={sheetHeight}
            heightOverride="calc(100vh - 112px)"
            hideFloatingControls={sheetSnap === "full"}
            flat
          />
          <MobileBottomSheet
            activeTab={activeTabLabel}
            isPremium={isPremium}
            onTabChange={(tab) =>
              navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
            }
            onUpgrade={() => setUpgradeOpen(true)}
            onHeightChange={setSheetHeight}
            onSnapChange={setSheetSnap}
            snap={sheetSnap}
            bottomOffset={60}
          >
            <div className="flex flex-col gap-4">
              {/* Section 1: Ringkasan */}
              <div ref={bs1Ref} data-section="ringkasan">
                <ScoreCard
                  score={activeProperty.score}
                  statusText={
                    activeProperty.status === "LANJUTKAN"
                      ? "Sangat Layak"
                      : activeProperty.status === "TUNDA"
                        ? "Perlu Pertimbangan"
                        : "Layak dengan catatan"
                  }
                  description={`${activeProperty.name} (${activeProperty.subdistrict}) — ${activeProperty.riskSummary}.`}
                  onOpenAssistant={handleOpenAssistant}
                />
                <div className="mt-4">
                  <FactorRisksCard
                    onSelectFactor={handleSelectFactor}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              </div>

              {/* Section 2: Faktor Risiko */}
              {isPremium ? (
                <div ref={bs2Ref} data-section="faktor-risiko">
                  <DeepDiveEvidenceWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
                    onSwitchToChecklist={() => navigateToStep("checklist")}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              ) : (
                <div ref={bs2Ref} data-section="faktor-risiko">
                  <UpgradeBanner onUpgrade={() => setUpgradeOpen(true)} />
                </div>
              )}

              {/* Section 3: Perjalanan */}
              {isPremium && (
                <div ref={bs3Ref} data-section="perjalanan">
                  <CommuteWorkspace
                    onSwitchToChecklist={() => navigateToStep("checklist")}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}

              {/* Section 4: Checklist */}
              {isPremium && (
                <div ref={bs4Ref} data-section="checklist">
                  <ChecklistWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
                    dynamicItems={dynamicChecklistItems}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}

              {/* Section 5: Fasilitas */}
              {isPremium && (
                <div
                  ref={bs5Ref}
                  data-section="fasilitas"
                  style={{ paddingBottom: 40 }}
                >
                  <FasilitasWorkspace
                    visible={facilityVisible}
                    onToggle={(key) =>
                      setFacilityVisible((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}
            </div>
          </MobileBottomSheet>

          <MobileBottomNav
            activeTab="map-panel"
            onTabSelect={handleMobileNavSelect}
          />
        </div>
      )}

      {/* ── Desktop layout (≥lg): 50:50 side-by-side ── */}
      <div className="hidden lg:flex px-5 py-5 gap-5 items-start">
        <div
          className="flex flex-col gap-0"
          style={{ width: "50%", minWidth: 0 }}
        >
          {!mapFullscreen && (
            <div
              className="sticky top-[52px] z-40 min-w-0 bg-[#F4F7F8] pt-3 pb-2 pl-0 pr-3 xl:pr-5 mb-2"
              style={{ boxShadow: "0 8px 12px -14px rgba(0,30,43,0.45)" }}
            >
              <SubHeaderTabs
                isPremium={isPremium}
                activeTab={activeTabLabel}
                onTabChange={(tab) =>
                  navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
                }
                onUpgrade={() => setUpgradeOpen(true)}
                onAssistant={() => handleOpenAssistant("overview")}
              />
            </div>
          )}

          <div className="relative" ref={containerRef}>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              {/* ── Section 1: Ringkasan ── */}
              <div
                ref={s1Ref}
                data-section="ringkasan"
                style={{ scrollMarginTop: STICKY_OFFSET }}
              >
                <ScoreCard
                  score={activeProperty.score}
                  statusText={
                    activeProperty.status === "LANJUTKAN"
                      ? "Sangat Layak"
                      : activeProperty.status === "TUNDA"
                        ? "Perlu Pertimbangan"
                        : "Layak dengan catatan"
                  }
                  description={`${activeProperty.name} (${activeProperty.subdistrict}) — ${activeProperty.riskSummary}.`}
                  onOpenAssistant={handleOpenAssistant}
                />
                <div className="mt-4">
                  <FactorRisksCard
                    onSelectFactor={handleSelectFactor}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              </div>

              {/* ── Section 2: Faktor Risiko ── */}
              {isPremium ? (
                <div
                  ref={s2Ref}
                  data-section="faktor-risiko"
                  style={{ scrollMarginTop: STICKY_OFFSET }}
                >
                  <DeepDiveEvidenceWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
                    onSwitchToChecklist={() => navigateToStep("checklist")}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              ) : (
                <div ref={s2Ref}>
                  <UpgradeBanner onUpgrade={() => setUpgradeOpen(true)} />
                  <div className="mt-3 flex flex-col gap-3">
                    {STEPS.slice(1).map((s) => (
                      <LockedSectionTeaser
                        key={s.id}
                        step={s.step}
                        label={s.label}
                        onUpgrade={() => setUpgradeOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Section 3: Perjalanan ── */}
              {isPremium && (
                <div
                  ref={s3Ref}
                  data-section="perjalanan"
                  style={{ scrollMarginTop: STICKY_OFFSET }}
                >
                  <CommuteWorkspace
                    onSwitchToChecklist={() => navigateToStep("checklist")}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}

              {/* ── Section 4: Checklist ── */}
              {isPremium && (
                <div
                  ref={s4Ref}
                  data-section="checklist"
                  style={{ scrollMarginTop: STICKY_OFFSET }}
                >
                  <ChecklistWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
                    dynamicItems={dynamicChecklistItems}
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}

              {/* ── Section 5: Fasilitas ── */}
              {isPremium && (
                <div
                  ref={s5Ref}
                  data-section="fasilitas"
                  style={{ scrollMarginTop: STICKY_OFFSET, paddingBottom: 80 }}
                >
                  <FasilitasWorkspace
                    visible={facilityVisible}
                    onToggle={(key) =>
                      setFacilityVisible((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    onOpenAssistant={handleOpenAssistant}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column: map ── */}
        <div
          className="sticky top-[72px] self-start"
          style={{ width: "50%", minWidth: 0 }}
        >
          <MapPanel
            timelineNodes={timelineNodes}
            onFullscreenChange={setMapFullscreen}
            isPremium={isPremium}
            activeTab={activeTabLabel}
            facilityVisible={facilityVisible}
            onUpgrade={() => setUpgradeOpen(true)}
            onTabChange={(tab) =>
              navigateToStep(TAB_TO_STEP[tab] ?? "ringkasan")
            }
            heightOverride="calc(100vh - 108px)"
          />
        </div>
      </div>

      <AssistantDrawer
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        context={assistantContext}
        onHighlightMap={handleHighlightMap}
        onAddChecklistItem={handleAddChecklistItem}
        onNavigateTab={(tab) => navigateToStep(tab as WorkspaceStep)}
      />

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[1300] flex items-center gap-2 rounded-full bg-[#001E2B] px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 border border-[#00ED64]/40">
          <CheckCircle2 size={15} className="text-[#00ED64]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <UpgradeDrawer
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
        propertyName={activeProperty?.name}
        initialTier={selectedTier}
      />

      <InAppCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        tier={selectedTier}
        propertyName={activeProperty?.name}
      />

      <ZeroQuotaModal
        isOpen={zeroQuotaOpen}
        onClose={() => setZeroQuotaOpen(false)}
        onSelectTier={(tier) => {
          setSelectedTier(tier)
          setCheckoutOpen(true)
        }}
        onOpenArchive={() => {
          setZeroQuotaOpen(false)
          setPropertyModalOpen(true)
        }}
        auditedCount={propertiesList.length}
      />

      <PropertyModal
        isOpen={propertyModalOpen}
        onClose={() => setPropertyModalOpen(false)}
        properties={propertiesList}
        activePropertyId={activePropertyId}
        onSelectProperty={handleSelectProperty}
        onAddProperty={handleAddProperty}
        totalQuota={totalQuota}
        remainingQuota={remainingQuota}
        onOpenUpgrade={() => setUpgradeOpen(true)}
        onOpenZeroQuotaModal={() => setZeroQuotaOpen(true)}
        onOpenCuratedAreas={() => {
          setPropertyModalOpen(false)
          setAppFlowState("curated-areas")
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user)
          showToast(`Berhasil masuk sebagai ${user.name}`)
        }}
      />

      <PDFDueDiligencePreviewModal
        isOpen={pdfPreviewOpen}
        onClose={() => setPdfPreviewOpen(false)}
        propertyName={activeProperty?.name}
        subdistrict={activeProperty?.subdistrict}
        city={activeProperty?.city}
        score={activeProperty?.score}
      />

      {toastMessage && (
        <div className="fixed bottom-6 inset-x-0 z-[4000] flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#001E2B] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5 max-w-md pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#00ED64] animate-pulse shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
