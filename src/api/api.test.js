import * as api from "./api";
import * as db from "./db";

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
  })

  describe('integration with mocked db', () => {
    beforeEach(() => {
      db.read = jest.fn(() => "")
      db.write = jest.fn()
      db.remove = jest.fn()
      db.resetToDefaultItems = jest.fn()
      db.reset = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
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
      it("db.remove() method and pass the argument", () => {
        const item = 'test with mock'
        api.deleteItem(item)

        expect(db.remove).toHaveBeenCalledTimes(1)
        expect(db.remove).toHaveBeenCalledWith(item)
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