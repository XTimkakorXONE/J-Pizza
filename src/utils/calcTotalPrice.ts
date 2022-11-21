import { TCartItem } from "../redux/cart/type";
export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
