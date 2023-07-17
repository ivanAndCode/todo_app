import * as db from "./db.js";
import {read, reset, write} from "./db.js";

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
  const currentItems = getCurrentItems()
  let currentItemsReadyToWrite

  currentItems.length === 0 ?
    currentItemsReadyToWrite = `${item}`:
    currentItemsReadyToWrite = `${currentItems.join(`${delimiter}`)}${delimiter}${item}`

  db.write(currentItemsReadyToWrite)
}

export function deleteItem(index) {
  const currentItems = getCurrentItems()
  if (currentItems.length === 0) {
    console.log('There are no items in the list. Nothing to delete') //todo add early return here
  }

  reset()
  const listWithoutItem = currentItems.splice(index, 1)
  let currentItemsReadyToWrite
  listWithoutItem.length === 0 ?
    currentItemsReadyToWrite = "" :
    currentItemsReadyToWrite = currentItems.join(`${delimiter}`)

  //a bit of a hack, but remove() method actually calls write() inside
  db.remove(currentItemsReadyToWrite)
}

export function resetToDefaultItems() {
  db.resetToDefaultItems()
}

export function resetItems() {
  db.reset()
}
