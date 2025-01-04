export type ItemsProducts = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  category: {
    id: string;
    name: string;
  };
  price: string;
  Banner: { image_url: string }[]; 
  promotion: boolean;
  discount_percentage: string;
  discount_price: string;
  created_at: string;
  updated_at: string;
};
