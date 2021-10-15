let featuredProjects = [
    {
        name: "SimulationPlayers.io",
        org: "SimulationPlayers",
        link: "https://www.simulationplayers.io/",
        code: null,
        thumbnail: './images/simulationplayers.io.png',
        description: `An NFT collection by popular Instagram artist (@leolli). Designed and implemented a
            website to improve project outreach and provide basic project information.`,
        skills: ["TailwindCSS", "Next.js", "UI/UX", "React.js", "NFT"]
    },
    {
       name: "Diego the Dog",
       org:  "HackCEWIT 2020",
       thumbnail: "./images/DoD.jpg",
       link: "https://devpost.com/software/diego-the-dog",
       code: "https://github.com/chmoore889/Hack-CEWIT-App",
       description: `A mobile application that attempts to solve the issue of digital distractions in education through
                      gamification. Users learn to form a better relationship with technology as they study more with Diego.`,
        skills: ["Flutter", "Firebase", "Figma", "UI/UX"]
    },
    {
        name: "HTCCLI Mobile App",
        org: "HTCCLI",
        link: null,
        code: null,
        thumbnail: "./images/htccli.jpg",
        description: `A mobile application that allows devotees to keep up to date with temple announcements,
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
            how many planets can orbit a distant star with 81% accuracy. 
            Includes a radial velocity data generator that was used extensively to train the model.`,
        skills: ["Python", "XGBoost", "Pandas", "NumPy", "SciPy", 
            "AstroPy", "Matplotlib"]
    },
];

let otherProjects = [
    {
        name: "SillyQL",
        description: `A simple database built with C++ that has operations like CREATE table, REMOVE table,
        INSERT INTO table, DELETE FROM table, JOIN A and B, PRINT FROM table. Additionally, it also handles
        conditional clauses such as WHERE. Uses hashmaps to contain multiple tables and indexing on columns.`,
        code: null,
        skills: ["C++", "BST", "Hashmap", "Database", "SQL", "OOP"]
        
    },
    {
        name: "Stocks on Stocks on Stocks",
        description: `A simple stock exchange simulator that allows a pre-determined set of traders to trade a 
        pre-dertermined number of stocks with each other. Based on command line flags provided by the user, 
        the program will output various statistics (i.e. Median Price of each Stock at t = 0).`,
        code: null,
        skills: ["C++", "Priority Queue", "OOP", "Finite State Machine", "Research"]
        
    },
    {
        name: "Piazza Post Classifer",
        description: `A C++ application that learns to classify 1000+ piazza posts with certain labels using Bayes' Rule.`,
        code: null,
        skills: ["C++", "BST", "Map ADT", "Iterators", "ML"]
    },
    {
        name: "Web Backend",
        description: ` A simple office hours queue that allows users to be pushed and popped off the queue with HTML/CSS/JS.
        The frontend communicated via REST API that was developed in C++ and served, locally, using Python httpserver.`,
        code: null,
        skills: ["C++", "Python", "Linked List", "Queue", "Iterators"]
    },
    {
        name: "Image Processing: Seam Carving Algorithm",
        description: `A C++ application that makes use of the seam carving algorithm to resize images to a 
            desired height and width.`,
        code: null,
        skills: ["C++", "PPM", "CLI", "C Style ADT", "Matrix"]
    },
    {
        name: "Least Squares Regression",
        description: `A Python-based CLI tool that uses linear algebra to do least squares regression. Applied our tool on real-world data
        and predicted the temperature in Detroit, MI in 2050 using our model.`,
        code: "https://github.com/rndev2017/LeastSquaresRegression/",
        skills: ["Python", "CLI", "Data processing", "Matrix", "Linear Algebra", "Least Squares Regression"]
    },
    {
        name: "SVD Image Compression",
        description: `A Python-based CLI tool that uses Singular Value Decompositon to compress images. The program 
        can handle all sizes of images; however, large images will take longer due to their size and calculations needed to compress.`,
        code: "https://github.com/rndev2017/ImageCompression",
        skills: ["Python", "CLI", "Image Compression", "SVD", "Linear Algebra"]
    },
    {
        name: "TruShot",
        description: `A mobile and web application that aims to preserve the integrity of images by watermarking
         them and allows for easy distribution on webpages across the internet. Inspired by the growing problem
         of image and video manipulation called deepfakes.`,
        code: "http://trushot.space/",
        skills: ["Python", "GCP", "Flutter", "Dart", "UI/UX", "HTML", "CSS", "Javascript"]
    },
    {
        name: "Polaris",
        description: `A smart device that allows visually impaired users to navigate to their desired destinations 
        with ease. Users can request a destination with their voice, and get directions through an in-built speaker system.`,
        code: "https://github.com/rndev2017/Polaris",
        skills: ["Google Maps API", "Google Speech-to-Text", "Flask", "Python", "Raspberry Pi", 
            "C"]
    },
    {
        name: "Ballz",
        description: `Ballz is Breakout style game that goes on forever unil the row of boxes touches the ground 
            where ball is located. Additionally, the player can collect more balls and with a click on the screen, 
            all the balls will collide with the rows of boxes and delete them. A row of boxes gets added for each 
            additional level.`,
        code: "https://github.com/rndev2017/Ballz",
        skills: ["Java", "Swing GUI", "GUI", "Game Dev"]

    }
]

export { featuredProjects, otherProjects }