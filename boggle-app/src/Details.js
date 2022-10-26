import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Details.css';
import getGrid from "./helper.js"
import 'bootstrap/dist/css/bootstrap.css';

function Details({gridNumber, totalWords, missedWords, time}) {
	const [nextPart, goNextPart] = useState(false);

  function startGame() {
		goNextPart(true)
  }

	function printWords() {
		console.log(missedWords);
		if (missedWords) {
			return (
				<div>
					{missedWords.map((word) => (
						<div>
							<h6>{word}</h6>
						</div>
					))}
				</div>
			)
		}
	}

	
	function printGrid() {
		const myGrid = getGrid(gridNumber)[0];
		return (
			<ul className="outerloop">
			{myGrid.map((word) =>(
				<div className="innerloop">{word.map((letter) =>(
					<div class="border border-dark">
						<h3 className="space">{letter}</h3>
					</div>
				))}</div>
			))}
			</ul>
		);
	}

	if (nextPart) {
		return <Navigate to="/" />;
	}

	console.log(77);
  return (
		<div className="general">
			<div className="container2">
				<div className="boggle2">
					<h1>Boggle</h1>
				</div>
				<div className="button2">
					<button type="button" onClick={startGame}>START BOGGLE GAME</button>
				</div>
			</div>
			<div>
			{printGrid()}
			</div>
			<div className="val">
				<div class="border border-5">
					<div className="words">
						<h2 className="here">SUMMARY</h2>
						<h5 className="here">Total Words Found: {totalWords}</h5>
						<h5 className="here">Total Time Used: {time} seconds</h5>
						<h5 className="here">These are the words missed: </h5>
						<h5>{printWords()}</h5>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Details;
