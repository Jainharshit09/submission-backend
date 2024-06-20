# Backend API

This repository contains the backend API implementation for storing submissions from the Desktop Form Application.

## Description

This backend API handles HTTP requests to store and retrieve submission data. It stores submissions in a JSON file and serves them over HTTP endpoints.

## Features

- Accepts POST requests to store new submissions.
- Provides GET requests to fetch all stored submissions.

## Technologies Used

- Node.js with Express.js for the API server.
- Body-parser for parsing JSON requests.
- fs (File System) module for reading and writing submissions to a JSON file.

## How to Use

### Prerequisites

- Node.js installed on your machine.

### Installation

1. **Clone the Repository**
   - Open your command line interface.
   - Navigate to the directory where you want to clone the repository.
   - Run the following command:
     ```bash
     git clone https://github.com/Jainharshit09/submission-backend.git
     ```
   - Navigate into the cloned repository:
     ```bash
     cd submission-backend
     ```

2. **Install Dependencies**
   - Run the following command to install the required dependencies:
     ```bash
     npm install
     ```

### Running the Application

1. **Start the Server**
   - Run the following command to start the server:
     ```bash
     npm start
     ```
   - The server will run on `http://localhost:8000` by default.

### Endpoints

- **POST /submit**: Endpoint to submit new data.
- **GET /readAll**: Endpoint to retrieve all submissions.

### Usage

- **Submitting Data**: Send a POST request to `/submit` with JSON data containing `name`, `email`, `phone`, `github_link`, and `stopwatch_time`.
- **Fetching Data**: Send a GET request to `/readAll` to retrieve all stored submissions.

### Known Issues

- No known issues at this time.

## Contributing

Contributions are welcome. Please fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to Slidely for providing the opportunity to work on this task.
