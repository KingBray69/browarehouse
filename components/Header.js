import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-fratBlack text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/">
          <a className="text-2xl font-extrabold">Frat E-Com</a>
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/">
                <a className="hover:text-fratSilver transition">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <a className="hover:text-fratSilver transition">Admin</a>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <a className="relative hover:text-fratSilver transition">
                  Cart
                  {cart.items.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-fratSilver text-fratBlack rounded-full w-5 h-5 text-center text-xs font-bold">
                      {cart.items.length}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}