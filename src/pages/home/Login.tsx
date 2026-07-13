import { useState, useContext, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Login() {
  const [idSelecionado, setIdSelecionado] = useState("1");
  const [senha, setSenha] = useState("");
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { login } = context;

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (senha !== "123456") {
      toast.error("Senha incorreta! Use '123456' para testar.");
      return;
    }

    const sucesso = login(Number(idSelecionado));
    if (sucesso) {
      toast.success("Login realizado com sucesso!");
      navigate("/home");
    }
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center p-4"
      style={{ backgroundImage: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Acessar PowerPlace</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Selecione seu Usuário</label>
            <select
              value={idSelecionado}
              onChange={(e) => setIdSelecionado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-gray-50 text-gray-800 font-medium"
            >
              <option value="1">Alanis Santos</option>
              <option value="2">Bruna Mendes</option>
              <option value="3">Eliane Orlandin</option>
              <option value="4">Flame Souza</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Senha de Teste</label>
            <input
              type="password"
              placeholder="Digite 123456"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}