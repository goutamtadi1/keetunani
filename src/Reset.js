import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';

const guessGetUrl =
    'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHBW4PMQRC&Signature=WijBLA0j7UujY5Z6F%2Bycrgh0isU%3D&Expires=1677657583';
const guessPutUrl = 'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHBW4PMQRC&Signature=fnzq6X6qs7DF4y0NrJ13pRI9xtQ%3D&content-type=application%2Fjson&Expires=1677657432';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};
const Reset = () => {
    const [infoText, setInfoText] = useState('');

    const resetGuesses = () => {
        axios.put(guessPutUrl, [], { headers }).then(response => {
            setInfoText(name + " We resetted your Guesses");
        });
    }

    return (
        <div>
            <label> {infoText} </label>
            <Button
                onClick={() => resetGuesses()}
                className="btn btn-primary btn-lg submitButton">
                Reset Guesses
            </Button>
        </div>
    )
}


export default Reset;