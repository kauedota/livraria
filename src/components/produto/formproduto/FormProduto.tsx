import axios from "axios";
import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormProduto() {
  // Objeto responsável redirecionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Estado responsável por controlar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado responsável por armazenar os dados do produto que será persistido no Backend (API)
  const [produto, setProduto] = useState<Produto>({} as Produto);

  // Estado responsável por armazenar a categoria selecionada no formulário
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  // Estado responsável por armazenar todas as categorias, para preencher o select
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Consumo da Context para obter os dados do usuário autenticado (estado usuario)
  // e a função handleLogout para efetuar logout caso o token seja inválido
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Acessar o parâmetro da rota (id do produto)
  const { id } = useParams<{ id: string }>();

  // Função responsável por buscar todas as categorias no Backend (API)
  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token }
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout();
      }
    }
  }

  // Função responsável por buscar um produto pelo ID no Backend (API)
  async function buscarProdutoPorId() {

    setIsLoading(true);

    try {

      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token }
      })

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(`Erro ao consultar o produto: ${error.response.status}`);
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect para carregar as categorias assim que o componente é montado
  useEffect(() => {
    buscarCategorias();
  }, [])

  // useEffect para monitorar o id (parâmetro da rota)
  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId();
    }
  }, [id])

  // useEffect para atualizar o estado categoria assim que o produto for carregado
  useEffect(() => {
    if (produto.categoria !== undefined && produto.categoria !== null) {
      setCategoria(produto.categoria);
    }
  }, [produto])

  // useEffect para monitorar o token
  useEffect(() => {
    if (token === '') {
      alert("Você precisa estar logado!");
      navigate('/');
    }
  }, [token])

  // Função responsável por atualizar o estado produto
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
    })
  }

  // Função responsável por atualizar a categoria selecionada
  function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoriaSelecionada = categorias.find(
      (categoria) => categoria.id === Number(e.target.value)
    );

    if (categoriaSelecionada !== undefined) {
      setCategoria(categoriaSelecionada);
      setProduto({
        ...produto,
        categoria: categoriaSelecionada,
      })
    }
  }

  // Função responsável por enviar uma requisição do tipo POST ou PUT
  // com os dados do produto (estado produto)
  async function gerarNovoProduto(e: SyntheticEvent<HTMLFormElement>) {

    // Impede o envio automático do formulário
    e.preventDefault();

    setIsLoading(true);

    if (id !== undefined) {

      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: { Authorization: token }
        });
        alert("Produto atualizado com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Erro ao atualizar o produto: ${error.response?.status}`);
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
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: { Authorization: token }
        });
        alert("Produto cadastrado com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Erro ao cadastrar o produto: ${error.response?.status}`);
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
    navigate("/produtos");
  }

  const carregandoCategoria = categoria.tipo === undefined;

  return (
    <main className="grow w-full max-w-3xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-stone-800 text-center">
          {id === undefined ? 'Cadastrar' : 'Editar'} Produto
        </h1>
      </div>

      <form
        className="flex flex-col gap-5 bg-white border border-stone-200 rounded-lg p-6 md:p-8"
        onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-sm font-medium text-stone-700">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: A Sombra do Vento"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco" className="text-sm font-medium text-stone-700">
            Preço
          </label>
          <input
            id="preco"
            name="preco"
            type="number"
            step="0.01"
            required
            className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: 54.90"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto" className="text-sm font-medium text-stone-700">
            Foto (URL)
          </label>
          <input
            id="foto"
            name="foto"
            type="text"
            className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://..."
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-sm font-medium text-stone-700">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={categoria.id ?? ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarCategoria(e)}
          >
            <option value="" disabled>Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            type="submit"
            disabled={carregandoCategoria}
            className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {
              isLoading ? (
                <ClipLoader
                  color="#ffffff"
                  size={24}
                />
              ) : (
                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'} Produto</span>
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

export default FormProduto
