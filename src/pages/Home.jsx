import React from "react";
import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { Categories } from "../components/Categories.jsx";
import { PizzaBlock } from "../components/PizzaBlock/index.jsx";
import { list, Sort } from "../components/Sort.jsx";
import { Pagination } from "../components/Pagination/index.jsx";

import { Skeleton } from "../components/PizzaBlock/Skeleton.jsx";

export const Home = () => {
  const navigate = useNavigate();

  const { currentPage, categoryId, sortType, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();

  const isSearchRef = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategoryId = (i) => {
    dispatch(setCategoryId(i));
  };

  const onChangeSort = (i) => {
    dispatch(setSortType(i));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
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
        currentPage,
      })
    );
    window.scrollTo(0, 50);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearchRef.current = true;
    }
  }, []);

  React.useEffect(() => {
    !isSearchRef.current && getPizzas();

    isSearchRef.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategoryId} />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="cart cart--empty">
          <h2>
            Ошибка на сервере <icon>😔</icon>
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
