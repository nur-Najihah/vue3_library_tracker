export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  status: 'Reading' | 'Completed' | 'Want to Read';
  
}