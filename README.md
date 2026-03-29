# GreenGrid

Interactive campus energy demo tool for the case presentation.

The live app currently runs from a single file, `index.html`. That file contains the page structure, styling, demo data, insights logic, and rendering code. This README explains how that code is organized, with extra focus on the insights layer.

## What GreenGrid Is

GreenGrid has two connected parts:

- `Insights`: identify where energy waste is concentrated, rank buildings, surface anomalies, and recommend the right intervention.
- `Automation`: show how GreenGrid would act on those insights through lab scheduling, HVAC control, heat reuse, and thermal storage.

The important design idea is that this is not just a dashboard. The insights layer decides where to act first, and the automation layer shows what GreenGrid does there.

## How To Run

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Run a local server

Recommended, especially because the hourly electricity cost chart tries to fetch live EIA demand data.

```bash
cd Convergence2026
python -m http.server 8080
```

Then open `http://127.0.0.1:8080/`.

## What Files Matter Right Now

Current runtime files:

- `index.html`
- `README.md`

Files that are currently not part of the live app:

- `buildings.json`
- `Optimization.py`
- `index (1).html`
- the PNG screenshots

Those can be treated as leftovers or placeholders unless we wire them back in later.

## High-Level Code Structure

Everything important is inside `index.html`.

The file is organized roughly like this:

1. HTML page sections
2. CSS styles
3. app data constants
4. helper functions
5. insights logic
6. lab automation / model logic
7. ROI logic
8. startup initialization

If you are navigating the file, search these names first:

- `BUILDINGS`
- `ANOMALIES`
- `LAB_EQUIPMENT_LIBRARY`
- `LAB_EQUIPMENT`
- `computeRisk`
- `getLabEquipmentSummary`
- `getInterventionPlan`
- `initHotspotPage`
- `renderHourlyCostWindow`
- `ROI_DATA`
- `ROI_PHASE_META`
- `initRoiPage`

## Page Structure

The current app has four pages:

- `Overview`
- `Hotspot Insights`
- `Lab Automation`
- `ROI Planner`

Navigation between them is handled by:

- `showPage(name, button)`
- `switchTab(group, name, tab)`

The startup path is at the bottom of the file in the `window.addEventListener('load', ...)` block.

## The Insights Layer

This is the most important part of the app.

### 1. Campus dataset

`BUILDINGS` is the main modeled campus dataset.

Each building stores:

- identity: `id`, `name`, `type`
- energy scale: `sqft`, `kwh`, `peak`
- building context: `age`, `meter`
- operational proxies: `hoods`, `co2`, `occ`
- map coordinates: `lat`, `lon`

That one dataset powers the map, hotspot ranking, tooltips, KPIs, and several downstream models.

### 2. Risk scoring

`computeRisk(building)` produces the hotspot score.

The score blends:

- annual energy intensity
- total annual kWh
- building age
- anomaly proxy from CO2
- smart meter penalty for unmetered buildings

`riskLabel(score)` then converts the numeric score into:

- `Critical`
- `High`
- `Medium`
- `Low`

This is the first insight question GreenGrid answers: "Which buildings deserve attention first?"

### 3. Research-lab equipment model

Labs use a deeper model than non-lab buildings.

`LAB_EQUIPMENT_LIBRARY` defines equipment types such as:

- autoclaves
- glasswashers
- process chillers
- freezer banks
- GPU racks
- battery cyclers
- climate chambers
- incubator racks

Each equipment type includes modeled assumptions like:

- kW draw
- operating hours per day
- shiftable share
- heat recovery share
- current hourly schedule profile
- optimized hourly schedule profile

`LAB_EQUIPMENT` assigns those equipment types to each research lab.

### 4. Equipment summary conversion

`getLabEquipmentSummary(building)` turns the equipment inventory for a lab into operational metrics:

- annual equipment kWh
- shiftable kWh
- recoverable heat in MMBtu
- hourly current load profile
- hourly optimized load profile
- current peak kW
- optimized peak kW
- peak shaved kW
- top flexibility drivers
- top heat drivers

This is the bridge between the raw equipment assumptions and the recommendations users see in the UI.

### 5. Recommendation engine

`getInterventionPlan(building)` is the core intervention-selection logic.

It chooses between:

- `HVAC`
- `Load Controller`
- `Heat Reuse`
- `Thermal Storage`

and can also return combinations such as:

- `HVAC + Load Controller`
- `Heat Reuse + Thermal Storage`

The recommendation logic uses different signals for different intervention types:

- high hood count / high CO2 pushes toward `HVAC`
- highly shiftable equipment pushes toward `Load Controller`
- strong recoverable process heat pushes toward `Heat Reuse`
- steady, process-heavy peaks push toward `Thermal Storage`

This is the real "insights" behavior of GreenGrid. The app is not only saying a building is inefficient; it is also saying what kind of action fits that building's operating pattern.

### 6. Insight outputs in the UI

The main insight rendering functions are:

- `initMap()`: draws the campus map and hover tooltips
- `initAnomalyFeed()`: fills the live insight feed
- `initOverviewCharts()`: renders the aggregate demand profile
- `initHotspotPage()`: sorts buildings by risk and renders the priority queue
- `renderHourlyCostWindow()`: fetches live US48 demand from EIA and converts it into an estimated hourly electricity cost window

The hourly cost chart uses live data when the EIA request works. If it does not, the app falls back to the baked-in demand snapshot inside `index.html`.

## The Automation / Model Layer

These sections show how GreenGrid acts once it knows where to intervene.

### Lab scheduling

`updateScheduler()` aggregates `getLabEquipmentSummary()` across all research labs and renders:

- current equipment schedule
- optimized off-peak schedule
- schedulable equipment by lab

So the scheduling visuals are tied directly to the same equipment assumptions used by the insight engine.

### Smart ventilation

`initFumeHood()` uses hood counts and modeled savings assumptions to show the ventilation opportunity in labs.

### Heat reuse

`initHeatReuse()` renders the routing concept for capturing lab waste heat and moving it into athletic or hot water demand.

### Thermal storage

`initThermal()` renders the charge/discharge story and avoided peak-cost logic for storage.

## ROI Planner Logic

The ROI page is driven by:

- `ROI_DATA`: the intervention portfolio
- `ROI_PHASE_META`: the explanation of each phase
- `initRoiPage()`: the page renderer

Each ROI entry stores:

- intervention name
- phase
- role in the plan
- why it belongs in that phase
- capex
- annual savings
- payback
- annual kWh addressed
- scope

`initRoiPage()` computes and renders:

- total capex
- steady-state annual savings
- phase 1 capex and savings
- cumulative savings vs deployed budget
- breakeven year
- phase snapshot bands
- the investment portfolio table
- the rollout roadmap

That page is meant to answer three questions clearly:

- Why this order?
- What happens each year?
- What value is unlocked before the next phase?

## Editing Guide

If you want to change the demo quickly, these are the best entry points:

- update campus assumptions in `BUILDINGS`
- update anomaly copy in `ANOMALIES`
- tune hotspot scoring in `computeRisk()`
- tune lab equipment assumptions in `LAB_EQUIPMENT_LIBRARY`
- tune lab-specific inventories in `LAB_EQUIPMENT`
- tune recommendation rules in `getInterventionPlan()`
- change finance assumptions in `ROI_DATA`
- change phase storytelling in `ROI_PHASE_META`

## Tech Notes

- pure HTML/CSS/JS
- Chart.js loaded from CDN
- Google Fonts loaded from CDN
- no build step
- no framework

That makes the app very easy to demo and fast to edit, but it also means `index.html` is doing a lot. If the project grows further, the next cleanup step should be splitting data, insights logic, and rendering into separate files.
