import { useState } from "react";
import Logo from "./Components/logo";
import Form from "./Components/form";
import List from "./Components/list";
import States from "./Components/states";

function App() {
  const [items, setItems] = useState([]);

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
      "are you sure you want to clear the list? (ok/cancel)"
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
