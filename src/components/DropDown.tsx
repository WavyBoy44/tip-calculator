import { ChangeEventHandler } from "react";

export default function DropDown({
  items,
  handleItems,
}: {
  items: Array<string>;
  handleItems: ChangeEventHandler;
}) {
  return (
    <select onChange={handleItems}>
      {items.map((item) => (
        <option value={item}>{item}</option>
      ))}
    </select>
  );
}
