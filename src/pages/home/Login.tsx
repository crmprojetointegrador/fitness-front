import { useState, useContext, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logarUsuario } from "../../services/Service";
import { toast } from "react-toastify";

export default function Login() {
  const [dadosLogin, setDadosLogin] = useState({ usuario: "", senha: "" });
  const [carregando, setCarregando] = useState(false);
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { login } = context;

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setDadosLogin({ ...dadosLogin, [e.target.name]: e.target.value });
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setCarregando(true);
    try {
      await logarUsuario("/usuarios/logar", dadosLogin, (usuarioRetornado: any) => {
        login(usuarioRetornado);
        toast.success("Login realizado com sucesso!");
        navigate("/home");
      });
    } catch (error) {
      toast.error("E-mail ou senha inválidos!");
      console.error(error);
    } finally {
      setCarregando(false);
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="usuario"
              placeholder="seu@email.com"
              value={dadosLogin.usuario}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Sua senha"
              value={dadosLogin.senha}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Ainda não tem conta?{" "}
            <Link to="/cadastrar" className="text-green-600 hover:underline font-semibold">
              Cadastre-se aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}