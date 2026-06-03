import { fetchSelic, fetchIPCA, fetchDolar, fetchEuro, fetchIGPM } from '@/lib/bcb';
import Dashboard from '@/components/Dashboard';

export const revalidate = 3600;

export default async function Home() {
  const [selic, ipca, dolar, euro, igpm] = await Promise.all([
    fetchSelic(60),
    fetchIPCA(24),
    fetchDolar(365),
    fetchEuro(365),
    fetchIGPM(24),
  ]);

  return (
    <main className="min-h-screen bg-background p-4 md:p-6 max-w-[1400px] mx-auto">
      <header className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-yellow">Market Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Indicadores macroeconômicos brasileiros — dados do Banco Central do Brasil
        </p>
      </header>

      <Dashboard selic={selic} ipca={ipca} dolar={dolar} euro={euro} igpm={igpm} />

      <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        Dados públicos via API do Banco Central do Brasil (SGS) • Atualização a cada hora
      </footer>
    </main>
  );
}
