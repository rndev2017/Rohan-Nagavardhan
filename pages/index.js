import Head from 'next/head'
import Link from 'next/link'

function HomePage() {
  let logitUrl = "https://fitbit-recipe-importer.netlify.app"
  let effectvUrl = "https://www.effectv.com/"

  return (
    <>
      <Head>
        <title>Rohan Nagavardhan | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='max-w-2xl'>
        <div className='pb-4'>
          <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight'>Hey, I&apos;m Rohan!</p>
          <p className='text-slate-800 md:text-lg lg:text-xl italic py-px'>
            {/* Building{' '} <a rel="noreferrer" href={logitUrl} target={'_blank'} className='text-cyan-600 hover:text-cyan-500 font-bold'>logit</a> / */}
            Engineering @ <a rel="noreferrer" href={effectvUrl} target={'_blank'} className='text-rose-500 hover:text-rose-400 font-bold'>Comcast</a>
          </p>
        </div>
        <div className='text-slate-500 pb-5 md:text-xl'>
          <p>
            I&apos;m a student at the University of Michigan studying Computer Science. 
            I love learning about software architecture and building products that 
            people find valuable.
          </p>
          <p className='py-3 text-[1rem] text-slate-400'>👀 I started a {' '}
            <Link href="/blog"><a className="font-semibold text-sky-600 hover:text-sky-500">blog</a></Link>{' '}
            where I talk about stuff that I find interesting</p>
        </div>
        <a
          rel="noreferrer"
          download={'Rohan_Nagavardhan.pdf'}
          href="/resume.pdf"
          target={'_blank'}
          className='hover:bg-slate-200 hover:text-slate-600 bg-slate-100 text-slate-700 md:text-lg xl:text-xl font-medium px-4 py-2 rounded-md mb-4'>
          Download Resume
        </a>
      </div>
    </>
  )
}

export default HomePage;