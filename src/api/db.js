const cookieName = 'todoItems'
const delimiter = '\\(^_^)/'

// if you ever need to test in browser console
//document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("todoItems"))
//     ?.split("=")[1]
//     .split("\\(^_^)/");
export function read() {
  let result
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1]

  cookieValue.length === 0 ?
    result = [] :
    result = cookieValue.split(delimiter);

  return result
}

export function write(item) {
  const currentItems = read()
  const itemsToRecord = currentItems.join(`${delimiter}`)

  currentItems.length === 0 ?
    document.cookie = `${cookieName}=${item}` :
    document.cookie = `${cookieName}=${itemsToRecord}${delimiter}${item}`
}

export function remove(index) {
  const currentItems = read()
  if (currentItems.length === 0) {
    throw new Error('There are no items in the list. Nothing to delete')
  }

  reset()
  currentItems.splice(index, 1)
  for (const item of currentItems) {
    write(item)
  }
}

export function reset() {
  document.cookie = `${cookieName}=;`
}

export function resetToDefaultItems() {
  document.cookie = `${cookieName}=Buy Milk${delimiter}Relax${delimiter}Complete all tasks;`
}
