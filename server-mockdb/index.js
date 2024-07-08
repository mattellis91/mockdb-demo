"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mockdb_1 = require("@mattellis91/mockdb");
const cuid_1 = __importDefault(require("cuid"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tags', require('./routes/tags'));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    const dbConnection = mockdb_1.MockDb.connect('demo-db');
    app.locals.dbConnection = dbConnection;
    const articles = dbConnection.collection('articles');
    if (!articles.count()) {
        seedArticles();
    }
});
function seedArticles() {
    const data = [
        {
            "title": "The Future of Artificial Intelligence in Healthcare",
            "description": "Exploring how AI is transforming healthcare delivery, from diagnostics to personalized treatment plans.",
            "tags": ["Artificial Intelligence", "Healthcare"],
            "author": "Sarah Johnson",
            "slug": "future-of-ai-healthcare"
        },
        {
            "title": "Blockchain: Revolutionizing Supply Chain Management",
            "description": "Examining blockchain's impact on supply chain transparency, efficiency, and traceability.",
            "tags": ["Blockchain", "Supply Chain"],
            "author": "Michael Smith",
            "slug": "blockchain-supply-chain"
        },
        {
            "title": "5G Technology: What You Need to Know",
            "description": "An in-depth look at the capabilities and implications of 5G technology across industries and consumer applications.",
            "tags": ["5G", "Telecommunications"],
            "author": "Emily Brown",
            "slug": "5g-technology"
        },
        {
            "title": "The Rise of Quantum Computing",
            "description": "Charting the evolution of quantum computing and its potential to revolutionize computational power and problem-solving.",
            "tags": ["Quantum Computing", "Technology Trends"],
            "author": "David Wilson",
            "slug": "rise-of-quantum-computing"
        },
        {
            "title": "Cybersecurity Trends for 2024",
            "description": "Forecasting emerging cybersecurity threats and strategies for organizations in the upcoming year.",
            "tags": ["Cybersecurity", "Trends"],
            "author": "Jessica Lee",
            "slug": "cybersecurity-trends-2024"
        },
        {
            "title": "Augmented Reality: Transforming Retail Experiences",
            "description": "Analyzing how AR is reshaping the retail landscape, enhancing customer engagement and virtual shopping experiences.",
            "tags": ["Augmented Reality", "Retail"],
            "author": "Chris Anderson",
            "slug": "augmented-reality-retail"
        },
        {
            "title": "Cloud Computing: Trends and Innovations",
            "description": "Exploring the latest trends in cloud computing, including serverless architecture and multi-cloud strategies.",
            "tags": ["Cloud Computing", "Innovation"],
            "author": "Alexandra Martinez",
            "slug": "cloud-computing-trends"
        },
        {
            "title": "The Impact of IoT on Smart Cities",
            "description": "Investigating IoT's role in transforming urban infrastructure, from smart grids to connected transportation systems.",
            "tags": ["IoT", "Smart Cities"],
            "author": "Daniel Taylor",
            "slug": "impact-of-iot-smart-cities"
        },
        {
            "title": "Machine Learning in Finance: Opportunities and Challenges",
            "description": "Analyzing how machine learning algorithms are revolutionizing financial services, from risk management to algorithmic trading.",
            "tags": ["Machine Learning", "Finance"],
            "author": "Sophia Clark",
            "slug": "machine-learning-finance"
        },
        {
            "title": "Biometric Authentication: The Future of Security",
            "description": "Examining the evolution of biometric authentication technologies and their application in enhancing digital security measures.",
            "tags": ["Biometrics", "Security"],
            "author": "Kevin Johnson",
            "slug": "biometric-authentication"
        },
        {
            "title": "Autonomous Vehicles: A Roadmap to Adoption",
            "description": "Exploring the technological advancements and regulatory challenges paving the way for widespread adoption of autonomous vehicles.",
            "tags": ["Autonomous Vehicles", "Transportation"],
            "author": "Emily Brown",
            "slug": "autonomous-vehicles-roadmap"
        },
        {
            "title": "Voice Assistants: Beyond Alexa and Siri",
            "description": "Investigating the future capabilities of voice assistants in revolutionizing daily tasks, from home automation to personalized services.",
            "tags": ["Voice Assistants", "AI"],
            "author": "David Wilson",
            "slug": "voice-assistants-beyond"
        },
        {
            "title": "The Role of Big Data in Business Intelligence",
            "description": "Analyzing how organizations harness big data analytics to drive strategic decisions and gain competitive advantage in the market.",
            "tags": ["Big Data", "Business Intelligence"],
            "author": "Sarah Johnson",
            "slug": "role-of-big-data-bi"
        },
        {
            "title": "Sustainable Technology Innovations",
            "description": "Highlighting breakthrough technologies and innovations driving sustainable practices across industries, from renewable energy to eco-friendly manufacturing.",
            "tags": ["Sustainability", "Technology"],
            "author": "Michael Smith",
            "slug": "sustainable-tech-innovations"
        },
        {
            "title": "3D Printing: Changing Manufacturing Processes",
            "description": "Exploring the transformative impact of 3D printing on traditional manufacturing processes, from rapid prototyping to customized production.",
            "tags": ["3D Printing", "Manufacturing"],
            "author": "Jessica Lee",
            "slug": "3d-printing-manufacturing"
        },
        {
            "title": "Edge Computing: Powering IoT Devices",
            "description": "Examining how edge computing enables real-time data processing and low-latency applications for IoT devices in distributed environments.",
            "tags": ["Edge Computing", "IoT"],
            "author": "Chris Anderson",
            "slug": "edge-computing-iot"
        },
        {
            "title": "Quantum Cryptography: Unbreakable Security",
            "description": "Delving into the principles of quantum cryptography and its potential to revolutionize secure communication protocols.",
            "tags": ["Quantum Cryptography", "Security"],
            "author": "Alexandra Martinez",
            "slug": "quantum-cryptography"
        },
        {
            "title": "The Evolution of Virtual Reality Gaming",
            "description": "Tracing the evolution of VR gaming technology and its impact on entertainment experiences, from immersive storytelling to interactive gameplay.",
            "tags": ["Virtual Reality", "Gaming"],
            "author": "Daniel Taylor",
            "slug": "evolution-vr-gaming"
        },
        {
            "title": "Robotics in Healthcare: Enhancing Patient Care",
            "description": "Exploring the integration of robotics in healthcare settings to improve surgical precision, patient monitoring, and rehabilitation therapies.",
            "tags": ["Robotics", "Healthcare"],
            "author": "Sophia Clark",
            "slug": "robotics-healthcare"
        },
        {
            "title": "Ethical Considerations in AI Development",
            "description": "Examining ethical dilemmas and guidelines in AI development, from bias mitigation in algorithms to responsible AI deployment.",
            "tags": ["AI", "Ethics"],
            "author": "Kevin Johnson",
            "slug": "ethical-ai-development"
        },
        {
            "title": "Wearable Technology: Fashion Meets Functionality",
            "description": "Investigating the convergence of fashion and technology in wearable devices, enhancing health monitoring and lifestyle functionalities.",
            "tags": ["Wearable Technology", "Fashion"],
            "author": "Emily Brown",
            "slug": "wearable-tech-fashion"
        },
        {
            "title": "Cryptocurrency Trends to Watch in 2024",
            "description": "Forecasting emerging trends and developments in the cryptocurrency market, from decentralized finance (DeFi) to regulatory challenges.",
            "tags": ["Cryptocurrency", "Blockchain"],
            "author": "David Wilson",
            "slug": "crypto-trends-2024"
        },
        {
            "title": "Biotechnology Advancements in Medicine",
            "description": "Highlighting recent breakthroughs in biotechnology and their applications in personalized medicine, disease treatment, and genetic engineering.",
            "tags": ["Biotechnology", "Medicine"],
            "author": "Jessica Lee",
            "slug": "biotech-advancements"
        },
        {
            "title": "Digital Twins: Simulating Real-World Scenarios",
            "description": "Exploring the role of digital twins in simulating real-world scenarios for predictive maintenance, operational efficiency, and urban planning.",
            "tags": ["Digital Twins", "Simulation"],
            "author": "Chris Anderson",
            "slug": "digital-twins-scenarios"
        },
        {
            "title": "The Future of Work: Remote Collaboration Tools",
            "description": "Assessing the transformative impact of remote collaboration tools on workforce dynamics, productivity, and organizational culture.",
            "tags": ["Remote Work", "Collaboration"],
            "author": "Alexandra Martinez",
            "slug": "future-of-work-collaboration"
        },
        {
            "title": "Renewable Energy Technology Innovations",
            "description": "Examining innovative technologies and solutions driving the adoption of renewable energy sources, from solar to wind power.",
            "tags": ["Renewable Energy", "Technology"],
            "author": "Daniel Taylor",
            "slug": "renewable-energy-innovations"
        },
        {
            "title": "Predictive Analytics in Marketing",
            "description": "Analyzing how predictive analytics techniques are reshaping marketing strategies, customer segmentation, and campaign optimization.",
            "tags": ["Predictive Analytics", "Marketing"],
            "author": "Sophia Clark",
            "slug": "predictive-analytics-marketing"
        },
        {
            "title": "Data Privacy Regulations: Global Impact",
            "description": "Exploring the global landscape of data privacy regulations and their implications for businesses, consumers, and regulatory compliance.",
            "tags": ["Data Privacy", "Regulations"],
            "author": "Kevin Johnson",
            "slug": "data-privacy-regulations"
        }
    ];
    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit ut mi venenatis dictum. Mauris accumsan mi vel neque iaculis, in sodales tortor tristique. Cras auctor eget eros id suscipit. Sed convallis nulla ac nisi consequat, vitae finibus lorem placerat. Nunc scelerisque, lectus id tincidunt molestie, nisi nisi venenatis odio, at dictum eros sapien id ipsum. Phasellus euismod eget tortor eget efficitur. Nulla sed mi eu lacus tincidunt malesuada. Curabitur gravida nisi id purus laoreet suscipit. Fusce in ligula ac erat ultricies viverra. Donec et leo non lectus efficitur consequat. Duis commodo, velit sit amet sodales sollicitudin, tellus sapien semper lorem, et congue nunc est non velit";
    const articleData = [];
    const tagsData = [];
    const authorData = [];
    for (const item of data) {
        const articleTags = [];
        for (const tag of item.tags) {
            const existingTag = tagsData.find(t => t.tag === tag);
            if (existingTag) {
                articleTags.push(existingTag.tag);
            }
            else {
                const tagId = (0, cuid_1.default)();
                articleTags.push(tag);
                tagsData.push({ _id: tagId, tag });
            }
        }
        const authorName = item.author.split(' ');
        let existingAuthor = authorData.find(a => a.firstName === authorName[0] && a.lastName === authorName[1]);
        if (!existingAuthor) {
            const authorId = (0, cuid_1.default)();
            authorData.push({ _id: authorId, firstName: authorName[0], lastName: authorName[1] });
            existingAuthor = { _id: authorId, firstName: authorName[0], lastName: authorName[1] };
        }
        articleData.push({
            _id: (0, cuid_1.default)(),
            title: item.title,
            content,
            author: existingAuthor._id,
            tagList: articleTags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            slug: item.slug,
            description: item.description
        });
    }
    ;
    const tags = app.locals.dbConnection.collection('tags');
    tags.insertMany(tagsData);
    const authors = app.locals.dbConnection.collection('authors');
    authors.insertMany(authorData);
    const articles = app.locals.dbConnection.collection('articles');
    articles.insertMany(articleData);
}
function seedUsers() {
}
