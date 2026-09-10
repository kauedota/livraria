import { PlusIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import CardProduto from '../cardproduto/CardProduto';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import type Produto from '../../../models/Produto';
import { buscar } from '../../../services/Service';

export default function ListaProdutos() {

	// Objeto responsavel por redirecionar o usuario para outra rota
	const navigate = useNavigate();

	// Estado responsavel por controlar o loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado responsavel por armazenas todos os produtos persistidos no backend (API)
	const [produtos, setProdutos] = useState<Produto[]>([]);


	// Consumo da Context para Obter os dados do usuario autenticado (estado usuario)
	// e a função handleLogout para efetuar logout caso o token seja invalido
	const { usuario, handleLogout } = useContext(AuthContext);

	const token = usuario.token;

	// useEffect para monitorar o token
	useEffect(() => {
		if (token === '') {
			alert('Você precisa estar logado!');
			navigate('/');
		}
	}, [token]);

	//  useEffect responsável por executar a função buscarProdutos
	useEffect(() => {
		buscarProdutos();
	}, [produtos.length]);

	// Função responsavel por buscar todos os produtos do backend (api)
	async function buscarProdutos() {
		try {
			setIsLoading(true);

			await buscar('/produtos', setProdutos, {
				headers: { Authorization: token }
			})
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				alert(`Erro ao consultar os produtos: ${error.response.status}`);

				handleLogout();

			} else {
				alert("Erro ao consultar os produtos! Verifique a conexão com a API!");
			}
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>
			{isLoading && (
				<div className="flex justify-center w-full my-8">
					<SyncLoader color="#312e81" size={32} />
				</div>
			)}
			<main className="grow w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
				<div className="flex justify-between gap-2">

					{(!isLoading && produtos.length === 0) && (
						<span className="text-3xl text-center my-8">
							Nenhum Produto foi encontrado!
						</span>
					)}
					<h1 className="text-3xl md:text-4xl font-semibold text-stone-800">
						Produtos
					</h1>
					<Link
						to="/cadastrarproduto"
						className="flex items-center gap-2 bg-blue-600 text-white text-sm
						font-medium px-5 py-3 rounded-lg hover:bg-blue-700
						transition-colors w-fit">
						<PlusIcon size={18} />
						Novo Produto
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{produtos.map((produto) => (
						<CardProduto
							key={produto.id}
							produto={produto}
						/>
					))}
				</div>
			</main>
		</>
	)
}
