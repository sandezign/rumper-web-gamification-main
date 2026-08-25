import React from 'react'
import { ShieldCheck } from 'lucide-react'
import ScenarioView, { type ScenarioData } from './ScenarioView'
import { useWizardState, type ScenarioChoice } from '../../../store/useWizardStore'

const SCENARIO_2_DATA: ScenarioData = {
  id: 'flood-vs-aesthetic',
  stepNumber: 2,
  totalScenarios: 3,
  weatherTag: 'Februari • Puncak Musim Hujan',
  weatherIcon: ShieldCheck,
  title: 'Keamanan Elevasi Banjir vs Desain Rumah Estetik',
  narrative:
    'Curah hujan ekstrem mengguyur Jabodetabek selama 3 hari berturut-turut. Beberapa titik cekungan jalan arteri tergenang 40cm, memutus akses pulang kerja bagi ratusan warga perumahan lembah.',
  whyItMatters:
    'Ketinggian elevasi dan drainase gravitasi alami tidak bisa diubah setelah rumah dibeli. Pompa buatan developer membutuhkan biaya IPL tinggi dan rentan mati daya.',
  optionA: {
    key: 'A',
    badgeLabel: 'PILIHAN A',
    title: 'Topografi Tinggi Alami',
    corridor: 'Kawasan Kontur Bukit (e.g. Cisauk Perbukitan / Depok Selatan)',
    price: 'Rp 980 Juta',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    imageTag: '⛰️ Elevasi +48m dpl · Drainase Gravitasi',
    metrics: [
      { label: 'RISIKO GENANGAN', value: 'Nol Riwayat', subValue: 'Elevasi 48m dpl' },
      { label: 'DRAINASE', value: 'Gravitasi Alami', subValue: 'Tanpa pompa buatan' },
      { label: 'DESAIN RUMAH', value: 'Standar Sederhana', subValue: 'Bisa direnovasi bertahap' },
      { label: 'AKSES HUJAN', value: '100% Lolos Mobil', subValue: 'Bebas genangan arteri' },
    ],
    akses: 'Elevasi 48m dpl, kontur tanah berbukit, jalan bebas genangan',
    fasilitas: 'Drainase gravitasi alami mengalir lancar ke lembah',
    kompromiNyata: 'Fasad standar developer, tanjakan/turunan jalan menuju rumah.',
  },
  optionB: {
    key: 'B',
    badgeLabel: 'PILIHAN B',
    title: 'Desain Tropis Mewah di Lembah Tertata',
    corridor: 'Kawasan Dataran Rendah Polder (e.g. Cluster Pinggir Sungai)',
    price: 'Rp 1.05 Miliar',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    imageTag: '✨ High Ceiling Estetik · Dataran Polder',
    metrics: [
      { label: 'RISIKO GENANGAN', value: 'Tergantung Pompa', subValue: 'Akses luar rawan genang' },
      { label: 'DRAINASE', value: 'Sistem Pompa Cluster', subValue: 'Iuran IPL lebih tinggi' },
      { label: 'DESAIN RUMAH', value: 'High Ceiling Mewah', subValue: 'Siap huni estetik' },
      { label: 'AKSES HUJAN', value: 'Terkadang Terjebak', subValue: 'Titik cekungan jalan luar' },
    ],
    akses: 'Tanggul polder & pompa internal developer dalam cluster',
    fasilitas: 'Clubhouse megah, kolam renang, finishing material premium',
    kompromiNyata: 'Jalan akses utama di luar gerbang cluster rawan tergenang saat hujan ekstrem.',
  },
  feedbackMap: {
    A: '✓ Prioritas Tercatat: Keamanan Topografi & Anti-Banjir (Siap desain fasad sederhana).',
    B: '✓ Prioritas Tercatat: Estetika Bangunan & Fasilitas Mewah (Siap risiko tanggul/akses).',
    neither: '✓ Preferensi: Menginginkan hunian elevasi aman dengan desain modern.',
    reject: '⚠️ Toleransi Banjir: Nol Mutlak (Akan memblokir seluruh zona cekungan air).',
  },
}

export default function Stage3EmpathyStatement() {
  const { formData, setScenarioResponse, skipToParameterSetup } = useWizardState()
  const currentChoice = formData.scenarioResponses['flood-vs-aesthetic']

  const handleSelect = (choice: ScenarioChoice) => {
    setScenarioResponse('flood-vs-aesthetic', choice)
  }

  return (
    <ScenarioView
      data={SCENARIO_2_DATA}
      selectedChoice={currentChoice}
      selectedFriction={formData.selectedFriction}
      onSelectChoice={handleSelect}
      onSkip={skipToParameterSetup}
    />
  )
}

