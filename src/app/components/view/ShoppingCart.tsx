import { useNavigate } from "react-router-dom";
import { useShoppingList } from "../../contexts/ShoppingCart";
import { Button } from "../Button";
import { useEffect } from "react";
import { isNull } from "lodash";
import { authService } from "../../services/auth.service";

export const ShoppingCart = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (isNull(authService.getLoggedUser())) {
      void navigate("/login");
    }
  });
  
  const { items, addProduct, onRemove, onDecrease, totalSumAmount } = useShoppingList();
  return (
    <div className="flex h-full flex-col gap-12">
      <div className="mt-32 flex h-4/5 justify-center overflow-x-auto">
        <div className="flex w-3/4 flex-col gap-8">
          {items.map((item) => {
            return (
              <div
                className="flex justify-between rounded-3xl bg-white p-8"
                key={item.id}
              >
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="text-center capitalize">Nome do Produto: {item.name}</span>
                  </p>
                    <span>Quantidade: {item.quantity}</span>
                    <span>Valor Total: {item.amount.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-5">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProduct(item.id, item.name, item.unitPrice);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDecrease(item.id, item.unitPrice);
                    }}
                  >
                    -
                  </Button>
                  <Button
                  variant="secundary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span className="ml-16">
          <b>Total:</b>R$ {totalSumAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
