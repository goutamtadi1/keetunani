import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import useInterval from './services/useInterval.js';
import TypeIt from "typeit-react";
import Confetti from 'react-confetti'
import Graph from './Graph.js';
export default function Component() {
  const [count, setCount] = useState(10);
  const [delay, setDelay] = useState(null);

  const [wantToRevealGender, setWantToRevealGender] = useState(false);
  const [confirmedReveal, setConfirmedReveal] = useState(false);
  const [showGraph, setShowGraph] = useState(true);

  const [passcode, setPasscode] = useState("");
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState(['#FFFFFF', '#03D0FE', '#FE03EF']);
  // const boy = "#03D0FE";
  // const girl = "#FE03EF";

  const { width, height } = '100%';

  const SuperStrong = ({ children }) => {
    return <strong style={{ fontSize: "80px" }}>{children}</strong>;
  };


  useInterval(() => {
    if (count < 5) {
      setColors(gender === 'boy' ? ["#03D0FE"] : ['#FE03EF']);
    }
    if (count < 3) {
      setShowGraph(false);
    }
    if (count > 0) {
      setCount(count - 1);
    } else {
      setDelay(null);
    }
  }, delay);

  const validatePasscode = () => {
    console.log('In Get Data...');
    setConfirmedReveal(true);
    let url =
      'https://gender-reveals.s3.amazonaws.com/data/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211010T155423Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f6629ac618871e1d6a28cb23c02498e3874e1793e6c6033eb44f161407211639';

    setError(null);
    axios.get(url).then((response) => {
      console.log('response: ', response.data);
      try {
        if (response.data.passcode === passcode) {
          setDelay(1000);
          setGender(response.data.gender);
        } else {
          setDelay(null);
          setError("Invalid passcode");
        }
      }
      catch (error) {
        setDelay(null);
        console.log(error)
        setError("Invalid passcode", error);
      };

    });
  };


  const resetError = () => {
    setDelay(null);
    setCount(10);
    setGender(null);
    setError(null);
    setColors(['#FFFFFF', '#03D0FE', '#FE03EF']);
    setWantToRevealGender(false);
    setConfirmedReveal(false);
    setShowGraph(true);
  }

  // // For Testing purpose.
  // const saveData = (form) => {
  //   console.log("In Save Data: ", form);
  //   // let data = { gender: 'm', passcode: 'tanvi' };
  //   let data = { gender: gender, passcode: passCode };
  //   let url = 'https://gender-reveals.s3.amazonaws.com/data/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVOEG5XWC35GBSXXY%2F20211010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211010T155502Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=de41201250367819b4f7ec44d3e3aa6690b53d938b7933bde8d82d06b8427b84'
  //   axios.put(url, data).then((response) => {
  //     console.log('response: ', response.passcode);
  //   });
  // };

  return (
    <>
      {/* {passcode && !!gender && !error && count < 5 && ( */}
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
        colors={colors}
        tweenDuration={1000}
        numberOfPieces={600}
      />
      {/* )} */}
      <div className="reveal-container">
        <section id="cover" className="min-vh-100">
          <div id="cover-caption">
            <div className="container">
              <div className="row text-white">
                <div className="col-xl-10 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-5">
                  <div className="px-2">
                    <Form className="justify-content-center forms-inline">
                      <Container>
                        <Row>
                          {/* Want to reveal gender and clicks revealGender*/}
                          {!wantToRevealGender && !confirmedReveal && (
                            <>
                              <h1 className="display-4 py-2">
                                <TypeIt
                                  getBeforeInit={(instance) => {
                                    instance.type("Want to Reveal the Gender?").pause(500).move(12).pause(700).delete(26).pause(500).type("Then Click Reveal & Go head and Enter Master passcode !");
                                    // Remember to return it!
                                    return instance;
                                  }}
                                />
                              </h1>
                              <Col md={12}>
                                <Button className="btn btn-primary btn-lg submitButton" onClick={() => setWantToRevealGender(true)}>Yes, Reveal Gender</Button>
                              </Col>
                            </>
                          )}

                          {/* Want to Confirm gender and enters passcode by clicking Submit*/}
                          {
                            wantToRevealGender && !confirmedReveal && (
                              <>
                                <h1 className="display-4 py-2">
                                  <TypeIt
                                    getBeforeInit={(instance) => {
                                      instance.type("Ok, It's your turn to Enter Master Password").pause(1000).move(-12);
                                      // Remember to return it!
                                      return instance;
                                    }}
                                  />
                                </h1>
                                <div className="display-4 py-2 master-passcode">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Please Enter Master Passcode"
                                    onChange={(e) => setPasscode(e.target.value)}
                                  />
                                </div>
                                <Button
                                  onClick={() => validatePasscode()}
                                  disabled={!passcode || passcode?.length < 5}
                                  className="btn btn-primary btn-lg submitButton">
                                  Validate Master Password
                                </Button>
                              </>
                            )}
                        </Row>

                        {wantToRevealGender && confirmedReveal && count > 0 && !error && (
                          <>
                            <h1 className="display-4 py-2">
                              <TypeIt>
                                Let's Start Count down? Ready
                              </TypeIt>
                              {/* <TypeIt
                                getBeforeInit={(instance) => {
                                  instance.type("Let's Count down? Ready");
                                  //.pause(1000).delete(5).pause(500).type("Set").pause(500).delete(3).pause(500).type("Go!").type(10).delete(2).type(9).pause(1000).delete(1).pause(1000).type(8).delete(1).type(7).delete(1).pause(1000).type(6).delete(1).pause(1000).type(5).delete(1).pause(1000).type(10).delete(2).pause(1000);
                                  // Remember to return it!
                                  return instance;
                                }}
                              /> */}

                            </h1>
                          </>
                        )}

                        {/* Show the Counter until delay exist */}
                        {wantToRevealGender && confirmedReveal && count > 0 && !error && (
                          <>
                            {/* <TypeIt> */}
                            <SuperStrong><p>{count}</p></SuperStrong>
                            {/* </TypeIt> */}
                          </>
                        )}

                        {/* Show the Gender after timer is out */}
                        {wantToRevealGender && confirmedReveal && !error && count === 0 && (
                          <h2 className="display-4 py-2">Hurray ! It's a
                            <TypeIt>
                              <SuperStrong>{gender}</SuperStrong>
                            </TypeIt>
                          </h2>
                        )}
                      </Container>

                      {/* Show the error message when error is not null*/}
                      <Toast onClose={() => resetError()} show={!!error} delay={2000} autohide>
                        <Toast.Header>
                          <h3 className="me-auto ">{error}</h3>
                        </Toast.Header>
                      </Toast>
                    </Form>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {showGraph && (
          <div className="chartdiv">
            <Graph />
          </div>
        )}

        {error && (
          <p>
            {error}
          </p>
        )}
      </div>
    </>
  );
}
