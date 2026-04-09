import { useQuery } from "react-query";
import { Input } from "./Input";
import { ProductService } from "../services/product.service";
import { ProductProps } from "../interfaces/Products";
import { ChangeEvent, useRef, useState } from "react";
import { debounce, isNull } from "lodash";
import { List } from "./List";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useShoppingList } from "../contexts/ShoppingCart";
import { authService } from "../services/auth.service";

const Header = () => {
  const [getProductName, setProductName] = useState("");
  const [getIsOpen, setIsOpen] = useState(false);
  const useRefDropDown = useRef<HTMLUListElement>(null);
  const { totalQtd } = useShoppingList();

  const { searchName } = ProductService;

  const {
    data: productsByName,
    isLoading,
    error,
  } = useQuery<ProductProps[], Error>(
    ["query-products-by-name", getProductName],
    async () => {
      return await searchName(getProductName);
    },
    {
      enabled: getProductName.length > 0,
      onSuccess: (res) => setIsOpen(res?.length > 0),
    },
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
  };

  useOnClickOutside(useRefDropDown, () => setIsOpen(false));

  const debounceHandleOnChange = debounce(handleInput, 500);

  return (
    <header className="fixed right-0 top-0 flex w-full justify-center bg-white py-3">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-52">
        <div>
          <Link to="/" relative="path">
            <img
              src="/assets/logo.png"
              alt="Company Logo"
              className="max-w-36"
            />
          </Link>
        </div>
        <div className="relative w-4/5">
          <Input onChange={debounceHandleOnChange} />
          {getIsOpen && (
            <ul
              ref={useRefDropDown}
              className="absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4 shadow-lg"
            >
              {productsByName?.map((product: ProductProps) => {
                return (
                  <List
                    key={product.id}
                    className="items-center justify-between"
                  >
                    {product.name}
                    <div>
                      <img
                        src={`/assets/products/${product.image}.jpg`}
                        alt={product.name}
                        className="h-20 rounded-t-lg object-cover"
                      />
                      <span>R$ {product.price}</span>
                    </div>
                  </List>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Link to="/shopping-cart" relative="path" className="flex">
            <CiShoppingCart className="h-12 w-20" />
            {totalQtd > 0 && (
              <div className="relative right-8 flex size-6 justify-center rounded-3xl bg-blue-400">
                <span>{totalQtd}</span>
              </div>
            )}
          </Link>
          {isNull(authService.getLoggedUser()) && (
            <Link className="cursor-pointer hover:text-blue-700" to="/login" relative="path">
              Login
            </Link>
          )}
          {!isNull(authService.getLoggedUser()) && (
            <span
              className="cursor-pointer hover:text-red-700"
              onClick={() => {
                authService.cleanLoggedUser();
                window.location.reload();
              }}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
