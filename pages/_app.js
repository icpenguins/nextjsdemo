import React from 'react'
import App from 'next/app'
import Helmet from 'react-helmet'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './_app.css'

export default class NextjsDemo extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title='Next.js Demo'
          link={[
              { rel: 'shortcut icon', href: '/static/icon/favicon.ico' },
              { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/icon/apple-touch-icon.png' },
              { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/icon/favicon-16x16.png' },
              { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/icon/favicon-32x32.png' },
              { rel: 'manifest', href: '/static/icon/site.webmanifest' },
              { rel: 'mask-icon', href: '/static/icon/safari-pinned-tab.svg', color: '#5bbad5' },
          ]}
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { property: 'og:title', content: 'Next.js Demo' }
          ]}
        />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">
                <img
                    alt="Tire"
                    src="/static/icon/favicon-32x32.png"
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                />{' '}
                Tire Information
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/tirepressure">Pressure</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Image src="/static/img/splash1920.png" fluid />
        <Component {...pageProps} />
        <footer class="footer">
            <div class="container">
                <span class="text-muted">4252 Concepts LLC | <a href="https://www.4252.io" target="_blank">Contact Us</a> | Find Us </span><a href="https://github.com/4252" target="_blank"><img src="/static/img/logo/GitHub-Mark-32px.png" /></a>
            </div>
        </footer>
      </>
    )
  }
}
