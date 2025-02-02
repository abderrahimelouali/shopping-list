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

export default Item;