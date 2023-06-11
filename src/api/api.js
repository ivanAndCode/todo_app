import * as db from "./db.js";

export function getCurrentItems() {
  return db.read()
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
