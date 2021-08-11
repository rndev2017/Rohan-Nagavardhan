import styles from '../styles.module.css'

export default function Intro() {
    return (
        <header id={styles.intro} className="text-gray-600 h-screen flex flex-col justify-around font-light">
            <div id="greeting" className="flex flex-row">
                <p className="text-2xl lg:text-4xl pr-5">Hey!</p>
                <img className="h-7 w-7 lg:h-10 lg:w-10 hover:animate-wave" src="./images/wave.png"/>
            </div>
            <div className="lg:max-w-2xl">
                <p className="text-2xl tracking-widest leading-relaxed lg:text-4xl">
                    I'm 
                    <span className="font-bold"> Rohan Nagavardhan</span>
                    , a CS student @ the University of Michigan focused on
                    building products with <span className="italic">real</span> impact at scale.
                </p>
            </div>
            <div className="text-md lg:text-lg">
                <span className="pr-2">Shoot me an email</span>
                <span className="align-bottom inline-block"><img src="./images/pointright.png" height="30" width="30"/></span>
                <span id={styles.intro_email} 
                        className="px-1 hover:transition duration-500 ease-in-out hover:bg-blue-500 hover:text-white ">
                        <a href="mailto:rnagavar@umich.edu" target="_blank">rnagavar@umich.edu</a>
                </span>
            </div>
        </header>
    )
}
  