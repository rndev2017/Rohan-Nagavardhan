import styles from '../styles.module.css'

export default function About() {
    let researchLink = "https://astrobites.org/2021/06/27/ur-use-of-machine-learning-techniques-to-analyze-radial-velocity-data-to-find-exoplanets/"
    return (
        <div className="flex flex-col items-center justify-center text-gray-600 md:max-w-2xl">
            <p className="uppercase tracking-widest text-blue-500 font-medium">About Me</p>
            <div className="text-sm md:text-xl mt-5">
                <div className="flex flex-row font-light">
                    <p>I am studying Computer Science at the 
                    <a href="https://umich.edu/" target="_blank" className="font-semibold"> University of Michigan </a> 
                    and considering a minor in Astronomy and Astrophysics. On the side, I am a full-stack software engineer at 
                    <a href="https://www.thinkwander.com/landing" target="_blank"><span className="font-semibold"> Wander </span></a> 
                    building a platform for users to share and discuss intellectual content with their network. 
                    In high school,
                    I worked on <a className="font-semibold" href={researchLink} target="_blank"> astrophysics research </a> 
                    at Stony Brook University aimed at creating an intelligent system to discover exoplanets.</p>
                </div>
                <div className="flex flex-row mt-5 justify-center font-light">
                    <p>As a software engineer, my passion lies in building applications and systems that can scale 
                    and providing impact to users that use the software that I build.</p>
                </div>
                <div className="flex flex-row mt-5 justify-center  font-light">
                    <p><span className="font-semibold">When I'm not sitting in front of my computer</span>, 
                    I'm likely making pizza, staring at the sky, working out at the gym, or playing video games. </p>
                </div>
            </div>
        </div>
    )
}