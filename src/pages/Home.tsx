import React from "react";

import { useSelector } from "react-redux";
import { setCategoryId } from "../redux/filter/slice";
import { Categories, PizzaBlock, Sort, Skeleton } from "../components";
import { useAppDispatch } from "../redux/store";
import { selectPizza } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

export const Home: React.FC = () => {
  const { categoryId, sortType, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const dispatch = useAppDispatch();

  const isSearchRef = React.useRef(false);

  const onChangeCategoryId = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
      })
    );
    window.scrollTo(0, 50);
  };

  React.useEffect(() => {
    !isSearchRef.current && getPizzas();

    isSearchRef.current = false;
  }, [categoryId, sortType, searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategoryId} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="cart cart--empty">
          <h2>
            Ошибка на сервере <span>😔</span>
          </h2>
          <p>
            Вероятней всего наш сервер временно не работает
            <br />
            Для того, чтобы заказать пиццу, придется подождать.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
    </>
  );
};
