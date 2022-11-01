import React from "react";

import { Categories } from "../components/Categories.jsx";
import { PizzaBlock } from "../components/PizzaBlock/index.jsx";
import { Sort } from "../components/Sort.jsx";

import { Skeleton } from "../components/PizzaBlock/Skeleton.jsx";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.title} {...obj} />)}
      </div>
    </>
  );
};
