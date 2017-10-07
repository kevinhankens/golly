const Life = require('../life')
const rPentomino100Data = require('./data/rPentomeno100')
const rPentomino1300Data = require('./data/rPentomeno1300')

// Basic test to ensure that we have initial values.
test('default values', () => {
  const testCells = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var l = new Life(6,5)
  expect(l.playing).toBe(false)
  expect(l.cycles).toBe(0)
  expect(l.pointer).toBe(0)
  expect(l.current).toBe(0)
  expect(l.next).toBe(1)
  expect(l.width).toBe(6)
  expect(l.height).toBe(5)
  expect(l.cells[l.current]).toEqual(testCells)
  expect(l.cells[l.next]).toEqual(testCells)
})

// Iterate 100 times and check the cell state.
test('R-pentomino 100 iterations', () => {
  var l = new Life(200, 120)
  l.cells[l.current][8301] = 1
  l.cells[l.current][8302] = 1
  l.cells[l.current][8500] = 1
  l.cells[l.current][8501] = 1
  l.cells[l.current][8701] = 1

  for (let i = 0; i < 100; i++) {
    l.cycle() 
  }

  expect(l.cycles).toBe(100)
  expect(l.width).toBe(200)
  expect(l.height).toBe(120)
  expect(l.cells[l.current].length).toEqual(rPentomino100Data.length)
  expect(l.cells[l.current]).toEqual(rPentomino100Data)
})

// Iterate 101 times and check the cell state. This is a paranoid check to
// ensure that the test data and the cells aren't fooling us by being all
// zeros or something like that.
test('R-pentomino 100 iterations, double check test data', () => {
  var l = new Life(200, 120)
  l.cells[l.current][8301] = 1
  l.cells[l.current][8302] = 1
  l.cells[l.current][8500] = 1
  l.cells[l.current][8501] = 1
  l.cells[l.current][8701] = 1

  for (let i = 0; i < 101; i++) {
    l.cycle() 
  }

  expect(l.cycles).toBe(101)
  expect(l.cells[l.current].length).toEqual(rPentomino100Data.length)
  expect(l.cells[l.current]).not.toEqual(rPentomino100Data)
})

// Iterate to a known stable state and check the cells.
test('R-pentomino 1300 iterations', () => {
  var l = new Life(200, 120)
  l.cells[l.current][8301] = 1
  l.cells[l.current][8302] = 1
  l.cells[l.current][8500] = 1
  l.cells[l.current][8501] = 1
  l.cells[l.current][8701] = 1

  for (let i = 0; i < 1300; i++) {
    l.cycle() 
  }

  expect(l.cycles).toBe(1300)
  expect(l.cells[l.current].length).toEqual(rPentomino1300Data.length)
  expect(l.cells[l.current]).toEqual(rPentomino1300Data)
})

// Iterate past the known stable state and check the cells using the
// stable test data.
test('R-pentomino 1500 iterations', () => {
  var l = new Life(200, 120)
  l.cells[l.current][8301] = 1
  l.cells[l.current][8302] = 1
  l.cells[l.current][8500] = 1
  l.cells[l.current][8501] = 1
  l.cells[l.current][8701] = 1

  for (let i = 0; i < 1500; i++) {
    l.cycle() 
  }

  expect(l.cycles).toBe(1500)
  expect(l.cells[l.current].length).toEqual(rPentomino1300Data.length)
  expect(l.cells[l.current]).toEqual(rPentomino1300Data)
})
