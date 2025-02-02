import { useState } from "react";
import Item from "./list-item";

function List({ items, onRemoveItem, onToggleItem, onClearList }) {
  const [sort, setSort] = useState("input");
  let sortedItems = [...items];
  if (sort === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sort === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
            onCleaarList={onClearList}
            key={item.id}
          />
        ))}
      </ul>
      <div className="filters">
        {items.length > 1 && (
          <div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="input">Sort by input order</option>
              <option value="description">Sort by name</option>
              <option value="packed">Sort by packed items</option>
            </select>
          </div>
        )}
        {items.length > 0 && (
          <button onClick={onClearList} className="clear-btn">
            Clear List
          </button>
        )}
      </div>
    </div>
  );
}

export default List;
