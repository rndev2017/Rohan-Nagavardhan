let featuredProjects = [
    {
        name: "HTCCLI Mobile App",
        org: "HTCCLI",
        link: null,
        code: null,
        thumbnail: "./images/htccli.jpg",
        description: `A mobile application that allows devotees to keep up to date with temples announcements
                        double check temple timings, glance at upcoming festivities, or request religious rituals.`,
        skills: ["Flutter", "UI/UX", "REST API", "FastAPI", "PostgreSQL", "Figma"]
    },
    {
        name: "ExoBoost",
        org: "Stony Brook University",
        thumbnail: "./images/exoboost.jpg",
        link: "https://astrobites.org/2021/06/27/ur-use-of-machine-learning-techniques-to-analyze-radial-velocity-data-to-find-exoplanets/",
        code: "https://github.com/rndev2017/ExoBoost",
        description: `An intelligent system that can predict 
            how many planets can orbit a distant star with 81% percent accuracy. 
            Includes a radial velocity data generator that was used extensively to train the model.`,
        skills: ["Python", "XGBoost", "Pandas", "NumPy", "SciPy", 
            "AstroPy", "Matplotlib"]
    },
    {
       name: "Diego the Dog",
       org:  "HackCEWIT 2020",
       thumbnail: "./images/DoD.jpg",
       link: "https://devpost.com/software/diego-the-dog",
       code: "https://github.com/chmoore889/Hack-CEWIT-App",
       description: `A mobile application that attempts to solve the issue of digital distractions in education through
                      gamification. Users learn to grow and connect with Diego the Dog by studying without touching their
                      phones in the process. The more a user studies = the more Diego grows.`,
        skills: ["Flutter", "Firebase", "Figma", "UI/UX"]
    },
    {
        name: "Polaris",
        org: "SBUHacks 2019",
        thumbnail: "./images/polaris.jpg",
        link: "https://devpost.com/software/polaris-i-the-smart-cane",
        code: "https://github.com/rndev2017/Polaris",
        description: `A smart device that allows visually impaired users to navigate to their desired destinations 
        with ease. Users can request a destination with their voice, and get directions through an in-built speaker system.`,
        skills: ["Google Maps API", "Google Speech-to-Text", "Flask", "Python", "Raspberry Pi", 
            "C"]
    },
];

export default featuredProjects;