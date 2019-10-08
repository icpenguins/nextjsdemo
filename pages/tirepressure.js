import React from 'react'
import Helmet from 'react-helmet'
import Navigation from '../component/navigation'
import TirePressureForm from '../component/tire/TirePressureForm'

export default class TirePressure extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    title='Next.js Demo | Tire Pressure'
                    meta={[
                        { property: 'og:title', content: 'Next.js Demo | Tire Pressure' }
                    ]}
                />
                <Navigation />
                <TirePressureForm />
            </div>
        )
    }
}
