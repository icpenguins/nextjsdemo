import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

export default class Index extends React.Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Your Tire Information Pit Stop</h1>
                    <h4>What you need to know.</h4>
                    <p>
                        There are many facts about tires that people often overlook. Going to your nearest tire dealer you'll find many signs providing you
                        details on how much tread your tire should have, the amount of braking distance possible, and how many years are in an average
                        tire's lifespan.
                    </p>
                    <p>
                        What is often not there, and little known to even the employees, is how much air pressure the tire must have, what the revolutions
                        per mile are, and what to look for in a tire for your use case.
                    </p>
                    <p>
                        This site aims to provide these details and others in one, centralize location for your use. Expect the content to expand over time.
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}
