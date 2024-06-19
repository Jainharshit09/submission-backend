"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const dbFilePath = './db.json';
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Ping endpoint
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Read existing submissions from file
    let submissions = [];
    if (fs_1.default.existsSync(dbFilePath)) {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    }
    // Create new submission
    const newSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };
    // Add new submission to submissions array
    submissions.push(newSubmission);
    // Write submissions back to file
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
    res.json({ success: true, message: 'Submission saved successfully' });
});
// Read endpoint
app.get('/read', (req, res) => {
    const index = Number(req.query.index);
    // Read existing submissions from file
    let submissions = [];
    if (fs_1.default.existsSync(dbFilePath)) {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    }
    // Get submission by index
    const submission = submissions[index];
    res.json(submission);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
