import { BookOpenIcon } from "@phosphor-icons/react"
import Card, { type CardProps } from "../../components/card/Card"
import { StarFourIcon } from "@phosphor-icons/react/dist/ssr"

function Home() {

    const opcoes: CardProps[] = [
        {
            icone: <BookOpenIcon size={24} />,
            titulo: "Produtos",
            imageUrl: "https://ik.imagekit.io/5eywr3ioq/livros.png"
        },
        {
            icone: <StarFourIcon size={24} />,
            titulo: "Categorias",
            imageUrl: "https://ik.imagekit.io/5eywr3ioq/categorias.png"
        },
    ]

    return (

        <main className="w-full max-w-7xl mx-auto px-4 md:px-8
                    py-8 md:py-16 flex flex-col gap-12"
        >

            {/* Seção Hero */}

            <section className="flex flex-col md:flex-row
                         items-center justify-between
                         gap-8 bg-white rounded-xl
                         border border-slate-200 p-6
                         md:p-12 shadow-sm"
            >

                {/* Texto */}
                <div className="flex flex-1 flex-col gap-4">
                    <h1 className="text-3xl md:text-4xl font-semibold
                        text-slate-800"
                    >
                        Sua próxima leitura
                    </h1>
                    <p className="text-base text-slate-600">
                        Descubra milhares de títulos, desde best-sellers a clássicos
                        atemporais. A Livraria Online oferece a melhor curadoria para os
                        amantes da leitura.
                    </p>
                    <div className="mt-2">
                        <button className="bg-blue-600 text-white text-base
                              px-6 py-3 rounded-lg hover:bg-blue-700
                              font-medium cursor-pointer"
                        >
                            Explorar Livros
                        </button>
                    </div>
                </div>

                {/* Imagem */}
                <div className="flex flex-1 w-full h-64 md:h-80 rounded-lg border">
                    <img
                        src="https://ik.imagekit.io/5eywr3ioq/hero.png"
                        alt="Imagem da Seção Hero - Foto da Livraria"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Cards */}

            <section className="flex flex-col gap-6">

                <h2 className="text-2xl font-semibold text-slate-800 border-b
                      border-slate-200 pb-2">
                    Explore o nosso acervo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4
                        md:gap-6">

                    {
                        opcoes.map((opcao) => (
                            <Card
                                key={opcao.titulo}
                                {...opcao}
                            />
                        ))
                    }
                </div>
            </section>

        </main>
    )
}

export default Home