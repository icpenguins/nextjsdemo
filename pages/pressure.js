import React from 'react'
import Helmet from 'react-helmet'
import TirePressureForm from '../component/tire/TirePressureForm'
import { Jumbotron } from 'react-bootstrap'

export default class TirePressure extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    title='Tire Information | Pressure'
                    meta={[
                        { property: 'og:title', content: 'Tire Information | Pressure' }
                    ]}
                />
                <Jumbotron>
                    <h1>Tire Load</h1>
                    <p>Find out how much load your tire can handle given the pounds per square inch (PSI).</p>
                </Jumbotron>

                <div style={{marginTop: 20, marginRight: 10, marginLeft: 10}}>
                    <TirePressureForm />
                </div>
            </div>
        )
    }
}
