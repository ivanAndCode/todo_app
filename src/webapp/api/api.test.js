import * as api from "./api";
import * as db from "./db";

const defaultItems = ["Buy Milk", "Relax", "Complete all tasks"]

describe('API tests', () => {
  describe('functional', () => {
    describe('getCurrentItems() method should  ', () => {
      it("return empty array of items when there are none", () => {
        api.resetItems()
        const items = api.getCurrentItems()

        expect(items.length).toBe(0)
        expect(items).toBeInstanceOf(Array)
      })

      it("return array of string items when there are some", () => {
        api.resetToDefaultItems()
        const items = api.getCurrentItems()

        expect(items.length).toBe(3)
        for (const item of items) {
          expect(typeof item).toEqual("string")
        }
      })
    })

    describe('addItem() method should add new item', () => {
      it("when list of tasks is NOT empty", () => {
        api.resetToDefaultItems()
        const item = 'task for NON-empty list'

        const itemsBefore = api.getCurrentItems()
        expect(itemsBefore).not.toContain(item)
        expect(itemsBefore.length).toBe(3)

        api.addItem(item)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).toContain(item)
        expect(itemsAfter.length).toBe(4)
        for (const item of itemsBefore) {
          expect(itemsAfter).toContain(item)
        }
      })

      it("when list of tasks is empty", () => {
        api.resetItems()
        const item = 'task for empty list'

        const itemsBefore = api.getCurrentItems()
        expect(itemsBefore).not.toContain(item)
        expect(itemsBefore.length).toBe(0)

        api.addItem(item)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).toContain(item)
        expect(itemsAfter.length).toBe(1)
      })
    })

    describe('deleteItem() method should', () => {
      it("call console.log when there are no items in the list", () => {
        console.log = jest.fn()
        api.resetItems()

        api.deleteItem()
        expect(console.log).toHaveBeenCalledTimes(1)
      })

      it("NOT call console.log when there are no items in the list", () => {
        console.log = jest.fn()
        api.resetToDefaultItems()

        api.deleteItem()
        expect(console.log).toHaveBeenCalledTimes(0)
      })

      it("remove first item when there are items", () => {
        api.resetToDefaultItems()
        const itemsBefore = api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        api.deleteItem(0)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[0])
        expect(itemsAfter.length).toBe(2)
      })

      it("remove last item when there are items", () => {
        api.resetToDefaultItems()
        const itemsBefore = api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        api.deleteItem(2)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[2])
        expect(itemsAfter.length).toBe(2)
      })

      it("remove middle item when there are items", () => {
        api.resetToDefaultItems()
        const itemsBefore = api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        api.deleteItem(1)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[1])
        expect(itemsAfter.length).toBe(2)
      })
    })

    describe('resetToDefaultItems() method should have 3 items when', () => {
      it("there were NO items before", () => {
        api.resetItems()
        const itemsBefore = api.getCurrentItems();
        expect(itemsBefore.length).toBe(0)

        api.resetToDefaultItems()
        const itemsAfter = api.getCurrentItems();
        expect(itemsAfter.length).toBe(3)
      })

      it("there were some items before", () => {
        api.resetItems()
        api.addItem('First unique item')

        api.resetToDefaultItems()
        const itemsAfter = api.getCurrentItems();
        expect(itemsAfter.length).toBe(3)
        for (const defaultItem of defaultItems) {
          expect(itemsAfter).toContain(defaultItem)
        }
      })
    })

    describe('resetItems() method should', () => {
      it("remove all items", () => {
        api.resetToDefaultItems()
        const itemsBefore = api.getCurrentItems();
        expect(itemsBefore.length).toBe(3)

        api.resetItems()
        const items = api.getCurrentItems();
        expect(items.length).toBe(0)
      })

      it("do nothing when called second time", () => {
        api.resetToDefaultItems()
        const itemsBefore = api.getCurrentItems();
        expect(itemsBefore.length).toBe(3)

        api.resetItems()
        const items = api.getCurrentItems();
        expect(items.length).toBe(0)

        api.resetItems()
        const itemsAfterSecondReset = api.getCurrentItems();
        expect(itemsAfterSecondReset.length).toBe(0)
      })
    })
  })

  describe('integration with mocked db', () => {
    beforeEach(() => {
      db.read = jest.fn(() => "")
      db.write = jest.fn()
      db.remove = jest.fn()
      db.resetToDefaultItems = jest.fn()
      db.reset = jest.fn()
      console.log = jest.fn()
    })

    describe('getCurrentItems() method should  ', () => {
      it("call the db.read() method", () => {
        api.getCurrentItems()

        expect(db.read).toHaveBeenCalledTimes(1)
      })
    })

    describe('addItem() method should call the', () => {
      it("db.write() method and pass the argument", () => {
        const item = 'test with mock'
        api.addItem(item)

        expect(db.write).toHaveBeenCalledTimes(1)
        expect(db.write).toHaveBeenCalledWith(item)
      })
    })

    describe('deleteItem() method should call the', () => {
      it("console.log, db.remove(), db.read(), and db.reset() methods", () => {
        api.deleteItem(1)

        expect(console.log).toHaveBeenCalledTimes(1)
        expect(db.remove).toHaveBeenCalledTimes(1)
        expect(db.read).toHaveBeenCalledTimes(1)
        expect(db.reset).toHaveBeenCalledTimes(1)
      })
    })

    describe('resetToDefaultItems() method should call the', () => {
      it("db.resetToDefaultItems() method", () => {
        api.resetToDefaultItems()

        expect(db.resetToDefaultItems).toHaveBeenCalledTimes(1)
      })
    })

    describe('resetItems() method should call the', () => {
      it("db.reset() method", () => {
        api.resetItems()

        expect(db.reset).toHaveBeenCalledTimes(1)
      })
    })
  })
})