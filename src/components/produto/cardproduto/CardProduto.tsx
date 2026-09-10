import { Link } from "react-router-dom";
import {
    BookOpenIcon,
    PencilSimpleIcon,
    TrashSimpleIcon,
} from "@phosphor-icons/react";
import type Produto from "../../../models/Produto";


interface CardProdutoProps {
    produto: Produto;
}


function CardProduto({ produto }: CardProdutoProps) {
    return (
        <div className="flex flex-col bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
            <div className="w-full aspect-3/4 bg-stone-100 flex items-center justify-center overflow-hidden p-3">
                {produto.foto ? (
                    <img
                        src={produto.foto}
                        alt={produto.nome}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <BookOpenIcon size={48} weight="light" className="text-stone-400" />
                )}
            </div>

            <div className="p-4 flex flex-col gap-1">
                {produto.categoria && (
                    <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                        {produto.categoria.tipo}
                    </span>
                )}
                <h3 className="text-base font-semibold text-stone-800 line-clamp-2">
                    {produto.nome}
                </h3>
                <p className="text-lg font-semibold text-stone-800 mt-2">
                    {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>

            <div className="flex items-center gap-2 px-4 pb-4">
                <Link
                    to={`/editarproduto/${produto.id}`}
                    className="flex items-center justify-center gap-1 flex-1
                        text-sm font-medium text-blue-700 hover:bg-blue-50
                        py-2 rounded-lg transition-colors"
                >
                    <PencilSimpleIcon size={18} />
                    Editar
                </Link>

                <Link
                    to={`/deletarproduto/${produto.id}`}
                    className="flex items-center justify-center gap-1 flex-1
                        text-sm font-medium text-red-600 hover:bg-red-50
                        py-2 rounded-lg transition-colors"
                >
                    <TrashSimpleIcon size={18} />
                    Excluir
                </Link>
            </div>
        </div>
    );
}


export default CardProduto;
