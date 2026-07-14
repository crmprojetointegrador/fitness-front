import { useState, useContext, type FormEvent, type ChangeEvent } from "react";
import { UserContext } from "../context/UserContext";
import { atualizar, deletar } from "../services/Service";
import { toast } from "react-toastify";
import { ToastAlerta } from "../utils/ToastAlerta";

export default function Perfil() {
  const context = useContext(UserContext);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const usuario = context?.usuarioAtual;

  const [formData, setFormData] = useState({
    id: usuario?.id ?? 0,
    nome: usuario?.nome ?? "",
    usuario: usuario?.usuario ?? "",
    foto: usuario?.foto ?? "",
    senha: "",
  });

  if (!context || !usuario) return null;
  const { login, logout } = context;

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCarregando(true);
    try {
      await atualizar("/usuarios/atualizar", formData, (dadosAtualizados: any) => {
        login(dadosAtualizados);
        toast.success("Perfil atualizado com sucesso!");
        setEditando(false);
      });
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Verifique os dados!");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  function cancelarEdicao() {
    if (!usuario) return;
    setFormData({
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto ?? "",
      senha: "",
    });
    setEditando(false);
  }

  async function handleExcluirConta() {
    if (!usuario) return;
    setExcluindo(true);
    try {
      await deletar(`/usuarios/${id}`);
      ToastAlerta("Conta excluída com sucesso!", "sucesso");
      logout();
    } catch (error) {
      ToastAlerta("Erro ao excluir a conta. Tente novamente.", "erro");
      console.error(error);
      setExcluindo(false);
      setConfirmandoExclusao(false);
    }
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center p-4"
      style={{ backgroundImage: "linear-gradient(to right, #C9EED9, #FFFFFF)" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              usuario.foto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=16a34a&color=fff`
            }
            alt={usuario.nome}
            className="w-24 h-24 rounded-full object-cover border-4 border-green-200 mb-3"
          />
          <h2 className="text-2xl font-bold text-gray-800">{usuario.nome}</h2>
          <p className="text-gray-500 text-sm">{usuario.usuario}</p>
        </div>

        {!editando ? (
          <button
            onClick={() => setEditando(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Editar Perfil
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={atualizarEstado}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="usuario"
                value={formData.usuario}
                onChange={atualizarEstado}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Link da Foto
              </label>
              <input
                type="text"
                name="foto"
                placeholder="URL da sua foto de perfil"
                value={formData.foto}
                onChange={atualizarEstado}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nova Senha
              </label>
              <input
                type="password"
                name="senha"
                placeholder="Deixe em branco para manter a senha atual"
                value={formData.senha}
                onChange={atualizarEstado}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                Preencha apenas se quiser trocar sua senha (mínimo 8 caracteres).
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={cancelarEdicao}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={carregando}
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
              >
                {carregando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        )}

        {!editando && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            {!confirmandoExclusao ? (
              <button
                onClick={() => setConfirmandoExclusao(true)}
                className="w-full text-red-600 hover:text-red-800 text-sm font-semibold transition"
              >
                Excluir conta
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700 font-semibold mb-1">
                  Tem certeza que deseja excluir sua conta?
                </p>
                <p className="text-xs text-red-600 mb-4">
                  Essa ação é permanente e não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmandoExclusao(false)}
                    disabled={excluindo}
                    className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleExcluirConta}
                    disabled={excluindo}
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
                  >
                    {excluindo ? "Excluindo..." : "Sim, excluir"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
