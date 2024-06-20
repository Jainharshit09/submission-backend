"use strict";
// index.ts (Node.js backend)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8000;
const dbFilePath = path_1.default.resolve(__dirname, 'db.json');
// Middleware
app.use(body_parser_1.default.json());
// Load initial submissions from JSON file (if exists)
let submissions = [];
try {
    const data = fs_1.default.readFileSync(dbFilePath, 'utf8');
    submissions = JSON.parse(data);
    console.log('Initial submissions loaded:', submissions);
}
catch (err) {
    console.error('Error loading submissions:', err);
}
// Routes
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const newSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };
    submissions.push(newSubmission);
    // Save submissions to JSON file
    fs_1.default.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
        if (err) {
            console.error('Error saving submissions:', err);
            return res.status(500).json({ success: false, message: 'Error saving submission' });
        }
        console.log('Submissions saved successfully.');
        res.json({ success: true, submission: newSubmission });
    });
});
app.get('/readAll', (req, res) => {
    res.json(submissions);
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
