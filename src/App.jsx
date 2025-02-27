import { useState, useEffect } from "react";
import Logo from "./Components/logo";
import Form from "./Components/form";
import List from "./Components/list";
import States from "./Components/states";

function App() {
  const [items, setItems] = useState(() => {
    // Load saved items from localStorage
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    let ms = window.confirm(
      "Are you sure you want to clear the list? (OK/Cancel)"
    );
    if (ms) setItems([]);
  }

  return (
    <div className="container">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <List
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <States items={items} />
    </div>
  );
}

export default App;
