import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards((prev) => [...prev, card]);
  };

  const deleteCard = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CardContext.Provider value={{ cards, addCard, deleteCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  return useContext(CardContext);
}