import useSWR from "swr";
import ProductCard from "../components/ProductCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: products, error } = useSWR("/api/getProducts", fetcher);

  if (error) {
    return (
      <p className="text-red-500 text-center">
        Failed to load products. Please try again later.
      </p>
    );
  }
  if (!products) {
    return <p className="text-center">Loading products…</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-fratSilver mb-8">
        Frat Store
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products yet. Go to /admin to add.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}