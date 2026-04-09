import { useQuery } from "react-query";
import { Card } from "../Card";
import { ProductService } from "../../services/product.service";
import { ProductProps } from "../../interfaces/Products";
import { useState } from "react";
import { Button } from "../Button";
import { List } from "../List";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const menuListVariants = tv({
  variants: {
    variant: {
      menuList: "absolute z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg",
    },
  },
});

const Home = () => {
  const { findAll } = ProductService;

  const [getTypeFilter, setTypeFilter] = useState("");
  const [getIsOpenMenu, setIsOpenMenu] = useState(false);

  const listOptionsFilter = [
    {
      value: "desc",
      name: "Maior Preço",
      class: "flex justify-center w-full",
    },
    {
      value: "asc",
      name: "Menor Preço",
      class: "flex justify-center w-full",
    },
  ];

  const handleFilter = (value: string) => setTypeFilter(value);
  const handleFilterButton = () => setIsOpenMenu(!getIsOpenMenu);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery<ProductProps[], Error>(["query-products", getTypeFilter], async () => {
    return await findAll(getTypeFilter);
  });

  const menuListClass = twMerge(
    menuListVariants(),
    getIsOpenMenu
      ? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44"
      : "hidden",
  );

  return (
    <div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
      <div className="flex w-4/5 flex-col items-end">
        <Button className="w-24" onClick={() => handleFilterButton()}>
          Filtro
        </Button>
        <ul className={menuListClass}>
          {listOptionsFilter.map((item) => {
            return (
              <List
                key={item.name}
                className={item.class}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilter(item.value);
                }}
              >
                {item.name}
              </List>
            );
          })}
        </ul>
      </div>
      <div className="grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
        {products?.map((product: ProductProps) => {
          return <Card key={product.id} item={product} />;
        })}
      </div>
    </div>
  );
};

export { Home };
