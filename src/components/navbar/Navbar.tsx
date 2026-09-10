import { ListIcon, ShoppingCartIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
 
export default function Navbar() {
 
  const [menuAberto, setMenuAberto] = useState<boolean>(false)
 
  return (
 
 <header className="fixed top-0 w-full z-50 border-b border-stone-200 shadow-sm bg-white/75 backdrop-blur-md">
      <nav className="flex items-center justify-between px-4 md:px-16 py-3 max-w-[1600px] mx-auto">
        {/* Marca */}
        <Link
          to="/"
          className="flex items-center cursor-pointer active:scale-95 transition-transform"
          onClick={() => setMenuAberto(false)}
        >
          <img
            alt="Livraria Online Logo"
            className="h-16 w-auto"
            src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.svg"
          />
        </Link>
 
        {/* Links de navegação (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-base">
          <Link to="/" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1">
            Home
          </Link>
          <Link to="/produtos" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1">
            Produtos
          </Link>
          <Link to="/categorias" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1">
            Categorias
          </Link>
        </div>
 
         {/* Trailing Icons */}
        <div className="hidden md:visible md:flex md:items-center md:not-even:gap-4">
          <button
            className="text-blue-700 hover:bg-stone-100 transition-all p-1 rounded-full"
            aria-label="Carrinho de compras"
          >
            <ShoppingCartIcon size={24} />
          </button>
          <button
            className="text-blue-700 hover:bg-stone-100 transition-all p-1 rounded-full"
            aria-label="Minha conta"
          >
            <UserIcon size={24} />
          </button>
        </div>
 
        {/* Botão hambúrguer (Mobile) */}
        <button
          className="md:hidden text-stone-600"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? <XIcon size={28} /> : <ListIcon size={28} />}
        </button>
      </nav>
 
      {/* Links de navegação (Mobile) — sem bg próprio, herda a transparência do header */}
      <div
        className={`${
          menuAberto ? "flex" : "hidden"
        } md:hidden flex-col items-center gap-2 text-base border-t border-stone-200 px-4 py-4`}
      >
        <Link to="/" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1" onClick={() => setMenuAberto(false)}>
          Home
        </Link>
        <Link to="/produtos" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1" onClick={() => setMenuAberto(false)}>
          Produtos
        </Link>
        <Link to="/categorias" className="cursor-pointer active:scale-95 transition-transform text-stone-600 hover:text-blue-600 hover:underline px-3 py-1" onClick={() => setMenuAberto(false)}>
          Categorias
        </Link>
      </div>
 
     
    </header>
   
  );
}
 