import {read, remove, reset, resetToDefault, write} from "./db"

const defaultItems = ["Buy Milk", "Relax", "Complete all tasks"]

beforeEach(() => {
  resetToDefault() //todo test this method
})

describe('Database tests', () => {
  describe('resetToDefault() method should', () => {
    describe('have 3 items when', () => {
      it("there were NO items before", () => {
        reset()
        const itemsBefore = read();
        expect(itemsBefore.length).toBe(0)

        resetToDefault()
        const items = read();
        expect(items.length).toBe(3)
      })

      it("there were some items before", () => {
        reset()
        write('First unique item')

        resetToDefault()
        const items = read();
        expect(items.length).toBe(3)
        for (const defaultItem of defaultItems) {
          expect(items).toContain(defaultItem)
        }
      })
    })
  })

  describe('reset() method should', () => {
    it("remove all items", () => {
      const itemsBefore = read();
      expect(itemsBefore.length).toBe(3)

      reset()
      const items = read();
      expect(items.length).toBe(0)
    })

    it("do nothing when called second time", () => {
      const itemsBefore = read();
      expect(itemsBefore.length).toBe(3)

      reset()
      const itemsFirstReset = read();
      expect(itemsFirstReset.length).toBe(0)

      reset()
      const itemsSecondReset = read();
      expect(itemsSecondReset.length).toBe(0)
    })
  })

  describe("write() method should add new item", () => {
    it("when list of tasks is NOT empty", () => {
      const item = 'Do the dishes'
      const itemsBefore = read();
      expect(itemsBefore).not.toContain(item)

      write(item)

      const itemsAfter = read();
      expect(itemsAfter).toContain(item)
    })

    it("when list of tasks is empty", () => {
      const item = 'Add first task for the day'
      reset()
      const itemsBefore = read();
      expect(itemsBefore.length).toBe(0)

      write(item)

      const itemsAfter = read();
      expect(itemsAfter).toContain(item)
      expect(itemsAfter.length).toBe(1)
    })

    it("and not lose previous task items", () => {
      const item = 'Do the dishes'
      const itemsBefore = read();
      expect(itemsBefore).not.toContain(item)

      write(item)

      const itemsAfter = read();
      for (const item of itemsBefore) {
        expect(itemsAfter).toContain(item)
        expect(itemsAfter.length).toBe(4)
      }
    })
  })

  describe('read() method should', () => {
    it("return empty array of items when there are none", () => {
      reset()
      const items = read()
      expect(items.length).toBe(0)
      expect(items).toBeInstanceOf(Array)
    })

    it("return array of string items when there are some", () => {
      const items = read();

      expect(items.length).toBe(3)
      for (const item of items) {
        expect(typeof item).toEqual("string")
      }
    })
  })

  describe('remove() method should', () => {
    it("throw an error when there were no items in the list", () => {
      reset()
      try {
        remove(0)
      } catch (e) {
        expect(e.message).toEqual('There are no items in the list. Nothing to delete')
      }
    })

    it("remove first item when there are items", () => {
      const itemsBefore = read()
      expect(itemsBefore.length).toBe(3)
      expect(itemsBefore).toContain(defaultItems[0])
      expect(itemsBefore).toContain(defaultItems[1])
      expect(itemsBefore).toContain(defaultItems[2])

      remove(0)

      const items = read();
      expect(items.length).toBe(2)
      expect(items).toContain(defaultItems[1])
      expect(items).toContain(defaultItems[2])
    })

    it("remove last item when there are items", () => {
      const itemsBefore = read()
      expect(itemsBefore.length).toBe(3)
      expect(itemsBefore).toContain(defaultItems[0])
      expect(itemsBefore).toContain(defaultItems[1])
      expect(itemsBefore).toContain(defaultItems[2])

      remove(2)

      const items = read();
      expect(items.length).toBe(2)
      expect(items).toContain(defaultItems[0])
      expect(items).toContain(defaultItems[1])
    })

    it("remove middle item when there are items", () => {
      const itemsBefore = read()
      expect(itemsBefore.length).toBe(3)
      expect(itemsBefore).toContain(defaultItems[0])
      expect(itemsBefore).toContain(defaultItems[1])
      expect(itemsBefore).toContain(defaultItems[2])

      remove(1)

      const items = read();
      expect(items.length).toBe(2)
      expect(items).toContain(defaultItems[0])
      expect(items).toContain(defaultItems[2])
    })

  })
})