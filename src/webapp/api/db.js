const cookieName = 'todoItems'
const delimiter = '\\(^_^)/'

// if you ever need to test in browser console
//document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("todoItems"))
//     ?.split("=")[1]
//     .split("\\(^_^)/");
export function read() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1]
}

export function write(item) {
  document.cookie = `${cookieName}=${item}`
}

export function remove(item) {
  this.write(item)
}

export function reset() {
  document.cookie = `${cookieName}=;`
}

export function resetToDefaultItems() {
  document.cookie = `${cookieName}=Buy Milk${delimiter}Relax${delimiter}Complete all tasks;`
}
