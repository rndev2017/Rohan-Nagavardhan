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
        description: `This project is split into two parts, Part A and B. Part A involves building a stock exchange 
        simulator that allows a pre-determined set of traders to trade a pre-dertermined number of stocks with each other. Additionally,
        at the end of each trading run, certain statistics are displayed such as total trades and the best time to buy and sell a specific stock.
        Part B includes several implementations of Priority Queues (i.e. Heap, Pairing Heap, Array-based)`,
        code: null,
        skills: ["C++", "Priority Queue", "OOP", "Dynamic Programming", "Research"]
        
    },
    {
        name: "Piazza Post Classifer",
        description: `A project that introduces the concept of machine learning by classifying 1000+ piazza posts
        with certain labels with Bayes' Rule. Additionally, I implemented the ordered_map ADT from the C++ STL or Binary
        Search Tree data structure.`,
        code: null,
        skills: ["C++", "BST", "Map ADT", "Iterators", "ML"]
    },
    {
        name: "Web Backend",
        description: `A project where I created a simple office hours queue using a doubly linked list as the 
        underlying data structure. I gained an understanding of how web backends work and got a
        taste of creating APIs using C++. Additionally, I implemented my own doubly linked list using iterators 
        and OOP concepts learned in the class.`,
        code: null,
        skills: ["C++", "Python", "Linked List", "Queue", "Iterators"]
    },
    {
        name: "Image Processing: Seam Carving Algorithm",
        description: `A project where I created a CLI tool that would apply the seam carving algorithm
        on input images and resize them to a desired width and height. I gained an understanding of C-Style Abstract
        Data Types, C++ pointers, and the basics of image processing.`,
        code: null,
        skills: ["C++", "PPM", "CLI", "C Style ADT", "Matrix"]
    },
    {
        name: "Least Squares Regression",
        description: `A Python-based CLI tool that uses linear algebra to do least squares regression. Applied our tool on real-world data
        and predicted the temperature in Detroit, MI in 2050 using our model.`,
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
        name: "Ballz",
        description: `Ballz is Breakout style game that goes on forever unil the row of boxes touches the ground 
            where ball is located. Additionally, the player can collect more balls and with a click on the screen, 
            all the balls will collide with the rows of boxes and delete them. A row of boxes gets added for each 
            additional level.`,
        code: "https://github.com/rndev2017/Ballz",
        skills: ["Java", "Swing GUI", "GUI", "Game Dev"]

    }
]

export default otherProjects