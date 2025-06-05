import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </CartProvider>
  );
}