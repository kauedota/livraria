import { BookOpen } from "@phosphor-icons/react";
import { categories } from "../../data/categories";


export default function Categorias() {
  return (
    <main className="grow w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-stone-800">
          Categorias em Destaque
        </h1>
        <p className="text-base text-stone-600">
          Explore os livros por categoria e encontre sua próxima leitura.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href="#"
            className="flex flex-col gap-3 bg-white border border-stone-200 rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-700">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-semibold text-stone-800">
              {category.name}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {category.description}
            </p>
            <span className="text-xs font-medium text-stone-500">
              {category.bookCount} títulos
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
