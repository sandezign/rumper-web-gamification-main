import React from 'react'
import { CloudRain } from 'lucide-react'
import ScenarioView, { type ScenarioData } from './ScenarioView'
import { useWizardState, type ScenarioChoice } from '../../../store/useWizardStore'

const SCENARIO_1_DATA: ScenarioData = {
  id: 'transit-vs-space',
  stepNumber: 1,
  totalScenarios: 3,
  weatherTag: 'Senin, 07:00 • Hujan Deras',
  weatherIcon: CloudRain,
  title: 'Transit Cepat vs Luas Tanah',
  narrative:
    'Hujan turun deras sejak subuh di awal pekan. Anda harus tiba di kantor tepat pukul 08:30 untuk rapat penting. Jalan raya utama mulai macet total, sementara jadwal keberangkatan KRL tetap beroperasi tepat waktu.',
  whyItMatters:
    'Data komuter menunjukkan waktu perjalanan >75 menit per hari adalah pemicu kelelahan fisik dan stres harian tertinggi bagi pekerja di Jabodetabek.',
  optionA: {
    key: 'A',
    badgeLabel: 'PILIHAN A',
    title: 'Rumah Kompak Dekat Stasiun KRL',
    corridor: 'Koridor Transit Oriented (e.g. Jurangmangu / Rawa Buntu)',
    price: 'Rp 950 Juta',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    imageTag: '📍 600m ke Stasiun · 7 Min Jalan Kaki',
    metrics: [
      { label: 'WAKTU KOMUTER', value: '30–40 Menit', subValue: 'KRL anti macet' },
      { label: 'LUAS TANAH/BANGUNAN', value: '50m² / 48m²', subValue: 'Kompak 2 Lantai' },
      { label: 'HARGA PENAWARAN', value: 'Rp 950 Jt', subValue: 'Cicilan ~Rp 6.8 Jt/bln' },
      { label: 'AKSES HARIAN', value: '600m ke Stasiun', subValue: 'Jalan kaki nyaman' },
    ],
    akses: 'Jalan lingkungan 6 meter, 600m jalan kaki ke stasiun',
    fasilitas: 'Minimarket, apotek, dan kedai kopi bisa jalan kaki',
    kompromiNyata: 'Ukuran kamar tidur kompak, tidak ada sisa tanah belakang.',
  },
  optionB: {
    key: 'B',
    badgeLabel: 'PILIHAN B',
    title: 'Rumah Lapang Sub-Urban',
    corridor: 'Koridor Hijau Luar (e.g. Parung Panjang / Sawangan Barat)',
    price: 'Rp 920 Juta',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    imageTag: '🏡 Kavling 90m² · 5.2 km ke Kota',
    metrics: [
      { label: 'WAKTU KOMUTER', value: '70–85 Menit', subValue: 'Jalan arteri padat' },
      { label: 'LUAS TANAH/BANGUNAN', value: '90m² / 60m²', subValue: 'Halaman belakang luas' },
      { label: 'HARGA PENAWARAN', value: 'Rp 920 Jt', subValue: 'Cicilan ~Rp 6.5 Jt/bln' },
      { label: 'AKSES HARIAN', value: '5.2 km ke Stasiun', subValue: 'Wajib kendaraan pribadi' },
    ],
    akses: 'Cluster satu gerbang asri, 5 km ke stasiun / pintu tol',
    fasilitas: 'Taman cluster lapang, pusat kuliner butuh 10 menit motor',
    kompromiNyata: 'Waktu perjalanan harian 2.5 – 3 jam pulang-pergi.',
  },
  feedbackMap: {
    A: '✓ Prioritas Tercatat: Efisiensi Waktu Komuter (Siap dengan ruang kompak).',
    B: '✓ Prioritas Tercatat: Luas Ruang & Kenyamanan Rumah (Siap komuter lebih panjang).',
    neither: '✓ Preferensi: Menyeimbangkan luas dan waktu tempuh moderat.',
    reject: '⚠️ Toleransi Komuter: Keras (Akan memfilter perumahan dengan akses komuter buruk).',
  },
}

export default function Stage2ValueProof() {
  const { formData, setScenarioResponse, skipToParameterSetup } = useWizardState()
  const currentChoice = formData.scenarioResponses['transit-vs-space']

  const handleSelect = (choice: ScenarioChoice) => {
    setScenarioResponse('transit-vs-space', choice)
  }

  return (
    <ScenarioView
      data={SCENARIO_1_DATA}
      selectedChoice={currentChoice}
      selectedFriction={formData.selectedFriction}
      onSelectChoice={handleSelect}
      onSkip={skipToParameterSetup}
    />
  )
}
