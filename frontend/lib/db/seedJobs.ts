
import { db } from "./index";
import { jobs } from "./schema";


const jobData = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova",
    platform: "Demo",
    location: "Remote",
    jobType: "Internship",

    description: "Build modern web applications using React and TypeScript.",

    requirements: "React, JavaScript, TypeScript, HTML, CSS, Tailwind",

    salary: "",

    url: "",
  },

  {
    title: "Full Stack Developer Intern",
    company: "CodeSphere",
    platform: "Demo",
    location: "Bangalore",

    jobType: "Internship",

    description:
      "Develop scalable applications using frontend and backend technologies.",

    requirements: "React, Node.js, Express, MongoDB, JavaScript",

    salary: "",

    url: "",
  },

  {
    title: "Backend Developer Intern",
    company: "CloudWorks",
    platform: "Demo",
    location: "Hyderabad",

    jobType: "Internship",

    description: "Work on APIs and database systems.",

    requirements: "Node.js, Express, MongoDB, PostgreSQL, JavaScript",

    salary: "",

    url: "",
  },

  {
    title: "AI Engineer Intern",
    company: "FutureAI Labs",
    platform: "Demo",
    location: "Remote",

    jobType: "Internship",

    description:
      "Build AI-powered applications and experiment with machine learning models.",

    requirements: "Python, Machine Learning, AI, TensorFlow, Data Science",

    salary: "",

    url: "",
  },

  {
    title: "Software Engineer Intern",
    company: "InnovateX",
    platform: "Demo",
    location: "Pune",

    jobType: "Internship",

    description: "Contribute to production software development.",

    requirements: "C++, Java, Python, Data Structures, Algorithms",

    salary: "",

    url: "",
  },
];

async function seedJobs() {
  await db.insert(jobs).values(jobData);

  console.log("Jobs seeded successfully");
}

seedJobs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
