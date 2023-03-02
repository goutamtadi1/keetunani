import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';
import API from './api.json';
const guessPutUrl = API.guess.put;
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