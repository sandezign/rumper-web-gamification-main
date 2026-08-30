import React, { useState } from "react"
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  Layers,
  CreditCard,
  Archive,
  Share2,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  Clock,
  Home,
  FileText,
  Sliders,
  Award,
  AlertCircle,
  Plus,
} from "lucide-react"
import type { PropertyLocation } from "../../data/mockProperties"
import type { PricingTierKey } from "../InAppCheckoutModal"

export type AccountTabKey = "profile" | "billing" | "archive" | "share"

interface AccountSettingsScreenProps {
  onBack: () => void
  propertiesList: PropertyLocation[]
  activePropertyId: string
  onSelectProperty: (id: string) => void
  remainingQuota: number
  totalQuota: number
  isPremium: boolean
  onOpenUpgrade: (tier?: PricingTierKey) => void
  userOfficePrimary?: string
  userOfficeSecondary?: string
  onSaveOfficePreferences?: (primary: string, secondary: string) => void
  onOpenPdfPreview?: () => void
}

const INVOICE_HISTORY = [
  {
    id: "INV-2026-0881",
    date: "28 Agu 2026",
    planName: "3-Property Shortlist Bundle",
    amount: "Rp 120.000",
    status: "Lunas",
    paymentMethod: "QRIS GoPay",
  },
  {
    id: "INV-2026-0412",
    date: "14 Jul 2026",
    planName: "Single Property Pass",
    amount: "Rp 50.000",
    status: "Lunas",
    paymentMethod: "BCA Virtual Account",
  },
]

export default function AccountSettingsScreen({
  onBack,
  propertiesList,
  activePropertyId,
  onSelectProperty,
  remainingQuota,
  totalQuota,
  isPremium,
  onOpenUpgrade,
  userOfficePrimary = "Sudirman Central Business District (SCBD)",
  userOfficeSecondary = "Kuningan / HR Rasuna Said",
  onSaveOfficePreferences,
}: AccountSettingsScreenProps) {
  const [activeTab, setActiveTab] = useState<AccountTabKey>("profile")

  // Tab 1: Profile & Office State
  const [primaryOffice, setPrimaryOffice] = useState(userOfficePrimary)
  const [secondaryOffice, setSecondaryOffice] = useState(userOfficeSecondary)
  const [workMode, setWorkMode] = useState<"wfo" | "hybrid" | "remote">("hybrid")
  const [budgetBand, setBudgetBand] = useState("Rp 800 Jt – 1.5 M")
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Tab 4: Family Share State
  const [shareCopied, setShareCopied] = useState(false)
  const [allowSpouseChecklist, setAllowSpouseChecklist] = useState(true)
  const [allowSpouseHazards, setAllowSpouseHazards] = useState(true)
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const [pdfSuccess, setPdfSuccess] = useState(false)

  const shareToken = "rumper.id/share/p/8f92a1c0"

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveOfficePreferences?.(primaryOffice, secondaryOffice)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(`https://${shareToken}`)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  const handleExportPdf = () => {
    setIsExportingPdf(true)
    setTimeout(() => {
      setIsExportingPdf(false)
      setPdfSuccess(true)
      setTimeout(() => setPdfSuccess(false), 2500)
    }, 1200)
  }

  const usedQuota = Math.max(0, totalQuota - remainingQuota)
  const quotaPercent = Math.min(100, Math.round((usedQuota / totalQuota) * 100))

  return (
    <div
      className="flex-1 w-full bg-[#F6F8F7] text-[#001E2B] flex flex-col antialiased selection:bg-[#00ED64]/30"
      style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ── Main Page Container ─────────────────────────────────────────────── */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-16 md:pb-12 space-y-6">
        {/* ── Top Navigation & Page Title Header ─────────────────────────────── */}
        <div className="space-y-4">
          {/* Breadcrumb / Back Button */}
          <div>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F0F4F2] text-xs font-bold text-[#334155] hover:text-[#001E2B] transition-all active:scale-95 cursor-pointer border border-[#E5E5EA] shadow-xs group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition-transform text-[#00684A]"
              />
              <span>Kembali ke Workspace</span>
            </button>
          </div>

          {/* Heading Title & User Overview Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E5E5EA]">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00684A] mb-1 block">
                AKUN & PREFERENSI
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#001E2B] tracking-tight leading-tight">
                Pengaturan Akun & Profil
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6C7A] mt-1">
                Kelola lokasi kerja, kapasitas kuota, arsip properti, dan sinkronisasi keluarga.
              </p>
            </div>

            {/* Right: User Identity Card */}
            <div className="flex items-center gap-3 p-2.5 sm:px-4 sm:py-2 bg-white rounded-2xl border border-[#E5E5EA] shadow-xs shrink-0 self-start sm:self-auto">
              <div className="size-9 rounded-full bg-[#001E2B] text-[#00ED64] font-black text-xs flex items-center justify-center shadow-xs">
                AW
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#001E2B]">Andi Wijaya</span>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full border ${
                      isPremium
                        ? "bg-[#00ED64]/15 border-[#00ED64]/40 text-[#00684A]"
                        : "bg-slate-100 border-slate-300 text-[#5C6C7A]"
                    }`}
                  >
                    {isPremium ? "Premium" : "Free Trial"}
                  </span>
                </div>
                <span className="text-[11px] text-[#7C8C9A] block truncate max-w-[140px] sm:max-w-[180px]">
                  andi.wijaya@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile iOS Segmented Control (<md) ───────────────────────── */}
        <div className="md:hidden p-1 bg-slate-200/60 backdrop-blur-md rounded-2xl flex items-center gap-1 shadow-xs border border-slate-300/40">
          {[
            { id: "profile", label: "Profil", icon: User },
            { id: "billing", label: "Kuota", icon: CreditCard },
            { id: "archive", label: "Arsip", icon: Archive },
            { id: "share", label: "Berbagi", icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon
            const isCurrent = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AccountTabKey)}
                className={`flex-1 min-h-[40px] py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer ${
                  isCurrent
                    ? "bg-white text-slate-900 shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={14} className={isCurrent ? "text-[#00684A]" : ""} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Main Layout Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* ── Desktop Sidebar Tabs (md:col-span-4 lg:col-span-3) ───────────── */}
          <aside className="hidden md:flex flex-col gap-2 md:col-span-4 lg:col-span-3">
            <div className="p-3.5 bg-white rounded-[24px] border border-[#E5E5EA] shadow-xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7C8C9A] px-3 mb-2 block">
                Menu Pengaturan
              </span>

              {[
                {
                  id: "profile",
                  label: "Profil & Lokasi Kerja",
                  subtitle: "Titik kantor & komuter harian",
                  icon: User,
                },
                {
                  id: "billing",
                  label: "Kuota & Tagihan",
                  subtitle: `${remainingQuota} kuota tersisa • Riwayat invoice`,
                  icon: CreditCard,
                },
                {
                  id: "archive",
                  label: "Arsip Properti",
                  subtitle: `${propertiesList.length} properti tersimpan aman`,
                  icon: Archive,
                },
                {
                  id: "share",
                  label: "Ekspor & Berbagi",
                  subtitle: "Tautan keluarga & PDF brief",
                  icon: Share2,
                },
              ].map((tab) => {
                const Icon = tab.icon
                const isCurrent = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as AccountTabKey)}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#001E2B] text-white shadow-md ring-1 ring-white/10"
                        : "hover:bg-[#F4F7F6] text-[#334155]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-white/10 text-[#00ED64]"
                            : "bg-slate-100 text-[#5C6C7A]"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-black block leading-tight">
                          {tab.label}
                        </span>
                        <span
                          className={`text-[10px] mt-0.5 block leading-tight ${
                            isCurrent ? "text-[#A8B3BC]" : "text-[#7C8C9A]"
                          }`}
                        >
                          {tab.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className={isCurrent ? "text-[#00ED64]" : "text-[#CBD5E1]"}
                    />
                  </button>
                )
              })}
            </div>

            {/* Quick Trust Anchor Card */}
            <div className="p-4 bg-emerald-50/70 rounded-[22px] border border-emerald-200/60 text-xs text-[#004D36] space-y-1.5">
              <div className="flex items-center gap-1.5 font-extrabold text-[#00684A]">
                <ShieldCheck size={16} />
                <span>Privasi Terjamin</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#004D36]/90">
                Titik kantor dan data investigasimu terenkripsi dan tidak dipublikasikan ke pihak ketiga mana pun.
              </p>
            </div>
          </aside>

          {/* ── Content Panel (md:col-span-8 lg:col-span-9) ──────────────────── */}
          <section className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* ═══════════════════════════════════════════════════════════════════
                TAB 1: PROFIL & LOKASI KERJA
               ═══════════════════════════════════════════════════════════════════ */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5EA] shadow-xs space-y-6">
                  <div>
                    <h2 className="text-xl font-black text-[#001E2B] tracking-tight">
                      Profil Akun & Lokasi Kerja
                    </h2>
                    <p className="text-xs text-[#5C6C7A] mt-1 leading-relaxed">
                      Pengaturan area kantor harian menentukan kalkulasi waktu tempuh, transit KRL, akses tol, dan analisis rute jam sibuk.
                    </p>
                  </div>

                  {savedSuccess && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-[#00684A] animate-fadeIn">
                      <Check size={16} />
                      <span>Preferensi lokasi kerja berhasil disimpan & diperbarui!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    {/* Account Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-[#E5E5EA]">
                      <div>
                        <label className="text-xs font-bold text-[#001E2B] block mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          defaultValue="Andi Wijaya"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#001E2B] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00684A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#001E2B] block mb-1.5">
                          Email Terdaftar
                        </label>
                        <input
                          type="email"
                          defaultValue="andi.wijaya@gmail.com"
                          disabled
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] text-sm text-[#64748B] font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Primary Office Anchor */}
                    <div>
                      <label className="text-xs font-extrabold text-[#001E2B] flex items-center gap-1.5 mb-1.5">
                        <MapPin size={14} className="text-[#00684A]" />
                        <span>Lokasi Kantor Utama</span>
                      </label>
                      <input
                        type="text"
                        value={primaryOffice}
                        onChange={(e) => setPrimaryOffice(e.target.value)}
                        placeholder="Masukkan nama gedung / area kantor utamamu..."
                        className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#001E2B] font-medium focus:outline-none focus:ring-2 focus:ring-[#00684A]"
                      />
                      <div className="flex gap-1.5 flex-wrap mt-2">
                        <span className="text-[10px] text-[#7C8C9A] py-0.5">Preset:</span>
                        {["SCBD", "Kuningan", "Mega Kuningan", "TB Simatupang", "Thamrin"].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setPrimaryOffice(preset)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#334155] cursor-pointer"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Office Anchor */}
                    <div>
                      <label className="text-xs font-extrabold text-[#001E2B] flex items-center gap-1.5 mb-1.5">
                        <Briefcase size={14} className="text-[#00684A]" />
                        <span>Lokasi Kantor Pasangan / Kampus / Lainnya (Opsional)</span>
                      </label>
                      <input
                        type="text"
                        value={secondaryOffice}
                        onChange={(e) => setSecondaryOffice(e.target.value)}
                        placeholder="Pilih area kantor pasangan, kampus, atau cabang..."
                        className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#001E2B] font-medium focus:outline-none focus:ring-2 focus:ring-[#00684A]"
                      />
                    </div>

                    {/* Work Mode Toggle */}
                    <div className="pt-2">
                      <label className="text-xs font-extrabold text-[#001E2B] block mb-2">
                        Pola Kerja Mingguan
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "wfo", label: "Full WFO (5 Hari)" },
                          { id: "hybrid", label: "Hybrid (2–3 Hari WFO)" },
                          { id: "remote", label: "Full Remote / WFH" },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setWorkMode(mode.id as any)}
                            className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                              workMode === mode.id
                                ? "bg-[#001E2B] text-[#00ED64] border-[#001E2B] shadow-xs"
                                : "bg-white text-[#5C6C7A] border-[#CBD5E1] hover:bg-[#F4F7F6]"
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#00684A] hover:bg-[#00523A] text-white font-extrabold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md"
                      >
                        <Check size={16} />
                        <span>Simpan Perubahan</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════
                TAB 2: KUOTA & TAGIHAN
               ═══════════════════════════════════════════════════════════════════ */}
            {activeTab === "billing" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Quota Meter Card */}
                <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5EA] shadow-xs space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#7C8C9A] block mb-1">
                        Kapasitas Evaluasi
                      </span>
                      <h2 className="text-xl font-black text-[#001E2B] tracking-tight">
                        Kuota Lokasi & Status Paket
                      </h2>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isPremium
                          ? "bg-[#00ED64]/15 border-[#00ED64]/40 text-[#00684A]"
                          : "bg-slate-100 border-slate-300 text-[#334155]"
                      }`}
                    >
                      {isPremium ? "Premium Pass Aktif" : "Free Trial"}
                    </span>
                  </div>

                  {/* Meter Visual */}
                  <div className="p-5 bg-[#F9FBFA] rounded-[22px] border border-[#E5E5EA] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#001E2B]">
                        {usedQuota} dari {totalQuota} Kuota Lokasi Terpakai
                      </span>
                      <span className="text-xs font-black text-[#00684A] font-mono">
                        {remainingQuota} Slot Tersisa
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00684A] to-[#00ED64] transition-all duration-500 rounded-full"
                        style={{ width: `${quotaPercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#5C6C7A] leading-relaxed">
                      💡 <strong>Kebijakan Kuota Rumper:</strong> Menghapus properti tidak mengembalikan kuota. Seluruh {propertiesList.length} properti yang telah kamu investigasi tersimpan seumur hidup di Arsip Properti.
                    </p>
                  </div>

                  {/* Upgrade / Top-Up Action Box */}
                  <div className="p-5 bg-gradient-to-r from-[#001E2B] to-[#0F2B38] rounded-[24px] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#00ED64] text-xs font-black">
                        <Sparkles size={14} />
                        <span>Butuh Tambahan Kuota?</span>
                      </div>
                      <p className="text-xs text-[#A8B3BC] max-w-md">
                        Beli <strong>3-Property Shortlist Bundle</strong> seharga Rp 120.000 untuk menambah +3 kuota sekaligus membuka matriks komparasi.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenUpgrade("bundle")}
                      className="min-h-[42px] px-5 py-2 rounded-full bg-[#00ED64] hover:bg-[#00b545] text-[#001E2B] font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shrink-0"
                    >
                      <Zap size={14} className="fill-current" />
                      <span>Beli Paket Kuota</span>
                    </button>
                  </div>
                </div>

                {/* Billing & Invoice History Table */}
                <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5EA] shadow-xs space-y-4">
                  <h3 className="text-base font-black text-[#001E2B] tracking-tight">
                    Riwayat Transaksi & Invoice
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E5E5EA] text-[#7C8C9A]">
                          <th className="py-2.5 font-bold">No. Invoice</th>
                          <th className="py-2.5 font-bold">Tanggal</th>
                          <th className="py-2.5 font-bold">Paket</th>
                          <th className="py-2.5 font-bold">Nominal</th>
                          <th className="py-2.5 font-bold">Status</th>
                          <th className="py-2.5 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9]">
                        {INVOICE_HISTORY.map((inv) => (
                          <tr key={inv.id} className="hover:bg-[#F9FBFA] transition-colors">
                            <td className="py-3 font-mono font-bold text-[#001E2B]">{inv.id}</td>
                            <td className="py-3 text-[#5C6C7A]">{inv.date}</td>
                            <td className="py-3 font-semibold text-[#001E2B]">{inv.planName}</td>
                            <td className="py-3 font-mono font-bold text-[#00684A]">{inv.amount}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#00684A] font-bold text-[10px] border border-emerald-200/50">
                                {inv.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                type="button"
                                onClick={() => alert(`Mengunduh invoice ${inv.id}...`)}
                                className="text-xs font-bold text-[#00684A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Download size={12} />
                                <span>Unduh</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════
                TAB 3: ARSIP PROPERTI (iOS Inset Grouped List)
               ═══════════════════════════════════════════════════════════════════ */}
            {activeTab === "archive" && (
              <div className="space-y-4 sm:space-y-5 animate-fadeIn">
                {/* Section Header */}
                <div className="px-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#001E2B] tracking-tight">
                      Arsip Properti Tersimpan
                    </h2>
                    <p className="text-xs text-[#5C6C7A] mt-0.5">
                      Seluruh hasil analisis, skor risiko BNPB, dan checklist lapangan tersimpan aman seumur hidup.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#7C8C9A] font-mono shrink-0">
                    {propertiesList.length} Properti
                  </span>
                </div>

                {/* Single Inset Grouped Container */}
                <div className="bg-white rounded-2xl md:rounded-[24px] border border-[#E5E5EA] shadow-xs divide-y divide-slate-100 overflow-hidden">
                  {propertiesList.map((prop) => {
                    const isActive = prop.id === activePropertyId

                    return (
                      <button
                        key={prop.id}
                        type="button"
                        onClick={() => {
                          onSelectProperty(prop.id)
                          onBack()
                        }}
                        className={`w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3.5 transition-all cursor-pointer select-none active:bg-slate-50/90 hover:bg-slate-50/50 group ${
                          isActive ? "bg-emerald-50/30" : "bg-white"
                        }`}
                      >
                        {/* Left: Score Avatar */}
                        <div
                          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 font-mono font-bold ${
                            prop.score >= 80
                              ? "bg-emerald-50 text-[#00684A] border border-emerald-200/60"
                              : prop.score >= 65
                                ? "bg-amber-50 text-amber-900 border border-amber-200/60"
                                : "bg-rose-50 text-rose-800 border border-rose-200/60"
                          }`}
                        >
                          <span className="text-sm font-black leading-none">{prop.score}</span>
                          <span className="text-[8px] font-sans font-semibold tracking-wider uppercase opacity-70 mt-0.5">
                            SKOR
                          </span>
                        </div>

                        {/* Middle: Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-[15px] font-bold text-[#001E2B] group-hover:text-[#00684A] transition-colors truncate">
                              {prop.name}
                            </span>

                            {/* Status Pill */}
                            <span
                              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                                prop.status === "LANJUTKAN"
                                  ? "bg-emerald-50 text-[#00684A] border-emerald-200/70"
                                  : "bg-amber-50 text-amber-800 border-amber-200/70"
                              }`}
                            >
                              {prop.status}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#00684A] bg-[#00ED64]/15 px-2 py-0.5 rounded-full border border-[#00ED64]/40">
                                <span className="size-1.5 rounded-full bg-[#00684A] animate-pulse" />
                                Aktif di Workspace
                              </span>
                            )}
                          </div>

                          {/* Location Line */}
                          <p className="text-xs text-[#5C6C7A] mt-1 flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-[#00684A] shrink-0" />
                            <span className="truncate">{prop.subdistrict}, {prop.city}</span>
                          </p>
                        </div>

                        {/* Right: iOS Chevron / Action Indicator */}
                        <div className="flex items-center gap-2 shrink-0 text-[#7C8C9A]">
                          {isActive ? (
                            <span className="text-xs font-bold text-[#00684A] hidden sm:inline">
                              Sedang Dibuka
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-[#7C8C9A] hidden sm:inline group-hover:text-[#001E2B]">
                              Buka
                            </span>
                          )}
                          <ChevronRight
                            size={16}
                            className="text-[#CBD5E1] group-hover:text-[#00684A] group-hover:translate-x-0.5 transition-all"
                          />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════
                TAB 4: EKSPOR & BERBAGI
               ═══════════════════════════════════════════════════════════════════ */}
            {activeTab === "share" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Family Share Link Box */}
                <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5EA] shadow-xs space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                        Sinkronisasi Pasangan & Keluarga
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-[#001E2B] tracking-tight">
                      Bagikan Akses View-Only
                    </h2>
                    <p className="text-xs text-[#5C6C7A] mt-1 leading-relaxed">
                      Keluarga atau pasangan dapat melihat skor risiko, peta banjir interaktif, dan progres checklist secara live tanpa mengubah data akunmu.
                    </p>
                  </div>

                  {/* Tokenized URL Copy Card */}
                  <div className="p-4 bg-[#F8FAFC] rounded-[22px] border border-[#E5E5EA] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C8C9A] block">
                      Tautan Akses Aman (Tokenized URL)
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#001E2B] truncate">
                        https://{shareToken}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyShareLink}
                        className="min-h-[38px] px-4 py-1.5 rounded-full bg-[#00684A] hover:bg-[#00523A] text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs shrink-0"
                      >
                        {shareCopied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{shareCopied ? "Tersalin!" : "Salin Tautan"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Permission Toggles */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-[#001E2B] block">
                      Izin Tampilan untuk Penerima Tautan:
                    </span>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E5E5EA] cursor-pointer hover:bg-[#F9FBFA]">
                      <div className="text-xs">
                        <span className="font-bold text-[#001E2B] block">Tampilkan Hasil Analisis Risiko & Peta Banjir</span>
                        <span className="text-[#5C6C7A]">Penerima dapat memeriksa layer genangan dan jarak komuter</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowSpouseHazards}
                        onChange={(e) => setAllowSpouseHazards(e.target.checked)}
                        className="size-4 text-[#00684A] rounded focus:ring-[#00684A]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E5E5EA] cursor-pointer hover:bg-[#F9FBFA]">
                      <div className="text-xs">
                        <span className="font-bold text-[#001E2B] block">Tampilkan Progres Checklist Lapangan</span>
                        <span className="text-[#5C6C7A]">Penerima dapat melihat 12 poin verifikasi fisik yang telah dicentang</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowSpouseChecklist}
                        onChange={(e) => setAllowSpouseChecklist(e.target.checked)}
                        className="size-4 text-[#00684A] rounded focus:ring-[#00684A]"
                      />
                    </label>
                  </div>
                </div>

                {/* PDF Due Diligence Export Box */}
                <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5EA] shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#001E2B] tracking-tight">
                        Ekspor Laporan Ringkasan Due Diligence (PDF)
                      </h3>
                      <p className="text-xs text-[#5C6C7A] mt-0.5">
                        Dokumen resmi 3 halaman berisi ringkasan skor, matriks bahaya BNPB, dan lembar verifikasi survei.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#00684A] flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                  </div>

                  {pdfSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-[#00684A] animate-fadeIn">
                      <Check size={16} />
                      <span>Laporan PDF berhasil digenerate & siap diunduh!</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={isExportingPdf}
                      onClick={() => {
                        if (onOpenPdfPreview) {
                          onOpenPdfPreview()
                        } else {
                          handleExportPdf()
                        }
                      }}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#001E2B] hover:bg-[#061E28] text-white font-extrabold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md border border-white/10"
                    >
                      <Download size={16} className="text-[#00ED64]" />
                      <span>{isExportingPdf ? "Membuat PDF..." : "Lihat & Unduh Laporan PDF (3 Halaman)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
