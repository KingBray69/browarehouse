import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cart, addItem, removeItem, clearCart } = useCart();
  const { items, total } = cart;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-fratSilver mb-8">
        Your Cart
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={addItem}
              onRemove={removeItem}
            />
          ))}
          <div className="flex justify-between items-center mt-8">
            <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => alert("Checkout integration coming soon!")}
              className="bg-fratSilver text-fratBlack py-2 px-4 rounded hover:bg-fratBlack hover:text-fratSilver transition"
            >
              Proceed to Checkout
            </button>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={() => clearCart()}
              className="text-red-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}