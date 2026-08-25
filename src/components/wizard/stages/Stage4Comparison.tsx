import React from 'react'
import { Compass } from 'lucide-react'
import ScenarioView, { type ScenarioData } from './ScenarioView'
import { useWizardState, type ScenarioChoice } from '../../../store/useWizardStore'

const SCENARIO_3_DATA: ScenarioData = {
  id: 'established-vs-quiet',
  stepNumber: 3,
  totalScenarios: 3,
  weatherTag: 'Sabtu, 19:00 • Suasana Malam',
  weatherIcon: Compass,
  title: 'Lingkungan Established Hidup vs Cluster Baru Hening',
  narrative:
    'Malam akhir pekan tiba. Anda ingin membeli obat anak, kebutuhan dapur mendadak, atau menikmati kuliner santai tanpa harus menyalakan mobil dan menembus jalan arteri yang padat.',
  whyItMatters:
    'Kawasan yang sudah matang memiliki fasilitas kebutuhan harian yang dapat dijangkau jalan kaki, sementara cluster baru di kantung pedalaman butuh bertahun-tahun untuk fasilitas sekitarnya terbentuk.',
  optionA: {
    key: 'A',
    badgeLabel: 'PILIHAN A',
    title: 'Lingkungan Established Hidup',
    corridor: 'Kawasan Perumahan Matang (e.g. Bintaro Sektor / Depok Timur)',
    price: 'Rp 1.1 Miliar',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    imageTag: '🛒 Radius 500m Fasilitas Lengkap',
    metrics: [
      { label: 'FASILITAS SEKITAR', value: 'Sangat Lengkap', subValue: 'Radius 500m jalan kaki' },
      { label: 'SUASANA HUNIAN', value: 'Aktif & Hidup', subValue: 'Komunitas guyub' },
      { label: 'HARGA PENAWARAN', value: 'Rp 1.1 M', subValue: 'Kawasan established' },
      { label: 'AKSES JALAN', value: '2 Mobil Pas', subValue: 'Jalan perkampungan tertata' },
    ],
    akses: 'Row jalan 6m, warung sayur & minimarket 2 menit jalan kaki',
    fasilitas: 'Klinik 24 jam, sekolah, pasar tradisional radius 1 km',
    kompromiNyata: 'Lalu lintas lingkungan lebih ramai & suara aktivitas warga.',
  },
  optionB: {
    key: 'B',
    badgeLabel: 'PILIHAN B',
    title: 'Cluster Baru Hening Eksklusif',
    corridor: 'Kantung Hunian Tenang (e.g. Curug / Bojongsari Baru)',
    price: 'Rp 1.05 Miliar',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    imageTag: '🛡️ 1-Gate System · Row Jalan 8m',
    metrics: [
      { label: 'FASILITAS SEKITAR', value: 'Perlu Berkendara', subValue: '3–4 km ke pusat retail' },
      { label: 'SUASANA HUNIAN', value: 'Sangat Tenang', subValue: 'Privasi maksimal' },
      { label: 'HARGA PENAWARAN', value: 'Rp 1.05 M', subValue: 'Cluster baru rapi' },
      { label: 'AKSES JALAN', value: 'Row 8 Meter', subValue: 'Paving block mulus' },
    ],
    akses: 'One-gate system, keamanan 24 jam, jalan aspal mulus 8m',
    fasilitas: 'Toko kelontong & fasilitas komersial 3–4 km keluar gerbang',
    kompromiNyata: 'Ketergantungan penuh pada aplikasi ojek online & minimarket jauh.',
  },
  feedbackMap: {
    A: '✓ Prioritas Tercatat: Kemudahan Fasilitas Berjalan Kaki (Siap lingkungan lebih ramai).',
    B: '✓ Prioritas Tercatat: Privasi & Ketenangan Maksimal (Siap berkendara untuk kebutuhan).',
    neither: '✓ Preferensi: Menginginkan cluster privat dengan akses minimarket dekat.',
    reject: '⚠️ Toleransi Isolasi: Keras (Akan memfilter perumahan tanpa fasilitas terdekat).',
  },
}

export default function Stage4Comparison() {
  const { formData, setScenarioResponse, skipToParameterSetup } = useWizardState()
  const currentChoice = formData.scenarioResponses['established-vs-quiet']

  const handleSelect = (choice: ScenarioChoice) => {
    setScenarioResponse('established-vs-quiet', choice)
  }

  return (
    <ScenarioView
      data={SCENARIO_3_DATA}
      selectedChoice={currentChoice}
      selectedFriction={formData.selectedFriction}
      onSelectChoice={handleSelect}
      onSkip={skipToParameterSetup}
    />
  )
}
