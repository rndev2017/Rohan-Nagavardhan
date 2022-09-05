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
          <p className='text-neutral-900 dark:text-neutral-50 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight'>Hey, I&apos;m Rohan!</p>
          <p className='text-slate-800 dark:text-neutral-300 md:text-lg lg:text-xl italic py-px'>
            Engineering @{'  '}
              <a 
                rel="noreferrer" 
                href={effectvUrl} 
                target={'_blank'} 
                className='text-rose-500 dark:text-rose-400 dark:hover:text-rose-300 hover:text-rose-400 font-bold'>Comcast
              </a>
          </p>
        </div>
        <div className='text-neutral-500 dark:text-neutral-400 pb-5 md:text-xl'>
          <p>
            I&apos;m a student at the University of Michigan studying Computer Science. 
            I love learning about software architecture and building products that 
            people find valuable.
          </p>
        </div>
        <a
          rel="noreferrer"
          download={'Rohan_Nagavardhan.pdf'}
          href="/resume.pdf"
          target={'_blank'}
          className='dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700/60 dark:hover:text-neutral-200 hover:bg-slate-200 hover:text-slate-600 bg-slate-100 text-slate-700 md:text-lg xl:text-xl font-medium px-4 py-2 rounded-md mb-4'>
          Download Resume
        </a>
      </div>
    </>
  )
}

export default HomePage;