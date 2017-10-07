'use strict'

// oscillator 1
//var l = new Life(5, 5)
//l.populate([0,0,0,0,0,
//            0,0,0,0,0,
//            0,1,1,1,0,
//            0,0,0,0,0,
//            0,0,0,0,0])

// glider 1
//var l = new Life(7, 7)
//l.populate([0,0,0,0,0,0,0,
//            0,0,0,0,1,0,0,
//            0,0,0,0,0,1,0,
//            0,0,0,1,1,1,0,
//            0,0,0,0,0,0,0,
//            0,0,0,0,0,0,0,
//            0,0,0,0,0,0,0])

// glider 2
//var l = new Life(100, 70)
//l.cells[l.current][1051] = 1
//l.cells[l.current][1152] = 1
//l.cells[l.current][1250] = 1
//l.cells[l.current][1251] = 1
//l.cells[l.current][1252] = 1

// spaceship 1
//var l = new Life(9, 9)
//l.populate([0,0,0,0,0,0,0,0,0,
//            0,0,0,0,0,0,0,0,0,
//            0,0,0,0,0,0,0,0,0,
//            0,0,0,0,1,0,0,1,0,
//            0,0,0,1,0,0,0,0,0,
//            0,0,0,1,0,0,0,1,0,
//            0,0,0,1,1,1,1,0,0,
//            0,0,0,0,0,0,0,0,0,
//            0,0,0,0,0,0,0,0,0])

// r-pentomino
var l = new Life(200, 120)
l.cells[l.current][8301] = 1
l.cells[l.current][8302] = 1
l.cells[l.current][8500] = 1
l.cells[l.current][8501] = 1
l.cells[l.current][8701] = 1

var app = new Vue({
  el: '#app',
  data: {
    cells: l.cells,
    message: l.toString(),
    cycles: `Cycles: ${l.cycles}`,
    playToggle: 'Play',
    cellState: ''
  },
  watch: {
    cells: function (newCells) {
      // @TODO optimize using better bindings, for now just change the DOM.
      // Drawing the whole board is sloooow.
      //this.message = l.toString()
      this.cycles = `Cycles: ${l.cycles}`
    }
  },
  methods: {
    fate: function (event) {
      l.cycle()
      this.render()
    },
    state: function (event) {
      this.cellState = l.cells[l.current].toString()
    },
    play: async function (event) {
      if (l.playing) {
        this.playToggle = 'Play' 
        return l.playing = false
      }

      this.playToggle = 'Stop' 
      l.playing = true
      l.pointer = 0
      while (l.playing) {
        // @TODO configurable timeout.
        await l.sleep(10)
        l.cycle()
        this.render()
      }
    },
    render: function() {
      // Update the cell classes for rendering.
      for (let i = 0; i < l.cells[l.current].length; i++) {
        if (l.cells[l.current][i] == 1) {
          document.getElementById(`cell-${i}`).className = 'life-cell alive';
        } else {
          document.getElementById(`cell-${i}`).className = 'life-cell dead';
        }
      }
      this.cycles = `Cycles: ${l.cycles}`
    }
  }
})
