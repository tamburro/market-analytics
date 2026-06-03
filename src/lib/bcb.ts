import { format, subDays, subMonths } from 'date-fns';

const BCB_BASE = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.';

interface SeriesPoint {
  date: string;
  value: number;
}

async function fetchSeries(code: number, startDate: Date, endDate: Date): Promise<SeriesPoint[]> {
  const start = format(startDate, 'dd/MM/yyyy');
  const end = format(endDate, 'dd/MM/yyyy');
  const url = `${BCB_BASE}${code}/dados?formato=json&dataInicial=${start}&dataFinal=${end}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((d: { data: string; valor: string }) => ({
    date: d.data.split('/').reverse().join('-'),
    value: parseFloat(d.valor),
  }));
}

// Série 433 = IPCA variação mensal (%)
export async function fetchIPCA(months = 24): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subMonths(end, months);
  return fetchSeries(433, start, end);
}

// Série 4389 = CDI diário (% a.a.)
export async function fetchCDI(days = 365): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subDays(end, days);
  return fetchSeries(4389, start, end);
}

// Série 4189 = Selic Meta (% a.a.)
export async function fetchSelic(months = 60): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subMonths(end, months);
  return fetchSeries(4189, start, end);
}

// Série 1 = Dólar PTAX compra
export async function fetchDolar(days = 365): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subDays(end, days);
  return fetchSeries(1, start, end);
}

// Série 21619 = Euro PTAX compra
export async function fetchEuro(days = 365): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subDays(end, days);
  return fetchSeries(21619, start, end);
}

// Série 189 = IGP-M variação mensal (%)
export async function fetchIGPM(months = 24): Promise<SeriesPoint[]> {
  const end = new Date();
  const start = subMonths(end, months);
  return fetchSeries(189, start, end);
}
