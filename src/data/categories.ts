export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Ficção",
    description: "Romances e narrativas que expandem a imaginação e exploram a condição humana.",
    bookCount: 128,
  },
  {
    id: "2",
    name: "Não Ficção",
    description: "Obras baseadas em fatos reais, história, ciência e biografias marcantes.",
    bookCount: 94,
  },
  {
    id: "3",
    name: "Fantasia",
    description: "Mundos imaginários, magia e aventuras épicas para todas as idades.",
    bookCount: 76,
  },
  {
    id: "4",
    name: "Ficção Científica",
    description: "Tecnologia, futuro e especulações sobre o que está por vir.",
    bookCount: 58,
  },
  {
    id: "5",
    name: "Romance",
    description: "Histórias de amor que emocionam e conquistam leitores de todas as gerações.",
    bookCount: 102,
  },
  {
    id: "6",
    name: "Suspense",
    description: "Mistérios e tramas de tirar o fôlego até a última página.",
    bookCount: 67,
  },
  {
    id: "7",
    name: "Autoajuda",
    description: "Livros para desenvolvimento pessoal, produtividade e bem-estar.",
    bookCount: 45,
  },
  {
    id: "8",
    name: "Distopia",
    description: "Narrativas que questionam sociedades e futuros alternativos sombrios.",
    bookCount: 33,
  },
];
