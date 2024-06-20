import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { Submission as ImportedSubmission } from './types';

const app = express();
const port = 8000;
const dbFilePath = path.resolve(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());

// Load initial submissions from JSON file (if exists)
let submissions: ImportedSubmission[] = [];
try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    submissions = JSON.parse(data);
    console.log('Initial submissions loaded:', submissions); // Add this line
} catch (err) {
    console.error('Error loading submissions:', err);
}

// Routes
app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newSubmission: ImportedSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };

    submissions.push(newSubmission);

    console.log('Current submissions:', submissions); // Add this line

    // Save submissions to JSON file
    fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
        if (err) {
            console.error('Error saving submissions:', err);
            return res.status(500).json({ success: false, message: 'Error saving submission' });
        }
        console.log('Submissions saved successfully.'); // Add this line
        res.json({ success: true, submission: newSubmission });
    });
});

app.get('/readAll', (req: Request, res: Response) => {
    res.json(submissions);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}
