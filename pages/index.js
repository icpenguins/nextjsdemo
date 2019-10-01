import * as os from 'os'

function Home() {
    const name = os.hostname()

    return <div>Welcome to Next.js!! { name }!</div>
}

export default Home