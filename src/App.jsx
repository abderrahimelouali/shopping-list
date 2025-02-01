import { useState } from "react";


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

  return (
    <div className="container">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <List
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
      />
      <States items={items} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo small-logo">Shopping List 🛍️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need from the market 🛒</h3>
      <div className="form-group">
        <select
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Add new item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </div>
    </form>
  );
}

function List({ items, onRemoveItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onToggleItem }) {
  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span className={item.packed ? "packed" : ""}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>🗑️</button>
    </li>
  );
}

function States({ items }) {
  const listItems = items.length;
  if (!listItems)
    return (
      <p className="empty">Start adding items to your shopping list 💰💸</p>
    );

  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / listItems) * 100);

  return (
    <footer className="states">
      <em>
        {percentage !== 100
          ? `You have ${listItems} item${
              listItems > 1 ? "s" : ""
            } on your list, and you've packed ${packedItems} (${percentage}%)`
          : "You got everything 🛒! Ready to go 👌"}
      </em>
    </footer>
  );
}

export default App;
