import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategoryId,
  setSortType,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { Categories } from "../components/Categories.jsx";
import { PizzaBlock } from "../components/PizzaBlock/index.jsx";
import { Sort } from "../components/Sort.jsx";
import { Pagination } from "../components/Pagination/index.jsx";
import { SearchContext } from "../App.js";
import { Skeleton } from "../components/PizzaBlock/Skeleton.jsx";

export const Home = () => {
  const sortType = useSelector((state) => state.filter.sort);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategoryId = (i) => {
    dispatch(setCategoryId(i));
  };

  const onChangeSort = (i) => {
    dispatch(setSortType(i));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 50);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj) => <PizzaBlock key={obj.title} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategoryId} />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
