import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  real,
} from "drizzle-orm/pg-core";

/* =========================
   USERS
========================= */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkId: text("clerk_id").notNull().unique(),

  email: text("email").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   PROFILES
========================= */

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  firstName: text("first_name"),

  lastName: text("last_name"),

  headline: text("headline"),

  summary: text("summary"),

  location: text("location"),

  phone: text("phone"),

  yearsOfExperience: integer("years_of_experience"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   RESUMES
========================= */

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  fileName: text("file_name").notNull(),

  fileUrl: text("file_url"),

  fileType: text("file_type"),

  extractedText: text("extracted_text"),

  isPrimary: boolean("is_primary").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   SKILLS
========================= */

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  name: text("name").notNull(),

  category: text("category"),

  proficiency: text("proficiency"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   EXPERIENCE
========================= */

export const experiences = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  company: text("company").notNull(),

  role: text("role").notNull(),

  location: text("location"),

  startDate: timestamp("start_date"),

  endDate: timestamp("end_date"),

  isCurrent: boolean("is_current").default(false).notNull(),

  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   EDUCATION
========================= */

export const education = pgTable("education", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  institution: text("institution").notNull(),

  degree: text("degree"),

  fieldOfStudy: text("field_of_study"),

  startDate: timestamp("start_date"),

  endDate: timestamp("end_date"),

  grade: text("grade"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   PROJECTS
========================= */

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  name: text("name").notNull(),

  description: text("description"),

  technologies: text("technologies"),

  githubUrl: text("github_url"),

  liveUrl: text("live_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   JOBS
========================= */

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),

  externalId: text("external_id"),

  title: text("title").notNull(),

  company: text("company").notNull(),

  platform: text("platform"),

  location: text("location"),

  jobType: text("job_type"),

  description: text("description"),

  requirements: text("requirements"),

  salary: text("salary"),

  url: text("url"),

  matchScore: real("match_score"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   JOB SKILLS
========================= */

export const jobSkills = pgTable("job_skills", {
  id: uuid("id").defaultRandom().primaryKey(),

  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, {
      onDelete: "cascade",
    }),

  name: text("name").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   SAVED JOBS
========================= */

export const savedJobs = pgTable("saved_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   APPLICATIONS
========================= */
export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, {
      onDelete: "cascade",
    }),

  status: text("status").default("Applied").notNull(),

  appliedAt: timestamp("applied_at").defaultNow().notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   JOB MATCH RESULTS
========================= */

export const jobMatches = pgTable("job_matches", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, {
      onDelete: "cascade",
    }),

  score: real("score").notNull(),

  matchedSkills: text("matched_skills"),

  missingSkills: text("missing_skills"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
