import axios from "axios";
import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {

	// Objeto responsavel por Redirecionar o usuario para outra rota
	const navigate = useNavigate();

	// Responsavel por controlar o loader(animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Estado Responsável por guardar os dados do usuario que serao
	// persistidos (gravados) no banco de dados da minha API
	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
	})
	// Estado responsavel por guardar senha no campo confirmar senha
	const [confirmarSenha, setConfirmarSenha] = useState<string>('');

	// tratar o efeito colateral do sucesso do cadastro
	//redirecionar para pagina de login

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar();
		}
	}, [usuario])


	// Funçao responsavel por atualizar o estado usuario
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		})

	}
	// Funçao responsavel por atualizar o estado confirmarSenha
	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value)
	}
	// Funçao responsavel por enviar uma requisição do tipo POST com os dados do usuário (estado usuario )

	async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

		// impede o envio automatico do formulario
		e.preventDefault();

		// Validação da senha digitada
		if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
			alert("Senhas não conferem e/ou não possuem pelo menos 8 caracteres");
			setUsuario({ ...usuario, senha: '' });
			setConfirmarSenha('');
			return;
		}

		setIsLoading(true);

		try {
			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
			alert("Usuario cadastrado com sucesso!");

		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				alert(`Erro ao cadastrar o usuário: ${error.response.status}`);
			} else {
				alert("Erro ao cadastrar o usuário! Verifique a conexão com a API!");
			}

		} finally {

			setIsLoading(false);
		}

	}

	// Função para retornar para pagina de login
	function retornar() {
		navigate('/');

	}

	return (
		<main className="flex min-h-screen w-full">
			<div className="hidden md:block md:w-1/2 h-screen sticky top-0">
				<div className="relative w-full h-full">
					<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1753045975929-ff17824d0eb8?fm=jpg&q=80&w=1600&auto=format&fit=crop')] bg-no-repeat bg-cover bg-center"></div>
					<div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-stone-950/10 to-transparent"></div>
					<div className="absolute bottom-0 left-0 right-0 p-10">
						<p className="text-2xl font-semibold text-white leading-snug">
							Todo grande leitor precisa de uma boa livraria.
						</p>
						<p className="text-blue-200/90 text-sm mt-2">
							Junte-se à nossa comunidade de leitores.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-1 items-start md:items-center justify-center px-4 pt-20 pb-8 md:py-24">
				<div className="w-full max-w-sm flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						
						<h2 className="text-3xl md:text-4xl font-semibold text-stone-800 text-center">
							Cadastrar Usuário
						</h2>
					</div>

					<form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="nome"
								className="text-sm font-medium text-stone-700"
							>
								Nome
							</label>
							<input
								id="nome"
								name="nome"
								type="text"
								required
								className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="Seu nome completo"
								value={usuario.nome}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="usuario"
								className="text-sm font-medium text-stone-700"
							>
								Usuário (e-mail)
							</label>
							<input
								id="usuario"
								name="usuario"
								type="usuario"
								required
								className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="seu@email.com"
								value={usuario.usuario}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="foto"
								className="text-sm font-medium text-stone-700"
							>
								Foto (URL){' '}
								<span className="text-stone-400 font-normal">
									opcional

								</span>
							</label>
							<input
								id="foto"
								name="foto"
								type="text"
								className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="https://..."
								value={usuario.foto}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="senha"
								className="text-sm font-medium text-stone-700"
							>
								Senha
							</label>
							<input
								id="senha"
								name="senha"
								type="password"
								required
								className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="••••••••"
								value={usuario.senha}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="confirmarSenha"
								className="text-sm font-medium text-stone-700"
							>
								Confirmar Senha
							</label>
							<input
								id="confirmarSenha"
								name="confirmarSenha"
								type="password"
								required
								className="border border-stone-300 rounded-lg px-4 py-2 text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="••••••••"
								value={confirmarSenha}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
							/>
						</div>

						<div className="flex gap-3 mt-2">
							<button
								className="flex-1 text-center border border-stone-300 text-stone-700 text-base px-6 py-3 rounded-lg hover:bg-stone-50 transition-colors font-medium"
								onClick={retornar}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="flex-1 bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
							>
								{
									isLoading ? (
										<ClipLoader

											color="#ffffff"

											size={24}

										/>

									) : (
										<span> Cadastrar </span>
									)
								}
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}

export default Cadastro