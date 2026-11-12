import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// GEODVS-Support Issue Reporting Endpoint
app.post('/api/geodvs-support', async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      issueType, 
      title, 
      description, 
      category, 
      userRole, 
      schoolName,
      questionContext 
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required for issue reporting.' });
      return;
    }

    const ticketId = `GEODVS-${Math.floor(10000 + Math.random() * 90000)}`;

    const prompt = `You are GEODVS-Support, the dedicated AI-powered support and issue-reporting system for the TestQuiz mathematics platform.
A user has reported an issue. Review the information and output a helpful, structured technical diagnostic report.

REPORTED ISSUE DETAILS:
- Ticket ID: ${ticketId}
- User Role: ${userRole || 'Student / Teacher'}
- Institution / School: ${schoolName || 'K-12 District'}
- Category: ${category || 'General'}
- Issue Type: ${issueType || 'Bug'}
- Issue Summary: ${title}
- Detailed Description: ${description}
${questionContext ? `- Related Question Context: ${JSON.stringify(questionContext)}` : ''}

Please respond strictly in JSON format with the following keys:
{
  "ticketId": "${ticketId}",
  "severity": "Low" | "Medium" | "High" | "Critical",
  "category": "${category || 'General'}",
  "diagnosticSummary": "Brief technical assessment of what likely caused or relates to this issue",
  "suggestedWorkaround": "Clear immediate steps the user or teacher can take right now",
  "resolutionTimeline": "e.g., Immediate fix or Scheduled for next patch",
  "geodvsMessage": "A friendly, professional, empathetic direct message to the user acknowledging the report and explaining what our engineering team is doing to resolve it",
  "verifiedFormulas": "Optional mathematical verification if the issue involves a formula, equation, or math question error"
}`;

    let response;
    try {
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are GEODVS-Support, an AI tool exclusively used for reporting, triaging, and diagnosing issues on the TestQuiz math platform. Always return valid JSON.',
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('GEODVS AI analysis timed out')), 4000)
      );

      response = await Promise.race([generatePromise, timeoutPromise]);
    } catch (genError) {
      console.error('Gemini API call failed or timed out, generating diagnostic ticket:', genError);
      // Fallback response if API key is not configured or offline
      res.json({
        ticketId,
        severity: 'Medium',
        category: category || 'General Issue',
        diagnosticSummary: `Issue reported: ${title}. Ticket ${ticketId} logged into the GEODVS-Support queue.`,
        suggestedWorkaround: 'Please try clearing your browser cache or re-taking the question. Our support team has logged the error parameters.',
        resolutionTimeline: 'Within 24 hours',
        geodvsMessage: `Hello! Thank you for reporting this issue. GEODVS-Support has received your ticket (${ticketId}) regarding "${title}". Our team is investigating the issue.`,
        verifiedFormulas: null
      });
      return;
    }

    const text = response?.text;
    if (text) {
      try {
        const parsed = JSON.parse(text);
        res.json(parsed);
        return;
      } catch {
        // Fallback parse
      }
    }

    res.json({
      ticketId,
      severity: 'Medium',
      category: category || 'General',
      diagnosticSummary: text || 'Issue logged successfully.',
      suggestedWorkaround: 'Restart the quiz or refresh the session while our team reviews the report.',
      resolutionTimeline: 'Within 24 hours',
      geodvsMessage: 'Thank you for reaching out to GEODVS-Support. Your report has been logged.',
      verifiedFormulas: null
    });
  } catch (error: unknown) {
    console.error('GEODVS-Support handler error:', error);
    res.status(500).json({ error: 'Failed to process issue report via GEODVS-Support.' });
  }
});

// Mount Vite or serve static dist
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`TestQuiz server running on http://localhost:${port} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
