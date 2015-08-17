'use strict';

var famous = require('famous');
var Consts = require('./Consts.js');

var Node = famous.core.Node;
var Position = famous.components.Position;
var DOMElement = famous.domRenderables.DOMElement;

function Score() {
	Node.call(this);

	// Center dot.
	this
		.setMountPoint(0, 0)
		.setAlign(0.5, 0.5)
		.setSizeMode('absolute', 'absolute')
		.setAbsoluteSize(Consts.DOT_SIDE * Consts.DIMENSION, Consts.DOT_SIDE * Consts.DIMENSION / 2);

	this.score = 0;
	this.scoreBest = localStorage.getItem('scoreBest__' + Consts.DIMENSION) || 0;

	this.domElement = new DOMElement(this, {
		tagName: 'h2',
		classes: ['Scores'],
		properties: {
			color: '#fff',
			fontSize: '32px'
		},
		content: `
			<p class="Score">Score:
				<var class="ScoreValue">
					${this.score}
				</var>
			</p>
			<p class="Score">Best:
				<var class="ScoreValue">
					${this.scoreBest}
				</var>
			</p>`
	});

	this.domElement.setAttribute('role', 'log');
	this.domElement.setAttribute('aria-live', 'polite');

	this.scoreSetContent = function scoreSetContent(value) {
		if (value >= this.scoreBest) {
			this.domElement.setContent(`
				<p class="Score">Score:
					<var class="ScoreValue">
						${value}
					</var>
				</p>
				<p class="Score">Best:
					<var class="ScoreValue">
						${value}
					</var>
				</p>`);
			localStorage.setItem('scoreBest__' + Consts.DIMENSION, value);
		} else {
			this.domElement.setContent(`
				<p class="Score">Score:
					<var class="ScoreValue">
						${value}
					</var>
				</p>
				<p class="Score">Best:
					<var class="ScoreValue">
						${this.scoreBest}
					</var>
				</p>`);
		}
	}

	this.scoreInc = function scoreInc(inc) {
		this.score += inc;
		this.scoreSetContent(this.score);
	};

	this.scoreReset = function scoreReset() {
		this.score = 0;
		this.scoreSetContent(this.score);
	};

	this.scoreSurcharge = function scoreSurcharge() {
		this.score = Number.parseInt(this.score * Consts.SCORE__SURCHARGE);
		this.scoreSetContent(this.score);
	};

	this.position = new Position(this);
}

Score.prototype = Object.create(Node.prototype);
Score.prototype.constructor = Score;

module.exports = Score;
