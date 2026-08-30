import React from "react"
import { Sparkles } from "lucide-react"
import type { CuratedArea } from "../../data/mockCuratedAreas"
import CuratedAreaCard from "./CuratedAreaCard"

interface DaftarAksesibelViewProps {
  areas: CuratedArea[]
  onToggleBookmark: (id: string) => void
  onOpenDrawer: (area: CuratedArea) => void
  onEvaluateArea: (area: CuratedArea) => void
}

export default function DaftarAksesibelView({
  areas,
  onToggleBookmark,
  onOpenDrawer,
  onEvaluateArea,
}: DaftarAksesibelViewProps) {
  if (areas.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-[#E1E5E8] text-[#5C6C7A] space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#E9F5EF] text-[#00684A] flex items-center justify-center mx-auto border border-[#318266]/20">
          <Sparkles size={24} />
        </div>
        <h3 className="text-base font-extrabold text-[#001E2B]">
          Tidak Ada Area dalam Kategori Ini
        </h3>
        <p className="text-xs text-[#5C6C7A] max-w-md mx-auto">
          Pilih filter kategori kesesuaian lain di atas untuk meninjau opsi area
          Jabodetabek lainnya.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 animate-fadeIn pb-12">
      {areas.map((area) => (
        <CuratedAreaCard
          key={area.id}
          area={area}
          variant="grid"
          onToggleBookmark={onToggleBookmark}
          onOpenDrawer={onOpenDrawer}
          onOpenQuotaModal={onEvaluateArea}
        />
      ))}
    </div>
  )
}
