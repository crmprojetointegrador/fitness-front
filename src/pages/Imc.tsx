import { useEffect, useState, type FormEvent } from "react";

type Classificacao = {
  label: string;
  cor: string;
};

function classificarImc(imc: number): Classificacao {
  if (imc < 18.5) return { label: "Abaixo do peso", cor: "#3b82f6" };
  if (imc < 25) return { label: "Peso normal", cor: "#22c55e" };
  if (imc < 30) return { label: "Sobrepeso", cor: "#eab308" };
  if (imc < 35) return { label: "Obesidade Grau I", cor: "#f97316" };
  if (imc < 40) return { label: "Obesidade Grau II", cor: "#ef4444" };
  return { label: "Obesidade Grau III", cor: "#b91c1c" };
}

export default function ImcPage() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const pesoNum = Number(peso.replace(",", "."));
    const alturaNum = Number(altura.replace(",", "."));

    if (!pesoNum || !alturaNum || pesoNum <= 0 || alturaNum <= 0) {
      setErro("Informe peso e altura válidos.");
      setResultado(null);
      return;
    }

    // aceita altura em metros (1.75) ou centímetros (175)
    const alturaEmMetros = alturaNum > 3 ? alturaNum / 100 : alturaNum;

    const imc = pesoNum / (alturaEmMetros * alturaEmMetros);
    setResultado(imc);
    setErro(null);
  }

  const classificacao = resultado !== null ? classificarImc(resultado) : null;


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]"
        style={{ background: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
      >
        <p className="text-gray-600">Carregando calculadora de IMC...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundImage: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Calculadora de IMC</h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Calcule seu Índice de Massa Corporal e veja sua classificação.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              id="peso"
              type="text"
              inputMode="decimal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Ex: 70"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">Altura (m ou cm)</label>
            <input
              id="altura"
              type="text"
              inputMode="decimal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Ex: 1.75 ou 175"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Calcular IMC
          </button>
        </form>

        {erro && <p className="mt-4 text-red-500 text-sm text-center font-medium">{erro}</p>}

        {resultado !== null && classificacao && (
          <div
            className="mt-6 p-4 rounded-xl border-2 text-center animate-in fade-in zoom-in duration-300"
            style={{ borderColor: classificacao.cor, backgroundColor: `${classificacao.cor}10` }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: classificacao.cor }}>
              {resultado.toFixed(1)}
            </div>
            <div className="text-lg font-semibold uppercase tracking-wide" style={{ color: classificacao.cor }}>
              {classificacao.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
