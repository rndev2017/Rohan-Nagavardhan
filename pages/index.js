import Head from 'next/head'
import Intro from './Intro'
import About from './About'
import Skills from './Skills'
import DownloadButton from './components/DownloadButton'

export default function Site() {
  return (
    <div>
      <Head>
        <title>Rohan Nagavardhan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro/>
      <section id="About" className="md:flex md:flex-row items-start justify-evenly ">
        <div className="mx-12"><About/></div>
        <div className="mx-12"><Skills/></div>
      </section>
      <section id="Featured Projects" className="h-screen">

      </section>
    </div>
  )
}
