import styles from '../styles.module.css'
import DownloadButton from '../components/DownloadButton'

export default function Intro() {
    return (
        <header id={styles.intro} className="text-gray-900 h-screen flex flex-col justify-around font-light">
            <div id="greeting" className="flex flex-row">
                <p className="text-2xl md:text-4xl pr-5">Hey!</p>
                <img className="h-7 w-7 lg:h-10 lg:w-10 hover:animate-wave" src="./images/wave.png"/>
            </div>
            <div className="max-w-2xl">
                <p className="text-2xl tracking-widest leading-relaxed lg:text-4xl">
                    I'm 
                    <span className="font-semibold"> Rohan Nagavardhan</span>
                    , a CS student @ the University of Michigan focused on
                    building products with real impact at scale.
                </p>
            </div>
            <div className="text-md lg:text-lg">
                <DownloadButton buttonText="download CV"/>
            </div>
        </header>
    )
}
  