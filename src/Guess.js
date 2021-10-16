import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import axios from 'axios';

const getUrl =
    'https://gender-reveals.s3.amazonaws.com/data/guess.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211013%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211013T044343Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6a905f480bfab4ed69dc0801c760f03069f2393e7f2872931318646f1a0799d0';
const putUrl = 'https://gender-reveals.s3.amazonaws.com/data/guess.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211013%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211013T044343Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fa4980eca12b542dd45fda5ab7d795b9cd89c9c91e5e500e9158f4c7d4bf3500';

const Guess = () => {
    const [gender, setGender] = useState('default');
    const [name, setName] = useState("");
    const { width, height } = '100%';
    const [infoText, setInfoText] = useState('');

    const saveYourGuess = () => {
        axios.get(getUrl).then((getResponse) => {
            let prevGuesses = getResponse.data ? getResponse.data : [];
            console.log("Previous Data ", prevGuesses)
            const yourGuess = { gender: gender, name: name };
            const isDuplicateGuess = prevGuesses.some(prevGuess => prevGuess.name === name);
            if (!isDuplicateGuess) {
                document.getElementById('form').reset();
                let data = [...prevGuesses, yourGuess];
                axios.put(putUrl, data).then((response) => {
                    setInfoText(name + " your Guess is recorded !");
                    setGender('default');
                    setName('');
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
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
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