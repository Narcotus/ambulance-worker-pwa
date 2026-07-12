// Данные и чистые функции для медицинских калькуляторов.
// Демонстрационные значения — сверяйтесь с инструкциями к препаратам.

/* ---------- Дозировки по массе тела ---------- */
export interface WeightDrug {
  id: string
  name: string
  indication: string
  dosePerKg: number
  unit: string
  maxDose?: number
  concentration?: string
  note?: string
}

export const weightDrugs: WeightDrug[] = [
  {
    id: 'epinephrine',
    name: 'Эпинефрин (адреналин)',
    indication: 'СЛР у детей',
    dosePerKg: 0.01,
    unit: 'мг',
    maxDose: 1,
    concentration: '0,1% — 1 мг/мл',
    note: 'Каждые 3–5 мин',
  },
  {
    id: 'atropine',
    name: 'Атропин',
    indication: 'Брадикардия',
    dosePerKg: 0.02,
    unit: 'мг',
    maxDose: 0.5,
    concentration: '0,1% — 1 мг/мл',
    note: 'Минимум 0,1 мг',
  },
  {
    id: 'amiodarone',
    name: 'Амиодарон',
    indication: 'ФЖ/ЖТ без пульса',
    dosePerKg: 5,
    unit: 'мг',
    maxDose: 300,
  },
  {
    id: 'diazepam',
    name: 'Диазепам',
    indication: 'Судороги',
    dosePerKg: 0.3,
    unit: 'мг',
    maxDose: 10,
    note: 'в/в медленно',
  },
  {
    id: 'paracetamol',
    name: 'Парацетамол',
    indication: 'Лихорадка / боль',
    dosePerKg: 15,
    unit: 'мг',
    maxDose: 1000,
  },
  {
    id: 'dexamethasone',
    name: 'Дексаметазон',
    indication: 'Круп / отёк',
    dosePerKg: 0.15,
    unit: 'мг',
    maxDose: 10,
  },
  {
    id: 'glucose40',
    name: 'Глюкоза 40%',
    indication: 'Гипогликемия',
    dosePerKg: 0.5,
    unit: 'мл',
    note: 'Развести до 10–20% у детей',
  },
]

export function calcWeightDose(drug: WeightDrug, weightKg: number) {
  const raw = drug.dosePerKg * weightKg
  const capped = drug.maxDose ? Math.min(raw, drug.maxDose) : raw
  return { raw, capped, isCapped: drug.maxDose ? raw > drug.maxDose : false }
}

/* ---------- Шкала комы Глазго (GCS) ---------- */
export interface GcsOption {
  score: number
  label: string
}
export interface GcsCategory {
  key: 'eye' | 'verbal' | 'motor'
  title: string
  options: GcsOption[]
}

export const gcsCategories: GcsCategory[] = [
  {
    key: 'eye',
    title: 'Открывание глаз',
    options: [
      { score: 4, label: 'Спонтанное' },
      { score: 3, label: 'На речь' },
      { score: 2, label: 'На боль' },
      { score: 1, label: 'Отсутствует' },
    ],
  },
  {
    key: 'verbal',
    title: 'Речевая реакция',
    options: [
      { score: 5, label: 'Ориентирован' },
      { score: 4, label: 'Спутанная речь' },
      { score: 3, label: 'Отдельные слова' },
      { score: 2, label: 'Нечленораздельные звуки' },
      { score: 1, label: 'Отсутствует' },
    ],
  },
  {
    key: 'motor',
    title: 'Двигательная реакция',
    options: [
      { score: 6, label: 'Выполняет команды' },
      { score: 5, label: 'Локализует боль' },
      { score: 4, label: 'Отдёргивание на боль' },
      { score: 3, label: 'Патологическое сгибание' },
      { score: 2, label: 'Патологическое разгибание' },
      { score: 1, label: 'Отсутствует' },
    ],
  },
]

export function interpretGcs(total: number) {
  if (total >= 13) return { level: 'Лёгкое нарушение сознания', tone: 'ok' as const }
  if (total >= 9) return { level: 'Умеренное нарушение (сопор)', tone: 'warn' as const }
  return { level: 'Тяжёлое (кома), защита дыхательных путей', tone: 'crit' as const }
}

/* ---------- Шкала APGAR ---------- */
export interface ApgarCriterion {
  key: string
  title: string
  options: { score: number; label: string }[]
}

export const apgarCriteria: ApgarCriterion[] = [
  {
    key: 'color',
    title: 'Окраска кожи (Appearance)',
    options: [
      { score: 2, label: 'Розовая' },
      { score: 1, label: 'Тело розовое, конечности синюшные' },
      { score: 0, label: 'Бледная / синюшная' },
    ],
  },
  {
    key: 'pulse',
    title: 'ЧСС (Pulse)',
    options: [
      { score: 2, label: '> 100/мин' },
      { score: 1, label: '< 100/мин' },
      { score: 0, label: 'Отсутствует' },
    ],
  },
  {
    key: 'grimace',
    title: 'Рефлексы (Grimace)',
    options: [
      { score: 2, label: 'Кашель, чихание, крик' },
      { score: 1, label: 'Гримаса' },
      { score: 0, label: 'Нет реакции' },
    ],
  },
  {
    key: 'activity',
    title: 'Мышечный тонус (Activity)',
    options: [
      { score: 2, label: 'Активные движения' },
      { score: 1, label: 'Небольшое сгибание' },
      { score: 0, label: 'Отсутствует' },
    ],
  },
  {
    key: 'respiration',
    title: 'Дыхание (Respiration)',
    options: [
      { score: 2, label: 'Громкий крик' },
      { score: 1, label: 'Слабое, нерегулярное' },
      { score: 0, label: 'Отсутствует' },
    ],
  },
]

export function interpretApgar(total: number) {
  if (total >= 7) return { level: 'Удовлетворительное состояние', tone: 'ok' as const }
  if (total >= 4) return { level: 'Умеренная асфиксия', tone: 'warn' as const }
  return { level: 'Тяжёлая асфиксия, реанимация', tone: 'crit' as const }
}

/* ---------- QTc (Bazett) ---------- */
export function calcQtc(qtMs: number, rrSec: number) {
  if (rrSec <= 0) return 0
  return qtMs / Math.sqrt(rrSec)
}

export function hrToRr(hr: number) {
  if (hr <= 0) return 0
  return 60 / hr
}

export function interpretQtc(qtc: number, sex: 'male' | 'female') {
  const upper = sex === 'male' ? 450 : 460
  if (qtc >= 500) return { level: 'Значительное удлинение — высокий риск', tone: 'crit' as const }
  if (qtc > upper) return { level: 'Удлинён', tone: 'warn' as const }
  if (qtc < 350) return { level: 'Укорочен', tone: 'warn' as const }
  return { level: 'В пределах нормы', tone: 'ok' as const }
}

/* ---------- Витальные показатели: ИМТ и ППТ ---------- */
export function calcBmi(weightKg: number, heightCm: number) {
  if (heightCm <= 0) return 0
  const m = heightCm / 100
  return weightKg / (m * m)
}

export function interpretBmi(bmi: number) {
  if (bmi < 18.5) return { level: 'Дефицит массы тела', tone: 'warn' as const }
  if (bmi < 25) return { level: 'Норма', tone: 'ok' as const }
  if (bmi < 30) return { level: 'Избыточная масса', tone: 'warn' as const }
  return { level: 'Ожирение', tone: 'crit' as const }
}

// Площадь поверхности тела (формула Мостеллера)
export function calcBsa(weightKg: number, heightCm: number) {
  if (weightKg <= 0 || heightCm <= 0) return 0
  return Math.sqrt((weightKg * heightCm) / 3600)
}
