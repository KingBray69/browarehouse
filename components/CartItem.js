export default function CartItem({ item, onAdd, onRemove }) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-600">
            ${item.price.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onRemove(item)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
        >
          −
        </button>
        <button
          onClick={() => onAdd(item)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}