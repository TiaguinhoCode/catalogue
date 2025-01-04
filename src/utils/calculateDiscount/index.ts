export function calculateDiscountPrice(price: number, discountPercentage: number) {
  const discountValue = price * (discountPercentage / 100);
  return price - discountValue;
};
