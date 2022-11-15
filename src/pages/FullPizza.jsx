import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          `https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items/` + id
        );
        setPizza(res.data);
      } catch (error) {
        alert("Даннные о пицце не найдены :(");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div>
        <h1 style={{ fontSize: 40 }}>
          Пожалуйста, подождите. Данные о пицце загружаются
        </h1>
      </div>
    );
  }

  return (
    <div className="container">
      <img width={300} src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} руб.</h4>
    </div>
  );
};
