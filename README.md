# Personal Website of Zian Huang

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/) [![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A personal website showcasing my computing projects, study blogs, and artworks. Built with Next.js, a React framework for production, and containerized using Docker for consistent deployment.

## Features and Technologies

* Static site generation with [Next.js](https://nextjs.org/)
* Responsive design with [Tailwind CSS](https://tailwindcss.com/)
* Dark/light theme toggle
* [Dockerized](https://www.docker.com/) development and production environment
* Markdown-based content management system

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/get-started) (Recommended for consistent local setup)
* [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/)/[pnpm](https://pnpm.io/) (If you prefer local development without Docker)

### Local Development with Docker

This is the recommended way to run the project locally as it mirrors the production environment setup.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zianonlyhk/personal-website.git
    cd personal-website
    ```

2.  **Build the Docker image:**

    ```bash
    docker compose up -d --build
    ```

3.  **Access the website:**
    Open your web browser and go to [http://localhost:3000](http://localhost:3000).

### Local Development without Docker

If you prefer to develop directly on your machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/catapan/personal-website.git
    cd personal-website
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

4.  **Access the website:**
    Open your web browser and go to [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
