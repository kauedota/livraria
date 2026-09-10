import { PlusIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import CardCategoria from '../cardcategoria/CardCategoria';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import { buscar } from '../../../services/Service';

export default function Categorias() {

	// Objeto responsavel por redirecionar o usuario para outra rota
	const navigate = useNavigate();

	// Estado responsavel por controlar o loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado responsavel por armazenas todos as categorias persistidos no backENd API
	const [categorias, setCategorias] = useState<Categoria[]>([]);


	// Consumo da Context para Obter os dados do usuario autenticado (estado usuario)
	//e a função handlelogout para efetuar logout caso o token seja invalido
	const { usuario, handleLogout } = useContext(AuthContext);

	const token = usuario.token;

	// useEffect para monitorar o token
	useEffect(() => {
		if (token === '') {
			alert('Você precisa estar logado!');
			navigate('/');
		}
	}, [token]);

	//  useEffect responsável por executar a função buscarCategorias
	useEffect(() => {
		buscarCategorias();
	}, [categorias.length]);

	// Função responsavel por buscar todos as categorias do backend (api)
	async function buscarCategorias() {
		try {
			setIsLoading(true);

			await buscar('/categorias', setCategorias, {
				headers: { Authorization: token }
			})
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				alert(`Erro ao consultar as categorias: ${error.response.status}`);

				handleLogout();

			} else {
				alert("Erro ao consultar as categorias! Verifique a conexão com a API!");
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
			<main className="grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
				<div className="flex justify-between gap-2">

					{(!isLoading && categorias.length === 0) && (
						<span className="text-3xl text-center my-8">
							Nenhuma Categoria foi encontrado!
						</span>
					)}
					<h1 className="text-3xl md:text-4xl font-semibold text-stone-800">
						Categorias
					</h1>
					<Link
						to="/cadastrarcategoria"
						className="flex items-center gap-2 bg-blue-600 text-white text-sm
						font-medium px-5 py-3 rounded-lg hover:bg-blue-700
						transition-colors w-fit">
						<PlusIcon size={18} />
						Nova Categoria
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{categorias.map((categoria) => (
						<CardCategoria
							key={categoria.id}
							categoria={categoria}
						/>
					))}
				</div>
			</main>
		</>
	)
}