# Kallol's Garden 🌱

A minimalist, full-stack digital garden and portfolio built to document ongoing projects, essays, timeline milestones, and life goals. 

## Features
* **Projects:** Build logs and notes from ongoing and finished projects, filterable dynamically by tech stack.
* **Writings:** A collection of essays and notes rendered beautifully from Markdown.
* **Timeline:** A running chronological log of milestones and proofs of progress.
* **List 100:** A static, uneditable bucket list of 100 goals created during my 3rd year of university, tracking lifetime completion.
* **Command Center:** A custom Admin CMS dashboard to seamlessly publish Markdown content, append timeline events, and toggle List 100 goals directly from the live site.

## Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, React-Markdown
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Deployment:** Vercel (Frontend SPA) & Render (Backend REST API)

## Environment Variables
To run this project locally, create a `.env` file in both the `client` and `server` directories with the following configurations:

**Backend (`server/.env`)**
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/test?appName=Portfolio
PORT=8080
