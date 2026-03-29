// ══════════════════════════════════════════
// CHART DEFAULTS — light theme
// ══════════════════════════════════════════
const CD = {
  responsive:true,
  maintainAspectRatio:false,
  plugins:{
    legend:{labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:11}}},
    tooltip:{
      backgroundColor:'#ffffff',
      borderColor:'#d4e2cc',
      borderWidth:1.5,
      titleColor:'#2d3a2e',
      bodyColor:'#7a9278',
      titleFont:{family:"'DM Sans',sans-serif",weight:'600'},
      padding:10,
      cornerRadius:8,
      boxShadow:'0 4px 12px rgba(45,58,46,0.1)',
      callbacks:{
        title(items) {
          if (!items?.length) return '';
          return expandBuildingLabel(items[0].label);
        },
        label(context) {
          const datasetLabel = expandBuildingLabel(context.dataset.label || '');
          const formattedValue = context.formattedValue ?? '';
          return datasetLabel ? `${datasetLabel}: ${formattedValue}` : formattedValue;
        }
      }
    }
  },
  scales:{
    x:{ticks:{color:'#7a9278',font:{family:"'DM Mono',monospace",size:9}},grid:{color:'rgba(212,226,204,0.6)'}},
    y:{ticks:{color:'#7a9278',font:{family:"'DM Mono',monospace",size:9}},grid:{color:'rgba(212,226,204,0.6)'}}
  }
};

// ══════════════════════════════════════════
// DATA
// ══════════════════════════════════════════
const BUILDINGS = [
  {id:"RL01",name:"Biomedical Research Ctr",type:"Research Lab",sqft:42000,kwh:6100000,lat:40.7965,lon:-77.8625,age:12,meter:true,floors:5,hoods:48,co2:890,occ:0.72,peak:1850},
  {id:"RL02",name:"Chemistry & Materials Lab",type:"Research Lab",sqft:38000,kwh:5800000,lat:40.7952,lon:-77.8601,age:28,meter:true,floors:4,hoods:62,co2:1050,occ:0.68,peak:1720},
  {id:"RL03",name:"Physics & Nuclear Lab",type:"Research Lab",sqft:29000,kwh:5200000,lat:40.7978,lon:-77.8590,age:45,meter:false,floors:3,hoods:28,co2:780,occ:0.55,peak:1580},
  {id:"RL04",name:"Agricultural Biotech Lab",type:"Research Lab",sqft:35000,kwh:4900000,lat:40.7940,lon:-77.8645,age:18,meter:true,floors:3,hoods:35,co2:720,occ:0.61,peak:1420},
  {id:"RL05",name:"Environmental Science Lab",type:"Research Lab",sqft:22000,kwh:4300000,lat:40.7989,lon:-77.8612,age:33,meter:false,floors:3,hoods:22,co2:850,occ:0.58,peak:1280},
  {id:"RL06",name:"Computational Neuro Lab",type:"Research Lab",sqft:18000,kwh:3900000,lat:40.7933,lon:-77.8580,age:8,meter:true,floors:2,hoods:8,co2:620,occ:0.78,peak:1150},
  {id:"RL07",name:"Genomics Research Ctr",type:"Research Lab",sqft:31000,kwh:5500000,lat:40.7971,lon:-77.8630,age:5,meter:true,floors:4,hoods:42,co2:940,occ:0.82,peak:1650},
  {id:"RL08",name:"Mechanical Eng Lab",type:"Research Lab",sqft:27000,kwh:4600000,lat:40.7960,lon:-77.8570,age:22,meter:false,floors:3,hoods:18,co2:680,occ:0.64,peak:1380},
  {id:"RL09",name:"Food Science Lab",type:"Research Lab",sqft:19000,kwh:3700000,lat:40.7945,lon:-77.8655,age:15,meter:true,floors:2,hoods:24,co2:760,occ:0.59,peak:1100},
  {id:"RL10",name:"Electrical Systems Lab",type:"Research Lab",sqft:24000,kwh:4100000,lat:40.7956,lon:-77.8595,age:30,meter:false,floors:3,hoods:12,co2:710,occ:0.62,peak:1230},
  {id:"RH01",name:"East Residence Hall",type:"Residence Hall",sqft:85000,kwh:2100000,lat:40.8002,lon:-77.8560,age:35,meter:false,floors:8,hoods:0,co2:950,occ:0.88,peak:620},
  {id:"RH02",name:"West Towers",type:"Residence Hall",sqft:92000,kwh:2350000,lat:40.7998,lon:-77.8680,age:22,meter:true,floors:10,hoods:0,co2:1020,occ:0.91,peak:690},
  {id:"RH03",name:"North Campus Suites",type:"Residence Hall",sqft:78000,kwh:1950000,lat:40.8015,lon:-77.8610,age:8,meter:true,floors:7,hoods:0,co2:890,occ:0.86,peak:575},
  {id:"RH04",name:"South Village Hall",type:"Residence Hall",sqft:65000,kwh:1720000,lat:40.7925,lon:-77.8635,age:48,meter:false,floors:6,hoods:0,co2:1080,occ:0.84,peak:510},
  {id:"RH05",name:"Graduate Housing",type:"Residence Hall",sqft:55000,kwh:1580000,lat:40.7918,lon:-77.8590,age:15,meter:true,floors:5,hoods:0,co2:820,occ:0.79,peak:465},
  {id:"AB01",name:"Sparks Hall (Liberal Arts)",type:"Academic",sqft:62000,kwh:1450000,lat:40.7970,lon:-77.8615,age:55,meter:false,floors:5,hoods:0,co2:780,occ:0.68,peak:430},
  {id:"AB02",name:"Willard Bldg (Business)",type:"Academic",sqft:75000,kwh:1680000,lat:40.7962,lon:-77.8598,age:42,meter:true,floors:6,hoods:0,co2:850,occ:0.72,peak:498},
  {id:"AB03",name:"Hammond Bldg (Eng)",type:"Academic",sqft:88000,kwh:1920000,lat:40.7955,lon:-77.8582,age:38,meter:true,floors:7,hoods:0,co2:920,occ:0.75,peak:568},
  {id:"AB04",name:"Pattee Library",type:"Academic",sqft:120000,kwh:2100000,lat:40.7980,lon:-77.8627,age:60,meter:false,floors:8,hoods:0,co2:700,occ:0.55,peak:622},
  {id:"AB05",name:"Thomas Bldg (Science)",type:"Academic",sqft:54000,kwh:1320000,lat:40.7944,lon:-77.8643,age:52,meter:false,floors:4,hoods:0,co2:810,occ:0.65,peak:391},
  {id:"AF01",name:"Beaver Stadium Complex",type:"Athletic",sqft:350000,kwh:3800000,lat:40.8120,lon:-77.8560,age:20,meter:true,floors:4,hoods:0,co2:450,occ:0.15,peak:1120},
  {id:"AF02",name:"Rec Hall & Natatorium",type:"Athletic",sqft:180000,kwh:2900000,lat:40.7935,lon:-77.8570,age:35,meter:true,floors:3,hoods:0,co2:520,occ:0.42,peak:855},
  {id:"AF03",name:"Pegula Ice Arena",type:"Athletic",sqft:95000,kwh:2200000,lat:40.8005,lon:-77.8555,age:12,meter:false,floors:3,hoods:0,co2:480,occ:0.28,peak:648},
];
const BUILDING_NAME_BY_ID = Object.fromEntries(BUILDINGS.map(building => [building.id, building.name]));
const EIA_GRIDMONITOR_US48_URL = 'https://api.eia.gov/v2/electricity/rto/region-data/data/?api_key=3zjKYxV86AqtJWSRoAECir1wQFscVu6lxXnRVKG8&frequency=local-hourly&data[0]=value&facets[respondent][]=US48&facets[type][]=D&sort[0][column]=period&sort[0][direction]=desc&length=24';
const FALLBACK_US48_DEMAND = [
  {period:'2026-03-28T03-04', value:366355},
  {period:'2026-03-28T04-04', value:378294},
  {period:'2026-03-28T05-04', value:386368},
  {period:'2026-03-28T06-04', value:395713},
  {period:'2026-03-28T07-04', value:405499},
  {period:'2026-03-28T08-04', value:417313},
  {period:'2026-03-28T09-04', value:424359},
  {period:'2026-03-28T10-04', value:429169},
  {period:'2026-03-28T11-04', value:431465},
  {period:'2026-03-28T12-04', value:434534},
  {period:'2026-03-28T13-04', value:433889},
  {period:'2026-03-28T14-04', value:431485},
  {period:'2026-03-28T15-04', value:428202},
  {period:'2026-03-28T16-04', value:426531},
  {period:'2026-03-28T17-04', value:429344},
  {period:'2026-03-28T18-04', value:435712},
  {period:'2026-03-28T19-04', value:441638},
  {period:'2026-03-28T20-04', value:449230},
  {period:'2026-03-28T21-04', value:457218},
  {period:'2026-03-28T22-04', value:457377},
  {period:'2026-03-28T23-04', value:449157},
  {period:'2026-03-29T00-04', value:435463},
  {period:'2026-03-29T01-04', value:421015},
  {period:'2026-03-29T02-04', value:338281},
];

function normalizeHourlyProfile(values) {
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  return values.map(value => value / total);
}

const EQUIPMENT_SCHEDULES = {
  continuous: normalizeHourlyProfile([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
  continuousShaved: normalizeHourlyProfile([1.12,1.12,1.1,1.08,1.06,1.04,1,0.96,0.94,0.92,0.9,0.88,0.88,0.88,0.9,0.92,0.94,0.96,1,1.02,1.04,1.06,1.08,1.1]),
  dayFlat: normalizeHourlyProfile([0.02,0.02,0.02,0.02,0.02,0.03,0.05,0.08,0.12,0.16,0.18,0.19,0.19,0.19,0.18,0.17,0.16,0.14,0.1,0.06,0.04,0.03,0.02,0.02]),
  shoulderFlat: normalizeHourlyProfile([0.05,0.05,0.05,0.05,0.05,0.06,0.07,0.08,0.08,0.07,0.06,0.05,0.05,0.05,0.05,0.06,0.07,0.09,0.1,0.11,0.1,0.08,0.06,0.05]),
  dayPeak: normalizeHourlyProfile([0,0,0,0,0,0.01,0.03,0.07,0.11,0.15,0.18,0.2,0.2,0.2,0.18,0.17,0.15,0.13,0.1,0.07,0.03,0.01,0,0]),
  nightPeak: normalizeHourlyProfile([0.1,0.11,0.11,0.11,0.1,0.09,0.07,0.05,0.03,0.02,0.02,0.02,0.02,0.02,0.03,0.04,0.06,0.08,0.09,0.1,0.11,0.11,0.11,0.1]),
  middayBatch: normalizeHourlyProfile([0,0,0,0,0,0,0.01,0.02,0.04,0.08,0.12,0.16,0.18,0.16,0.12,0.07,0.03,0.01,0,0,0,0,0,0]),
  eveningBatch: normalizeHourlyProfile([0,0,0,0,0,0,0,0,0,0.01,0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.15,0.13,0.09,0.04,0.02,0,0]),
  nightBatch: normalizeHourlyProfile([0.1,0.12,0.12,0.11,0.1,0.09,0.07,0.05,0.03,0.02,0.02,0.01,0.01,0.01,0.01,0.02,0.03,0.04,0.05,0.07,0.08,0.09,0.1,0.1]),
};

const LAB_EQUIPMENT_LIBRARY = {
  autoclave: { label:'autoclaves', kw:14, hoursPerDay:4.5, shiftableShare:0.8, heatRecoveryShare:0.18, currentProfile:'middayBatch', optimizedProfile:'nightBatch' },
  glasswasher: { label:'glasswashers', kw:8, hoursPerDay:5, shiftableShare:0.72, heatRecoveryShare:0.16, currentProfile:'middayBatch', optimizedProfile:'eveningBatch' },
  vacuumPumpBank: { label:'vacuum pump banks', kw:7, hoursPerDay:10, shiftableShare:0.45, heatRecoveryShare:0.34, currentProfile:'dayFlat', optimizedProfile:'shoulderFlat' },
  processChiller: { label:'process chillers', kw:20, hoursPerDay:18, shiftableShare:0.12, heatRecoveryShare:0.78, currentProfile:'continuous', optimizedProfile:'continuousShaved' },
  freezerBank: { label:'freezer banks', kw:2.4, hoursPerDay:24, shiftableShare:0.06, heatRecoveryShare:0.28, currentProfile:'continuous', optimizedProfile:'continuousShaved' },
  growthChamber: { label:'growth chambers', kw:4.8, hoursPerDay:18, shiftableShare:0.18, heatRecoveryShare:0.42, currentProfile:'dayFlat', optimizedProfile:'shoulderFlat' },
  sequencingRack: { label:'sequencer racks', kw:9, hoursPerDay:12, shiftableShare:0.58, heatRecoveryShare:0.38, currentProfile:'dayPeak', optimizedProfile:'nightPeak' },
  gpuCluster: { label:'GPU compute racks', kw:16, hoursPerDay:14, shiftableShare:0.65, heatRecoveryShare:0.55, currentProfile:'dayPeak', optimizedProfile:'nightPeak' },
  dryingOven: { label:'drying ovens', kw:11, hoursPerDay:6, shiftableShare:0.68, heatRecoveryShare:0.47, currentProfile:'middayBatch', optimizedProfile:'nightBatch' },
  compressorSkid: { label:'compressor skids', kw:9, hoursPerDay:12, shiftableShare:0.42, heatRecoveryShare:0.52, currentProfile:'dayFlat', optimizedProfile:'shoulderFlat' },
  batteryCycler: { label:'battery cyclers', kw:12, hoursPerDay:14, shiftableShare:0.62, heatRecoveryShare:0.36, currentProfile:'dayPeak', optimizedProfile:'nightPeak' },
  climateChamber: { label:'climate chambers', kw:7, hoursPerDay:20, shiftableShare:0.22, heatRecoveryShare:0.35, currentProfile:'continuous', optimizedProfile:'continuousShaved' },
  incubatorRack: { label:'incubator racks', kw:3.2, hoursPerDay:24, shiftableShare:0.08, heatRecoveryShare:0.24, currentProfile:'continuous', optimizedProfile:'continuousShaved' },
  coldRoom: { label:'cold rooms', kw:10, hoursPerDay:24, shiftableShare:0.1, heatRecoveryShare:0.6, currentProfile:'continuous', optimizedProfile:'continuousShaved' },
  sterilizerBank: { label:'sterilizer banks', kw:13, hoursPerDay:4, shiftableShare:0.74, heatRecoveryShare:0.18, currentProfile:'middayBatch', optimizedProfile:'nightBatch' },
};

const LAB_EQUIPMENT = {
  RL01: [{ type:'incubatorRack', qty:18 }, { type:'freezerBank', qty:14 }, { type:'autoclave', qty:3 }, { type:'sterilizerBank', qty:2 }, { type:'vacuumPumpBank', qty:2 }, { type:'processChiller', qty:1 }],
  RL02: [{ type:'autoclave', qty:4 }, { type:'glasswasher', qty:3 }, { type:'vacuumPumpBank', qty:4 }, { type:'dryingOven', qty:3 }, { type:'processChiller', qty:2 }, { type:'freezerBank', qty:8 }],
  RL03: [{ type:'processChiller', qty:2 }, { type:'vacuumPumpBank', qty:5 }, { type:'climateChamber', qty:2 }, { type:'gpuCluster', qty:1 }, { type:'freezerBank', qty:6 }],
  RL04: [{ type:'growthChamber', qty:8 }, { type:'autoclave', qty:2 }, { type:'glasswasher', qty:2 }, { type:'coldRoom', qty:1 }, { type:'processChiller', qty:1 }],
  RL05: [{ type:'climateChamber', qty:4 }, { type:'dryingOven', qty:2 }, { type:'freezerBank', qty:6 }, { type:'vacuumPumpBank', qty:2 }, { type:'coldRoom', qty:1 }],
  RL06: [{ type:'gpuCluster', qty:4 }, { type:'freezerBank', qty:4 }, { type:'sequencingRack', qty:1 }, { type:'vacuumPumpBank', qty:1 }],
  RL07: [{ type:'sequencingRack', qty:6 }, { type:'freezerBank', qty:10 }, { type:'autoclave', qty:2 }, { type:'glasswasher', qty:2 }, { type:'incubatorRack', qty:10 }],
  RL08: [{ type:'compressorSkid', qty:4 }, { type:'processChiller', qty:2 }, { type:'dryingOven', qty:2 }, { type:'vacuumPumpBank', qty:2 }, { type:'batteryCycler', qty:2 }],
  RL09: [{ type:'coldRoom', qty:2 }, { type:'autoclave', qty:2 }, { type:'glasswasher', qty:2 }, { type:'processChiller', qty:1 }, { type:'dryingOven', qty:2 }],
  RL10: [{ type:'batteryCycler', qty:6 }, { type:'climateChamber', qty:3 }, { type:'compressorSkid', qty:2 }, { type:'processChiller', qty:1 }, { type:'gpuCluster', qty:1 }],
};

const labEquipmentCache = new Map();
const LOAD_CONTROLLER_TYPES = ['autoclave', 'glasswasher', 'batteryCycler', 'sequencingRack', 'gpuCluster', 'dryingOven', 'sterilizerBank'];
const HEAT_REUSE_TYPES = ['processChiller', 'coldRoom', 'compressorSkid', 'freezerBank'];
const STEADY_LOAD_TYPES = ['processChiller', 'coldRoom', 'climateChamber', 'compressorSkid', 'freezerBank', 'incubatorRack', 'growthChamber'];

function formatEquipmentLabel(type, qty = 1) {
  const label = LAB_EQUIPMENT_LIBRARY[type]?.label || type;
  if (qty !== 1) return label;
  if (label.endsWith('ies')) return label.replace(/ies$/, 'y');
  if (label.endsWith('s')) return label.slice(0, -1);
  return label;
}

function formatEquipmentList(rows, limit = 2) {
  const items = rows.slice(0, limit).map(row => `${row.qty} ${formatEquipmentLabel(row.type, row.qty)}`);
  return items.join(', ');
}

function scheduleWindowLabel(type) {
  const profile = LAB_EQUIPMENT_LIBRARY[type]?.optimizedProfile;
  if (profile === 'nightBatch' || profile === 'nightPeak') return 'overnight windows';
  if (profile === 'eveningBatch') return 'evening shoulder hours';
  if (profile === 'shoulderFlat') return 'off-peak shoulder hours';
  return 'cheaper hours';
}

function getLabEquipmentSummary(building) {
  if (!building?.id || !LAB_EQUIPMENT[building.id]) return null;
  if (labEquipmentCache.has(building.id)) return labEquipmentCache.get(building.id);

  const current = Array(24).fill(0);
  const optimized = Array(24).fill(0);
  let steadyAnnualKwh = 0;
  const rows = LAB_EQUIPMENT[building.id].map(item => {
    const spec = LAB_EQUIPMENT_LIBRARY[item.type];
    const annualKwh = spec.kw * spec.hoursPerDay * 365 * item.qty;
    const shiftableKwh = annualKwh * spec.shiftableShare;
    const recoverableHeatMmbtu = annualKwh * spec.heatRecoveryShare * 0.003412 * 0.35;
    if (STEADY_LOAD_TYPES.includes(item.type)) steadyAnnualKwh += annualKwh;
    const currentProfile = EQUIPMENT_SCHEDULES[spec.currentProfile];
    const optimizedProfile = EQUIPMENT_SCHEDULES[spec.optimizedProfile];
    currentProfile.forEach((weight, hour) => {
      current[hour] += spec.kw * spec.hoursPerDay * item.qty * weight;
    });
    optimizedProfile.forEach((weight, hour) => {
      optimized[hour] += spec.kw * spec.hoursPerDay * item.qty * weight;
    });
    return { ...item, annualKwh, shiftableKwh, recoverableHeatMmbtu };
  });

  const summary = {
    rows,
    annualKwh: rows.reduce((sum, row) => sum + row.annualKwh, 0),
    shiftableKwh: rows.reduce((sum, row) => sum + row.shiftableKwh, 0),
    recoverableHeatMmbtu: rows.reduce((sum, row) => sum + row.recoverableHeatMmbtu, 0),
    current: current.map(value => Math.round(value)),
    optimized: optimized.map(value => Math.round(value)),
    currentPeakKw: Math.max(...current),
    optimizedPeakKw: Math.max(...optimized),
  };
  summary.peakShavedKw = Math.max(0, Math.round(summary.currentPeakKw - summary.optimizedPeakKw));
  summary.shiftableShare = summary.shiftableKwh / (summary.annualKwh || 1);
  summary.steadyLoadShare = steadyAnnualKwh / (summary.annualKwh || 1);
  summary.flexDrivers = [...rows].sort((a, b) => b.shiftableKwh - a.shiftableKwh);
  summary.heatDrivers = [...rows].sort((a, b) => b.recoverableHeatMmbtu - a.recoverableHeatMmbtu);
  labEquipmentCache.set(building.id, summary);
  return summary;
}

function getInterventionPlan(building) {
  if (building.type.includes('Research')) {
    const summary = getLabEquipmentSummary(building);
    const topFlexType = summary.flexDrivers[0]?.type || '';
    const topHeatType = summary.heatDrivers[0]?.type || '';
    const ventilationHeavy = building.hoods >= 35 || building.co2 >= 900;
    const ventilationModerate = building.hoods >= 24 || building.co2 >= 820 || (building.hoods >= 12 && building.occ >= 0.7);
    const strongShiftWindow =
      summary.shiftableKwh >= 180000 &&
      LOAD_CONTROLLER_TYPES.includes(topFlexType);
    const strongHeatLoop =
      summary.recoverableHeatMmbtu >= 320 &&
      HEAT_REUSE_TYPES.includes(topHeatType);
    const steadyPeakProfile =
      summary.currentPeakKw >= 75 &&
      summary.steadyLoadShare >= 0.48 &&
      (building.age > 25 || !building.meter);

    let primary = 'HVAC';
    if (ventilationHeavy) {
      primary = 'HVAC';
    } else if (strongHeatLoop && summary.shiftableKwh < 250000) {
      primary = 'Heat Reuse';
    } else if (steadyPeakProfile && summary.peakShavedKw <= 42) {
      primary = 'Thermal Storage';
    } else if (strongShiftWindow) {
      primary = 'Load Controller';
    } else if (ventilationModerate) {
      primary = 'HVAC';
    }

    let secondary = null;
    if (primary === 'Heat Reuse') {
      if (steadyPeakProfile && building.hoods < 30) {
        secondary = 'Thermal Storage';
      } else if (strongShiftWindow && building.hoods < 24) {
        secondary = 'Load Controller';
      } else if (ventilationModerate && building.hoods >= 24) {
        secondary = 'HVAC';
      }
    } else if (primary === 'Load Controller') {
      if (steadyPeakProfile && !ventilationHeavy) {
        secondary = 'Thermal Storage';
      } else if (ventilationHeavy || (ventilationModerate && building.hoods >= 24)) {
        secondary = 'HVAC';
      } else if (strongHeatLoop && summary.recoverableHeatMmbtu >= 420) {
        secondary = 'Heat Reuse';
      }
    } else if (primary === 'Thermal Storage') {
      if (strongHeatLoop && building.hoods < 24) {
        secondary = 'Heat Reuse';
      } else if (ventilationModerate && building.hoods >= 24) {
        secondary = 'HVAC';
      }
    } else if (primary === 'HVAC') {
      if (strongShiftWindow) {
        secondary = 'Load Controller';
      } else if (strongHeatLoop && building.hoods < 20) {
        secondary = 'Heat Reuse';
      } else if (steadyPeakProfile && building.hoods < 16) {
        secondary = 'Thermal Storage';
      }
    }

    const loadDetail = `${formatEquipmentList(summary.flexDrivers)} can shift about ${(summary.shiftableKwh / 1000).toFixed(0)} MWh/yr into ${scheduleWindowLabel(topFlexType)}.`;
    const heatDetail = `${formatEquipmentList(summary.heatDrivers)} reject about ${Math.round(summary.recoverableHeatMmbtu).toLocaleString()} MMBtu/yr that can feed a reuse loop.`;
    const storageDetail = `${formatEquipmentList(summary.heatDrivers)} hold a steady ${summary.currentPeakKw.toFixed(0)} kW peak, so storage can shave demand with minimal schedule disruption.`;
    const hvacDetail = `${building.hoods} hoods and CO2 near ${building.co2} ppm keep ventilation load high during occupied hours.`;

    let detail = loadDetail;
    if (primary === 'Heat Reuse') {
      detail = heatDetail;
    } else if (primary === 'Thermal Storage') {
      detail = storageDetail;
    } else if (primary === 'HVAC') {
      detail = hvacDetail;
    }

    if (secondary === 'Load Controller' && primary !== 'Load Controller') {
      detail += ` Also, ${formatEquipmentList(summary.flexDrivers)} add ${Math.round(summary.shiftableKwh / 1000)} MWh/yr of schedulable lab load.`;
    } else if (secondary === 'Heat Reuse' && primary !== 'Heat Reuse') {
      detail += ` Also, process cooling supports about ${Math.round(summary.recoverableHeatMmbtu).toLocaleString()} MMBtu/yr of recoverable heat.`;
    } else if (secondary === 'Thermal Storage' && primary !== 'Thermal Storage') {
      detail += ` Also, the flat ${summary.currentPeakKw.toFixed(0)} kW process peak makes storage worthwhile.`;
    } else if (secondary === 'HVAC' && primary !== 'HVAC') {
      detail += ` Also, ${building.hoods} hoods and CO2 near ${building.co2} ppm keep ventilation reset on the table.`;
    }

    return {
      title: secondary ? `${primary} + ${secondary}` : primary,
      detail,
    };
  }

  if (building.type.includes('Athletic')) {
    if (building.id === 'AF02') {
      return {
        title: 'Heat Reuse',
        detail: 'Pool and hot-water demand line up best with the lab waste-heat loop.',
      };
    }
    if (building.peak > 1000) {
      return {
        title: 'HVAC + Thermal Storage',
        detail: 'Event-driven spikes make pre-charge and ventilation reset the strongest first move.',
      };
    }
    return {
      title: 'HVAC',
      detail: 'Use event schedules to drive setback and airflow reset windows.',
    };
  }

  if (building.type.includes('Academic')) {
    return {
      title: building.peak > 540 && (building.age > 40 || !building.meter) ? 'HVAC + Thermal Storage' : 'HVAC',
      detail: building.co2 > 850
        ? `Room-booking setbacks and CO2 reset fit this building's occupied-hour demand profile.`
        : building.peak > 540 && (building.age > 40 || !building.meter)
          ? `Class-hour peaks justify HVAC scheduling first, with storage smoothing the afternoon demand edge.`
          : `Occupancy-based scheduling is the cleanest first step before deeper retrofits.`,
    };
  }

  return {
    title: building.age > 35 && !building.meter ? 'HVAC + Thermal Storage' : 'HVAC',
    detail: building.age > 35 && !building.meter
      ? 'Evening peaks and older controls make setback tuning the first move, with storage reducing the late-day spike.'
      : building.age > 30
        ? 'Older envelope and evening occupancy make setback tuning the right first move.'
        : 'Use schedule-aware HVAC control before larger capital work.',
  };
}

function resizeCharts() {
  Object.values(Chart.instances || {}).forEach(chart => chart.resize());
}

function expandBuildingLabel(label) {
  if (!label) return label;
  const text = String(label);
  const match = text.match(/^([A-Z]{2}\d{2})(.*)$/);
  if (!match) return text;
  const [, id, suffix] = match;
  const name = BUILDING_NAME_BY_ID[id];
  if (!name) return text;
  return `${id} — ${name}${suffix || ''}`;
}

function hourLabelFromPeriod(period) {
  const match = String(period).match(/T(\d{2})/);
  return match ? `${match[1]}:00` : String(period);
}

function dateLabelFromPeriod(period) {
  const raw = String(period).slice(0, 10);
  const date = new Date(`${raw}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? raw
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function showPage(name, button) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  if (button) button.classList.add('active');
  setTimeout(() => {
    resizeCharts();
    if (name === 'overview') initMap();
  }, 80);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function switchTab(group, name, tab) {
  const page = document.getElementById('page-labs');
  page.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  page.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  if (tab) tab.classList.add('active');
  document.getElementById(`${group}-${name}`).classList.add('active');
  setTimeout(resizeCharts, 80);
}

// ══════════════════════════════════════════
// RISK MODEL
// ══════════════════════════════════════════
function computeRisk(b) {
  const intensity = b.kwh / b.sqft;
  const typeWeight = {Research:1.4,Lab:1.4,Residence:0.6,Academic:0.5,Athletic:0.8};
  const tw = Object.entries(typeWeight).find(([k])=>b.type.includes(k))?.[1] || 1;
  const ageFactor = Math.min(1.0, b.age/50);
  const meterPenalty = b.meter ? 0 : 15;
  const intensityScore = Math.min(100, (intensity/200)*100*tw);
  const kwhRank = Math.min(100, (b.kwh/6200000)*100);
  const anomalyFreq = b.co2 > 900 ? 80 : b.co2 > 700 ? 50 : 30;
  const risk = 0.4*intensityScore + 0.3*kwhRank + 0.2*(ageFactor*100) + 0.1*anomalyFreq + meterPenalty;
  return Math.min(100, Math.round(risk));
}
function riskLabel(score) {
  if(score>=75) return {label:'Critical',cls:'risk-critical'};
  if(score>=55) return {label:'High',cls:'risk-high'};
  if(score>=35) return {label:'Medium',cls:'risk-medium'};
  return {label:'Low',cls:'risk-low'};
}

// ══════════════════════════════════════════
// MAP
// ══════════════════════════════════════════
function initMap() {
  const map = document.getElementById('campus-map');
  const dots = document.getElementById('map-dots');
  const tooltip = document.getElementById('map-tooltip');
  dots.innerHTML = '';
  const W = map.offsetWidth, H = map.offsetHeight;
  const lats = BUILDINGS.map(b=>b.lat), lons = BUILDINGS.map(b=>b.lon);
  const minLat=Math.min(...lats), maxLat=Math.max(...lats);
  const minLon=Math.min(...lons), maxLon=Math.max(...lons);
  const pad = 60;
  function toX(lon) { return pad + (lon-minLon)/(maxLon-minLon)*(W-pad*2); }
  function toY(lat) { return H-pad - (lat-minLat)/(maxLat-minLat)*(H-pad*2); }

  function dotColor(kwh) {
    if(kwh>=5000000) return '#c0392b';
    if(kwh>=3000000) return '#d4893a';
    if(kwh>=1500000) return '#4a90c4';
    return '#4a9464';
  }
  function dotSize(kwh) { return 8 + (kwh/6200000)*22; }

  const svg = document.getElementById('map-svg');
  svg.innerHTML = '';
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  // soft grid
  for(let i=0;i<8;i++){
    const x = pad+i*(W-pad*2)/7;
    const l = document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',x); l.setAttribute('y1',pad); l.setAttribute('x2',x); l.setAttribute('y2',H-pad);
    l.setAttribute('stroke','rgba(168,213,160,0.4)'); l.setAttribute('stroke-width','1');
    svg.appendChild(l);
  }
  for(let i=0;i<6;i++){
    const y = pad+i*(H-pad*2)/5;
    const l = document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',pad); l.setAttribute('y1',y); l.setAttribute('x2',W-pad); l.setAttribute('y2',y);
    l.setAttribute('stroke','rgba(168,213,160,0.4)'); l.setAttribute('stroke-width','1');
    svg.appendChild(l);
  }
  const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
  txt.setAttribute('x',W/2); txt.setAttribute('y',18);
  txt.setAttribute('text-anchor','middle'); txt.setAttribute('fill','rgba(122,146,120,0.5)');
  txt.setAttribute('font-size','9'); txt.setAttribute('font-family','DM Mono,monospace');
  txt.textContent = 'PENNSYLVANIA STATE UNIVERSITY — UNIVERSITY PARK CAMPUS';
  svg.appendChild(txt);

  BUILDINGS.forEach(b => {
    const x = toX(b.lon), y = toY(b.lat);
    const color = dotColor(b.kwh);
    const size = dotSize(b.kwh);
    const risk = computeRisk(b);
    const dot = document.createElement('div');
    dot.className = 'building-dot';
    dot.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color}28;border:2.5px solid ${color};color:${color}`;
    if(risk >= 60) {
      const ring = document.createElement('div');
      ring.className = 'pulse-ring';
      ring.style.cssText = `width:${size+8}px;height:${size+8}px;top:-6px;left:-6px;`;
      dot.appendChild(ring);
    }
    dot.addEventListener('mouseenter', (e) => {
      const rl = riskLabel(risk);
      tooltip.innerHTML = `
        <div class="tt-name">${b.name}</div>
        <div class="tt-row"><span>${b.type}</span><span class="tt-val"><span class="risk-badge ${rl.cls}">${rl.label}</span></span></div>
        <div class="tt-row"><span>Annual kWh</span><span class="tt-val">${(b.kwh/1e6).toFixed(1)}M</span></div>
        <div class="tt-row"><span>Intensity</span><span class="tt-val">${Math.round(b.kwh/b.sqft)} kWh/sqft</span></div>
        <div class="tt-row"><span>Risk Score</span><span class="tt-val">${risk}/100</span></div>
        <div class="tt-row"><span>Smart Meter</span><span class="tt-val">${b.meter?'✓ Yes':'✗ No'}</span></div>
        <div class="tt-row"><span>Building Age</span><span class="tt-val">${b.age} yrs</span></div>
      `;
      tooltip.classList.add('visible');
    });
    dot.addEventListener('mousemove', (e) => {
      const rect = map.getBoundingClientRect();
      let tx = e.clientX-rect.left+12, ty = e.clientY-rect.top+12;
      if(tx+220>W) tx = e.clientX-rect.left-225;
      tooltip.style.left=tx+'px'; tooltip.style.top=ty+'px';
    });
    dot.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
    dots.appendChild(dot);
  });
}

// ══════════════════════════════════════════
// OVERVIEW CHARTS
// ══════════════════════════════════════════
function initOverviewCharts() {
  const hrs = Array.from({length:24},(_,i)=>`${i}:00`);
  const LAB_H = [0.82,0.80,0.79,0.78,0.79,0.82,0.88,0.94,1.02,1.08,1.12,1.14,1.10,1.12,1.14,1.13,1.10,1.05,0.98,0.92,0.90,0.88,0.85,0.83];
  const DORM_H = [0.55,0.50,0.48,0.47,0.48,0.52,0.65,0.80,0.88,0.82,0.75,0.72,0.75,0.72,0.70,0.72,0.80,0.95,1.15,1.25,1.20,1.10,0.90,0.70];
  const ACAD_H = [0.30,0.28,0.27,0.27,0.28,0.35,0.55,0.78,0.92,1.05,1.10,1.08,1.05,1.10,1.12,1.08,0.95,0.80,0.65,0.50,0.42,0.38,0.35,0.32];
  const ATHL_H = [0.25,0.22,0.22,0.22,0.22,0.25,0.35,0.50,0.65,0.70,0.72,0.72,0.70,0.72,0.75,0.80,0.88,0.95,1.05,1.10,1.05,0.85,0.55,0.35];
  const labBase=5470, dormBase=1110, acadBase=966, athlBase=973;
  new Chart(document.getElementById('hourly-chart'), {
    type:'line',
    data:{labels:hrs,datasets:[
      {label:'Research Labs',data:LAB_H.map(m=>Math.round(m*labBase)),borderColor:'#c0392b',backgroundColor:'rgba(192,57,43,0.07)',fill:true,tension:0.4,borderWidth:2,pointRadius:0},
      {label:'Residence Halls',data:DORM_H.map(m=>Math.round(m*dormBase)),borderColor:'#4a90c4',backgroundColor:'rgba(74,144,196,0.06)',fill:true,tension:0.4,borderWidth:2,pointRadius:0},
      {label:'Academic',data:ACAD_H.map(m=>Math.round(m*acadBase)),borderColor:'#4a9464',backgroundColor:'rgba(74,148,100,0.06)',fill:true,tension:0.4,borderWidth:2,pointRadius:0},
      {label:'Athletic',data:ATHL_H.map(m=>Math.round(m*athlBase)),borderColor:'#d4893a',backgroundColor:'rgba(212,137,58,0.05)',fill:true,tension:0.4,borderWidth:2,pointRadius:0},
    ]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10},padding:12}}},scales:{x:{...CD.scales.x,ticks:{...CD.scales.x.ticks,maxTicksLimit:8}},y:{...CD.scales.y,title:{display:true,text:'kW',color:'#7a9278',font:{size:9,family:"'DM Mono',monospace"}}}}}
  });
}

// ══════════════════════════════════════════
// ANOMALY FEED
// ══════════════════════════════════════════
const ANOMALIES = [
  {type:'critical',icon:'🔴',title:'RL02 — Extreme overnight load',sub:'3.2× baseline at 02:14 AM — fume hoods running at 100% unoccupied',time:'2m ago'},
  {type:'critical',icon:'🔴',title:'RL07 — Peak demand spike',sub:'1,890kW peak demand (14.8% over rated capacity)',time:'11m ago'},
  {type:'warning',icon:'🟡',title:'RH04 — Evening surge detected',sub:'South Village Hall: 47% above avg consumption 9–11pm',time:'34m ago'},
  {type:'warning',icon:'🟡',title:'RL01 — CO₂ anomaly',sub:'Room 312 CO₂ at 1,420ppm — HVAC setback overridden manually',time:'1h ago'},
  {type:'info',icon:'🟢',title:'AB03 — Setback opportunity',sub:'Hammond Bldg no bookings 2pm–5pm today — auto-setback initiated',time:'2h ago'},
  {type:'info',icon:'🟢',title:'AF02 — Heat capture active',sub:'Rec Hall pool receiving 2.3 MMBtu/hr from lab heat exchange loop',time:'3h ago'},
  {type:'warning',icon:'🟡',title:'RL03 — Meter gap',sub:'Physics Lab has no smart meter — energy estimated from substation data',time:'4h ago'},
];
function initAnomalyFeed() {
  const feed = document.getElementById('anomaly-feed');
  feed.innerHTML = '';
  ANOMALIES.forEach((a,i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `anomaly-item ${a.type}`;
      div.innerHTML = `<div class="anom-icon">${a.icon}</div><div class="anom-body"><div class="anom-title">${a.title}</div><div class="anom-sub">${a.sub}</div></div><div class="anom-time">${a.time}</div>`;
      feed.appendChild(div);
    }, i*200);
  });
}

// ══════════════════════════════════════════
// HOTSPOT PAGE
// ══════════════════════════════════════════
function initHotspotPage() {
  const sorted = [...BUILDINGS].sort((a,b)=>computeRisk(b)-computeRisk(a));

  const table = document.getElementById('hotspot-table');
  table.innerHTML = `<tr><th>#</th><th>Building</th><th>Type</th><th>Annual kWh</th><th>Intensity</th><th>Risk Score</th><th>Risk Level</th><th>Smart Meter</th><th>Recommendation</th></tr>`;
  sorted.slice(0,12).forEach((b,i) => {
    const r = computeRisk(b);
    const rl = riskLabel(r);
    const typeColor = {Research:'lab',Residence:'dorm',Academic:'acad',Athletic:'athl'};
    const tc = Object.entries(typeColor).find(([k])=>b.type.includes(k))?.[1] || 'acad';
    const plan = getInterventionPlan(b);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:var(--muted);font-family:'DM Mono',monospace;font-weight:500">${i+1}</td>
      <td style="font-weight:600;color:var(--text)">${b.name}</td>
      <td><span class="tag tag-${tc}">${b.type}</span></td>
      <td style="font-family:'DM Mono',monospace">${(b.kwh/1e6).toFixed(1)}M</td>
      <td style="font-family:'DM Mono',monospace">${Math.round(b.kwh/b.sqft)} kWh/ft²</td>
      <td>
        <div class="score-bar">
          <div class="bar-track"><div class="bar-fill" style="width:${r}%;background:${r>=75?'var(--danger)':r>=55?'var(--warn)':r>=35?'#4a90c4':'var(--accent)'}"></div></div>
          <span style="font-family:'DM Mono',monospace;font-size:0.72rem;font-weight:600">${r}</span>
        </div>
      </td>
      <td><span class="risk-badge ${rl.cls}">${rl.label}</span></td>
      <td style="text-align:center">${b.meter?'<span style="color:var(--accent);font-size:1rem">✓</span>':'<span style="color:var(--danger);font-size:1rem">✗</span>'}</td>
      <td>
        <div style="font-size:0.75rem;color:var(--text);font-weight:600">${plan.title}</div>
        <div style="font-size:0.64rem;color:var(--muted);line-height:1.45;margin-top:0.2rem">${plan.detail}</div>
      </td>
    `;
    table.appendChild(tr);
  });

  renderHourlyCostWindow();

}

async function renderHourlyCostWindow() {
  let rows = FALLBACK_US48_DEMAND;
  try {
    const response = await fetch(EIA_GRIDMONITOR_US48_URL);
    if (!response.ok) throw new Error(`EIA request failed (${response.status})`);
    const payload = await response.json();
    const data = payload?.response?.data;
    if (Array.isArray(data) && data.length) {
      rows = [...data].reverse().map(row => ({
        period: row.period,
        value: Number(row.value),
      }));
    }
  } catch (error) {
    console.warn('Using fallback EIA demand snapshot for hourly cost window.', error);
  }

  const demandValues = rows.map(row => Number(row.value));
  const minDemand = Math.min(...demandValues);
  const maxDemand = Math.max(...demandValues);
  const offPeak = 83;
  const peak = 133;
  const costValues = demandValues.map(value => {
    const normalized = maxDemand === minDemand ? 0 : (value - minDemand) / (maxDemand - minDemand);
    return +(offPeak + normalized * (peak - offPeak)).toFixed(1);
  });
  const colors = costValues.map(value =>
    value >= 120 ? 'rgba(192,57,43,0.72)'
    : value >= 105 ? 'rgba(212,137,58,0.72)'
    : 'rgba(74,148,100,0.65)'
  );

  if (peakCostChart) peakCostChart.destroy();
  peakCostChart = new Chart(document.getElementById('peak-chart'), {
    type:'bar',
    data:{
      labels:rows.map(row => hourLabelFromPeriod(row.period)),
      datasets:[{
        label:'Estimated electricity cost ($/MWh)',
        data:costValues,
        backgroundColor:colors,
        borderRadius:4,
        order:2
      },{
        label:'US48 demand (GWh)',
        data:demandValues.map(value => +(value / 1000).toFixed(1)),
        type:'line',
        borderColor:'#4a90c4',
        backgroundColor:'rgba(74,144,196,0.08)',
        fill:false,
        tension:0.35,
        borderWidth:2,
        pointRadius:2,
        pointBackgroundColor:'#4a90c4',
        yAxisID:'y1',
        order:1
      }]
    },
    options:{
      ...CD,
      plugins:{
        ...CD.plugins,
        legend:{display:true,labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10}}},
        tooltip:{
          ...CD.plugins.tooltip,
          callbacks:{
            title(items) {
              if (!items?.length) return '';
              const row = rows[items[0].dataIndex];
              return `${hourLabelFromPeriod(row.period)} | ${dateLabelFromPeriod(row.period)}`;
            },
            label(context) {
              if (context.dataset.yAxisID === 'y1') {
                return `US48 demand: ${context.formattedValue} GWh`;
              }
              return `Estimated campus cost window: $${context.formattedValue}/MWh`;
            }
          }
        }
      },
      scales:{
        x:{...CD.scales.x,ticks:{...CD.scales.x.ticks,maxTicksLimit:12}},
        y:{
          ...CD.scales.y,
          min:80,
          max:140,
          title:{display:true,text:'Estimated cost ($/MWh)',color:'#7a9278',font:{size:9,family:"'DM Mono',monospace"}}
        },
        y1:{
          position:'right',
          min:Math.floor(minDemand/1000)-10,
          max:Math.ceil(maxDemand/1000)+10,
          ticks:{color:'#7a9278',font:{family:"'DM Mono',monospace",size:9}},
          grid:{display:false},
          title:{display:true,text:'US48 demand (GWh)',color:'#7a9278',font:{size:9,family:"'DM Mono',monospace"}}
        }
      }
    }
  });
}

// ══════════════════════════════════════════
// LABS
// ══════════════════════════════════════════
let schedChart, deferralChart, peakCostChart, cumulativeChart;
function initLabsPage() { updateScheduler(); initFumeHood(); initHeatReuse(); initThermal(); }

function updateScheduler() {
  const hrs = Array.from({length:24},(_,i)=>`${i}:00`);
  const labs = BUILDINGS.filter(b=>b.type.includes('Research'));
  const current = Array(24).fill(0);
  const optimized = Array(24).fill(0);
  const labShiftables = labs.map(lab => {
    const summary = getLabEquipmentSummary(lab);
    summary.current.forEach((value, hour) => { current[hour] += value; });
    summary.optimized.forEach((value, hour) => { optimized[hour] += value; });
    return {
      id: lab.id,
      shiftableKwh: summary.shiftableKwh,
    };
  });

  if(schedChart) schedChart.destroy();
  schedChart = new Chart(document.getElementById('schedule-chart'), {
    type:'line',
    data:{labels:hrs,datasets:[
      {label:'Current equipment schedule',data:current.map(value => Math.round(value)),borderColor:'#c0392b',borderDash:[5,5],fill:false,tension:0.4,borderWidth:2,pointRadius:0},
      {label:'Optimized off-peak run plan',data:optimized.map(value => Math.round(value)),borderColor:'#4a9464',backgroundColor:'rgba(74,148,100,0.09)',fill:true,tension:0.4,borderWidth:2,pointRadius:0},
    ]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:true,labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10}}}},scales:{x:CD.scales.x,y:{...CD.scales.y,title:{display:true,text:'kW (schedulable equipment)',color:'#7a9278',font:{size:9}}}}}
  });
  if(deferralChart) deferralChart.destroy();
  deferralChart = new Chart(document.getElementById('lab-deferral-chart'), {
    type:'bar',
    data:{labels:labShiftables.map(row=>row.id),datasets:[{label:'Schedulable equipment kWh/yr',data:labShiftables.map(row=>Math.round(row.shiftableKwh/1000)*1000),backgroundColor:'rgba(74,148,100,0.65)',borderRadius:4}]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:false}}}
  });
}

function initFumeHood() {
  const labs = BUILDINGS.filter(b=>b.hoods>0);
  const powerPerHood = 1200, hoursPerYear = 8760, rate = 0.133;
  new Chart(document.getElementById('fumehood-chart'), {
    type:'bar',
    data:{
      labels:labs.map(b=>b.name.split(' ').slice(0,2).join(' ')),
      datasets:[
        {label:'Current Annual Cost ($K)',data:labs.map(b=>Math.round(b.hoods*powerPerHood/1000*hoursPerYear*rate/1000)),backgroundColor:'rgba(192,57,43,0.65)',borderRadius:4},
        {label:'With VAV Sensors ($K)',data:labs.map(b=>Math.round(b.hoods*powerPerHood/1000*hoursPerYear*rate*0.55/1000)),backgroundColor:'rgba(74,148,100,0.6)',borderRadius:4},
      ]
    },
    options:{...CD,plugins:{...CD.plugins,legend:{display:true,labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10}}}},scales:{x:CD.scales.x,y:{...CD.scales.y,title:{display:true,text:'$K/yr',color:'#7a9278',font:{size:9}}}}}
  });
  const hoodCards = document.getElementById('hood-cards');
  hoodCards.innerHTML = '';
  [{lab:'RL02 — Chemistry',hoods:62,note:'Hoods running 24/7 — sash avg 65%'},
   {lab:'RL07 — Genomics',hoods:42,note:'Night occupancy low — schedule VAV'},
   {lab:'RL04 — Agri Biotech',hoods:35,note:'Sash compliance good — optimize further'},
   {lab:'RL01 — Biomedical',hoods:48,note:'Weekend unoccupied overrides detected'}
  ].forEach(h => {
    const sav = Math.round(h.hoods * powerPerHood/1000 * hoursPerYear * rate * 0.45 / 1000);
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.85rem;background:var(--surface2);border-radius:10px;font-size:0.78rem;border:1px solid var(--border);';
    div.innerHTML = `<div><div style="font-weight:600;color:var(--text)">${h.lab}</div><div style="color:var(--muted);font-family:'DM Mono',monospace;font-size:0.64rem;margin-top:0.15rem">${h.note}</div></div><div style="text-align:right"><div style="color:var(--accent3);font-weight:700;font-family:'DM Mono',monospace">$${sav}K/yr saved</div><div style="color:var(--muted);font-size:0.64rem">${h.hoods} hoods</div></div>`;
    hoodCards.appendChild(div);
  });
}

function initHeatReuse() {
  document.getElementById('heat-flow').innerHTML = `
    <div class="flow-node" style="border-color:#e07b7b"><div class="flow-icon">🔬</div><div class="flow-label">Research Labs</div><div class="flow-sub">47.9M kWh/yr<br/>Avg 32°C waste heat</div></div>
    <div class="flow-arrow" style="position:relative"><div class="flow-value">Heat Exchanger · $1.2M</div></div>
    <div class="flow-node" style="border-color:var(--accent)"><div class="flow-icon">🌿</div><div class="flow-label">GreenGrid Hub</div><div class="flow-sub">Routes 8,200 MMBtu/yr<br/>per real-time demand</div></div>
    <div class="flow-arrow" style="position:relative"><div class="flow-value">Insulated loop</div></div>
    <div class="flow-node" style="border-color:#4a90c4"><div class="flow-icon">🏊</div><div class="flow-label">Rec Hall Pool</div><div class="flow-sub">Saves $220K/yr<br/>gas + electric</div></div>
    <div class="flow-arrow" style="position:relative"><div class="flow-value"> </div></div>
    <div class="flow-node" style="border-color:var(--warn)"><div class="flow-icon">🚿</div><div class="flow-label">Hot Water (DHW)</div><div class="flow-sub">Campus-wide<br/>Saves $85K/yr</div></div>`;
}

function initThermal() {
  const hrs = Array.from({length:24},(_,i)=>`${i}:00`);
  const charge = [0,0,0,150,280,350,400,380,350,300,250,200,150,100,80,60,40,20,0,0,0,0,0,0];
  const discharge = [30,20,10,0,0,0,0,80,200,350,450,490,500,480,460,400,300,200,100,50,40,30,30,30];
  new Chart(document.getElementById('thermal-chart'), {
    type:'bar',
    data:{labels:hrs,datasets:[
      {label:'Charging (kW, off-peak)',data:charge,backgroundColor:'rgba(74,144,196,0.65)',borderRadius:3},
      {label:'Discharging (kW, peak avoidance)',data:discharge,backgroundColor:'rgba(74,148,100,0.65)',borderRadius:3},
    ]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:true,labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10}}}}}
  });
  const savings = hrs.map((_,i) => (i>=10&&i<=19?discharge[i]*0.133*0.6:0));
  new Chart(document.getElementById('thermal-savings-chart'), {
    type:'bar',
    data:{labels:hrs,datasets:[{label:'Peak Cost Avoided ($)',data:savings.map(s=>Math.round(s*10)/10),backgroundColor:'rgba(74,148,100,0.65)',borderRadius:2}]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:false}},scales:{x:CD.scales.x,y:{...CD.scales.y,title:{display:true,text:'$/hr avoided',color:'#7a9278',font:{size:9}}}}}
  });
}

// ══════════════════════════════════════════
// DORMS
// ══════════════════════════════════════════
// ══════════════════════════════════════════
// ROI
// ══════════════════════════════════════════
const ROI_DATA = [
  {rank:1,phase:1,intervention:'Peak-Hour Controls + GreenGrid Software',role:'Operating layer',why:'Creates the price-aware control backbone for lab equipment scheduling, anomaly response, and peak-hour orchestration.',capex:1500000,savings:550000,payback:2.7,kwh:4100000,buildings:'10 research labs'},
  {rank:2,phase:1,intervention:'VAV + Smart Ventilation (Labs)',role:'Fastest lab savings',why:'Targets the largest controllable lab load first, cutting ventilation waste without interrupting experiments.',capex:2000000,savings:1200000,payback:1.7,kwh:9000000,buildings:'10 research labs'},
  {rank:3,phase:1,intervention:'Academic Buildings VAV + CO2 Sensors',role:'Scale the control logic',why:'Extends the same occupancy-driven climate logic to a broad footprint of classrooms and academic rooms at low cost.',capex:1000000,savings:1050000,payback:1.0,kwh:7900000,buildings:'20 academic buildings'},
  {rank:4,phase:1,intervention:'GreenGrid Integration + Data Layer',role:'Measurement backbone',why:'Connects schedules, meters, and building signals so later infrastructure is sized using campus data instead of assumptions.',capex:500000,savings:180000,payback:2.8,kwh:1300000,buildings:'Platform-wide'},
  {rank:5,phase:2,intervention:'Solar PPA (Academic Rooftops)',role:'Carbon closer',why:'Adds major carbon reduction without new capital burden and complements the demand-side savings already captured in Phase 1.',capex:0,savings:680000,payback:0.0,kwh:5100000,buildings:'Academic rooftops'},
  {rank:6,phase:2,intervention:'Lab Heat Reuse System',role:'Cross-campus reuse',why:'Turns unavoidable waste heat from labs into useful pool and hot-water value once GreenGrid has identified the strongest heat sources.',capex:2500000,savings:305000,payback:8.2,kwh:2300000,buildings:'Labs + athletic / DHW'},
  {rank:7,phase:3,intervention:'Thermal Energy Storage (Lab Clusters)',role:'Peak hedge',why:'Best deployed after live lab-cluster data reveals the real peak profile and reduces oversizing risk.',capex:4050000,savings:447000,payback:9.1,kwh:3300000,buildings:'3-4 lab clusters'},
];

const ROI_PHASE_META = [
  {
    phase:1,
    year:'Year 1',
    title:'Prove the control layer',
    theme:'Fast payback',
    description:'Lead with software, lab ventilation, and academic HVAC because GreenGrid can operate these immediately and they return the fastest savings.',
    unlock:'Unlocks live baselines, equipment scheduling, and reliable lab-cluster peak data.',
    color:'var(--accent3)',
  },
  {
    phase:2,
    year:'Year 2',
    title:'Extend into carbon and reuse',
    theme:'Carbon scale',
    description:'Once the data layer is live, add solar and lab heat reuse so the platform drives both operating savings and deeper emissions reduction.',
    unlock:'Unlocks the carbon pathway beyond automation alone and creates cross-campus value from lab heat.',
    color:'#4a90c4',
  },
  {
    phase:3,
    year:'Year 3',
    title:'Add storage after measurement',
    theme:'Peak hedging',
    description:'Thermal storage comes last so sizing is based on measured, post-control peaks rather than rough pre-deployment assumptions.',
    unlock:'Locks in peak avoidance after the load profile has already been stabilized and observed.',
    color:'var(--warn)',
  },
];

function formatMoneyCompact(amount, digits = 1) {
  return `$${(amount / 1e6).toFixed(digits)}M`;
}

function initRoiPage() {
  const totalCapex = ROI_DATA.reduce((sum, item) => sum + item.capex, 0);
  const totalSavings = ROI_DATA.reduce((sum, item) => sum + item.savings, 0);
  const phase1Capex = ROI_DATA.filter(item => item.phase === 1).reduce((sum, item) => sum + item.capex, 0);
  const phase1Savings = ROI_DATA.filter(item => item.phase === 1).reduce((sum, item) => sum + item.savings, 0);

  document.getElementById('roi-total-capex').textContent = formatMoneyCompact(totalCapex, 2);
  document.getElementById('roi-total-savings').textContent = `${formatMoneyCompact(totalSavings, 1)}/yr`;
  document.getElementById('roi-phase1-savings').textContent = `${formatMoneyCompact(phase1Savings, 1)}/yr`;
  document.getElementById('roi-phase1-capex').textContent = formatMoneyCompact(phase1Capex, 1);

  const table = document.getElementById('roi-table');
  table.innerHTML = `<tr><th>Phase</th><th>Intervention</th><th>Why In This Phase</th><th>Scope</th><th>CapEx</th><th>Annual Savings</th><th>Payback</th></tr>`;
  const pCls = (r) => r<=2?'priority-1':r<=5?'priority-2':'priority-3';
  ROI_DATA.forEach(r => {
    const tr = document.createElement('tr');
    tr.className = pCls(r.rank);
    const payColor = r.payback === 0 ? '#4a90c4' : r.payback < 2 ? 'var(--accent3)' : r.payback < 4 ? 'var(--accent)' : r.payback < 8 ? 'var(--warn)' : 'var(--danger)';
    tr.innerHTML = `
      <td style="text-align:center"><span class="tag ${r.phase===1?'tag-phase-1':r.phase===2?'tag-phase-2':'tag-phase-3'}">Yr ${r.phase}</span></td>
      <td>
        <div class="roi-move-title">${r.intervention}</div>
        <div class="roi-move-role">Priority ${r.rank} • ${r.role}</div>
      </td>
      <td><div class="roi-why">${r.why}</div></td>
      <td style="font-size:0.74rem;color:var(--muted)">${r.buildings}<div class="roi-scope-note">${(r.kwh/1e6).toFixed(1)}M kWh/yr addressed</div></td>
      <td style="font-family:'DM Mono',monospace;font-size:0.74rem">${r.capex===0?'$0 (PPA)':'$'+(r.capex/1000000).toFixed(2)+'M'}</td>
      <td style="font-family:'DM Mono',monospace;font-size:0.74rem;color:var(--accent3);font-weight:600">$${(r.savings/1000).toFixed(0)}K</td>
      <td style="font-family:'DM Mono',monospace;font-size:0.74rem;color:${payColor};font-weight:600">${r.payback===0?'Day 1':r.payback.toFixed(1)+' yrs'}</td>
    `;
    table.appendChild(tr);
  });

  const years = [0,1,2,3,4,5];
  const cumSavings = years.map(year => {
    let total = 0;
    ROI_DATA.forEach(item => {
      const activeYears = Math.max(0, year - item.phase + 0.5);
      total += activeYears * item.savings;
    });
    return +(total / 1e6).toFixed(2);
  });
  const deployedBudget = years.map(year => +(ROI_DATA.filter(item => year >= item.phase).reduce((sum, item) => sum + item.capex, 0) / 1e6).toFixed(2));
  const breakevenYear = years.find((year, index) => cumSavings[index] >= deployedBudget[index] && year > 0);
  document.getElementById('roi-breakeven').textContent = breakevenYear ? `Year ${breakevenYear}` : 'Beyond Year 5';

  if (cumulativeChart) cumulativeChart.destroy();
  cumulativeChart = new Chart(document.getElementById('cumulative-chart'), {
    type:'line',
    data:{labels:years.map(y=>`Year ${y}`),datasets:[
      {label:'Cumulative Savings ($M)',data:cumSavings,borderColor:'#4a9464',backgroundColor:'rgba(74,148,100,0.09)',fill:true,tension:0.4,borderWidth:2,pointRadius:4,pointBackgroundColor:'#4a9464'},
      {label:'Budget Deployed ($M)',data:deployedBudget,borderColor:'#c0392b',borderDash:[5,5],fill:false,tension:0.4,borderWidth:2,pointRadius:3,pointBackgroundColor:'#c0392b'},
    ]},
    options:{...CD,plugins:{...CD.plugins,legend:{display:true,labels:{color:'#7a9278',font:{family:"'DM Sans',sans-serif",size:10}}}},scales:{x:CD.scales.x,y:{...CD.scales.y,title:{display:true,text:'$M',color:'#7a9278',font:{size:9}}}}}
  });

  const phaseStrip = document.getElementById('roi-phase-strip');
  phaseStrip.innerHTML = ROI_PHASE_META.map(phase => {
    const items = ROI_DATA.filter(item => item.phase === phase.phase);
    const phaseCapex = items.reduce((sum, item) => sum + item.capex, 0);
    const phaseSavings = items.reduce((sum, item) => sum + item.savings, 0);
    return `
      <div class="roi-phase-band" style="--phase-color:${phase.color}">
        <div class="roi-phase-band-badge">${phase.year}</div>
        <div>
          <div class="roi-phase-band-title">${phase.title}</div>
          <div class="roi-phase-band-copy">${phase.description}</div>
        </div>
        <div class="roi-phase-band-stat">
          <span>CapEx</span>
          <strong>${phaseCapex ? formatMoneyCompact(phaseCapex, 1) : '$0'}</strong>
        </div>
        <div class="roi-phase-band-stat">
          <span>Savings</span>
          <strong>${formatMoneyCompact(phaseSavings, 1)}/yr</strong>
        </div>
      </div>
    `;
  }).join('');

  const roadmap = document.getElementById('roi-roadmap');
  roadmap.innerHTML = ROI_PHASE_META.map(phase => {
    const items = ROI_DATA.filter(item => item.phase === phase.phase);
    const phaseCapex = items.reduce((sum, item) => sum + item.capex, 0);
    const phaseSavings = items.reduce((sum, item) => sum + item.savings, 0);
    const phaseKwh = items.reduce((sum, item) => sum + item.kwh, 0);
    return `
      <div class="phase-card" style="--phase-color:${phase.color}">
        <div class="phase-card-top">
          <div>
            <div class="phase-card-badge">${phase.year}</div>
            <div class="phase-card-title">${phase.title}</div>
          </div>
          <div class="phase-card-theme">${phase.theme}</div>
        </div>
        <div class="phase-card-copy">${phase.description}</div>
        <div class="phase-card-metrics">
          <div class="phase-card-metric">
            <span>CapEx</span>
            <strong>${phaseCapex ? formatMoneyCompact(phaseCapex, 1) : '$0'}</strong>
          </div>
          <div class="phase-card-metric">
            <span>Savings</span>
            <strong>${formatMoneyCompact(phaseSavings, 1)}/yr</strong>
          </div>
          <div class="phase-card-metric">
            <span>kWh</span>
            <strong>${(phaseKwh/1e6).toFixed(1)}M/yr</strong>
          </div>
        </div>
        <div class="phase-chip-list">
          ${items.map(item => `<span class="phase-chip">${item.intervention}</span>`).join('')}
        </div>
        <div class="phase-card-callout"><strong>Unlocks next:</strong> ${phase.unlock}</div>
      </div>
    `;
  }).join('');
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.addEventListener('load', () => {
  initMap();
  initAnomalyFeed();
  initOverviewCharts();
  initHotspotPage();
  initLabsPage();
  initRoiPage();
  setTimeout(() => {
    resizeCharts();
    initMap();
  }, 180);
});
let mapResizeTimer;
window.addEventListener('resize', () => {
  if (!document.getElementById('page-overview').classList.contains('active')) return;
  clearTimeout(mapResizeTimer);
  mapResizeTimer = setTimeout(initMap, 180);
});