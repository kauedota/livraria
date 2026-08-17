import type { ReactNode } from "react"
import { ImageIcon } from "@phosphor-icons/react"

export interface CardProps {
    icone: ReactNode
    titulo: string
    imageUrl?: string
}

function Card({ icone, titulo, imageUrl }: CardProps) {
    return (
        <div className="flex flex-col bg-white border border-slate-200 rounded-lg
        cursor-pointer"
        >
            {/* Imagem do Card */}
            <div className="w-full h-48 bg-slate-100 flex
            items-center justify-center overflow-hidden">
                {
                    imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={titulo}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ImageIcon
                            size={48}
                            className="text-slate-400"
                        />
                    )
                }
            </div>
            {/* Ícone + texto do Card */}
            <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-blue-700">{icone}</span>
                    <h3 className="text-xl font-semibold text-slate-800">{titulo}</h3>
                </div>
            </div>
        </div>
    )
}

export default Card