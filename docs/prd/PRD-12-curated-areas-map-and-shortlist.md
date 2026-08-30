# PRD-12: Peta Rekomendasi Wilayah & Sistem Shortlist Kompromi

## 1. Executive Summary & Problem Statement

### 1.1 Background & Context
Setelah menyelesaikan alur onboarding (identifikasi kendala, uji 3 skenario kompromi, dan pengisian parameter profil/budget), pengguna diarahkan ke sebuah **Hub Rekomendasi Spasial cerdas**: **"Peta Rekomendasi Wilayah"**. 

Sistem memetakan koridor wilayah berdasarkan **keselarasan kompromi hidup riil**, bukan sekadar filter harga atau skor numerik fiktif.

### 1.2 Core Problem
1. **Decision Overload:** Pembeli rumah pemula sering bingung membandingkan puluhan kecamatan di Jabodetabek yang memiliki trade-off saling bertolak belakang (harga murah vs macet parah, atau dekat stasiun vs tanah sempit).
2. **False Numerical Ranking:** Portal properti konvensional menggunakan algoritma "rating 4.8/5" yang tidak transparan dan mengaburkan kompromi nyata (misal: bebas banjir tapi biaya komuter 3 jam/hari).
3. **Missing Bridge & Quota Awareness:** Tidak ada jembatan visual antara profil pengguna dengan area geografis, dan tidak ada kejelasan kapan kuota analisis investigasi digunakan.

---

## 2. Product Principles & Taxonomy

### 2.1 Non-Ranking Location Fit Classification
Wilayah dikelompokkan ke dalam **3 Kategori Keselarasan Kualitatif**:

| Kategori | Label & Warna | Definisi & Kriteria | Contoh Koridor |
| :--- | :--- | :--- | :--- |
| **Category 1** | 🟢 **Strong Fit** | Memenuhi preferensi utama, proteksi dealbreaker (bebas genangan), & toleransi commute dalam batas aman. | Sawangan, Margonda, Pamulang, Cibubur, Bekasi Barat |
| **Category 2** | 🟡 **Interesting Trade-off** | Sangat kuat di 1–2 dimensi kunci (e.g. komuter KRL sangat cepat), namun memiliki 1 kompromi nyata terukur (e.g. harga/m² lebih tinggi, tanah lebih compact). | Bintaro & Pondok Aren, Serpong & BSD Fringe |
| **Category 3** | 🔴 **Opsi Alternatif (Challenge Assumptions)** | Opsi alternatif bernilai tinggi di luar asumsi awal pengguna (misal: sedikit melampaui batas jarak tapi memberikan tanah 2x lebih luas dengan akses tol langsung). | Cikarang Transit, Parung Panjang Ekspres |

---

## 3. End-to-End User Flow

```mermaid
flowchart TD
    A[Onboarding: Submit & Simpan Profil] --> B[Screen 1: Loading & Data Synthesis ~2.5s]
    B --> C[Screen 2: Hub Peta Rekomendasi Wilayah]
    
    C --> C1[View 2A: Mode Tampilan Peta - Split 1/3 Sidebar & 2/3 Map]
    C --> C2[View 2B: Mode Daftar Area Grid]
    C --> C3[View 2C: Mode Area Tersimpan / Shortlist]

    %% Re-calibration & Edit Flow
    C -->|Klik 'Ubah Prioritas' di Header| EditPref[Kembali ke Wizard Onboarding (Pre-filled Data)]
    C1 -->|Klik Pin Sudirman & Pilih 'Ganti Titik Kantor'| EditAnchor[Buka Wizard Step 2: Titik Aktivitas]
    EditPref -->|Simpan & Analisis Ulang| B
    EditAnchor -->|Simpan & Analisis Ulang| B
    EditPref -.->|Batal / Tutup X| C
    
    C1 --> D1[Klik Kartu Compact di Panel Kiri]
    D1 --> D2[Peta Kanan Fokus ke Pin + Rute Garis + Muncul Floating Detail Card]
    
    C2 --> D3[Klik Kartu Koridor Grid]
    C3 --> D4[Pilih Koridor Tersimpan]
    
    D2 --> E[Klik 'Lihat Detail'] --> S4[Screen 4: Drawer Analisis Lengkap Koridor]
    D2 --> F[Klik 'Evaluasi Rumah'] --> S3[Screen 3: Modal Konfirmasi Buka Kuota]
    C2 --> F
    C3 --> F
    
    C3 --> G[Pilih 2+ Area & Klik 'Bandingkan'] --> S5[Screen 5: Modal Matriks Perbandingan Area]
    
    S3 -->|Gunakan 1 Kuota| H[Screen 6: Workspace Location Report / App.tsx]
    S3 -->|Batal / Pilih Lain| C
```

---

## 4. Functional Specifications

### 4.1 Header & View Mode Switcher
* **Header Title:** `Peta Kurasi 8 Area Jabodetabek`
* **Subtitle:** `Dikelompokkan berdasarkan keselarasan kompromi hidup, bukan ranking skor numerik fiktif.`
* **View Switcher Controls:**
  1. 🗺️ **Peta Interaktif (Default):** Tampilan split-screen (1/3 sidebar kiri + 2/3 peta interaktif kanan).
  2. 📋 **Daftar Aksesibel:** Kartu area dalam format 2-column grid lengkap dengan perbandingan komparatif (Cocok vs Trade-off).
  3. 🔖 **Shortlist (Badge Counter):** Daftar area yang telah disimpan pengguna untuk dibandingkan secara berdampingan.

---

### 4.2 Kategori Kecocokan Filter Bar
* Terletak di panel kiri (di atas daftar kartu area).
* Berisi 3 pill filter interaktif dengan badge counter:
  * 🟢 `Strong Fit (N)`
  * 🟡 `Interesting Trade-off (N)`
  * 🔴 `Challenge Assumptions (N)`
* **Interaksi:** Mengklik pill kategori memfilter daftar kartu di panel kiri dan marker di peta kanan secara instan.

---

### 4.3 View 2A: Mode Peta Interaktif (Split 1/3 Sidebar & 2/3 Map Panel)

Layout mengadopsi pola *Delivery Tracking Web UI* (Split 1/3 kiri dan 2/3 kanan):

```
+───────────────────────────────────────────────────────────────────────────────────────────────────+
|  HEADER: Peta Kurasi 8 Area Jabodetabek                   [🗺️ Peta]  [📋 Daftar]  [🔖 Shortlist (3)]|
+────────────────────────────────────────┬──────────────────────────────────────────────────────────+
|  PANEL KIRI (1/3 Width - Scrollable)   |  PANEL PETA KANAN (2/3 Width - Interactive Canvas)       |
|                                        |                                                          |
|  [🟢 Strong Fit (6)] [🟡 Trade-off (2)]|  [ 🔍 Cari koridor atau stasiun... ]                     |
|                                        |                                                          |
|  DAFTAR 8 AREA (FLAT COMPACT LIST):    |            [📍 Sudirman (Pusat Gravitasi)]               |
|                                        |                     \ (Garis Rute Transit KRL)           |
|  +──────────────────────────────────+  |                      \                                   |
|  | 🟡 Bintaro & Pondok Aren     [🔖]|  |          +─────────────────────────────────────────+      |
|  | Tangsel • ~38 mnt • 950-2800 Jt  |  |          | 🟡 Kompromi Menarik   Tangsel      [🔖] |      |
|  | [ACTIVE SELECTION BORDER]        |  |          | Bintaro & Pondok Aren                   |      |
|  +──────────────────────────────────+  |          | ⏱️ ~38 Menit   ⛰️ 28m dpl  💰 950-2800 Jt|      |
|                                        |          | 🟢 Cocok: Akses KRL langsung Sudirman   |      |
|  +──────────────────────────────────+  |          | 🟡 Trade-off: Tanah 20-30% lebih compact|      |
|  | 🟡 Serpong & BSD Fringe      [🔖]|  |          | [Buka Detail Area]  [ 🚀 Evaluasi Rumah]|      |
|  | Kab. Tangerang • ~48 mnt • 800 Jt|  |          +─────────────────────────────────────────+      |
|  +──────────────────────────────────+  |                                                          |
|                                        |                                  [📍 Bekasi (~50m)]      |
|  +──────────────────────────────────+  |                                                          |
|  | 🟢 Sawangan & Bojongsari     [🔖]|  |               [📍 Depok (~42m)]                          |
|  | Depok • ~55 mnt • 600-1650 Jt    |  |                                                          |
|  +──────────────────────────────────+  |  [ + ]                                                   |
|                                        |  [ - ] Zoom Controls                [ 📍 Reset Map View] |
+────────────────────────────────────────┴──────────────────────────────────────────────────────────+
```

#### A. Spesifikasi Panel Kiri (1/3 Width)
1. **Daftar Tunggal (Flat List):** Menampilkan 8 kartu area ringkas (*compact cards*) yang diurutkan berdasarkan keselarasan kompromi.
2. **Struktur Kartu Ringkas (Compact Area Card):**
   * Badge Kategori Kualitatif (`🟢 Strong Fit` / `🟡 Trade-off`).
   * Nama Koridor & Wilayah (e.g. `Bintaro & Pondok Aren`, `Tangerang Selatan`).
   * Quick Metrics Row: Waktu Commute (`~38 mnt`), Rentang Harga (`950–2800 Jt`), Elevasi (`28m dpl`).
   * Tombol Bookmark cepat (`🔖`).
3. **State Kartu Aktif:** Kartu yang dipilih mendapatkan aksen border tegas (`#00ED64` atau `#001E2B`) dan background highlight halus. Kartu tetap ringkas (*compact*), tidak membesar di sidebar.

#### B. Spesifikasi Panel Peta Kanan (2/3 Width)
1. **Peta Interaktif Penuh (Canvas):** Render peta wilayah Jabodetabek dengan kontrol zoom (+/-) dan recenter.
2. **Anchor Titik Gravitasi Kerja:** Menampilkan lokasi kerja pengguna (e.g. `Sudirman`) dengan efek visual lingkaran berdenyut (*pulsing halo*).
3. **Garis Rute Komuter (Polyline):** Menghubungkan koridor yang sedang aktif ke titik pusat gravitasi kerja untuk visualisasi jalur transit riil.
4. **Floating Area Detail Card (Pop-up di atas Peta):**
   * Muncul di dekat pin area yang aktif.
   * Menampilkan detail lengkap: metrik 3 dimensi, ringkasan naratif, callout *"🟢 Cocok"* dan *"🟡 Trade-off"*.
   * Dua tombol aksi:
     * `Buka Detail Area` (Secondary Button) -> Membuka Drawer Analisis Koridor.
     * `Evaluasi Rumah` (Primary Emerald `#00ED64` Button) -> Membuka Modal Konfirmasi Kuota.

#### C. Adaptasi Mobile (Layar Kecil)
* Peta penuh di latar belakang (*full-bleed map canvas*).
* **Draggable Bottom Sheet** di bagian bawah (pola Google Maps / Gojek):
  * Posisi *Half-Snap*: Menampilkan filter bar dan daftar kartu compact yang dapat di-scroll vertikal.
  * Posisi *Expanded Snap*: Menampilkan kartu detail lengkap saat salah satu area dipilih.

---

### 4.4 View 2B: Mode Daftar Aksesibel (Grid View)
* Tata letak grid 2 kolom (Desktop) atau 1 kolom (Mobile).
* **Struktur Kartu Area:**
  * **Kategori Pill:** `Kesesuaian Kuat (Strong Fit)` / `Kompromi Menarik (Interesting Trade-off)`.
  * **Judul & Wilayah:** `Sawangan & Bojongsari` • `Kota Depok / Tangsel Border`.
  * **3 Metric Boxes:**
    1. `COMMUTE`: ~55 mnt (KRL / Arteri)
    2. `HARGA`: 600–1650 Jt
    3. `KETINGGIAN / ELEVASI`: 62m dpl (Bebas banjir alami)
  * **Two Explicit Callout Boxes:**
    * 🟢 **Cocok:** Keunggulan spesifik sesuai profil pengguna (e.g. rasio luas tanah tertinggi per rupiah).
    * 🟡 **Trade-off:** Konsekuensi nyata yang harus diterima (e.g. waktu tempuh harian lebih panjang).
  * **Action Buttons:** `Buka Analisis Lengkap Area` & `Evaluasi Rumah`.

---

### 4.5 View 2C: Mode Daftar Area Pilihan (Shortlist)
* Menampung koridor yang telah dibookmark pengguna (maksimal 3–5 area).
* **Summary Banner:** Menampilkan rekapitulasi (e.g. `● 2 Strong Fit · ● 1 Kompromi Perlu Didiskusikan`).
* **Fitur & Aksi:**
  * `[ ] Bandingkan` (Checkbox untuk mode perbandingan *side-by-side*).
  * `🗑️ Hapus` dari shortlist.
  * `Elevasi Bebas Banjir` & `Kandidat Rumah Terdaftar`.
  * Status: `● N Checkpoints survei lapangan siap diuji`.
  * CTA: `+ Tambah / Evaluasi Rumah di Area Ini`.

---

### 4.6 Screen 3: Modal Konfirmasi Penggunaan Kuota (Unlock Area Modal)
* **Tujuan:** Memberikan transparansi penggunaan kuota sebelum membuka laporan investigasi 5 tahap di Workspace.
* **Struktur Modal:**
  * **Header:** Icon 🛡️ + Judul: *"Buka Laporan Investigasi Koridor Ini?"* + Badge: `Sisa Kuota: 3/3`.
  * **Kartu Ringkasan Area Terpilih:** Nama koridor, wilayah, kategori kecocokan, dan 3 metrik kunci.
  * **Daftar Nilai Laporan yang Akan Dibuka:**
    * ✓ *Analisis 5 Tahap Faktor Risiko Spasial & Elevasi*
    * ✓ *Simulasi Rute Komuter Jam Sibuk Pagi vs Sore*
    * ✓ *Checklist 12 Parameter Lapangan sebelum Survei*
    * ✓ *Verifikasi Data Lapangan Resmi (BIG, BNPB, Kemenhub)*
  * **Pengingat Kuota:** *"1 Kuota akan digunakan. Sisa 2 kuota tersisa untuk area lain."*
  * **Tombol Aksi:**
    * Secondary: `Pilih Area Lain` (Menutup modal, kembali ke peta).
    * Primary: `Buka Laporan Workspace (1 Kuota) →` (Mengurangi kuota & membuka `App.tsx`).

---

### 4.5 Spesifikasi Rekalibrasi Parameter Pencarian (Ubah Preferensi)

Memberikan kontrol penuh kepada pengguna untuk menyesuaikan kembali parameter pencarian (titik gravitasi kerja, batas anggaran KPR, tipe rumah tangga, atau simulasi skenario kompromi) langsung dari layar Peta Kurasi Wilayah tanpa kehilangan data sebelumnya.

1. **Titik Sentuh (Touchpoints) Masuk**:
   * **Header Action Button (`Ubah Prioritas`)**: Tombol secondary ghost pill pada header atas navigasi (`border-white/20`, icon `SlidersHorizontal`, teks *"Ubah Prioritas"*).
   * **Contextual Map Pin Action (`📍 Sudirman (Pusat Aktivitas)`)**: Interaksi klik pada marker pusat gravitasi kerja di kanvas peta membuka popover penjelasan dengan tombol *"Ganti Titik Kantor / Gravitasi"*, yang langsung mengarahkan pengguna ke *Langkah 3 · Profiling (Step 2: Titik Aktivitas Rutin)*.
2. **Prinsip & Guardrails Rekalibrasi**:
   * **Pre-filled State**: Semua data yang sebelumnya telah diisi (`formData` di `useWizardStore`) tetap tersimpan utuh saat wizard dibuka kembali, sehingga pengguna tidak perlu memulai dari awal.
   * **Non-Destructive & Safe Cancel**: Menekan tombol `X` (Tutup) di Wizard saat mode edit akan mengembalikan pengguna ke layar Peta Kurasi tanpa merusak state atau data yang sudah tersimpan.
   * **Bebas Biaya Kuota (Zero Quota Impact)**: Melakukan kalibrasi ulang preferensi dan memperbarui peta rekomendasi **tidak memotong kuota evaluasi properti**. Kuota hanya digunakan ketika pengguna secara eksplisit mengklik *"Evaluasi Rumah"* dan mengonfirmasi di Modal Buka Kuota.
   * **Transisi Sintesis Ulang**: Setelah pengguna menekan *"Simpan & Analisis Lokasi"*, sistem memutar animasi sintesis mikro (~2.5s) di `LocationDataLoadingScreen` sebelum menyajikan urutan dan kategori koridor yang telah diperbarui.

---

## 5. UI Screen Scope & Component Inventory

| No | Nama Screen / View / Modal | Tipe UI | Deskripsi & Komponen Utama | File Mapping Komponen |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Loading & Data Synthesis Screen** | *Full Screen State* | Animasi radar pulse, progress bar 0-100%, ticker sumber data (BIG, BNPB, Kemenhub, BPS). | `src/components/curated-areas/LocationDataLoadingScreen.tsx` |
| **2A** | **Peta Kurasi 8 Area (Mode Peta Interaktif)** | *Full Screen Hub (Split 1/3 + 2/3)* | Panel kiri 1/3 berisi compact card feed & category pills; Panel kanan 2/3 berisi peta interaktif, rute transit polyline, floating detail popup. | `src/components/curated-areas/CuratedAreasMapScreen.tsx` |
| **2B** | **Daftar Aksesibel Area (Mode Grid View)** | *Sub-View Switcher* | Grid 2 kolom kartu area, metrik 3 dimensi, box penjelas "Cocok" vs "Trade-off", bookmark toggle. | `src/components/curated-areas/DaftarAksesibelView.tsx` |
| **2C** | **Daftar Area Pilihan (Shortlist View)** | *Sub-View Switcher* | Rekapitulasi shortlist, kartu area tersimpan, checklist checkpoints survei, tombol bandingkan side-by-side. | `src/components/curated-areas/ShortlistAreasView.tsx` |
| **3** | **Modal Konfirmasi Buka Kuota Investigasi** | *Modal Dialog / Mobile Bottom Sheet* | Dialog konfirmasi konsumsi 1 kuota, preview koridor terpilih, daftar deliverable laporan, reminder sisa kuota. | `src/components/curated-areas/UnlockAreaQuotaModal.tsx` |
| **4** | **Drawer Analisis Lengkap Koridor** | *Slide-over Drawer / Modal* | Deep-dive spesifik koridor: grafik waktu tempuh per moda transportasi, rute KRL, histori banjir mikro, fasilitas esensial. | `src/components/curated-areas/AreaDetailDrawer.tsx` |
| **5** | **Matriks Perbandingan Area Shortlist** | *Comparison Modal / Full View* | Tabel perbandingan side-by-side 2–3 area pilihan (Commute vs Budget vs Elevasi vs Aksesibilitas). | `src/components/curated-areas/AreaComparisonModal.tsx` |
| **6** | **Workspace Location Report (Tujuan Akhir)** | *Main Workspace Dashboard* | Laporan 5 tahap lengkap di `App.tsx` dengan data terisi sesuai koridor yang dibuka. | `src/App.tsx` |

---

## 6. Data Schema & Model Specification

```typescript
export type FitCategory = 'strong-fit' | 'interesting-tradeoff' | 'challenge-assumptions'

export interface CuratedArea {
  id: string
  name: string
  region: string // e.g. 'Tangerang Selatan', 'Kota Depok', 'Bekasi'
  category: FitCategory
  categoryLabel: string // e.g. 'Kompromi Menarik (Interesting Trade-off)'
  commuteTime: string // e.g. '~38 Menit'
  commuteMinutes: number // 38
  priceRange: string // e.g. '950–2800 Jt'
  priceMin: number // 950
  priceMax: number // 2800
  elevationDpl: string // e.g. '28m dpl'
  isShortlisted?: boolean
  coordinates: {
    lat: number
    lng: number
  }
  routePolyline?: [number, number][]
  summaryNarrative: string
  cocokReason: string // 'Mengapa Selaras'
  tradeoffReason: string // 'Kompromi Kunci'
  registeredPropertiesCount: number
  checkpointsCount: number
  transitOptions: string[]
  essentialFacilitiesCount: {
    hospital: number
    school: number
    market: number
    stationKm: number
  }
}
```

---

## 7. Implementation Plan & Deliverables

1. **Step 1: Mock Data (`src/data/mockCuratedAreas.ts`)**
   - 8 Koridor Kurasi Jabodetabek lengkap dengan koordinat, metrik komuter, elevasi, trade-off, dan fasilitas.
2. **Step 2: Core Map Hub Split 1/3 + 2/3 (`src/components/curated-areas/`)**
   - `CuratedAreasMapScreen.tsx` (Split panel 1/3 sidebar kiri + 2/3 peta interaktif kanan dengan floating detail card)
   - `DaftarAksesibelView.tsx` (Grid View)
   - `ShortlistAreasView.tsx` (Shortlist View)
3. **Step 3: Modals & Drawer (`src/components/curated-areas/`)**
   - `UnlockAreaQuotaModal.tsx` (Modal Konfirmasi Kuota)
   - `AreaDetailDrawer.tsx` (Drawer Detail Area)
   - `AreaComparisonModal.tsx` (Matriks Perbandingan Side-by-side)
4. **Step 4: Loading Screen & Transition Wiring**
   - `LocationDataLoadingScreen.tsx`
   - Integrasi state di `App.tsx` & `useWizardStore.ts`
