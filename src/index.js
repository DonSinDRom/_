'use strict';

var famous = require('famous');

/*jshint -W079 */
var Node = famous.core.Node;/*jshint +W079 */
var FamousEngine = famous.core.FamousEngine;
var Position = famous.components.Position;
var Curves = famous.transitions.Curves;
var DOMElement = famous.domRenderables.DOMElement;

const COLOR = 'rgb(122,199,79)';
const COLOR__ACTIVE = 'rgb(232,116,97)';
const DOT_SIZE = 35;
const DOT_MARGIN = 1;
const DOT_SIDE = DOT_SIZE + DOT_MARGIN;
const DIMENSION = 12;
const ROWS = DIMENSION;
const COLUMNS = DIMENSION;
const DURATION = 600;
const CURVE = 'outBounce'; //outQuint outElastic inElastic inOutEase inBounce outBounce

const FIGURES = [
	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 3 //     ║      ║                               //
		} //            ╚══════╝                               //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗ ╔══════╗    //
			x: 0, //    ║      ║ ║      ║ ║      ║ ║      ║    //
			y: 0 //     ║      ║ ║      ║ ║      ║ ║      ║    //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝    //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 3, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],


	[
		{//                      ╔══════╗ ╔══════╗             //
			x: 0, //             ║      ║ ║      ║             //
			y: 1 //              ║      ║ ║      ║             //
		}, //                    ╚══════╝ ╚══════╝             //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗ ╔══════╗             //
			x: 1, //             ║      ║ ║      ║             //
			y: 0 //              ║      ║ ║      ║             //
		}, //                    ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 2 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 1, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],


	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 1, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 1 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                              ╔══════╗             //
			x: 1, //                      ║      ║             //
			y: 0 //                       ║      ║             //
		}, //                             ╚══════╝             //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 2 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//                               ╔══════╗             //
			x: 0, //                      ║      ║             //
			y: 1 //                       ║      ║             //
		}, //                             ╚══════╝             //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 1, //    ║      ║ ║      ║ ║      ║             //
			y: 1 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 2 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	]
];

/**
 * Initialize fixed-sized array with incremented values
 * @param {number} length - Length of array
 */
/*jshint -W121 */
if (!Array.prototype.initialize) {
	Array.prototype.initialize = function (length) {
		var arr = [];
		for (var i = 0; i < length; i++) {
			arr.push(i);
		}
		return arr;
	};
}/*jshint -W121 */


function Game(rows, cols) {
	Node.call(this);
	this.domElement = new DOMElement(this, {});

	var count = 0;
	this.dots = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let dot = new Dot(count++);
			this.addChild(dot);
			this.dots.push(dot);
		}
	}

	this.mousing = 0;

	/**
	 * Allow selecting dots by mousemoving
	 * @param {number} id - Id of dot
	 */
	this.mousingDown = function (id) {
		this.mousing = this.dots[id].fill ? -1 : +1;
	};
	this.mousingUp = function (id) {
		this.mousing = 0;
	};

	this.hoverDots = [];

	/**
	 * Check dot for selectability
	 * @param {number} id - Id of dot
	 */
	this.hoverDot = function (id) {
		if (id !== undefined) {
			if (!this.hoverDots.includes(id)) {
				if (this.hoverDots.length < 12) {
					this.hoverDots.push(id);
					return true;
				} else {
					this.dots[this.hoverDots[0]].toggleFill();
					this.hoverDots.shift();
					this.hoverDots.push(id);
					return true;
				}
			}
		}
	};

	this.orderRows = [].initialize(ROWS);
	this.orderColumns = [].initialize(COLUMNS);

	/**
	 * Check lines if dots are filled
	 */
	/*jshint -W074 */
	this.checkLines = function checkLines() {
		var dots = this.dots;
		var filledRows = [];
		var filledColumns = [];
		for (let line = 0; line < DIMENSION; line++) {
			let row = dots.filter((element) => Number.parseInt(element.id / ROWS) === line && element.fill === true);
			let column = dots.filter((element) => element.id % COLUMNS === line && element.fill === true);
			if (row.length === ROWS) {
				console.log('Filled row: ', line);
				filledRows.push(line);
			}
			if (column.length === COLUMNS) {
				filledColumns.push(line);
				console.log('Filled column: ', line);
			}
		}
		filledRows.sort(function (x, y) {
			if (x < (ROWS / 2)) {
				return y - x;
			} else {
				return x - y;
			}
		});
		filledColumns.sort(function (x, y) {
			if (x < (COLUMNS / 2)) {
				return y - x;
			} else {
				return x - y;
			}
		});
		for (let row = 0; row < filledRows.length; row++) {
			this.moveLine(filledRows[row], 'y');
		}
		for (let column = 0; column < filledColumns.length; column++) {
			this.moveLine(filledColumns[column], 'x');
		}
	};/*jshint +W074 */

	/**
	 * Move filled line
	 * @param {number} id - Id of filled line
	 */
	/*jshint -W071, -W074 */
	this.moveLine = function moveLine(line, direction) {
		console.log('moveLine', line, direction);
		let orderRows = this.orderRows;
		let orderColumns = this.orderColumns;
		let order = [];
		let lineHash = 0;

		switch (direction) {
		case 'x':
				order = orderColumns;
				lineHash = order.indexOf(line);
				if (line < (COLUMNS / 2)) {
					for (let row = 0; row < ROWS; row++) {
						let dot = this.dots[row * ROWS + order[lineHash]];
						let position = dot.position;
						let x = position.getX();
						position.setX(x - DOT_SIDE * lineHash, {
							duration: DURATION,
							curve: CURVE
						});
						dot.deselect();
					}
					for (let column = lineHash - 1; column >= 0; column--) {
						for (let row = 0; row < ROWS; row++) {
							let dot = this.dots[row * ROWS + order[column]];
							let position = dot.position;
							let x = position.getX();
							position.setX(x + DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderColumns.splice(lineHash, 1);
					orderColumns.unshift(line);
				} else {
					for (let row = 0; row < ROWS; row++) {
						let dot = this.dots[row * ROWS + order[lineHash]];
						let position = dot.position;
						let x = position.getX();
						position.setX(x + DOT_SIDE * (ROWS - 1 - lineHash), {
							duration: DURATION,
							curve: CURVE
						});
						dot.deselect();
					}
					for (let column = COLUMNS - 1; column > lineHash; column--) {
						for (let row = 0; row < ROWS; row++) {
							let dot = this.dots[row * ROWS + order[column]];
							let position = dot.position;
							let x = position.getX();
							position.setX(x - DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderColumns.splice(lineHash, 1);
					orderColumns.push(line);
				}
				break;
		case 'y':
				order = orderRows;
				lineHash = order.indexOf(line);
				if (line < (ROWS / 2)) {
					for (let column = 0; column < COLUMNS; column++) {
						let dot = this.dots[order[lineHash] * COLUMNS + column];
						let position = dot.position;
						let y = position.getY();
						position.setY(y - DOT_SIDE * lineHash, {
							duration: DURATION,
							curve: CURVE
						});
						dot.deselect();
					}
					for (let row = lineHash - 1; row >= 0; row--) {
						for (let column = 0; column < COLUMNS; column++) {
							let dot = this.dots[order[row] * COLUMNS + column];
							let position = dot.position;
							let y = position.getY();
							position.setY(y + DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderRows.splice(lineHash, 1);
					orderRows.unshift(line);
				} else {
					for (let column = 0; column < COLUMNS; column++) {
						let dot = this.dots[order[lineHash] * COLUMNS + column];
						let position = dot.position;
						let y = position.getY();
						position.setY(y + DOT_SIDE * (COLUMNS - 1 - lineHash), {
							duration: DURATION,
							curve: CURVE
						});
						dot.deselect();
					}
					for (let row = ROWS - 1; row > lineHash; row--) {
						for (let column = 0; column < COLUMNS; column++) {
							let dot = this.dots[order[row] * COLUMNS + column];
							let position = dot.position;
							let y = position.getY();
							position.setY(y - DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderRows.splice(lineHash, 1);
					orderRows.push(line);
				}
				break;
		default:
				return false;
		}
	};/*jshint +W071, +W074 */

	var hoverId;

	/**
	 * Fill dot
	 * @param {number} id - Id of dot
	 */
	this.fillDot = function (id) {
		if (id !== undefined) {
			if (id !== hoverId) {
				this.dots[id].toggleFill();
				this.checkLines();
				hoverId = id;
			}
		}
	};

	// Centering
	this
		.setMountPoint(0.5, 0.5, 0)
		.setAlign(0.5, 0.5, 0)
		.setOrigin(0.5, 0.5, 0)
		.setPosition(0, 0, 0);
	this.layout = new Layout(this);

	this.addUIEvent('mousedown');
	this.addUIEvent('mouseup');
}

Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Node;

Game.prototype.onReceive = function onReceive(type, ev) {
	switch (type) {
	case 'mousedown':
			this.emit('x', ev.x).emit('y', ev.y);
			this.mousing = true;
			break;
	case 'mouseup':
			this.emit('x', ev.x).emit('y', ev.y);
			this.mousing = false;
			break;
	default:
			return false;
	}
};

function Layout(node) {
	this.node = node;
	this.id = this.node.addComponent(this);
	this.current = 0;
	this.curve = [Curves.outQuint, Curves.outElastic, Curves.inElastic, Curves.inOutEase, Curves.inBounce];
	this.duration = [0.5 * DURATION, 3 * DURATION, 3 * DURATION, DURATION, 0.5 * DURATION];

	this.next();
}

Layout.prototype.next = function next() {
	if (this.current++ === ROWS) {
		this.current = 0;
	}
	let duration = this.duration[this.current];
	let curve = this.curve[this.current];
	let row = 0;
	let col = 0;
	let dimension = DOT_SIDE;
	let bounds = [-(((dimension) * ROWS / 2) - (dimension / 2)), -(((dimension) * COLUMNS / 2) - (dimension / 2))];
	for (let i = 0; i < this.node.getChildren().length; i++) {
		let x = bounds[0] + ((dimension) * col++);
		let y = bounds[1] + ((dimension) * row);
		let z = 0;
		this.node.dots[i].position.set(x, y, z, {
			duration: i * ROWS + duration,
			curve: curve
		});
		if (col >= COLUMNS) {
			col = 0;
			row++;
		}
	}
};


function Dot(id) {
	Node.call(this);

	// Center dot.
	this
		.setMountPoint(0.5, 0.5, 0)
		.setAlign(0.5, 0.5, 0)
		.setSizeMode('absolute', 'absolute', 'absolute')
		.setAbsoluteSize(DOT_SIZE, DOT_SIZE, DOT_SIZE);

	this.domElement = new DOMElement(this, {
		properties: {
			background: COLOR
		}
	});

	this.id = id;
	this.fill = false;

	this.select = function select() {
		if (!this.fill) {
			this.fill = true;
			this.domElement.setProperty('background-color', COLOR__ACTIVE);
		}
	};

	this.deselect = function deselect() {
		if (this.fill) {
			this.fill = false;
			this.domElement.setProperty('background-color', COLOR);
		}
	};

	this.toggleFill = function toggleFill() {
		this.fill = !this.fill;
		this.domElement.setProperty('background-color', this.fill ? COLOR__ACTIVE : COLOR);
	};

	this.position = new Position(this);

	this.addUIEvent('mousedown');
	this.addUIEvent('mousemove');
	this.addUIEvent('click');
	this.addUIEvent('mouseup');
}

Dot.prototype = Object.create(Node.prototype);
Dot.prototype.constructor = Dot;

/*jshint -W074 */
Dot.prototype.onReceive = function onReceive(type, ev) {
	switch (type) {
	case 'mousedown':
			this._parent.mousingDown(this.id);
			break;
	case 'mousemove':
			if (this._parent.mousing === true) {
				this._parent.fillDot(this.id);
				this.emit('id', this.domElement.id).emit('fill', this.domElement.fill);
			}
			break;
	case 'click':
			this._parent.fillDot(this.id);
			this.emit('id', this.domElement.id).emit('fill', this.domElement.fill);
			break;
	case 'mouseup':
			this._parent.mousingUp(this.id);
			break;
	default:
			return false;
	}
};/*jshint +W074 */

FamousEngine.init();
var scene = FamousEngine.createScene();
var game = new Game(ROWS, COLUMNS);
scene.addChild(game);