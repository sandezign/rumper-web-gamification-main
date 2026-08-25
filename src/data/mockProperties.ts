export interface PropertyLocation {
  id: string
  name: string
  subdistrict: string
  city: string
  status: 'INVESTIGASI' | 'LANJUTKAN' | 'TUNDA'
  statusBadge: 'warning' | 'success' | 'danger'
  score: number
  riskSummary: string
  evidenceCount: number
  gapCount: number
  active?: boolean
}

export const initialProperties: PropertyLocation[] = [
  {
    id: 'prop-1',
    name: 'Grand Galaxy City Block R',
    subdistrict: 'Bekasi Selatan',
    city: 'Kota Bekasi',
    status: 'INVESTIGASI',
    statusBadge: 'warning',
    score: 68,
    riskSummary: 'Risiko banjir sedang & waktu tempuh komut 45 min',
    evidenceCount: 5,
    gapCount: 2,
    active: true,
  },
  {
    id: 'prop-2',
    name: 'Cluster Bumi Asri',
    subdistrict: 'Pamulang',
    city: 'Tangerang Selatan',
    status: 'LANJUTKAN',
    statusBadge: 'success',
    score: 82,
    riskSummary: 'Zona bebas banjir & akses tol 10 min',
    evidenceCount: 8,
    gapCount: 0,
    active: false,
  },
  {
    id: 'prop-3',
    name: 'Griya Kencana',
    subdistrict: 'Beji',
    city: 'Depok',
    status: 'INVESTIGASI',
    statusBadge: 'warning',
    score: 64,
    riskSummary: 'Perlu validasi drainase lingkungan',
    evidenceCount: 4,
    gapCount: 1,
    active: false,
  },
  {
    id: 'prop-4',
    name: 'Townhouse Ampera',
    subdistrict: 'Kemang',
    city: 'Jakarta Selatan',
    status: 'TUNDA',
    statusBadge: 'danger',
    score: 45,
    riskSummary: 'Elevasi tanah rendah & potensi genangan tinggi',
    evidenceCount: 3,
    gapCount: 3,
    active: false,
  },
]
