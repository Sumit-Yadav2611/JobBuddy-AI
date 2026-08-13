# JobBuddy AI

> An AI-powered job search and career management platform designed to help candidates discover relevant opportunities, understand their resume, manage their profile, save jobs, and track applications in one place.

## Overview

JobBuddy AI is a full-stack web application built to simplify the modern job-search process.

Instead of switching between multiple platforms and manually managing applications, JobBuddy AI brings important parts of the job-search workflow into one workspace.

The platform is being developed with a focus on:

- Resume understanding
- Candidate profile management
- Job discovery
- Job search and filtering
- Skill-based job matching
- Saved jobs
- Application tracking
- Profile completeness

This project is being developed incrementally as a practical full-stack and AI engineering project.

---

## Features

### Authentication

- Secure user authentication with Clerk
- Protected dashboard routes
- User-specific application and saved-job data

### Candidate Profile

Users can manage different parts of their professional profile:

- Personal information
- Professional summary
- Education
- Work experience
- Skills
- Projects

### Resume Management

- Resume upload
- Resume text extraction
- Resume analysis
- Structured information extraction
- Profile information derived from resume data

### Job Discovery

- Job database
- Job cards with company and location information
- External job links
- Job source/platform information
- Job type information
- Search by job title, company, skills, and description
- Location filtering

### Saved Jobs

- Save jobs for later
- View saved jobs in a dedicated workspace
- Remove saved jobs
- Saved-job count

### Application Tracking

Users can keep track of their applications and monitor application stages such as:

- Applied
- Interview
- Offer
- Rejected

### Job Matching

The project includes a job-matching layer designed to compare job requirements with candidate skills and profile information.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Authentication

- Clerk

### Database

- PostgreSQL
- Drizzle ORM

### AI / Resume Processing

- AI-assisted resume analysis
- Resume text extraction
- Structured resume information processing

### Development

- Node.js
- npm
- ESLint
- Git
- GitHub

---

## Application Architecture

```text
JobBuddy AI
│
├── Authentication
│   └── Clerk
│
├── Next.js Application
│   │
│   ├── Landing Page
│   ├── Authentication
│   └── Dashboard
│
├── Candidate Profile
│   ├── Personal Information
│   ├── Summary
│   ├── Education
│   ├── Experience
│   ├── Skills
│   └── Projects
│
├── Resume System
│   ├── Upload
│   ├── Text Extraction
│   └── AI Analysis
│
├── Job System
│   ├── Job Database
│   ├── Search
│   ├── Location Filtering
│   ├── Job Matching
│   └── Saved Jobs
│
└── Application System
    ├── Apply
    ├── Application Tracking
    └── Status Management



    JobBuddy-AI/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── db/
│   │   ├── jobs/
│   │   ├── resume/
│   │   └── utils.ts
│   │
│   ├── public/
│   ├── package.json
│   ├── drizzle.config.ts
│   ├── next.config.ts
│   └── tsconfig.json
│
├── .gitignore
└── README.md