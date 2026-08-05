import { cartList } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { addCartItem, deleteCartItems } from "@/lib/client-api";
import type { Product } from "@/lib/catalog";
import { create } from "zustand";

export type CartStore = {
  cartList: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  updateCartItemCount: (product: Product, count: number) => Promise<void>;
  removeFromCart: (productNos: number[]) => Promise<void>;
};

const useCartStore = create<CartStore>((set) => ({
  cartList: cartList,
  addToCart: async (product: Product) => {
    const result = await addCartItem(product, 1);
    if (result) set({ cartList: result });
  },
  updateCartItemCount: async (product: Product, count: number) => {
    const result = await addCartItem(product, count);
    if (result) set({ cartList: result });
  },
  removeFromCart: async (productNos: number[]) => {
    const result = await deleteCartItems(productNos);
    if (result) set({ cartList: result });
  },
}));
export default useCartStore;
