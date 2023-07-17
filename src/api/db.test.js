import * as db from "./db"

describe('Database tests', () => {
  describe.skip('resetToDefault() method should', () => {

  })

  describe.skip('reset() method should', () => {

  })

  describe.skip("write() method should add new item", () => {

  })

  describe.skip('read() method should', () => {

  })

  describe('remove() method should', () => {
    it("call write() method", () => {
      db.write = jest.fn()

      db.remove()

      expect(db.write).toHaveBeenCalledTimes(1)
    })
  })
})