import { WarningCircleIcon } from '@phosphor-icons/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Produto from '../../../models/Produto';
import { buscar, deletar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';

function DeletarProduto() {

	// Objeto responsável redirecionar o usuário para uma outra rota
	const navigate = useNavigate();

	// Estado responsável por controlar o loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado responsável por armazenar os dados do produto que será deletado no Backend (API)
	const [produto, setProduto] = useState<Produto>({} as Produto);

	// Consumo da Context para obter os dados do usuário autenticado (estado usuario)
	// e a função handleLogout para efetuar logout caso o token seja inválido
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	// Acessar o parâmetro da rota (id do produto)
	const { id } = useParams<{ id: string }>();

	// Função responsável por buscar um produto pelo ID no Backend (API)
	async function buscarProdutoPorId() {

		setIsLoading(true);

		try {

			await buscar(`/produtos/${id}`, setProduto, {
				headers: { Authorization: token }
			})

		} catch (error) {
			if (axios.isAxiosError(error)) {
				alert(`Erro ao consultar o produto: ${error.response?.status}`);
				if (error.response?.status === 401) {
					handleLogout();
				}
			}
			return;
		} finally {
			setIsLoading(false);
		}

	}

	// useEffect para monitorar o id (parâmetro da rota)
	useEffect(() => {
		if (id !== undefined) {
			buscarProdutoPorId();
		}
	}, [id])


	// useEffect para monitorar o token
	useEffect(() => {
		if (token === '') {
			alert("Você precisa estar logado!");
			navigate('/');
		}
	}, [token])

	// Função responsável por deletar um produto pelo ID no Backend (API)
	async function deletarProduto() {

		setIsLoading(true);

		try {

			await deletar(`/produtos/${id}`, {
				headers: { Authorization: token }
			})

			alert('Produto deletado com sucesso!')

		} catch (error) {
			if (axios.isAxiosError(error)) {
				alert(`Erro ao deletar o produto: ${error.response?.status}`);
				if (error.response?.status === 401) {
					handleLogout();
				}
			}
		} finally {
			setIsLoading(false);
		}

		retornar();
	}

	function retornar() {
		navigate("/produtos");
	}

	return (
		<main className="grow w-full max-w-xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
			<div className="flex flex-col items-center text-center gap-3 bg-white border border-stone-200 rounded-lg p-8">
				<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-600">
					<WarningCircleIcon size={32} />
				</div>
				<h1 className="text-2xl font-semibold text-stone-800">
					Excluir Produto
				</h1>

				<p className="text-base text-stone-600">
					Tem certeza que deseja excluir o produto
					<span className="font-semibold text-stone-800">
						{' '}{produto.nome}
					</span>
					?
				</p>

				<div className="flex items-center justify-center gap-3 mt-4">
					<button className="bg-green-600 text-white text-base px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium"
						onClick={deletarProduto}
					>
						{
							isLoading ? (
								<ClipLoader
									color="#ffffff"
									size={24}
								/>
							) : (
								<span>Sim</span>
							)
						}
					</button>
					<button className="bg-red-600 text-white text-base px-6 py-3 rounded-lg border border-stone-300 hover:bg-red-700 transition-colors font-medium"
						onClick={retornar}>
						Não
					</button>
				</div>
			</div>
		</main>
	)
}

export default DeletarProduto
