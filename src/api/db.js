const cookieName = 'todoItems'
const delimiter = '\\(^_^)/'

//todo clean this
// to test in browser console
//document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("todoItems"))
//     ?.split("=")[1]
//     .split("\\(^_^)/");
export function read() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1]

  if(cookieValue.length > 0) {
    return cookieValue.split(delimiter);
  }

  return []
}

export function write(item) {
  const currentItems = read()
  if(currentItems.length > 0) {
    const itemsToRecord = currentItems.join(`${delimiter}`)
    document.cookie = `${cookieName}=${itemsToRecord}${delimiter}${item}`
    return
  }

  document.cookie = `${cookieName}=${item}`
}


export function remove(index) {
  const currentItems = read()
  if(currentItems.length === 0) {
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

export function resetToDefault() {
  document.cookie = `${cookieName}=Buy Milk${delimiter}Relax${delimiter}Complete all tasks;`
}
