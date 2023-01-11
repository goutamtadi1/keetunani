import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const guessGetUrl =
    'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHDUZOBH43&Signature=qM7ANYnBz3qT%2FrSjewMIFI6qjTc%3D&Expires=1673493363';
const guessPutUrl = 'https://genderreveals.s3.amazonaws.com/guess.json?AWSAccessKeyId=AKIAWOFEUTCHDUZOBH43&Signature=7weEUdXgmVQ4kmmdrsZtvZa5ivo%3D&Expires=1673493340';

const Guess = () => {
    const [gender, setGender] = useState('default');
    const [name, setName] = useState("");
    const { width, height } = '100%';
    const [infoText, setInfoText] = useState('');

    const saveYourGuess = () => {
        axios.get(guessGetUrl).then((getResponse) => {
            let prevGuesses = [];
            console.log("Previous Data ", prevGuesses)
            const yourGuess = { gender: gender, name: name };
            const isDuplicateGuess = prevGuesses.some(prevGuess => prevGuess.name === name);
            if (!isDuplicateGuess) {
                document.getElementById('form').reset();
                let data = [...prevGuesses, yourGuess];
                axios.put(guessPutUrl, data).then((response) => {
                    setInfoText(name + " your Guess is recorded !");
                    setGender('default');
                    setName('');
                    document.getElementById('form').reset();
                    console.log('response: ', response.data);
                });
            } else {
                setInfoText(name + " your Guess is already recorded !");
                setGender('default');
                setName('');
            }
        });
    }

    return (
        <div>
            <Confetti
                width={width}
                height={height}
                // drawShape={ctx => {
                //     ctx.beginPath()
                //     for (let i = 0; i < 22; i++) {
                //         const angle = 0.35 * i
                //         const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                //         const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                //         ctx.lineTo(x, y)
                //     }
                //     ctx.stroke()
                //     ctx.closePath()
                // }}
                gravity={0.09}
                tweenDuration={1000}
            />
            <div >
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <div className="container">
                            <div className="row text-white">
                                <div className="col-xl-10 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-5">
                                    <h1 className="display-4 py-2">Now it's your turn to Guess</h1>
                                    <div className="px-2">
                                        <Form className="justify-content-center forms-inline" id="form">
                                            <Container>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label className="sr-only inputsHeading">Gender</label>
                                                            <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                                                                <option value="default">Select the Gender</option>
                                                                <option value="male">Boy</option>
                                                                <option value="female">Girl</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label className="sr-only">Name</label>
                                                            <input type="text" className="form-control" placeholder="Enter minimum 5 characters" value={name} onChange={(e) => setName(e.target.value)} />
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </Container>
                                            <Button
                                                onClick={() => saveYourGuess()}
                                                disabled={gender === 'default' || name.length <= 4}
                                                className="btn btn-primary btn-lg submitButton">
                                                Save Your Guess
                                            </Button>
                                            <Toast onClose={() => setInfoText('')} show={!!infoText} delay={6000} autohide>
                                                <Toast.Header>
                                                    <h3 className="me-auto">
                                                        {infoText}
                                                    </h3>
                                                </Toast.Header>
                                            </Toast>
                                        </Form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}


export default Guess;