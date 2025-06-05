import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-lg hover:shadow-2xl transition p-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        </a>
      </Link>
      <p className="text-fratSilver font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
      <Link href={`/products/${product.id}`}>
        <a className="mt-auto bg-fratBlack text-white text-center py-2 px-4 rounded hover:bg-fratSilver hover:text-fratBlack transition">
          View & Add to Cart
        </a>
      </Link>
    </div>
  );
}