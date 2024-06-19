import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = './db.json';

app.use(cors());
app.use(bodyParser.json());

// Ping endpoint
app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});

// Submit endpoint
app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    // Read existing submissions from file
    let submissions: any[] = [];
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
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
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

    res.json({ success: true, message: 'Submission saved successfully' });
});

// Read endpoint
app.get('/read', (req: Request, res: Response) => {
    const index = Number(req.query.index);

    // Read existing submissions from file
    let submissions: any[] = [];
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
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
