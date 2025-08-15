export interface Post {
  username: string;
  location: string;
  images?: string; 
  currentImageIndex: number;
  likes: number;
  likedBy: string[];
  caption: string;
  date: string;
};

