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
import type { FacilityCategoryKey } from "./components/FasilitasWorkspace"
import { initialProperties, PropertyLocation } from "./data/mockProperties"
import { Lock } from "lucide-react"

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
    useState<"wizard" | "loading" | "curated-areas" | "workspace">("wizard")

  // Property locations state
  const [propertiesList, setPropertiesList] =
    useState<PropertyLocation[]>(initialProperties)
  const [activePropertyId, setActivePropertyId] = useState<string>("prop-1")
  const totalQuota = 5
  const remainingQuota = Math.max(0, totalQuota - propertiesList.length)
  const activeProperty =
    propertiesList.find((p) => p.id === activePropertyId) || propertiesList[0]

  const handleSelectProperty = (id: string) => {
    setActivePropertyId(id)
  }

  const handleAddProperty = (name: string, location: string) => {
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
    }
    setPropertiesList((prev) => [newProp, ...prev])
    setActivePropertyId(newProp.id)
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
      setAssistantOpen(true)
    } else if (tab === "profile") {
      // Profile tab action
    }
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

  // ── Upgrade ────────────────────────────────────────────────────────────────

  function handleUpgradeConfirm() {
    setIsPremium(true)
    setUpgradeOpen(false)
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
        onComplete={() => setAppFlowState("loading")}
        onCancel={() => setAppFlowState("curated-areas")}
      />
    )
  }

  if (appFlowState === "loading") {
    return (
      <LocationDataLoadingScreen
        onComplete={() => setAppFlowState("curated-areas")}
      />
    )
  }

  if (appFlowState === "curated-areas") {
    return (
      <CuratedAreasMapScreen
        userRemainingQuota={remainingQuota}
        isPremium={isPremium}
        onUnlockArea={(area: CuratedArea) => {
          handleAddProperty(
            `Kandidat ${area.name.split("&")[0].trim()}`,
            area.region,
          )
          setAppFlowState("workspace")
        }}
        onCancel={() => setAppFlowState("workspace")}
      />
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
        isPremium={isPremium}
        onUpgrade={() => setUpgradeOpen(true)}
        activePropertyName={activeProperty.name}
        activePropertySubdistrict={activeProperty.subdistrict}
        remainingQuota={remainingQuota}
        totalQuota={totalQuota}
        onOpenPropertyModal={() => setPropertyModalOpen(true)}
        onOpenWizard={() => setAppFlowState("curated-areas")}
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
              />
              <div className="mt-4">
                <FactorRisksCard onSelectFactor={handleSelectFactor} />
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
                />
                <div className="mt-4">
                  <FactorRisksCard onSelectFactor={handleSelectFactor} />
                </div>
              </div>

              {/* Section 2: Faktor Risiko */}
              {isPremium ? (
                <div ref={bs2Ref} data-section="faktor-risiko">
                  <DeepDiveEvidenceWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
                    onSwitchToChecklist={() => navigateToStep("checklist")}
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
                  />
                </div>
              )}

              {/* Section 4: Checklist */}
              {isPremium && (
                <div ref={bs4Ref} data-section="checklist">
                  <ChecklistWorkspace
                    activeCategory={selectedFactorId}
                    onSelectCategory={setSelectedFactorId}
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
                onAssistant={() => setAssistantOpen(true)}
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
                />
                <div className="mt-4">
                  <FactorRisksCard onSelectFactor={handleSelectFactor} />
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
      />

      <UpgradeDrawer
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onUpgradeConfirm={handleUpgradeConfirm}
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
      />
    </div>
  )
}
