import { addCartItem, CartItem, deleteCartItems, cartList } from "@/app/api/cart/route";
import { Product } from "@/app/api/products/route";
import { create } from "zustand";

type cartState = {
  itemCount: number;
  cartList: CartItem[];
};
export type cartStoreType = {
  itemCount: number;
  cartList: CartItem[];
  addToCart: (product: Product) => void;
  updateCartItemCount: (product: Product, count: number) => void;
  removeFromCart: (productNos: number[]) => void;
};

const useCartStore = create((set) => ({
  itemCount: cartList.length,
  cartList: cartList,
  addToCart: async (product: Product) => {
    const result = await addCartItem(product, 1);
    if (result) set(() => ({ itemCount: result.length, cartList: result }));
  },
  updateCartItemCount: async (product: Product, count: number) => {
    const result = await addCartItem(product, count);
    if (result) set((state: cartState) => ({ ...state, cartList: result }));
  },
  removeFromCart: async (productNos: number[]) => {
    const result = await deleteCartItems(productNos);
    if (result) set(() => ({ itemCount: result.length, cartList: result }));
  },
}));
export default useCartStore;
