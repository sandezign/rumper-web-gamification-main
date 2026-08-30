// ── AI Location Assistant Knowledge Engine & Spatial Context Data ──────────

export type AssistantDomainCategory =
  | "overview"
  | "banjir"
  | "perjalanan"
  | "fasilitas"
  | "checklist"
  | "negosiasi"

export interface AssistantActionChip {
  id: string
  label: string
  icon: "map-pin" | "plus-checklist" | "switch-tab"
  actionType: "HIGHLIGHT_MAP" | "ADD_CHECKLIST" | "NAVIGATE_TAB"
  payload: {
    targetTab?: string
    mapLayerId?: string
    coordinates?: [number, number]
    checklistItem?: {
      title: string
      category: "banjir" | "perjalanan" | "akses" | "fasilitas" | "lingkungan"
      priority: "high" | "medium" | "low"
      tip: string
    }
  }
}

export interface AssistantMessage {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: string
  contextCategory?: AssistantDomainCategory
  actionChips?: AssistantActionChip[]
  isStreaming?: boolean
}

export interface AssistantContextPayload {
  propertyName: string
  subdistrict: string
  overallScore: number
  activeCategory: AssistantDomainCategory
  categoryScore?: number | null
  evidenceSummary?: string
  coordinates?: [number, number]
}

export interface DomainPromptConfig {
  category: AssistantDomainCategory
  title: string
  badgeColor: string
  instantSummary: (ctx: AssistantContextPayload) => string
  prompts: {
    label: string
    question: string
    response: (ctx: AssistantContextPayload) => {
      text: string
      actionChips: AssistantActionChip[]
    }
  }[]
}

// ── Domain Prompt Libraries & Grounded Spatial Responses ────────────────────

export const DOMAIN_PROMPT_LIBRARIES: Record<AssistantDomainCategory, DomainPromptConfig> = {
  overview: {
    category: "overview",
    title: "Ringkasan Lokasi",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    instantSummary: (ctx) =>
      `Properti ${ctx.propertyName} di ${ctx.subdistrict} memiliki skor kelayakan ${ctx.overallScore}/100. Poin paling krusial yang perlu kamu cermati adalah mitigasi risiko genangan air serta efisiensi waktu komut ke pusat kota.`,
    prompts: [
      {
        label: "Apa risiko utama lokasi ini?",
        question: "Apa risiko utama lokasi ini yang perlu saya perhatikan?",
        response: (ctx) => ({
          text: `Berdasarkan data spasial Rumper untuk ${ctx.propertyName}, **risiko utama adalah paparan genangan banjir (Skor: 42/100)** karena posisi blok berjarak ~100 m dari anak Kali Bekasi. Selain itu, waktu tempuh komut pagi ke koridor Sudirman/SCBD mencapai 45–55 menit pada jam puncak.`,
          actionChips: [
            {
              id: "act-ov-1",
              label: "Lihat Bukti Risiko Banjir",
              icon: "switch-tab",
              actionType: "NAVIGATE_TAB",
              payload: { targetTab: "faktor-risiko" },
            },
            {
              id: "act-ov-2",
              label: "Sorot Titik di Peta",
              icon: "map-pin",
              actionType: "HIGHLIGHT_MAP",
              payload: { mapLayerId: "flood-hazard-polygon", coordinates: ctx.coordinates },
            },
          ],
        }),
      },
      {
        label: "Bagaimana cara negosiasi harga?",
        question: "Bagaimana cara memanfaatkan data risiko ini untuk negosiasi harga?",
        response: (ctx) => ({
          text: `Kamu bisa menggunakan data riwayat genangan 30–60 cm (InaRISK 2024) sebagai alasan meminta **diskon 3–5%** atau menuntut klausul **garansi peninggian elevasi jalan / pemasangan pompa lingkungan** dalam Perjanjian Pengikatan Jual Beli (PPJB) sebelum membayar booking fee.`,
          actionChips: [
            {
              id: "act-ov-neg-1",
              label: "Tambah Poin ke Checklist Survei",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Minta klausul jaminan drainase/pompa developer di draft PPJB",
                  category: "lingkungan",
                  priority: "high",
                  tip: "Pastikan ada penalti jika developer tidak memenuhi komitmen elevasi kavling.",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Checklist apa yang wajib dicek?",
        question: "Checklist apa yang wajib saya bawa saat survei fisik?",
        response: () => ({
          text: `Ada 3 hal prioritas tinggi: (1) Cek elevasi jalan depan kavling terhadap bibir got, (2) Wawancara warga RT/RW tentang genangan Feb 2024, dan (3) Cek ketersediaan pintu air/pompa polder lingkungan.`,
          actionChips: [
            {
              id: "act-ov-chk-1",
              label: "Buka Checklist Lapangan",
              icon: "switch-tab",
              actionType: "NAVIGATE_TAB",
              payload: { targetTab: "checklist" },
            },
          ],
        }),
      },
    ],
  },

  banjir: {
    category: "banjir",
    title: "Risiko Banjir & Spasial",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    instantSummary: (ctx) =>
      `Kategori Banjir mendapatkan skor ${ctx.categoryScore ?? 42}/100 (Risiko Utama). Lokasi berada dalam radius paparan luapan anak Kali Bekasi dengan riwayat genangan 30–60 cm pada curah hujan ekstrem.`,
    prompts: [
      {
        label: "Berapa riwayat genangan air?",
        question: "Berapa tinggi riwayat genangan air di blok ini berdasarkan data?",
        response: (ctx) => ({
          text: `Berdasarkan peta InaRISK BNPB dan catatan historis warga 2020–2024, area sekitar ${ctx.propertyName} memiliki catatan genangan 30–60 cm di badan jalan saat Kali Bekasi meluap bersamaan dengan hujan lebat lokal >4 jam. Namun, elevasi rumah bertingkat atau kavling yang sudah ditinggikan relatif aman dari masuknya air ke dalam rumah.`,
          actionChips: [
            {
              id: "act-bj-map",
              label: "Sorot Zona Anak Kali Bekasi",
              icon: "map-pin",
              actionType: "HIGHLIGHT_MAP",
              payload: { mapLayerId: "flood-hazard-polygon", coordinates: ctx.coordinates },
            },
            {
              id: "act-bj-chk",
              label: "Tambah Verifikasi Pompa ke Checklist",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Verifikasi kapasitas pompa polder & operasional saat listrik padam",
                  category: "banjir",
                  priority: "high",
                  tip: "Tanyakan apakah pompa polder punya genset cadangan otomatis.",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Apa pertanyaan ke developer?",
        question: "Pertanyaan apa yang wajib saya tanyakan langsung ke developer perumahan?",
        response: () => ({
          text: `Tanyakan secara presisi: **“Berapa elevasi peil banjir lantai dasar bangunan terhadap permukaan jalan utama, dan apakah drainase mikro perumahan sudah tersambung langsung ke polder retensi tanpa backflow saat Kali Bekasi pasang?”**`,
          actionChips: [
            {
              id: "act-bj-dev-chk",
              label: "Simpan ke Checklist Survei",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Tanyakan peil lantai vs peil jalan utama ke sales developer",
                  category: "banjir",
                  priority: "high",
                  tip: "Minta gambar potongan melintang teknis / as-built drawing jika ada.",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Apakah ada rencana tanggul baru?",
        question: "Apakah pemerintah daerah memiliki proyek normalisasi atau tanggul di area ini?",
        response: () => ({
          text: `Balai Besar Wilayah Sungai Ciliwung Cisadane (BBWSCC) dan Pemkot Bekasi memiliki program perkuatan tanggul sheet pile di bantaran Kali Bekasi yang berjalan bertahap hingga 2025. Kamu perlu memvalidasi status penyelesaian segmen terdekat dengan lokasi properti saat wawancara warga lokal.`,
          actionChips: [
            {
              id: "act-bj-chk-rt",
              label: "Tambah Cek Tanggul ke Checklist",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Cek progres sheet pile tanggul BBWSCC segmen terdekat",
                  category: "banjir",
                  priority: "medium",
                  tip: "Tanyakan ke pengurus RT apakah tanggul di segmen ini sudah tuntas.",
                },
              },
            },
          ],
        }),
      },
    ],
  },

  perjalanan: {
    category: "perjalanan",
    title: "Komut & Aksesibilitas",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    instantSummary: (ctx) =>
      `Skor Perjalanan berada di level ${ctx.categoryScore ?? 58}/100. Pilihan moda paling efisien ke Jakarta Pusat adalah KRL via Stasiun Bekasi (45 mnt), sedangkan jalur mobil via Tol Becakayu/Japek rentan bottleneck di jam 07:00–08:30.`,
    prompts: [
      {
        label: "Apakah commute ke SCBD realistis?",
        question: "Apakah perjalanan harian (commute) dari sini ke area SCBD / Sudirman realistis?",
        response: () => ({
          text: `**Sangat realistis jika menggunakan KRL Commuter Line:** 15 mnt feeder/motor ke Stasiun Bekasi + 25 mnt KRL ke Manggarai/Sudirman + 5 mnt jalan kaki total ~45 menit. Jika menggunakan mobil pribadi lewat Tol Japek/Becakayu, siapkan buffer 65–80 menit saat jam sibuk hujan.`,
          actionChips: [
            {
              id: "act-com-1",
              label: "Bandingkan 4 Pilihan Rute",
              icon: "switch-tab",
              actionType: "NAVIGATE_TAB",
              payload: { targetTab: "perjalanan" },
            },
            {
              id: "act-com-chk",
              label: "Tambah Uji Coba Komut Jam Sibuk",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Lakukan uji coba berangkat jam 07:00 pagi ke stasiun/tol",
                  category: "perjalanan",
                  priority: "high",
                  tip: "Hitung waktu aktual antrean motor di simpang Pekayon / Galaxy.",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Bagaimana rute saat hujan lebat?",
        question: "Bagaimana keandalan akses jalan keluar perumahan saat hujan deras?",
        response: () => ({
          text: `Akses utama via Jl. Grand Galaxy Boulevard relatif aman karena jalan lebar dan drainase ganda. Namun hindari jalan tembus perkampungan arah Kali Pekayon saat hujan lebat karena genangan lokal sering memperlambat laju kendaraan roda dua.`,
          actionChips: [
            {
              id: "act-com-map",
              label: "Lihat Koridor Akses di Peta",
              icon: "map-pin",
              actionType: "HIGHLIGHT_MAP",
              payload: { mapLayerId: "commute-route-arteri" },
            },
          ],
        }),
      },
      {
        label: "Berapa estimasi biaya bulanan?",
        question: "Berapa estimasi biaya transportasi bulanan jika kombinasi KRL vs Mobil?",
        response: () => ({
          text: `Estimasi biaya bulanan: **KRL + Feeder**: ~Rp 450.000–600.000/bln (sangat hemat & minim stres macet). **Mobil Pribadi (Tol + Bensin + Parkir Sudirman)**: ~Rp 2.800.000–3.500.000/bln. Memilih KRL menghemat >Rp 2 jt per bulan yang bisa dialokasikan untuk tabungan KPR.`,
          actionChips: [],
        }),
      },
    ],
  },

  fasilitas: {
    category: "fasilitas",
    title: "Fasilitas & Kebutuhan Harian",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    instantSummary: (ctx) =>
      `Fasilitas sekitar ${ctx.propertyName} sangat lengkap: RS Hermina Galaxy (<1.5 km), 4 sekolah swasta & negeri terakreditasi A, serta pusat perbelanjaan Grand Galaxy Park yang dapat ditempuh dalam 5 menit.`,
    prompts: [
      {
        label: "Sekolah terbaik terdekat?",
        question: "Apa saja pilihan sekolah terakreditasi terbaik dalam radius 3 km?",
        response: () => ({
          text: `Dalam radius 3 km terdapat **SMA Negeri 8 Bekasi** (Akreditasi A), **Sekolah Unity Galaxy** (Kurikulum Nasional Plus), dan **Al-Azhar Grand Galaxy** (TK–SMP). Jalur antar-jemput anak sekolah di dalam kawasan perumahan ini tertata tanpa perlu menyeberang jalan raya besar.`,
          actionChips: [
            {
              id: "act-fas-map-sch",
              label: "Sorot Sekolah di Peta",
              icon: "map-pin",
              actionType: "HIGHLIGHT_MAP",
              payload: { mapLayerId: "poi-pendidikan" },
            },
          ],
        }),
      },
      {
        label: "Akses rumah sakit darurat?",
        question: "Seberapa cepat akses ke fasilitas IGD rumah sakit dalam kondisi darurat malam hari?",
        response: () => ({
          text: `Akses IGD darurat sangat prima: **RS Hermina Grand Galaxy** berjarak hanya 1.2 km (4 menit berkendara via Jl. Gardenia). Selain itu ada **RSUD Chasbullah Abdulmadjid** (4.5 km) untuk rujukan BPJS Kesehatan tipe B.`,
          actionChips: [
            {
              id: "act-fas-map-rs",
              label: "Sorot RS di Peta",
              icon: "map-pin",
              actionType: "HIGHLIGHT_MAP",
              payload: { mapLayerId: "poi-kesehatan" },
            },
          ],
        }),
      },
      {
        label: "Ketersediaan pasar & belanja harian?",
        question: "Apakah mudah mencari kebutuhan pangan harian dan supermarket segar?",
        response: () => ({
          text: `Sangat praktis: Terdapat Farmers Market di Grand Galaxy Park (700 m), Superindo Galaxy (1.1 km), serta Pasar Tradisional Pekayon (2.3 km) untuk belanja segar pagi hari dengan harga terjangkau.`,
          actionChips: [],
        }),
      },
    ],
  },

  checklist: {
    category: "checklist",
    title: "Panduan Survei Lapangan",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    instantSummary: () =>
      `Panduan survei lapangan Rumper membantu kamu memverifikasi klaim developer dengan fakta fisik di lapangan. Wawancara warga dan inspeksi saluran adalah 2 kunci utama agar tidak terjebak promosi brosur.`,
    prompts: [
      {
        label: "Pertanyaan wajib untuk RT/RW?",
        question: "Apa saja pertanyaan kunci yang wajib diajukan ke Ketua RT atau pengurus RW?",
        response: () => ({
          text: `Gunakan metode wawancara netral (The Mom Test): (1) *“Pak/Bu, saat hujan deras awal tahun 2024 lalu, genangan air di blok ini tingginya sampai mana dan berapa jam surutnya?”*, (2) *“Iuran pengelolaan lingkungan (IPL) per bulan berapa dan apakah mencakup pembersihan got rutin?”*, (3) *“Apakah pasokan air PAM sering mengecil di jam sibuk pagi?”*`,
          actionChips: [
            {
              id: "act-chk-add-rt",
              label: "Tambah Pertanyaan RT ke Checklist",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Wawancara RT/RW: Riwayat genangan 2024 & jadwal pembersihan got",
                  category: "lingkungan",
                  priority: "high",
                  tip: "Datangi saat sore santai atau akhir pekan agar pengurus punya waktu luang.",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Kapan waktu terbaik survei?",
        question: "Kapan hari dan jam paling ideal untuk melakukan survei lokasi fisik?",
        response: () => ({
          text: `Idealnya lakukan **2 kali survei**: (1) **Hari kerja pagi (07:00–08:30)** untuk merasakan kemacetan komut riil dan kebisingan, dan (2) **Akhir pekan setelah hujan deras** untuk mengecek aliran got, genangan di sudut jalan, dan aktivitas tetangga sekitar.`,
          actionChips: [],
        }),
      },
      {
        label: "Cara cek bau dan limbah?",
        question: "Bagaimana cara memastikan lingkungan bebas dari bau sampah atau polusi suara?",
        response: () => ({
          text: `Jalan kaki minimal 300 meter memutari blok kavling. Cek arah angin saat sore hari, pastikan tidak dekat TPS liar atau peternakan unggas warga. Perhatikan juga letak trafo tiang listrik dan BTS tower terdekat.`,
          actionChips: [
            {
              id: "act-chk-add-bau",
              label: "Tambah Cek TPS/Limbah ke Checklist",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Cek radius 300m bebas TPS liar, trafo dengung, dan saluran terbuka",
                  category: "lingkungan",
                  priority: "medium",
                  tip: "Lakukan inspeksi jalan kaki pada sore hari saat sirkulasi angin aktif.",
                },
              },
            },
          ],
        }),
      },
    ],
  },

  negosiasi: {
    category: "negosiasi",
    title: "Strategi Negosiasi & Jaminan",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    instantSummary: () =>
      `Gunakan data objektif spasial sebagai kartu truf negosiasi. Pengembang lebih terbuka memberikan potongan biaya BPHTB/diskon atau penambahan fasilitas saat pembeli menunjukkan data risiko yang terverifikasi.`,
    prompts: [
      {
        label: "Bagaimana minta diskon berbasis risiko?",
        question: "Bagaimana cara menyusun argumen diskon harga menggunakan data InaRISK?",
        response: () => ({
          text: `Katakan ke sales manager: *“Saya sangat berminat dengan unit ini, namun data spasial menunjukkan blok ini berdekatan dengan riwayat genangan anak Kali Bekasi. Kami perlu alokasi dana mandiri untuk peninggian carport dan pasang pompa otomatis ~Rp 35–50 juta. Bisakah kami mendapatkan potongan harga unit atau subsidi biaya akad/BPHTB senilai tersebut?”*`,
          actionChips: [
            {
              id: "act-neg-chk",
              label: "Tambah Poin Negosiasi ke Checklist",
              icon: "plus-checklist",
              actionType: "ADD_CHECKLIST",
              payload: {
                checklistItem: {
                  title: "Ajukan kompensasi peninggian carport / subsidi BPHTB ke developer",
                  category: "lingkungan",
                  priority: "high",
                  tip: "Sampaikan sebelum menyetor uang tanda jadi (booking fee).",
                },
              },
            },
          ],
        }),
      },
      {
        label: "Klausul apa yang wajib ada di PPJB?",
        question: "Klausul jaminan apa yang wajib diminta pembeli agar dicantumkan di PPJB?",
        response: () => ({
          text: `Minta klausul: (1) Jaminan perbaikan kebocoran dan rembesan struktur minimal 6 bulan pasca serah terima kunci (BAST), (2) Komitmen developer menyelesaikan drainase polder sebelum unit dihuni penuh, dan (3) Penegasan sertifikat tanah tidak sedang dalam sengketa atau diagunkan ke bank pengembang.`,
          actionChips: [],
        }),
      },
    ],
  },
}

// ── Smart Freeform Matcher for Arbitrary Queries ────────────────────────────

export function generateAssistantResponse(
  userQuery: string,
  ctx: AssistantContextPayload
): { text: string; actionChips: AssistantActionChip[] } {
  const queryLower = userQuery.toLowerCase()

  if (
    queryLower.includes("banjir") ||
    queryLower.includes("hujan") ||
    queryLower.includes("genangan") ||
    queryLower.includes("kali")
  ) {
    return DOMAIN_PROMPT_LIBRARIES.banjir.prompts[0].response(ctx)
  }

  if (
    queryLower.includes("komut") ||
    queryLower.includes("krl") ||
    queryLower.includes("macet") ||
    queryLower.includes("scbd") ||
    queryLower.includes("tol") ||
    queryLower.includes("rute")
  ) {
    return DOMAIN_PROMPT_LIBRARIES.perjalanan.prompts[0].response(ctx)
  }

  if (
    queryLower.includes("sekolah") ||
    queryLower.includes("rs") ||
    queryLower.includes("rumah sakit") ||
    queryLower.includes("fasilitas") ||
    queryLower.includes("pasar")
  ) {
    return DOMAIN_PROMPT_LIBRARIES.fasilitas.prompts[0].response(ctx)
  }

  if (
    queryLower.includes("warga") ||
    queryLower.includes("rt") ||
    queryLower.includes("survei") ||
    queryLower.includes("tanya")
  ) {
    return DOMAIN_PROMPT_LIBRARIES.checklist.prompts[0].response(ctx)
  }

  if (
    queryLower.includes("negosiasi") ||
    queryLower.includes("harga") ||
    queryLower.includes("diskon") ||
    queryLower.includes("ppjb") ||
    queryLower.includes("kpr")
  ) {
    return DOMAIN_PROMPT_LIBRARIES.negosiasi.prompts[0].response(ctx)
  }

  // Generic grounded fallback response
  return {
    text: `Untuk ${ctx.propertyName} di ${ctx.subdistrict} (Skor Keseluruhan: ${ctx.overallScore}/100), pertanyaanmu sangat relevan dengan due-diligence lokasi. Pastikan kamu memverifikasi riwayat genangan air langsung ke pengurus RT dan menguji rute komut pagi sebelum menandatangani komitmen pembelian.`,
    actionChips: [
      {
        id: "act-fallback-chk",
        label: "Tambah Catatan ke Checklist",
        icon: "plus-checklist",
        actionType: "ADD_CHECKLIST",
        payload: {
          checklistItem: {
            title: `Verifikasi: "${userQuery.slice(0, 45)}..."`,
            category: "lingkungan",
            priority: "medium",
            tip: "Cek langsung saat kunjungan survei fisik di lokasi.",
          },
        },
      },
      {
        id: "act-fallback-map",
        label: "Lihat Titik di Peta",
        icon: "map-pin",
        actionType: "HIGHLIGHT_MAP",
        payload: { coordinates: ctx.coordinates },
      },
    ],
  }
}
