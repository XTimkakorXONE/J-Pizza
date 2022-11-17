import React from "react";
import qs from "qs";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizza,
} from "../redux/slices/pizzaSlice";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/index";
import { list, Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination/index";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { useAppDispatch } from "../redux/store";
import { current } from "@reduxjs/toolkit";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { currentPage, categoryId, sortType, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const dispatch = useAppDispatch();

  const isSearchRef = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategoryId = (i: number) => {
    dispatch(setCategoryId(i));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 50);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify(
  //       {
  //         sortProperty: sortType.sortProperty,
  //         categoryId: categoryId > 0 ? categoryId : null,
  //         currentPage,
  //       },
  //       { skipNulls: true }
  //     );

  //     navigate(`/?${queryString}`);
  //   }

  //   if (window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    !isSearchRef.current && getPizzas();

    isSearchRef.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         searchValue: params.search,
  //         currentPage: Number(params.currentPage),
  //         sortType,
  //       })
  //     );
  //     isSearchRef.current = true;
  //   }
  // }, []);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategoryId} />
        <Sort />
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
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
      )}
    </>
  );
};
