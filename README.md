# Micro Blog

A simple micro-blogging platform with a frontend and backend service.

## Project Structure

```
micro-blog/
├── back/               # Backend service
│   ├── db.js           # Database configuration
│   ├── Dockerfile      # Backend Docker configuration
│   ├── package.json    # Backend dependencies
│   └── server.js       # Backend server
├── front/              # Frontend service
│   ├── Dockerfile      # Frontend Docker configuration
│   ├── nginx.conf      # Nginx configuration
│   ├── package.json    # Frontend dependencies
│   ├── postcss.config.cjs # PostCSS configuration
│   ├── tailwind.config.cjs # Tailwind CSS configuration
│   ├── scripts/        # Utility scripts
│   │   └── copy-html.js
│   └── src/            # Frontend source files
│       ├── index.html  # Main HTML file
│       └── styles.css  # CSS styles
├── infra/              # Infrastructure
│   └── docker-compose.yml # Docker Compose configuration
├── .gitignore          # Git ignore rules
└── LICENSE             # Project license
```

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/dvwinck/micro-blog.git
   cd micro-blog
   ```

2. Build and start the services using Docker Compose:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```

3. Access the application in your browser at:
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:3000`

## Development

### Backend

The backend service is a Node.js application. You can work on it directly:

1. Navigate to the backend directory:
   ```bash
   cd back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Frontend

The frontend service uses HTML, CSS, and JavaScript with Tailwind CSS for styling.

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Configuration

The project includes Docker configurations for both frontend and backend services, as well as a Docker Compose file to orchestrate them together.

- `back/Dockerfile`: Backend service Docker configuration
- `front/Dockerfile`: Frontend service Docker configuration
- `infra/docker-compose.yml`: Docker Compose configuration to run both services together

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
