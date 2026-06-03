'use client';

import MetricCard from '@/components/MetricCard';
import AreaChartCard from '@/components/AreaChartCard';
import BarChartCard from '@/components/BarChartCard';
import LineChartCard from '@/components/LineChartCard';
import ComposedChartCard from '@/components/ComposedChartCard';

interface SeriesPoint {
  date: string;
  value: number;
}

interface Props {
  selic: SeriesPoint[];
  ipca: SeriesPoint[];
  dolar: SeriesPoint[];
  euro: SeriesPoint[];
  igpm: SeriesPoint[];
}

export default function Dashboard({ selic, ipca, dolar, euro, igpm }: Props) {
  const lastSelic = selic[selic.length - 1]?.value ?? 0;
  const lastDolar = dolar[dolar.length - 1]?.value ?? 0;
  const lastEuro = euro[euro.length - 1]?.value ?? 0;
  const lastIPCA = ipca[ipca.length - 1]?.value ?? 0;

  const prevDolar = dolar[dolar.length - 2]?.value ?? lastDolar;
  const dolarChange = prevDolar ? ((lastDolar - prevDolar) / prevDolar) * 100 : 0;
  const prevEuro = euro[euro.length - 2]?.value ?? lastEuro;
  const euroChange = prevEuro ? ((lastEuro - prevEuro) / prevEuro) * 100 : 0;

  const currencyData = dolar.map((d) => {
    const euroPoint = euro.find((e) => e.date === d.date);
    return { date: d.date, dolar: d.value, euro: euroPoint?.value ?? 0 };
  }).filter(d => d.euro > 0);

  const selicIPCAData = selic.slice(-24).map((s) => {
    const ipcaPoint = ipca.find((i) => i.date === s.date);
    return { date: s.date, selic: s.value, ipca: ipcaPoint?.value ?? 0 };
  });

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Selic Meta" value={`${lastSelic.toFixed(2)}%`} icon="📊" />
        <MetricCard label="IPCA (último)" value={`${lastIPCA.toFixed(2)}%`} icon="📈" />
        <MetricCard label="Dólar (PTAX)" value={`R$ ${lastDolar.toFixed(4)}`} change={dolarChange} icon="💵" />
        <MetricCard label="Euro (PTAX)" value={`R$ ${lastEuro.toFixed(4)}`} change={euroChange} icon="💶" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AreaChartCard
          title="Taxa Selic — Últimos 5 anos"
          data={selic}
          color="#fcd535"
          unit="% a.a."
          formatValue={(v) => `${v.toFixed(1)}%`}
        />
        <AreaChartCard
          title="Dólar PTAX — 12 meses"
          data={dolar}
          color="#0ecb81"
          formatValue={(v) => `R$ ${v.toFixed(2)}`}
        />
        <BarChartCard title="IPCA Mensal — 24 meses" data={ipca} unit="%" />
        <BarChartCard title="IGP-M Mensal — 24 meses" data={igpm} unit="%" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <LineChartCard
          title="Câmbio — Dólar vs Euro (12 meses)"
          data={currencyData}
          series={[
            { key: 'dolar', name: 'USD/BRL', color: '#0ecb81' },
            { key: 'euro', name: 'EUR/BRL', color: '#fcd535' },
          ]}
        />
        <ComposedChartCard
          title="Selic × IPCA"
          data={selicIPCAData}
          areaKey="selic"
          areaName="Selic (% a.a.)"
          barKey="ipca"
          barName="IPCA (%)"
          areaColor="#fcd535"
          barColor="#0ecb81"
        />
      </section>
    </>
  );
}
