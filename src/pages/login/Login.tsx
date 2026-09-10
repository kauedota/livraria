import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { EnvelopeSimpleIcon, LockKeyIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

	// Objeto responsavel por redirecionar o usuario para outra rota
	const navigate = useNavigate();

	// Responsavel por controlar o loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Consumo da Context para obter os dados do usuario autenticado (estado usuario)
	// e a função handleLogin para efetuar o login
	const { usuario, handleLogin } = useContext(AuthContext);

	// Estado responsável por armazenar os dados do formulário de login
	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
		token: '',
	});

	// tratar o efeito colateral do sucesso do login
	// redirecionar para a página inicial
	useEffect(() => {
		if (usuario.token !== '') {
			navigate('/home');
		}
	}, [usuario]);

	// Função responsável por atualizar o estado usuarioLogin
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		})
	}

	// Função responsável por enviar uma requisição de login
	async function login(e: SyntheticEvent<HTMLFormElement>) {

		// impede o envio automático do formulário
		e.preventDefault();

		setIsLoading(true);

		try {
			await handleLogin(usuarioLogin);
		} catch (error) {
			alert("Usuário e/ou senha inválidos!");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-24">
			{/* Fundo */}
			<div
				className="absolute inset-0 bg-[url('https://ik.imagekit.io/5eywr3ioq/hero.png')] bg-cover bg-center"
			/>
			<div className="absolute inset-0 bg-linear-to-br from-stone-950/80 via-stone-900/60 to-blue-950/80" />

			{/* Cartão de login */}
			<div className="relative z-10 w-full max-w-sm">
				<div className="flex flex-col gap-8 rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-xl md:p-10">
					<div className="flex flex-col gap-2 text-center">
						<h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
							Bem-vindo
						</h2>
						<p className="text-sm text-stone-500">
							Entre com sua conta para continuar
						</p>
					</div>

					<form className="flex flex-col gap-5" onSubmit={login}>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="usuario"
								className="text-sm font-medium text-stone-700"
							>
								Usuário (e-mail)
							</label>
							<div className="relative">
								<EnvelopeSimpleIcon
									size={20}
									className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
								/>
								<input
									id="usuario"
									name="usuario"
									type="text"
									required
									className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-11 pr-4 py-3 text-base text-stone-800 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
									placeholder="seu@email.com"
									value={usuarioLogin.usuario}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="senha"
								className="text-sm font-medium text-stone-700"
							>
								Senha
							</label>
							<div className="relative">
								<LockKeyIcon
									size={20}
									className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
								/>
								<input
									id="senha"
									name="senha"
									type="password"
									required
									className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-11 pr-4 py-3 text-base text-stone-800 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
									placeholder="••••••••"
									value={usuarioLogin.senha}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="mt-2 flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98] disabled:opacity-70"
						>
							{
								isLoading ? (
									<ClipLoader color="#ffffff" size={22} />
								) : (
									<span>Entrar</span>
								)
							}
						</button>
					</form>

					<p className="text-sm text-stone-500 text-center">
						Ainda não tem uma conta?{' '}
						<Link to="/cadastro" className="font-medium text-blue-700 hover:underline">
							Cadastre-se
						</Link>
					</p>
				</div>
			</div>
		</main>
	)
}

export default Login
