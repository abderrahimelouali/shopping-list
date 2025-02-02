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

export default States;