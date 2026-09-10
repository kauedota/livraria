import { Link } from "react-router-dom";
import {
    BookOpenIcon,
    PencilSimpleIcon,
    TrashSimpleIcon,
} from "@phosphor-icons/react";
import type Categoria from "../../../models/Categoria";


interface CardCategoriaProps {
    categoria: Categoria;
}


function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div className="flex flex-col gap-3 bg-white border border-stone-200
            rounded-lg p-6 hover:shadow-lg transition-all">


            <div className="flex flex-row items-center gap-3 pb-2
                border-b border-stone-200">


                <div className="flex items-center justify-center w-12 h-12
                    rounded-lg bg-blue-50 text-blue-700">
                    <BookOpenIcon size={24} />
                </div>


                <h2 className="text-2xl font-semibold text-gray-900">
                    Categoria
                </h2>
            </div>


            <h3 className="text-xl font-semibold text-stone-800">
                {categoria.tipo}
            </h3>


            <div className="flex items-center gap-2 mt-2 pt-3
                border-t border-stone-200">


                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    className="flex items-center justify-center gap-1 flex-1
                        text-sm font-medium text-blue-700 hover:bg-blue-50
                        py-2 rounded-lg transition-colors"
                >
                    <PencilSimpleIcon size={18} />
                    Editar
                </Link>


                <Link
                    to={`/deletarcategoria/${categoria.id}`}
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


export default CardCategoria;