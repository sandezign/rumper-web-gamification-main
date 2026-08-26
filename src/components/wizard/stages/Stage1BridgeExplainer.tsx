import { Sparkles, Check } from "lucide-react"
import commuteIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-commute.svg"
import timeIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-time.svg"
import floodIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-flood.svg"
import budgetIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-budget.svg"
import greenSpaceIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-green-space.svg"
import homeIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-home.svg"
import tradeoffIcon from "../../../assets/illustrations/onboarding/bridge/rumper-bridge-tradeoff.svg"

interface Stage1BridgeExplainerProps {
  selectedFriction?: string
}

export default function Stage1BridgeExplainer({
  selectedFriction,
}: Stage1BridgeExplainerProps) {
  return (
    <div className="text-deep-teal max-w-xl mx-auto w-full flex flex-col items-center text-center">
      {/* Top Contextual Friction Bridge Pill */}
      {selectedFriction ? (
        <div className="inline-flex max-w-full items-center gap-2 px-4 py-2 bg-evidence-positive-bg rounded-full border border-evidence-positive/30 text-xs text-supporting-teal font-semibold mb-6 shadow-2xs">
          <Sparkles size={14} className="text-rumper-green-dark shrink-0" />
          <span className="min-w-0 max-w-md break-words">
            Nyambung kendalamu:{" "}
            <strong className="font-bold">
              &ldquo;{selectedFriction}&rdquo;
            </strong>
          </span>
        </div>
      ) : (
        <div className="inline-flex max-w-full items-center gap-2 px-4 py-2 bg-evidence-positive-bg rounded-full border border-evidence-positive/30 text-xs text-supporting-teal font-semibold mb-6 shadow-2xs">
          <Sparkles size={14} className="text-rumper-green-dark shrink-0" />
          <span>Membantu mencari titik temu kompromi rumah pertamamu</span>
        </div>
      )}

      {/* Hero visual: one centered trade-off with five supporting signals */}
      <div className="relative w-full max-w-sm h-64 sm:h-72 flex items-center justify-center mb-6 select-none">
        <span className="sr-only">
          Lima faktor rumah pertama mengelilingi simbol pertimbangan, dengan
          tiga skenario siap dicoba.
        </span>
        <div className="absolute inset-8 bg-feature-mint/60 rounded-full blur-2xl pointer-events-none" />

        {/* Orbit Dotted Ring */}
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-dashed border-quiet-ink/60 pointer-events-none" />

        {/* Floating Orbital Icons */}
        {/* Top: Commuter Train */}
        <div className="absolute -top-1 sm:top-1 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-feature-mint shadow-sm border border-soft-green flex items-center justify-center">
          <img
            src={commuteIcon}
            alt="Komuter"
            className="w-7 h-7 object-contain"
          />
        </div>

        {/* Top Right: Time Efficiency */}
        <div className="absolute top-8 right-6 sm:right-8 w-10 h-10 rounded-full bg-feature-mint shadow-sm border border-soft-green flex items-center justify-center">
          <img
            src={timeIcon}
            alt="Efisiensi waktu"
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Top Left: Rain / Flood */}
        <div className="absolute top-8 left-6 sm:left-8 w-10 h-10 rounded-full bg-feature-mint shadow-sm border border-soft-green flex items-center justify-center">
          <img
            src={floodIcon}
            alt="Risiko banjir"
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Bottom Left: Wallet / Budget */}
        <div className="absolute bottom-16 left-4 sm:left-6 w-10 h-10 rounded-full bg-feature-mint shadow-sm border border-soft-green flex items-center justify-center">
          <img
            src={budgetIcon}
            alt="Anggaran"
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Bottom Right: Greenery / Space */}
        <div className="absolute bottom-16 right-4 sm:right-6 w-10 h-10 rounded-full bg-feature-mint shadow-sm border border-soft-green flex items-center justify-center">
          <img
            src={greenSpaceIcon}
            alt="Ruang hijau"
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Center Overlapping 3D Badges */}
        <div className="relative flex items-center justify-center">
          {/* Back Card: Property Pin Blueprint */}
          <div className="absolute -right-5 -top-3 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-canvas-white border border-subtle-border shadow-md flex items-center justify-center transform rotate-6">
            <img
              src={homeIcon}
              alt="Rumah pertama"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            />
          </div>

          {/* Front Card: Rumper Balance Symbol */}
          <div className="relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-supporting-teal shadow-lg flex items-center justify-center transform -rotate-3 border-2 border-canvas-white">
            <img
              src={tradeoffIcon}
              alt="Pertimbangan trade-off"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
          </div>
        </div>

        {/* Bottom Floating Pill Status Card (Reference Style) */}
        <div className="absolute -bottom-2 z-20 bg-canvas-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-subtle-border shadow-md flex items-center justify-between gap-4 w-72 sm:w-80 max-w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-feature-mint flex items-center justify-center">
              <img src={homeIcon} alt="" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-xs font-extrabold text-deep-teal tracking-tight">
              3 Skenario Nyata
            </span>
          </div>

          <div className="min-h-6 px-2 rounded-full bg-feature-mint border border-soft-green text-rumper-green-dark flex items-center gap-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wide">
              Siap
            </span>
            <Check size={12} className="stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Typography: Title & Subtitle */}
      <div className="space-y-2 mb-8 max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-deep-teal tracking-tight leading-tight text-balance">
          Pilih rumah pertama emang penuh kompromi
        </h2>
        <p className="text-sm text-tertiary-ink leading-relaxed font-medium">
          Sebelum lanjut ke filter budget & lokasi, yuk uji prioritas aslimu
          lewat simulasi trade-off harian di Jabodetabek:
        </p>
      </div>

      {/* Clean Checklist Items (Exact Flo Reference Pattern) */}
      <div className="w-full max-w-lg flex flex-col gap-3.5 text-left mb-4">
        {/* Item 1 */}
        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-canvas-white border border-hairline shadow-2xs">
          <div
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-rumper-green-dark text-canvas-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
          >
            <Check size={14} className="stroke-[3]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-deep-teal">
              Waktu Komuter vs Luas Bangunan
            </h3>
            <p className="text-sm text-tertiary-ink leading-relaxed">
              Pilih hemat energi di KRL (rumah kompak) atau punya kamar &
              halaman lebih luas.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-canvas-white border border-hairline shadow-2xs">
          <div
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-rumper-green-dark text-canvas-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
          >
            <Check size={14} className="stroke-[3]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-deep-teal">
              Kesiapan Lingkungan & Bebas Banjir
            </h3>
            <p className="text-sm text-tertiary-ink leading-relaxed">
              Bandingkan rasa tenang bebas genangan saat musim hujan vs
              kedekatan ke pusat kota.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-canvas-white border border-hairline shadow-2xs">
          <div
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-rumper-green-dark text-canvas-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
          >
            <Check size={14} className="stroke-[3]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-deep-teal">
              Cicilan Riil vs Biaya Operasional
            </h3>
            <p className="text-sm text-tertiary-ink leading-relaxed">
              Hitung total pengeluaran bulanan (bensin, tol, KPR), bukan cuma
              harga brosur perumahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
