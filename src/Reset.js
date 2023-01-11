import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';

const guessGetUrl =
    'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHDUZOBH43&Signature=qM7ANYnBz3qT%2FrSjewMIFI6qjTc%3D&Expires=1673493363';
const guessPutUrl = 'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHDUZOBH43&Signature=7weEUdXgmVQ4kmmdrsZtvZa5ivo%3D&Expires=1673493340';

const Reset = () => {
    const [infoText, setInfoText] = useState('');

    const resetGuesses = () => {
        axios.put(guessPutUrl, []).then(response => {
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