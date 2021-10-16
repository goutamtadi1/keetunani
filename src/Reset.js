import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';

const getUrl =
    'https://gender-reveals.s3.amazonaws.com/data/guess.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211013%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211013T044343Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6a905f480bfab4ed69dc0801c760f03069f2393e7f2872931318646f1a0799d0';
const putUrl = 'https://gender-reveals.s3.amazonaws.com/data/guess.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211013%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211013T044343Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fa4980eca12b542dd45fda5ab7d795b9cd89c9c91e5e500e9158f4c7d4bf3500';

const Reset = () => {
    const [infoText, setInfoText] = useState('');

const resetGuesses = () => {
        axios.put(putUrl, []).then(response => {
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