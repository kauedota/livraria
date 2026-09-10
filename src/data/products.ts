export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "A Sombra do Vento",
    author: "Carlos Ruiz Zafón",
    price: 54.9,
    category: "Ficção",
    imageUrl: "https://picsum.photos/seed/livro-01/400/560",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 39.9,
    category: "Distopia",
    imageUrl: "https://picsum.photos/seed/livro-02/400/560",
  },
  {
    id: "3",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    price: 64.5,
    category: "Não Ficção",
    imageUrl: "https://picsum.photos/seed/livro-03/400/560",
  },
  {
    id: "4",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    price: 49.9,
    category: "Fantasia",
    imageUrl: "https://picsum.photos/seed/livro-04/400/560",
  },
  {
    id: "5",
    title: "A Culpa é das Estrelas",
    author: "John Green",
    price: 34.9,
    category: "Romance",
    imageUrl: "https://picsum.photos/seed/livro-05/400/560",
  },
  {
    id: "6",
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    price: 44.9,
    category: "Autoajuda",
    imageUrl: "https://picsum.photos/seed/livro-06/400/560",
  },
  {
    id: "7",
    title: "Duna",
    author: "Frank Herbert",
    price: 59.9,
    category: "Ficção Científica",
    imageUrl: "https://picsum.photos/seed/livro-07/400/560",
  },
  {
    id: "8",
    title: "O Assassinato de Roger Ackroyd",
    author: "Agatha Christie",
    price: 42.9,
    category: "Suspense",
    imageUrl: "https://picsum.photos/seed/livro-08/400/560",
  },
];
