import React from "react";
import { Skeleton } from "../components/PizzaBlock/Skeleton.jsx";

import { Categories } from "../components/Categories.jsx";
import { PizzaBlock } from "../components/PizzaBlock/index.jsx";
import { Sort } from "../components/Sort.jsx";
import { Pagination } from "../components/Pagination/index.jsx";
import { SeacrhContext } from "../App.js";

export const Home = () => {
  const { searchValue } = React.useContext(SeacrhContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentpage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "алфавиту",
    sortProperty: "title",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
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
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentpage(number)} />
    </>
  );
};
