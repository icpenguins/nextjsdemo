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
                            {
                                name: 'viewport',
                                content: 'width=device-width, initial-scale=1'
                            },
                    { property: 'og:title', content: 'Next.js Demo' }
                ]}
                />
                <Navigation />
                <TirePressureForm />
            </div>
        )
    }
}
