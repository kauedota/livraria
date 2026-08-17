import { ShoppingCartIcon, UserIcon } from "@phosphor-icons/react";

export default function Navbar() {
    return (
        <header className="bg-white border-b border-slate-200 w-full top-0 sticky z-50">
            <div className="flex justify-between items-center w-full px-4 md:px-8 py-2 max-w-7xl mx-auto">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <img
                        alt="Livraria Online Logo"
                        className="h-16 w-auto"
                        src="https://ik.imagekit.io/5eywr3ioq/logo_livraria.svg"
                    />
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex gap-6 items-center">
                    <a
                        className="text-slate-800 hover:text-blue-700 hover:underline transition-colors text-base"
                        href="#"
                    >
                        Home
                    </a>
                    <a
                        className="text-slate-800 hover:text-blue-700 hover:underline transition-colors text-base"
                        href="#"
                    >
                        Produtos
                    </a>
                    <a
                        className="text-slate-800 hover:text-blue-700 hover:underline transition-colors text-base"
                        href="#"
                    >
                        Categorias
                    </a>
                </nav>

                {/* Trailing Icons */}
                <div className="flex items-center gap-4">
                    <button
                        className="text-blue-700 hover:bg-slate-100 transition-all p-1 rounded-full"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingCartIcon size={24} />
                    </button>
                    <button
                        className="text-blue-700 hover:bg-slate-100 transition-all p-1 rounded-full"
                        aria-label="Minha conta"
                    >
                        <UserIcon size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}