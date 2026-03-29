# MSU NeuralGrid — Campus Energy Intelligence Platform
## Prototype Dashboard

Built for the MSU Smart Campus Energy Case Study competition.

---

## 🚀 How to Run

### Option 1: Open Directly (Simplest)
Just double-click `index.html` in your file browser. It opens in any modern browser (Chrome, Firefox, Edge) with no server needed.

### Option 2: Local Dev Server (Recommended for sharing)
```bash
# If you have Python installed:
cd neuralgrid/
python3 -m http.server 8080
# Then open: http://localhost:8080

# If you have Node.js:
npx serve .
# Then open the URL it gives you
```

---

## 📁 Files

```
neuralgrid/
├── index.html          ← The entire app (single file, self-contained)
├── data/
│   ├── buildings.json  ← Synthetic MSU building dataset (23 buildings)
│   └── hourly_profiles.js ← Hourly load profiles by building type
└── README.md           ← This file
```

---

## 🧠 Models Implemented

### 1. Hotspot Detection Model
**Location:** Hotspot Model tab
**Formula:**
```
RiskScore = 0.4 × IntensityScore + 0.3 × kWhRank + 0.2 × AgeFactor + 0.1 × AnomalyFreq + MeterPenalty

where:
  IntensityScore = (kWh/sqft / 200) × 100 × TypeWeight
  TypeWeight     = Labs: 1.4 | Dorms: 0.6 | Academic: 0.5 | Athletic: 0.8
  AgeFactor      = min(1.0, age/50)
  MeterPenalty   = +15 if no smart meter installed
  AnomalyFreq    = based on CO₂ proxy (>900ppm → 80, >700ppm → 50, else 30)
```
**Output:** 0–100 risk score per building → Critical / High / Medium / Low

---

### 2. Off-Peak Lab Scheduling Model
**Location:** Labs → Off-Peak Scheduler tab
**Formula:**
```
Annual Savings = DeferrableKwh × PeakFraction × Rate × Discount

where:
  DeferrableKwh = TotalLabKwh × DeferPct (slider: 10–60%)
  PeakFraction  = 0.40 (40% of load occurs during peak hours)
  Rate          = $0.133/kWh
  Discount      = off-peak discount (slider: 20–60%)
```
**Sliders are interactive** — adjust deferral % and discount to see real-time savings.

---

### 3. Fume Hood VAV Model
**Location:** Labs → Fume Hood Model tab
**Formula:**
```
CurrentCost = Hoods × 1.2kW × 8760hrs × $0.133/kWh
VAV Savings = CurrentCost × 0.45 (45% reduction from sash sensors)
```

---

### 4. Thermal Storage Model
**Location:** Labs → Thermal Storage tab
**Logic:** Night charging at $0.075/kWh, daytime discharge replaces $0.133/kWh
```
Daily Savings = DischargeKwh × (0.133 - 0.075)
Annual        = DailySavings × 365 ≈ $447K/yr
```

---

### 5. Heat Reuse Routing Model
**Location:** Labs → Heat Reuse tab
**Formula:**
```
Usable Heat = EquipmentWasteHeat × ExchangerEfficiency (88%)
Savings = UsableHeat × GasPrice → pool/DHW offset = $305K/yr
```

---

### 6. Dorm Gamification Behavioral Model
**Location:** Dorm Leaderboard tab
**Efficiency Score:**
```
PerCapita = AnnualKwh / EstimatedResidents
Score     = 100 - (PerCapita / 800) × 100  (capped 0–100)
```
**Behavioral reduction curve:** Leaderboard + perks → 10–17% reduction modeled from literature.

---

### 7. ROI Prioritization Model
**Location:** ROI Planner tab
**Ranking criteria:**
- Payback period (primary)
- kWh saved per dollar (secondary)
- Phase alignment with 3-year implementation window

---

## 📊 Data Sources

All data is **synthetic but realistic**, calibrated to:
- MSU case study numbers (252.5M kWh total, $33.6M/yr, 120 buildings)
- Real PSU campus building proportions
- Industry benchmarks for research lab energy intensity (4–5× office)
- DOE lab average: fume hoods ~$1,500–2,500/yr unoptimized
- Typical HVAC setback savings: 15–25%
- CO₂ sensor hardware: $150–300/unit (industry prices)

---

## 🖥️ Pages

| Page | What It Shows |
|------|---------------|
| **Overview** | Campus KPIs, interactive hotspot map, anomaly feed, hourly load profiles |
| **Hotspot Model** | Risk scoring algorithm outputs, ranked buildings table, anomaly detection |
| **Lab Intelligence** | 4 tabs: scheduling optimizer, fume hood model, heat reuse flow, thermal storage |
| **Dorm Leaderboard** | Gamified rankings, efficiency scores, perks, behavioral reduction model |
| **ROI Planner** | Full 12-intervention financial table, cumulative savings vs spend, deployment timeline |

---

## 🎨 Tech Stack

- **Pure HTML/CSS/JS** — zero dependencies to install
- **Chart.js 4.4.1** (CDN) — all charts
- **Google Fonts** (CDN) — Syne + Space Mono typography
- No build step, no npm, no framework

---

## 💡 Presentation Tips

1. Start on **Overview** — show the live map and anomaly feed
2. Go to **Hotspot Model** — walk through the risk formula
3. Demo the **Lab Scheduler sliders** — interactive savings calculator
4. Show **Dorm Leaderboard** — most visually engaging for audience
5. Close on **ROI Planner** — the financial story / $12M budget allocation

The app works best fullscreen in Chrome or Firefox.
