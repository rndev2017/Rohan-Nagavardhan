import Head from 'next/head'
import Layout from '../components/Layout'

function HomePage() {
  let logitUrl = "https://fitbit-recipe-importer.netlify.app"
  let wanderUrl = "https://www.thinkwander.com/" 
  let effectvUrl = "https://www.effectv.com/"

  return (
    <Layout>
      <Head>
        <title>Rohan Nagavardhan | Home</title>
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
      <div className='max-w-2xl'>
        <div className='pb-4'>
          <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight'>Hey, I'm Rohan!</p>
          <p className='text-slate-800 md:text-lg lg:text-xl italic'>
            Building{' '} <a href={logitUrl} target={'_blank'} className='text-cyan-600 hover:text-cyan-500 font-bold'>logit</a> / 
            Engineering @ <a href={effectvUrl} target={'_blank'}  className='text-rose-500 hover:text-rose-400 font-bold'>Effectv</a>
          </p>
        </div>
        <p className='text-slate-500 pb-7 md:text-xl'> 
          I'm a student at the University of Michigan studying Computer Science
          & Astrophysics. On the side, I work on the Engineering team at{' '} 
          <a href={wanderUrl} target={'_blank'} 
            className='font-semibold text-orange-600 hover:text-orange-500'>Wander</a>{' '}
          which launched on Product Hunt this past winter. I love learning about
          software architecture and building products that people find useful.
        </p>
        <a
          download={'Rohan_Nagavardhan.pdf'} 
          href="/resume.pdf"
          target={'_blank'}
          className='hover:bg-slate-200 hover:text-slate-600 bg-slate-100 text-slate-700 md:text-lg xl:text-xl font-medium px-4 py-2 rounded-md mb-4'>
          Download Resume
        </a>
      </div>
    </Layout>
  )
}

export default HomePage;