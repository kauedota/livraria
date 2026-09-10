import { ImageIcon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom';

export interface CardProps {
	icon: ReactNode
	title: string
	imageUrl?: string
	rota: string
}

export default function Card({ icon, title, imageUrl, rota }: CardProps) {
	return (
		<div className="flex flex-col bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
			<div className="w-full h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
				{imageUrl ? (
					<Link to={rota} className="cursor-pointer">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-full object-cover"
					/>
					</Link>
				) : (
					<ImageIcon
						size={48}
						weight="light"
						className="text-stone-400"
					/>
				)}
			</div>
			<div className="p-6 flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<span className="text-blue-700">{icon}</span>
					<h3 className="text-xl font-semibold text-stone-800">
						{title}
					</h3>
				</div>
			</div>
		</div>
	)
}