'use strict'

/**
 * Conway's Game of Life implementation.
 */

/**
 * Life object which tracks the state of the game.
 *
 * @param [numeric] width
 * @param [numeric] height
 */
var Life = function (width, height) {
  this.playing = false
  this.cycles = 0
  this.width = width
  this.height = height
  this.pointer = 0
  this.current = 0
  this.next = 1
  this.cells = [
    new Array(width * height).fill(0),
    new Array(width * height).fill(0)
  ]
}

/**
 * Sleeps for a specified duration.
 *
 * @param [numeric] ms
 *
 * @return Promise
 */
Life.prototype.sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Populates the board with a given array.
 */
Life.prototype.populate = function(population) {
  // @TODO more user friendly and error checking.
  this.cells[0] = population.slice()
  this.cells[1] = population.slice()
}

/**
 * Determines the population of neighboring cells.
 *
 * @return [numeric]
 */
Life.prototype.neighborPopulation = function() {
  let pointers = this.getNeighborPointers()
  let population = 0

  for (let i = 0; i < pointers.length; i++) {
    population += this.cells[this.current][pointers[i]]
  }
  return population
}

/**
 * Moves the pointer one cell to the right.
 *
 * If the pointer reaches the end of the array, it starts at zero. If the end
 * of the array is met, it also swaps the current and next arrays so that the
 * game board is refreshed after a full cycle of steps.
 */
Life.prototype.step = function() {
  this.pointer++

  if (this.pointer == this.cells[this.current].length) {
    this.pointer = 0
    //this.cells[this.current] = this.cells[this.next].slice()
    this.current = this.current == 0 ? 1 : 0
    this.next = this.next == 0 ? 1 : 0
  }
}

/**
 * Cycles through the end of the board.
 */
Life.prototype.cycle = function() {
  for (let i = 0; i < this.cells[this.current].length; i++) {
    this.fate()
    this.step()
  }
  this.cycles++
}

/**
 * Determines the fate of the current pointer.
 *
 * This is the set of rules which determine whether a cell lives, dies or is
 * born.
 *
 * @return the value of the current cell after the rules are applied.
 */
Life.prototype.fate = function() {
  let population = this.neighborPopulation()

  if (this.cells[this.current][this.pointer] == 1 && population < 2 || population > 3) {
    this.cells[this.next][this.pointer] = 0
  } else if (this.cells[this.current][this.pointer] == 0 && population == 3) {
    this.cells[this.next][this.pointer] = 1
  } else if (this.cells[this.current][this.pointer] == 1 && (population == 2 || population == 3)) {
    this.cells[this.next][this.pointer] = 1
  } else {
    this.cells[this.next][this.pointer] = this.cells[this.current][this.pointer]
  }

  return this.cells[this.current][this.pointer]
}

/**
 * Gets the list of neighboring pointers.
 *
 * This will return the array indicies of the eight neighboring cells.
 *
 * @return [array]
 */
Life.prototype.getNeighborPointers = function() {
  let pointers =  [this.pointer - this.width, this.pointer, this.pointer + this.width]

  let r1l = pointers[0]
  let r2l = pointers[1]
  let r3l = pointers[2]

  let neighbors = [r1l - 1, r1l, r1l + 1, r2l - 1, r2l + 1, r3l - 1, r3l, r3l + 1]
  let correctedNeighbors = new Array(neighbors.length)
  for (let i = 0; i < neighbors.length; i++) {
    let cell = neighbors[i]
    let newCell = cell
    if (cell < 0) {
      newCell = cell + this.cells[this.current].length
    } else if (cell >= this.cells[this.current].length) {
      newCell = cell - this.cells[this.current].length
    }
    correctedNeighbors[i] = newCell
  }

  return correctedNeighbors
}

/**
 * Generates an HTML string of cells go display the board.
 *
 * @return [string]
 */
Life.prototype.toString = function () {
  let p = this.getNeighborPointers()
  let string = ''

  for (let i = 0; i < this.cells[this.current].length; i++) {
    if (i % this.width == 0) {
      string += '<div class="cell-row">'
    }
    let cellClass = this.cells[this.current][i] == 0 ? "dead" : "alive"
    string += `<div id="cell-${i}" class="life-cell ${cellClass}"></div>`
    if (i > 0 && (i + 1) % this.width == 0) {
      string += '</div>'
    }
  }

  return string
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Life
} else {
  window.Life = Life
}
