Implementation Plan - Smart Bharat (AI Powered Civic Companion)
Smart Bharat is a GenAI-powered civic platform that helps citizens access government services, discover schemes, understand document requirements, report civic issues with AI assistance, and track complaints. It combines a premium modern Indian-themed UI with a robust backend integrating the Groq API.

Project Structure
We will create the project inside C:\Users\Dell\.gemini\antigravity\scratch\smart-bharat. The structure will be:


smart-bharat/
├── api/
│   └── chat.js            # Vercel serverless function to communicate with Groq
├── index.html             # Main single-page application structure
├── styles.css             # CSS variables, animations, responsive layouts, theme styling
├── app.js                 # Frontend application logic, states, UI rendering, local storage
├── vercel.json            # Vercel routing configuration
└── README.md              # Documentation and setup instructions
User Review Required
IMPORTANT

API Configuration: The Vercel backend expects GROQ_API_KEY to be set in environment variables. Locally, this can be run using Vercel CLI (which injects environment variables) or we can create a temporary local development runner.
Model Choice: We will use llama-3.3-70b-versatile via Groq for high-quality multilingual replies and structured output.
Simulated Storage: For the hackathon scope, complaints will be stored in localStorage to allow tracking between page reloads, simulating a backend database for complaint records.
Open Questions
Are there specific Indian languages you would like highlighted in the quick switcher? We plan to support English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam, and Punjabi.
For the image upload component, do you want us to include mock image analysis (e.g. AI reads the image and describes the problem) or simply let the user upload and attach the image? We will mock the image preview in the UI, and if possible, we can ask the LLM to write a complaint assuming a description is provided by the user.
Proposed Changes
[Backend Serverless API]
[NEW] 
chat.js
A Vercel Serverless Function that receives user prompt, chat history, and system instructions, sends them to Groq using native Node.js fetch(), and returns the streaming or non-streaming response. This secures the GROQ_API_KEY on the server-side.

[Frontend Application]
[NEW] 
index.html
The structure for the SPA. It will include:

A modern navigation bar with logo, language selector, and accessibility controls (dark mode / high contrast / font resizing).
A responsive layout with a hero section containing an animated Indian-flag-inspired gradient flow.
A tabbed view containing:
Civic AI Assistant: Chat interface with quick-start cards.
Service Discovery: A searchable dashboard for government schemes.
Document Guidance: Quick tool to generate required document checklists.
Complaint Portal: Multi-step reporting wizard with location, category, description, image placeholder, AI draft generator, and review-submit screen.
Complaint Tracking: Form to lookup complaint status via a unique ID.
Dynamic statistics counters.
[NEW] 
styles.css
CSS file using vanilla CSS. It will implement:

Saffron, white, India green, navy blue, and neutral gray palette.
Keyframe animations for flag-like gradients and smooth fade-in transitions (Framer Motion style).
Accessible typography (Inter / Outfit via Google Fonts).
Responsive grid and flexbox layouts.
Dark mode variables and high-contrast styling.
[NEW] 
app.js
Contains frontend behavior:

State management for active tab, complaint form data, and tracking records.
Interactivity for the AI Chat panel.
Multi-lingual selection (adds context to the AI system prompt).
Functions to query /api/chat with dynamic payloads (e.g., standard chat, generating a complaint letter, or looking up info).
Auto-generation of a complaint ID (SB-2026-XXXXXX using current date/random numbers) and saving details into localStorage.
Accessibility toggle logic.
[NEW] 
vercel.json
Simple routing configuration.

Verification Plan
Automated / Syntax Verification
Validate javascript file correctness.
Validate HTML structure for accessibility (ALT text, ARIA attributes).
Manual Verification
We will test the layout on responsive viewport sizes.
Verify the serverless function can run and call Groq.
Test the complaint submission flow: submit a ticket, save the ID, search for the ID under the Tracker, and see its status change from "Submitted" to "Under Review".
Confirm translations work by asking the chatbot questions in Hindi or Tamil.
