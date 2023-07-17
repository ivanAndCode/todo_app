import * as db from "./db.js";

const delimiter = '\\(^_^)/'

export function getCurrentItems() {
  let result
  const items = db.read() || ""

  items.length === 0 ?
    result = [] :
    result = items.split(delimiter);

  return result
}

export function addItem(item) {
  db.write(item)
}

export function deleteItem(index) {
  db.remove(index)
}

export function resetToDefaultItems() {
  db.resetToDefaultItems()
}

export function resetItems() {
  db.reset()
}
