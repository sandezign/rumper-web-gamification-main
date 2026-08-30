import React, { useState } from "react"
import {
  Train,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Clock,
} from "lucide-react"
import commuteIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-commute.svg"
import timeIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-time.svg"
import floodIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-flood.svg"
import budgetIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-budget.svg"
import greenSpaceIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-green-space.svg"
import homeIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-home.svg"
import tradeoffIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-tradeoff.svg"

interface Stage1BridgeExplainerProps {
  selectedFriction?: string
  onStart?: () => void
  onSelectScenario?: (scenarioIndex: number) => void
  onSkip?: () => void
}

export default function Stage1BridgeExplainer({
  selectedFriction: _selectedFriction,
  onStart,
  onSelectScenario,
  onSkip,
}: Stage1BridgeExplainerProps) {
  const [activeFactor, setActiveFactor] = useState<string | null>(null)

  // Dynamic physical tilt response on center card when hovering specific satellite
  const getCenterTiltClass = () => {
    switch (activeFactor) {
      case "commute":
        return "-translate-y-2 scale-105 rotate-0 shadow-2xl"
      case "time":
        return "translate-x-2 -translate-y-1.5 rotate-4 scale-105 shadow-2xl"
      case "flood":
        return "-translate-x-2 -translate-y-1.5 -rotate-5 scale-105 shadow-2xl"
      case "budget":
        return "-translate-x-1.5 translate-y-1.5 -rotate-4 scale-105 shadow-2xl"
      case "greenspace":
        return "translate-x-1.5 translate-y-1.5 rotate-3 scale-105 shadow-2xl"
      default:
        return "animate-scale-card"
    }
  }

  const handleCardClick = (index: number) => {
    if (onSelectScenario) {
      onSelectScenario(index)
    } else if (onStart) {
      onStart()
    }
  }

  const scenarioItems = [
    {
      icon: <Train className="w-5 h-5 text-rumper-green-dark" />,
      title: "Waktu Komuter vs Luas Rumah",
      desc: "Hemat tenaga dekat stasiun KRL vs ruang lebih lega tapi komut lebih jauh.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-rumper-green-dark" />,
      title: "Bebas Banjir vs Dekat Pusat Kota",
      desc: "Rasa tenang bebas genangan saat musim hujan vs hemat waktu ke pusat aktivitas.",
    },
    {
      icon: <Calculator className="w-5 h-5 text-rumper-green-dark" />,
      title: "Cicilan Riil vs Biaya Operasional",
      desc: "Hitung total beban bulanan (KPR, bensin, tol), bukan cuma patokan brosur.",
    },
  ]

  return (
    <div className="text-deep-teal max-w-xl mx-auto w-full flex flex-col items-center text-center px-2">

      {/* 2. Hero Visual: Dynamic Equilibrium Orbit & Satellite Signals */}
      <div className="relative w-full max-w-sm h-64 sm:h-72 flex items-center justify-center mb-6 select-none">
        <span className="sr-only">
          Lima faktor rumah pertama mengelilingi simbol pertimbangan, dengan
          tiga skenario siap dicoba.
        </span>

        {/* Ambient Backlight Glow */}
        <div className="absolute inset-8 bg-feature-mint/70 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

        {/* Orbit Radar Pulse Ripple */}
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-rumper-green/35 pointer-events-none animate-orbit-ripple" />

        {/* Orbit Dotted Ring */}
        <div
          className={`absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-dashed pointer-events-none animate-orbit-spin transition-colors duration-300 ${
            activeFactor ? "border-rumper-green-dark/60" : "border-quiet-ink/50"
          }`}
        />

        {/* Floating Orbital Satellites with Tooltips */}
        {/* Top: Commuter Train */}
        <div
          className="absolute -top-1 sm:top-1 left-1/2 -translate-x-1/2 group z-20"
          onMouseEnter={() => setActiveFactor("commute")}
          onMouseLeave={() => setActiveFactor(null)}
        >
          <button
            type="button"
            aria-label="Faktor Komuter KRL On-Time"
            className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-soft-green/90 flex items-center justify-center animate-orbit-pop animate-float-1 transition-[transform,background-color,border-color,box-shadow] duration-200 group-hover:scale-115 group-hover:bg-canvas-white group-hover:border-rumper-green-dark group-hover:shadow-md cursor-pointer active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            <img
              src={commuteIcon}
              alt=""
              aria-hidden="true"
              className="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </button>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1 transition-[transform,opacity] duration-200 ease-out pointer-events-none bg-deep-teal/95 backdrop-blur-sm text-canvas-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30">
            Komuter KRL
          </div>
        </div>

        {/* Top Right: Time Efficiency */}
        <div
          className="absolute top-8 right-6 sm:right-8 group z-20"
          onMouseEnter={() => setActiveFactor("time")}
          onMouseLeave={() => setActiveFactor(null)}
        >
          <button
            type="button"
            aria-label="Faktor Efisiensi Waktu Tempuh"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-soft-green/90 flex items-center justify-center animate-orbit-pop animate-float-2 transition-[transform,background-color,border-color,box-shadow] duration-200 group-hover:scale-115 group-hover:bg-canvas-white group-hover:border-rumper-green-dark group-hover:shadow-md cursor-pointer active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            <img
              src={timeIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </button>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1 transition-[transform,opacity] duration-200 ease-out pointer-events-none bg-deep-teal/95 backdrop-blur-sm text-canvas-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30">
            Waktu Tempuh
          </div>
        </div>

        {/* Top Left: Rain / Flood */}
        <div
          className="absolute top-8 left-6 sm:left-8 group z-20"
          onMouseEnter={() => setActiveFactor("flood")}
          onMouseLeave={() => setActiveFactor(null)}
        >
          <button
            type="button"
            aria-label="Faktor Kesiapan Lingkungan & Bebas Banjir"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-soft-green/90 flex items-center justify-center animate-orbit-pop animate-float-3 transition-[transform,background-color,border-color,box-shadow] duration-200 group-hover:scale-115 group-hover:bg-canvas-white group-hover:border-rumper-green-dark group-hover:shadow-md cursor-pointer active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            <img
              src={floodIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </button>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1 transition-[transform,opacity] duration-200 ease-out pointer-events-none bg-deep-teal/95 backdrop-blur-sm text-canvas-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30">
            Bebas Banjir
          </div>
        </div>

        {/* Bottom Left: Wallet / Budget */}
        <div
          className="absolute bottom-16 left-4 sm:left-6 group z-20"
          onMouseEnter={() => setActiveFactor("budget")}
          onMouseLeave={() => setActiveFactor(null)}
        >
          <button
            type="button"
            aria-label="Faktor Cicilan Riil & Anggaran"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-soft-green/90 flex items-center justify-center animate-orbit-pop animate-float-4 transition-[transform,background-color,border-color,box-shadow] duration-200 group-hover:scale-115 group-hover:bg-canvas-white group-hover:border-rumper-green-dark group-hover:shadow-md cursor-pointer active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            <img
              src={budgetIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1 transition-[transform,opacity] duration-200 ease-out pointer-events-none bg-deep-teal/95 backdrop-blur-sm text-canvas-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30">
            Cicilan & Budget
          </div>
        </div>

        {/* Bottom Right: Greenery / Space */}
        <div
          className="absolute bottom-16 right-4 sm:right-6 group z-20"
          onMouseEnter={() => setActiveFactor("greenspace")}
          onMouseLeave={() => setActiveFactor(null)}
        >
          <button
            type="button"
            aria-label="Faktor Ruang Terbuka Hijau & Luas Tanah"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-soft-green/90 flex items-center justify-center animate-orbit-pop animate-float-5 transition-[transform,background-color,border-color,box-shadow] duration-200 group-hover:scale-115 group-hover:bg-canvas-white group-hover:border-rumper-green-dark group-hover:shadow-md cursor-pointer active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            <img
              src={greenSpaceIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1 transition-[transform,opacity] duration-200 ease-out pointer-events-none bg-deep-teal/95 backdrop-blur-sm text-canvas-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30">
            Ruang Terbuka
          </div>
        </div>

        {/* Center Layered Cards */}
        <div className="relative flex items-center justify-center group cursor-pointer active:scale-[0.97] transition-transform duration-150">
          {/* Back Card */}
          <div
            className={`absolute -right-5 -top-3 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-canvas-white border border-subtle-border shadow-md flex items-center justify-center animate-back-card transition-[transform,box-shadow] duration-300 ${
              activeFactor
                ? "translate-x-2 -translate-y-2 rotate-12 shadow-lg"
                : "group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12"
            }`}
          >
            <img
              src={homeIcon}
              alt="Rumah pertama"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Front Card */}
          <div
            className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-supporting-teal shadow-xl flex items-center justify-center border-2 border-canvas-white transition-[transform,box-shadow] duration-300 ${getCenterTiltClass()} ${
              !activeFactor
                ? "group-hover:scale-108 group-hover:rotate-0 group-hover:shadow-2xl"
                : ""
            }`}
          >
            <img
              src={tradeoffIcon}
              alt="Pertimbangan trade-off"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain animate-scale-sway pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Typography: Concise Title & Subtitle */}
      <div className="space-y-2 mb-6 max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-deep-teal tracking-tight leading-tight text-balance">
          Pilih rumah pertama pasti ada kompromi
        </h2>
        <p className="text-xs sm:text-sm text-tertiary-ink leading-relaxed font-medium text-pretty max-w-md mx-auto">
          Yuk uji prioritasmu lewat simulasi trade-off harian di Jabodetabek:
        </p>
      </div>

      {/* 4. Scenario Topic Cards (Clean Without Number Labels) */}
      <div className="w-full max-w-lg flex flex-col gap-3 text-left mb-5">
        {scenarioItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleCardClick(idx)
              }
            }}
            className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#D7E1E5] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-rumper-green-dark/50 hover:shadow-[0_6px_18px_rgba(0,104,74,0.07)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-deep-teal focus-visible:outline-offset-2"
          >
            {/* Topic Icon Container */}
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-xl bg-feature-mint/80 border border-soft-green/60 text-rumper-green-dark flex items-center justify-center shrink-0 shadow-2xs transition-[background-color,border-color,transform] duration-200 group-hover:bg-rumper-green-dark group-hover:text-white group-hover:scale-105"
            >
              {React.cloneElement(item.icon, {
                className:
                  "w-5 h-5 transition-colors duration-200 group-hover:text-white",
              })}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-deep-teal group-hover:text-rumper-green-dark transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-xs text-tertiary-ink leading-relaxed text-pretty mt-0.5">
                {item.desc}
              </p>
            </div>

            {/* Hover Action Indicator */}
            <div className="flex items-center pl-1 text-tertiary-ink/40 group-hover:text-rumper-green-dark group-hover:translate-x-0.5 transition-all duration-200">
              <ArrowRight size={15} />
            </div>
          </div>
        ))}
      </div>

      {/* 5. Bottom Timing Note */}
      <p className="text-[11px] text-tertiary-ink/80 font-medium mb-3 flex items-center justify-center gap-1.5">
        <Clock size={12} className="text-tertiary-ink/60 shrink-0" aria-hidden="true" />
        <span>~2 menit · Pilihan bisa diubah kapan saja</span>
      </p>

      {/* 6. Skip Link Action at the Bottom of Page */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold text-tertiary-ink hover:text-deep-teal transition-colors underline cursor-pointer py-1.5 active:scale-95"
        >
          Lewati langsung ke pengaturan budget &rarr;
        </button>
      )}
    </div>
  )
}
