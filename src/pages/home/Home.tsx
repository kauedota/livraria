import { BookOpenIcon, StarFourIcon } from "@phosphor-icons/react"
import Card, { type CardProps } from "../../components/card/Card"

function Home() {

    const opcoes: CardProps[] = [
        {
            icon: <BookOpenIcon size={24} />,
            title: "Produtos",
            imageUrl: "https://images.unsplash.com/photo-1762424361973-617839b3dc4d?fm=jpg&q=80&w=1200&auto=format&fit=crop",
            rota: "/produtos"
        },
        {
            icon: <StarFourIcon size={24} />,
            title: "Categorias",
            imageUrl: "https://ik.imagekit.io/5eywr3ioq/categorias.png",
            rota: "/categorias"
        },
    ]

    return (

        <main className="w-full max-w-[1600px] mx-auto px-4 md:px-8
                    py-8 md:py-16 flex flex-col gap-12"
        >

            {/* Seção Hero */}

            <section className="flex flex-col md:flex-row
                         items-center justify-between
                         gap-8 bg-linear-to-br from-blue-50 via-white to-stone-50 rounded-xl
                         border border-stone-200 p-6
                         md:p-12 shadow-sm"
            >

                {/* Texto */}
                <div className="flex flex-1 flex-col gap-4">
                    <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">
                        Livraria Online
                    </span>
                    <h1 className="text-3xl md:text-5xl font-semibold
                        text-stone-900"
                    >
                        Sua próxima leitura
                    </h1>
                    <p className="text-base text-stone-600">
                        Descubra milhares de títulos, desde best-sellers a clássicos
                        atemporais. A Livraria Online oferece a melhor curadoria para os
                        amantes da leitura.
                    </p>
                    <div className="mt-2">
                        <button className="bg-blue-600 text-white text-base
                              px-6 py-3 rounded-lg hover:bg-blue-700
                              shadow-lg shadow-blue-600/25 transition-all
                              hover:shadow-blue-600/35 active:scale-[0.98]
                              font-medium cursor-pointer"
                        >
                            Explorar Livros
                        </button>
                    </div>
                </div>

                {/* Vídeo */}
                <div className="flex flex-1 w-full h-64 md:h-96 rounded-lg shadow-md ring-1 ring-stone-900/10 overflow-hidden">
                    <video
                        src="https://ik.imagekit.io/zvv7puf6g/videolivraria.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Cards */}

            <section className="flex flex-col gap-6">

                <h2 className="text-2xl font-semibold text-stone-800 border-b
                      border-stone-200 pb-2">
                    Explore o nosso acervo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4
                        md:gap-6">

                    {
                        opcoes.map((opcao) => (
                            <Card
                                key={opcao.title}
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