import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
        set({ isOpen: true });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, delta) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: 'skate-cart-storage' }
  )
);
