// import React, { Component } from 'react';
// import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Game from './Game';
import Home from './Home';
import Details from './Details';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

	const [solution, setSolution] = useState([]);
	const [gridNumber, setGridNumber] = useState();
	const [chosenWords, setChosenWords] = useState([]);
	const [time, setTime] = useState([]);
	const [missedWords, setMissedWords] = useState([]);
	const [totalWords, setTotalWords] = useState(0)

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home setGridNumber={(gridNumber) => setGridNumber(gridNumber)} />} />
          <Route path="/game" element={<Game setTotalWords={(totalWords) => setTotalWords(totalWords)} chosenWords={chosenWords} solution={solution} missedWords={missedWords} setMissedWords={(missedWords) => setMissedWords(missedWords)} gridNumber={gridNumber}  setTime={(time) => setTime(time)} setChosenWords={(chosenWords) => setChosenWords(chosenWords)} setSolution={(solution) => setSolution(solution)} />} />
					<Route path="/details" element={<Details gridNumber={gridNumber} totalWords={totalWords} missedWords={missedWords} time={time} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
