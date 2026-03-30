import { addCartItem, CartItem, deleteCartItems, cartList } from "@/app/api/cart/route";
import { Product } from "@/app/api/products/route";
import { create } from "zustand";

type cartState = {
	itemCount: number;
	cartList: CartItem[];
	error: Error | null;
	loading: boolean;
};

export type cartStoreType = {
	itemCount: number;
	cartList: CartItem[];
	error: Error | null;
	loading: boolean;
	addToCart: (product: Product) => Promise<void>;
	updateCartItemCount: (product: Product, count: number) => Promise<void>;
	removeFromCart: (productNos: number[]) => Promise<void>;
};

const useCartStore = create<cartStoreType>((set) => ({
	itemCount: cartList.length,
	cartList: cartList,
	error: null,
	loading: false,

	addToCart: async (product: Product) => {
		set({ loading: true });
		try {
			const result = await addCartItem(product, 1);
			if (result) {
				set(() => ({
					itemCount: result.length,
					cartList: result,
					loading: false,
					error: null,
				}));
			}
		} catch (err) {
			set({ error: err as Error, loading: false });
		}
	},

	updateCartItemCount: async (product: Product, count: number) => {
		set({ loading: true });
		try {
			const result = await addCartItem(product, count);
			if (result) {
				set((state: cartState) => ({
					...state,
					cartList: result,
					itemCount: result.length,
					loading: false,
					error: null,
				}));
			}
		} catch (err) {
			set({ error: err as Error, loading: false });
		}
	},

	removeFromCart: async (productNos: number[]) => {
		set({ loading: true });
		try {
			const result = await deleteCartItems(productNos);
			if (result) {
				set(() => ({
					itemCount: result.length,
					cartList: result,
					loading: false,
					error: null,
				}));
			}
		} catch (err) {
			set({ error: err as Error, loading: false });
		}
	},
}));

export default useCartStore;

// ✅ 선택 구독 헬퍼 함수들 (Zustand selector pattern)
export function useCartItemCount() {
	return useCartStore((state) => state.itemCount);
}

export function useCartList() {
	return useCartStore((state) => state.cartList);
}

export function useCartLoading() {
	return useCartStore((state) => state.loading);
}

export function useCartActions() {
	return useCartStore((state) => ({
		addToCart: state.addToCart,
		updateCartItemCount: state.updateCartItemCount,
		removeFromCart: state.removeFromCart,
	}));
}
