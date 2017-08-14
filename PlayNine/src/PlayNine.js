import React, { Component } from 'react';
import './PlayNine.css';


var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
    let stars = [];
    for (let i = 0; i < props.numberOfStars; i++) {
        stars.push(<p key={i} className="fa fa-star">&#9733;</p>);
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    )
}

const Button = (props) => {
    let button;
    switch (props.answerisCorrect) {
        case true:
            button = <button
                className="btn btn-success"
                disabled={props.selectedNumbers.length === 0}
                onClick={props.acceptAnswer}>=</button>
            break;
        case false:
            button = <button className="btn btn-danger" disabled={props.selectedNumbers.length === 0}>=</button>
            break;
        default:
            button = <button className="btn" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>
            break;
    }
    return (
        <div className="col-2">
            {button}
            <br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redrawLimit === 0}>
                {props.redrawLimit}
            </button>
        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => props.clickedNumber(number)}>{number}</span>
            )}
        </div>
    )
}

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>{number}</span>)}
            </div>
        </div>
    )
}

const Done = (props) => {
    return (
        <div className="text-center"    >
            <h2>{props.doneStatus}</h2>
        </div>
    )
}

Numbers.list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class PlayNine extends Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9)
    state = {
        selectedNumbers: [],
        numberOfStars: PlayNine.randomNumber(),
        answerisCorrect: null,
        usedNumbers: [],
        redrawLimit: 5,
        doneStatus: null
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerisCorrect: null
        }))
    }
    removeNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerisCorrect: null
        }))
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerisCorrect: prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) === prevState.numberOfStars
        }))
    }
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerisCorrect: null,
            numberOfStars: PlayNine.randomNumber()
        }), this.updateDoneStatus())
    };
    redraw = () => {
        this.setState(prevState => ({
            numberOfStars: PlayNine.randomNumber(),
            redrawLimit: prevState.redrawLimit - 1,
            answerisCorrect: null
        }), this.updateDoneStatus())
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: "You WIN!!!" }
            }
            if(prevState.redrawLimit == 0 && !this.possibleSoultions(prevState))
            {
                return {doneStatus:"You lost!!!"}
            }
        });
    }
    possibleSoultions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter(number => usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    }
    render() {
        const { numberOfStars, selectedNumbers, answerisCorrect, usedNumbers, redrawLimit, doneStatus } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                        answerisCorrect={answerisCorrect}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redrawLimit={redrawLimit} />
                    <Answer selectedNumbers={selectedNumbers}
                        clickedNumber={this.removeNumber} />
                </div>
                <br />
                {doneStatus ?
                    <Done doneStatus={doneStatus} />
                    : <Numbers selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers} />}
            </div>
        )
    }
}

export default PlayNine;