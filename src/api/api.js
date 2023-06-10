import * as db from "./db.js";

export function getCurrentItems() {
  return db.read()
}

export function addItem(item) {
  db.write(item)
}

export function deleteItem(index) {
  //todo
  console.log('fsfddfgfdgdf')
}

export function resetToDefaultItems() {
  db.resetToDefault()
}


export function resetItems() {
  db.reset()
}
