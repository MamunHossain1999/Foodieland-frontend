export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: Author;
  date: string;
  category: string;
}
