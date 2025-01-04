export interface ProductDto {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  brand: string;
  category: string;
  images?: string;
  price: number;
}
