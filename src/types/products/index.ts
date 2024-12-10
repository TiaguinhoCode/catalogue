export type ItemsProducts = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  category: {
    name: string;
  };
  price: string;
  Banner: { image_url: string }[]; // Array de objetos com a propriedade "image_url"
  promotion: boolean;
  discount_percentage: string;
  discount_price: string;
  created_at: string;
  updated_at: string;
};
