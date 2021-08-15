import Head from 'next/head'
import Intro from './Intro'
import About from './About'
import Skills from './Skills'
import FeaturedProjects from './FeaturedProjects'
import OtherProjects from './OtherProjects'
import GitHubIcon from '../components/GitHubIcon'
import EmailIcon from '../components/EmailIcon'
import LinkedInIcon from '../components/LinkedInIcon'
import TwitterIcon from '../components/TwitterIcon'

export default function Site() {
  return (
    <div>
      <Head>
        <title>Rohan Nagavardhan</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200..900;1,700&display=swap" rel="stylesheet"/> 
      </Head>
      <Intro/>
      <section id="background" className="md:flex md:flex-row items-start justify-evenly my-5">
        <div className="mb-12 mx-12"><About/></div>
        <div className="mx-12"><Skills/></div>
      </section>
      <section id="feat-proj" className="h-auto mt-12">
        <p className="flex flex-row justify-center uppercase tracking-widest text-blue-500 font-medium">Featured Projects</p>
        <FeaturedProjects/> 
      </section>
      <section id="feat-proj" className="h-auto mt-12">
        <p className="flex flex-row justify-center uppercase tracking-widest text-blue-500 font-medium">Other Projects</p>
        <OtherProjects/>
      </section>
      <footer className="w-screen mt-10 py-10 flex flex-col justify-center items-center bg-gray-700">
        <div className="flex flex-row my-4">
          <a className="mx-2" href="mailto:rnagavar@umich.edu" target="_blank"><EmailIcon width="32" height="32"/></a>
          <a className="mx-2" href="https://www.linkedin.com/in/rohan-s-n/" target="_blank"><LinkedInIcon width="32" height="32"/></a>
          <a className="mx-2" href="https://twitter.com/RohanNagavardh1" target="_blank">
            <TwitterIcon width="32" height="32"/>
          </a>
          <a className="mx-2" href="https://github.com/rndev2017" target="_blank">
            <GitHubIcon color="#FFFFFF" hoverColor="#BEBEBE" width="32" height="32"/>
          </a>
        </div>
        <p className="text-gray-400">Made with <i class="icon ion-heart"></i> by Rohan Nagavardhan</p>
      </footer>
    </div>
  )
}

