import { products } from "../../data/products";


export default function Produtos() {
  return (
    <main className="grow w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-stone-800">
          Todos os Produtos
        </h1>
        <p className="text-base text-stone-600">
          Confira nosso catálogo completo de livros disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href="#"
            className="flex flex-col bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="w-full h-64 bg-stone-100 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="text-base font-semibold text-stone-800 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-stone-500">{product.author}</p>
              <p className="text-lg font-semibold text-stone-800 mt-2">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
