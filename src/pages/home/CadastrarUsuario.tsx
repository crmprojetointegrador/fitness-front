import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { toast } from "react-toastify";

export default function CadastrarUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.nome || !formData.usuario || !formData.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      await cadastrarUsuario("/usuarios/cadastrar", formData, setFormData);
      toast.success("Usuária cadastrada com sucesso!");
      navigate("/login");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("Este e-mail já está cadastrado. Tente fazer login.");
      } else {
        toast.error("Erro ao cadastrar a usuária. Verifique os dados!");
      }
      console.error(error);
    }
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center p-4"
      style={{ backgroundImage: 'linear-gradient(to right, #C9EED9, #FFFFFF)' }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Cadastrar Usuário</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Seja um novo integrante no PowerPlace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo *</label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: Alanis Santos"
              value={formData.nome}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail (Usuário) *</label>
            <input
              type="email"
              name="usuario"
              placeholder="Ex: email@dominio.com"
              value={formData.usuario}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Senha *</label>
            <input
              type="password"
              name="senha"
              placeholder="Mínimo 8 caracteres"
              value={formData.senha}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Link da Foto (Opcional)</label>
            <input
              type="text"
              name="foto"
              placeholder="URL da sua foto de perfil"
              value={formData.foto}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition mt-2"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}