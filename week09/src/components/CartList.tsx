import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className="flex flex-col items-center justify-center mt-8 w-full px-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">장바구니가 비어 있습니다.</p>
      ) : (
        <ul className="w-full max-w-2xl space-y-4">
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItem lp={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
