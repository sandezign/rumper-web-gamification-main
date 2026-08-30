export interface PropertyLocation {
  id: string
  name: string
  subdistrict: string
  city: string
  status: "INVESTIGASI" | "LANJUTKAN" | "TUNDA"
  statusBadge: "warning" | "success" | "danger"
  score: number
  riskSummary: string
  evidenceCount: number
  gapCount: number
  active?: boolean
  latLng?: [number, number]
  elevationDpl?: string
  areaId?: string
  commuteMinutes?: number
  priceRange?: string
}

export const initialProperties: PropertyLocation[] = [
  {
    id: "prop-bintaro",
    name: "Kandidat Bintaro",
    subdistrict: "Pondok Aren",
    city: "Tangerang Selatan",
    status: "INVESTIGASI",
    statusBadge: "warning",
    score: 74,
    riskSummary: "Kompromi komut KRL ~38 min & elevasi 28 mdpl relatif aman banjir",
    evidenceCount: 6,
    gapCount: 1,
    active: true,
    latLng: [-6.275, 106.715],
    elevationDpl: "28 mdpl",
    commuteMinutes: 38,
    priceRange: "Rp 950 Jt – 2,8 M",
  },
  {
    id: "prop-1",
    name: "Grand Galaxy City Block R",
    subdistrict: "Bekasi Selatan",
    city: "Kota Bekasi",
    status: "INVESTIGASI",
    statusBadge: "warning",
    score: 68,
    riskSummary: "Risiko banjir sedang & waktu tempuh komut 45 min",
    evidenceCount: 5,
    gapCount: 2,
    active: false,
    latLng: [-6.266, 106.99],
    elevationDpl: "18 mdpl",
    commuteMinutes: 45,
    priceRange: "Rp 650 Jt – 1,6 M",
  },
]
