import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


type Item = {
  itemName: string
  quantity: number
  isSelected: boolean
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [inputValue, setInputValue] = useState<string>("")

  const [totalItemCount, setTotalItemCount] = useState(0)

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    if (totalItemCount > 0) { setTotalItemCount(totalItemCount) }
  }

  const handleAddButtonClick = () => {

    const newItem: Item = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false
    }

    const newItems = [...items, newItem]

    setItems(newItems)

    setInputValue("")
    console.log(items)

    calculateTotal()
  }

  const toggleComplete = (index: number) => {
    const newItems = [...items]
    newItems[index].isSelected = !newItems[index].isSelected
    setItems(newItems)
  }

  const handleQuantityDecrease = (index: number) => {
    const newItems = [...items]
    if (newItems[index].quantity > 0) {
      newItems[index].quantity--
      setItems(newItems)
      calculateTotal()
    }
  }

  const handleQuantityIncrease = (index: number) => {
    const newItems = [...items]
    newItems[index].quantity++
    setItems(newItems)
    calculateTotal()
  }

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className="add-item-input" placeholder="Add an item..." />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                    <>
                      <FontAwesomeIcon icon={faCircle} />
                      <span>{item.itemName}</span>
                    </>
                  )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total:{totalItemCount} </div>
      </div>
    </div>
  );
};

export default App;
