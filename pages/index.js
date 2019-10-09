import React from 'react'
import Navigation from '../component/navigation'
import {Container, Row, Col } from 'react-bootstrap'
import './index.css'

export default class Index extends React.Component {
    render() {
        return (
            <>
            <Navigation />
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                    1 of 3
                    </Col>
                    <Col md="auto">Variable width content</Col>
                    <Col xs lg="2">
                    3 of 3
                    </Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col md="auto">Variable width content</Col>
                    <Col xs lg="2">
                    3 of 3
                    </Col>
                </Row>
            </Container>
            <h1>A Next.js demo site.</h1>
          </>
        )
    }
}
