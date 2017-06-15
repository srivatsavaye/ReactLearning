import React, { Component } from 'react';
import './PlayNine.css';

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
            button = <button className="btn btn-success" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>
            break;
        case false:
            button = <button className="btn btn-danger" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>
            break;
        default:
            button = <button className="btn" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>
            break;
    }
    return (
        <div className="col-2">
            {button}
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

Numbers.list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class PlayNine extends Component {

    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        answerisCorrect: null
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerisCorrect:null
        }))
    }
    removeNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerisCorrect:null
        }))
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerisCorrect: prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) === prevState.numberOfStars
        }))
    }    
    render() {
        const { numberOfStars, selectedNumbers, answerisCorrect } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers} answerisCorrect={answerisCorrect} checkAnswer={this.checkAnswer} />
                    <Answer selectedNumbers={selectedNumbers} clickedNumber={this.removeNumber} />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
            </div>
        )
    }
}

export default PlayNine;