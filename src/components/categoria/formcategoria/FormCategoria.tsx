import axios from "axios";
import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormCategoria() {
  // Objeto responsável redirecionar o categoria para uma outra rota
  const navigate = useNavigate();

  // Estado responsável por controlar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado responsável por armazenar os dados da categoria que será persistido no Backend (API)
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  // Consumo da Context para obter os dados da categoria autenticado (estado usuario)
  // e a função handleLogout para efetuar logout caso o token seja inválido
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Acessar o parâmetro da rota (id da categoria)
  const { id } = useParams<{ id: string }>();

  // Função responsável por buscar uma categoria pelo ID no Backend (API)
  async function buscarCategoriaPorId() {

    setIsLoading(true);

    try {

      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token }
      })

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(`Erro ao consultar a categoria: ${error.response.status}`);
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect para monitorar o id (parâmetro da rota)
  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId();
    }
  }, [id])


  // useEffect para monitorar o token
  useEffect(() => {
    if (token === '') {
      alert("Você precisa estar logado!");
      navigate('/');
    }
  }, [token])

  // Função responsável por atualizar  o estado categoria
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    })
  }

  // Função responsável por enviar uma requisição do tipo POST ou PUT
  // com os dados da categoria (estado categoria)
  async function gerarNovaCategoria(e: SyntheticEvent<HTMLFormElement>) {

    // Impede o envio automático do formulário
    e.preventDefault();

    setIsLoading(true);

    if (id !== undefined) {

      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token }
        });
        alert("Categoria atualizado com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Erro ao atualizar a categoria: ${error.response?.status}`);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
        return;
      }
      finally {
        setIsLoading(false);
      }

    } else {

      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token }
        });
        alert("Categoria cadastrado com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Erro ao cadastrar a categoria: ${error.response?.status}`);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
        return;
      } finally {
        setIsLoading(false);
      }

    }

    retornar();

  }

  function retornar() {
    navigate("/categorias");
  }


  return (
    <main className="grow w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-24 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-stone-800 text-center">
          {id === undefined ? 'Cadastrar' : 'Editar'} Categoria
        </h1>
      </div>

      <form
        className="flex flex-col gap-5 bg-white border border-stone-200 rounded-lg p-6 md:p-8"
        onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="tipo" className="text-sm font-medium text-stone-700">
            Nome
          </label>
          <input
            id="tipo"
            name="tipo"
            type="text"
            required
            className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: Ficção"
            value={categoria.tipo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

          />
        </div>

        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {
              isLoading ? (
                <ClipLoader
                  color="#ffffff"
                  size={24}
                />
              ) : (
                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'} Categoria</span>
              )
            }
          </button>
          <button
            type="button"
            onClick={retornar}
            className="text-base px-6 py-3 rounded-lg border border-stone-300
        text-stone-700 hover:bg-stone-50 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default FormCategoria