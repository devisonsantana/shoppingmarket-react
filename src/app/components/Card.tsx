import { useShoppingList } from "../contexts/ShoppingCart";
import { Product } from "../interfaces/Products";
import { Button } from "./Button";

const Card = ({ item }: Product) => {
  const { addProduct } = useShoppingList();
  return (
    <div className="flex h-96 w-64 flex-col justify-center rounded-2xl bg-white p-2">
      <div className="flex justify-center">
        <img
          className="h-40 rounded-t-lg object-cover"
          src={`/assets/products/${item.image}.jpg`}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="mb-2 flex items-center justify-center">
          <span className="text-center font-bold capitalize">{item.name}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>R$ {item.price}</span>
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          addProduct(item.id, item.name, item.price);
        }}
      >
        Add to a Cart
      </Button>
    </div>
  );
};
export { Card };
