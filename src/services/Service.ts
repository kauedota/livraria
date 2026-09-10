import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://livraria-spring-dhpx.onrender.com/",
});

type SetDados = (dados: any) => void;

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: SetDados
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (
  url: string,
  dados: object,
  setDados: SetDados
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: SetDados,
  header: AxiosRequestConfig
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: object,
  setDados: SetDados,
  header: AxiosRequestConfig
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: object,
  setDados: SetDados,
  header: AxiosRequestConfig
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: AxiosRequestConfig) => {
  await api.delete(url, header);
};
