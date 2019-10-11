import React from 'react'
import Helmet from 'react-helmet'
import TirePressureForm from '../component/tire/TirePressureForm'

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
                <TirePressureForm />
            </div>
        )
    }
}
