import React, { useState } from "react"
import {
  X,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  MapPin,
  Train,
  AlertTriangle,
  FileCheck,
  QrCode,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react"

interface PDFDueDiligencePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  propertyName?: string
  subdistrict?: string
  city?: string
  score?: number
}

export default function PDFDueDiligencePreviewModal({
  isOpen,
  onClose,
  propertyName = "Grand Galaxy City Block R",
  subdistrict = "Jaka Setia, Bekasi Selatan",
  city = "Kota Bekasi",
  score = 84,
}: PDFDueDiligencePreviewModalProps) {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(1)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const docId = "RMP-DUE-2026-0881"
  const issueDate = "30 Agustus 2026"

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2500)
    }, 1200)
  }

  const handlePrint = () => {
    window.print()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-3 sm:p-6 bg-[#001E2B]/75 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-800 rounded-[28px] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-scaleUp text-[#001E2B]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Preview Laporan Due Diligence PDF"
      >
        {/* ── Top Toolbar ────────────────────────────────────────────────────── */}
        <div className="px-5 py-3.5 bg-[#001E2B] text-white border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-[#00ED64]/15 border border-[#00ED64]/30 flex items-center justify-center text-[#00ED64]">
              <FileCheck size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white truncate max-w-[200px] sm:max-w-xs">
                  {propertyName}
                </span>
                <span className="text-[10px] font-mono text-[#00ED64] px-1.5 py-0.2 rounded bg-white/10">
                  {docId}
                </span>
              </div>
              <span className="text-[10px] text-[#A8B3BC] block">
                Dokumen Ringkasan Due Diligence (3 Halaman)
              </span>
            </div>
          </div>

          {/* Page Switcher & Download Actions */}
          <div className="flex items-center gap-2">
            {/* Page Navigator */}
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 text-xs font-bold text-white">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1) as any)}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 font-mono text-[11px]">
                {currentPage} / 3
              </span>
              <button
                type="button"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1) as any)}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex h-9 px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Printer size={14} />
              <span>Cetak</span>
            </button>

            {/* Download Button */}
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownload}
              className="h-9 px-4 rounded-full bg-[#00ED64] hover:bg-[#00b545] text-[#001E2B] text-xs font-black flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md"
            >
              <Download size={14} />
              <span>{isDownloading ? "Mengunduh..." : "Unduh PDF"}</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="size-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer ml-1"
              aria-label="Tutup preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Document Page Canvas (Scrollable Document Viewer) ─────────────── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-slate-900/60 custom-scrollbar">
          {/* Printable White Paper Sheet (A4 Aspect Ratio Standard) */}
          <div className="w-full max-w-[680px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-[#001E2B] min-h-[750px] flex flex-col justify-between animate-fadeIn">
            {/* ═════════════════════════════════════════════════════════════════
                PAGE 1: EXECUTIVE BRIEF & HEALTH SCORE
               ═════════════════════════════════════════════════════════════════ */}
            {currentPage === 1 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Official Header */}
                  <div className="flex items-start justify-between border-b-2 border-[#001E2B] pb-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xl text-[#001E2B] tracking-tight">RUMPER</span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#00ED64] text-[#001E2B]">
                          LOCATION REPORT
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#5C6C7A] block mt-0.5">
                        Independent Property Spatial Due Diligence
                      </span>
                    </div>

                    <div className="text-right text-[10px] font-mono text-[#5C6C7A]">
                      <div>Doc ID: <strong>{docId}</strong></div>
                      <div>Tanggal: {issueDate}</div>
                    </div>
                  </div>

                  {/* Property Metadata Card */}
                  <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#CBD5E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#00684A] block mb-0.5">
                        Target Lokasi Investigasi
                      </span>
                      <h2 className="text-lg font-black text-[#001E2B]">{propertyName}</h2>
                      <p className="text-xs text-[#5C6C7A] flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-[#00684A]" />
                        <span>{subdistrict}, {city}</span>
                      </p>
                    </div>

                    {/* Overall Score Badge */}
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                      <div className="size-12 rounded-xl bg-[#001E2B] text-[#00ED64] font-black text-lg font-mono flex items-center justify-center shrink-0">
                        {score}
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] font-bold uppercase text-[#7C8C9A] block">
                          Status Rekomendasi
                        </span>
                        <span className="text-xs font-black text-[#00684A] uppercase block">
                          LANJUTKAN INVESTIGASI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Findings Matrix */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#001E2B]">
                      1. Ringkasan Eksekutif & Faktor Kunci
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Positive Points */}
                      <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1.5">
                        <span className="text-[11px] font-black text-[#00684A] flex items-center gap-1">
                          <Check size={14} className="stroke-[3]" /> Keunggulan Lokasi
                        </span>
                        <ul className="text-[11px] text-[#004D36] space-y-1 list-disc list-inside">
                          <li>Elevasi tanah aman di 28m DPL</li>
                          <li>Bebas riwayat genangan historis 5 tahun</li>
                          <li>12 Menit ke Stasiun KRL Kranji</li>
                          <li>Akses Tol Becakayu & JORR &lt; 3.5 km</li>
                        </ul>
                      </div>

                      {/* Watch-Out Points */}
                      <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-1.5">
                        <span className="text-[11px] font-black text-amber-900 flex items-center gap-1">
                          <AlertTriangle size={14} /> Catatan Lapangan
                        </span>
                        <ul className="text-[11px] text-amber-900 space-y-1 list-disc list-inside">
                          <li>Jalan arteri padat pada jam 07:00–08:30 WIB</li>
                          <li>Perlu verifikasi saluran drainase mikro depan rumah</li>
                          <li>Pastikan status IMB sesuai fisik bangunan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 1 Footer */}
                <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between text-[9px] text-[#7C8C9A]">
                  <span>Halaman 1 dari 3 • Ringkasan Eksekutif</span>
                  <span>Rumper Location Intelligence Platform</span>
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                PAGE 2: SPATIAL RISK & COMMUTE MATRIX
               ═════════════════════════════════════════════════════════════════ */}
            {currentPage === 2 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Subheader */}
                  <div className="border-b border-[#001E2B] pb-2 mb-4 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#001E2B]">
                      2. Analisis Spasial BNPB & Timeline Aksesibilitas
                    </span>
                    <span className="text-[10px] font-mono text-[#5C6C7A]">{docId}</span>
                  </div>

                  {/* BNPB Flood Hazard Table */}
                  <div className="space-y-2 mb-5">
                    <h4 className="text-xs font-bold text-[#001E2B] flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#00684A]" />
                      <span>Data Risiko Banjir Spasial (BNPB InaRISK & BIG)</span>
                    </h4>
                    <table className="w-full text-left text-[11px] border border-[#CBD5E1] rounded-xl overflow-hidden">
                      <thead className="bg-[#F4F7F6] text-[#334155]">
                        <tr className="border-b border-[#CBD5E1]">
                          <th className="p-2 font-bold">Parameter Spasial</th>
                          <th className="p-2 font-bold">Hasil Pengukuran</th>
                          <th className="p-2 font-bold">Kategori Bahaya</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        <tr>
                          <td className="p-2 font-medium">Elevasi Permukaan Tanah</td>
                          <td className="p-2 font-mono font-bold">28 meter DPL</td>
                          <td className="p-2 text-[#00684A] font-bold">Sangat Rendah</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Jarak ke Sungai / Kali Primer</td>
                          <td className="p-2 font-mono font-bold">1.4 km (Kali Bekasi)</td>
                          <td className="p-2 text-[#00684A] font-bold">Aman (Di luar bantaran)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Riwayat Genangan 2020–2025</td>
                          <td className="p-2 font-mono font-bold">0 Kejadian Tercatat</td>
                          <td className="p-2 text-[#00684A] font-bold">Bebas Banjir</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Commute Timeline Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#001E2B] flex items-center gap-1.5">
                      <Train size={14} className="text-[#00684A]" />
                      <span>Estimasi Komuter ke Titik Kerja Utama (SCBD / Sudirman)</span>
                    </h4>
                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] space-y-2 text-[11px]">
                      <div className="flex justify-between items-center pb-1 border-b border-[#E2E8F0]">
                        <span className="font-semibold">🚆 KRL Commuter Line via Stasiun Kranji:</span>
                        <span className="font-mono font-bold text-[#00684A]">48 Menit</span>
                      </div>
                      <div className="flex justify-between items-center pb-1 border-b border-[#E2E8F0]">
                        <span className="font-semibold">🚗 Mobil via Tol Becakayu (Jam Sibuk 07:30):</span>
                        <span className="font-mono font-bold text-amber-700">55–65 Menit</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">🛵 Motor via Jalur Arteri Kalimalang:</span>
                        <span className="font-mono font-bold text-[#001E2B]">42 Menit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 2 Footer */}
                <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between text-[9px] text-[#7C8C9A]">
                  <span>Halaman 2 dari 3 • Risiko Spasial & Komuter</span>
                  <span>Rumper Location Intelligence Platform</span>
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                PAGE 3: 12-POINT FIELD SURVEY CHECKLIST
               ═════════════════════════════════════════════════════════════════ */}
            {currentPage === 3 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Subheader */}
                  <div className="border-b border-[#001E2B] pb-2 mb-4 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#001E2B]">
                      3. Lembar Verifikasi Survei Lapangan (12-Titik)
                    </span>
                    <span className="text-[10px] font-mono text-[#5C6C7A]">{docId}</span>
                  </div>

                  <p className="text-[10px] text-[#5C6C7A] mb-3">
                    Bawa lembar ini saat survei fisik lokasi. Beri tanda centang setelah diverifikasi bersama pemilik/developer.
                  </p>

                  {/* Checklist Table */}
                  <div className="space-y-1.5 text-[10px]">
                    {[
                      "Periksa sertifikat asli (SHM / HGB) bebas sengketa di BPN",
                      "Kesesuaian IMB / PBG dengan denah bangunan eksisting",
                      "Cek tanda bercak rembes air banjir pada tembok bawah",
                      "Pastikan lebar jalan depan rumah muat 2 mobil berpapasan",
                      "Periksa kondisi kelancaran got drainase lingkungan",
                      "Cek tekanan air tanah / PDAM pada jam sibuk",
                      "Periksa jarak tiang listrik & kabel sutet dari atap",
                      "Verifikasi keamanan lingkungan & portal 24 jam",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                      >
                        <div className="size-3.5 border-2 border-[#CBD5E1] rounded bg-white shrink-0" />
                        <span className="text-[#334155] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Official Surveyor Sign-Off Box */}
                  <div className="mt-5 p-3 rounded-xl border border-dashed border-[#CBD5E1] flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#00684A] block">
                        Verifikasi Spasial Digital
                      </span>
                      <div className="text-[10px] font-bold text-[#001E2B]">Senior GIS Land Surveyor Rumper</div>
                      <div className="text-[9px] text-[#5C6C7A]">Tercatat dalam Ledger Rumper ID: {docId}</div>
                    </div>
                    {/* QR Code Seal Stamp */}
                    <div className="p-1.5 bg-slate-900 rounded-lg text-[#00ED64]">
                      <QrCode size={36} />
                    </div>
                  </div>
                </div>

                {/* Page 3 Footer */}
                <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between text-[9px] text-[#7C8C9A]">
                  <span>Halaman 3 dari 3 • Lembar Checklist Lapangan</span>
                  <span>Rumper Certified Due Diligence</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
