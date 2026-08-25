# PRD-05A: Tahap 02 — Faktor Risiko & Evidensi

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-05A-tahap-02-faktor-risiko.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05A-tahap-02-faktor-risiko.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Owning Workstreams** | `Product_Management`, `Risk_Engine`, `Frontend_Engineering` |

---

## 1. Summary & Purpose

**Tahap 02: Faktor Risiko & Evidensi** (`DeepDiveEvidenceWorkspace.tsx`) is the deep-dive spatial risk investigation stage. It enables homebuyers to review evidence records, identify unverified data gaps, and cross-reference public government hazard layers (BNPB, BPBD Kota Bekasi) with confidence ratings (`Data sedang`, `Data kuat`, `Perlu validasi`).

---

## 2. Component Layout & Visual Specifications

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ [🏷 TAHAP 02]                                                            │
 │ Faktor Risiko & Evidensi                                                │
 │ Tinjau bukti & kesenjangan data per kategori risiko...                  │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ [ Category Selector Tabs ]                                              │
 │ [Banjir 42/100 (2)]  [Perjalanan 58/100 (1)]  [Akses 67/100]  [Lingk...]│
 ├─────────────────────────────────────────────────────────────────────────┤
 │ Banjir [RISIKO UTAMA]                                                   │
 │                                                                         │
 │ 📄 Bukti terdaftar (2)                                                  │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [📄] Zona bahaya banjir BNPB  [Data sedang]             [✓ Ditinjau]│ │
 │ │ Lokasi berada dalam zona bahaya banjir sedang–tinggi...             │ │
 │ │ BNPB · 2024  •  Model hazard banjir                                 │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [📄] Riwayat banjir Februari 2024  [Data sedang]           [○ Tinjau]│ │
 │ │ Area sekitar tercatat mengalami genangan pada Februari 2024.        │ │
 │ │ BPBD Kota Bekasi · 2024  •  Laporan kejadian                        │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │                                                                         │
 │ ⚠ Catatan eviden gap (1)                                                │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ Elevasi jalan masuk & kondisi drainase lokal [Perlu validasi]       │ │
 │ │ Tidak ada data publik yang cukup untuk memastikan elevasi...        │ │
 │ │                                                        [+ Checklist]│ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. UI Elements & Functional Requirements

| FR-ID | Element | UI & Behavioral Specification | Priority |
|---|---|---|---|
| **FR-511** | Stage Header | Render `TAHAP 02` green pill with `Layers` icon + title `Faktor Risiko & Evidensi`. | Must Have |
| **FR-512** | Category Tabs | Render horizontal cards for each factor (`Banjir 42/100`, `Perjalanan 58/100`, `Akses fisik 67/100`, `Lingkungan`, `Fasilitas`). Active category has dark outline (`border-2 border-[#0F2B38]`). | Must Have |
| **FR-513** | Red Flag Tag | Display red pill badge `RISIKO UTAMA` (`bg-[#FCE8E6] text-[#C95746] font-bold text-xs`) next to critical hazard category. | Must Have |
| **FR-514** | Evidence Card | Display document icon, title, confidence badge (`Data sedang` in amber), description, and metadata footer (`BNPB · 2024`). | Must Have |
| **FR-515** | Review Toggle | Render review button toggling between `○ Tinjau` (default gray) and `✓ Ditinjau` (active green). | Must Have |
| **FR-516** | Evidence Gap | Render warning gap card with `Perlu validasi` badge and `+ Checklist` bright green button (`#00ED64`). | Must Have |
| **FR-517** | Gap Injection | Clicking `+ Checklist` appends item to Tahap 04 checklist and navigates to `Checklist` tab (600ms delay). | Must Have |

---

## 4. TypeScript Contracts

```typescript
export interface EvidenceItem {
  id: string
  title: string
  confidence: 'Data kuat' | 'Data sedang' | 'Perlu validasi'
  description: string
  source: string
  year: number
  categoryType: string
  isReviewed: boolean
}

export interface EvidenceGapItem {
  id: string
  title: string
  confidence: 'Perlu validasi'
  description: string
  checklistCategory: 'drainage' | 'structure' | 'access' | 'legal'
  isAddedToChecklist: boolean
}
```

---

## 5. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Toggling Evidence Review State
- **Given** user is viewing evidence item `"Riwayat banjir Februari 2024"`
- **When** user clicks `"○ Tinjau"`
- **Then** button state morphs to `"✓ Ditinjau"` (`border-[#318266] text-[#318266] bg-[#DCEEE7]/40`).

### Scenario 2: Adding Evidence Gap to Checklist
- **Given** user sees evidence gap `"Elevasi jalan masuk & kondisi drainase lokal"`
- **When** user clicks `"+ Checklist"`
- **Then** item is added to Tahap 04 and view auto-navigates to `ChecklistWorkspace`.
