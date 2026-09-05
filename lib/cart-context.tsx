'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

export interface CartItem {
  id: number;
  name: string;
  image?: string;
  price: number;
  bulkPrice: number;
  quantity: number;
  unit: string;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartKey, setCartKey] = useState('Rasokart Foods Private Limited_cart_guest');

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('loggedInUser');
      const user = userStr ? JSON.parse(userStr) : null;
      const key = user?.email 
        ? `Rasokart Foods Private Limited_cart_${user.email}` 
        : 'Rasokart Foods Private Limited_cart_guest';
      
      setCartKey(key);

      const savedCart = localStorage.getItem(key);

      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error(
        'Failed to load cart from localStorage:',
        error
      );
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(
          cartKey,
          JSON.stringify(items)
        );
      } catch (error) {
        console.error(
          'Failed to save cart to localStorage:',
          error
        );
      }
    }
  }, [items, isHydrated, cartKey]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity:
                  item.quantity + newItem.quantity,
              }
            : item
        );
      }

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Wholesale Cart Count
  const cartCount = items.length;

  // Total Value
  const cartTotal = items.reduce(
    (sum, item) =>
      sum + item.bulkPrice * item.quantity,
    0
  );

  if (!isHydrated) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          addToCart: () => {},
          removeFromCart: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          cartCount: 0,
          cartTotal: 0,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider'
    );
  }

  return context;
}