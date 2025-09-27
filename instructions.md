# instructions.md — How to implement AI-Powered Web App (for an LLM/code-runner)

This file contains an exact checklist for creating the project files, installing dependencies, and launching frontend + backend.

## 0. Pre-requisites
- Node.js 18+ and npm installed.
- (Optional) Docker/OLLAMA installed and running if you want to use the Gemma model locally.

## 1. Create the repo structure
Run from an empty folder `project-root/`:

mkdir project-root && cd project-root

# Create backend
mkdir backend
cd backend
# Copy contents for backend package.json and index.js exactly as provided in the code doc
npm install
# Back to root
cd ..

# Create frontend using Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install
# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Replace the generated files with the provided tailwind.config.cjs and src content.

## 2. Environment variables
- backend/.env -> set PORT and OLLAMA_URL if you have a running Ollama HTTP endpoint.
- frontend/.env -> set VITE_API_URL to http://localhost:3001/api/chat (or your backend forwarded URL)

## 3. Run the backend
cd backend
npm start
# or in dev
npm run dev

Expect: `AI chat backend listening on port 3001` in logs.

## 4. Run the frontend
cd ../frontend
npm run dev

Open the URL output by Vite (usually http://localhost:5173). The UI should show the chat interface. If backend is not configured, the app will receive a demo fallback reply.

## 5. Wiring Ollama (optional)
- If you run Ollama locally, run `ollama serve` and `ollama pull gemma2:2b` as described in the course doc.
- When you identify the correct HTTP endpoint for your Ollama instance, set `OLLAMA_URL` in `backend/.env` to that endpoint.
- Restart the backend. The frontend will now receive real replies proxied through /api/chat.

## 6. HOS01A course-specific artifacts
- Take a screenshot of the backend root route (visit http://localhost:3001) and save as `01_hello_world_firstname_lastname.png`.
- Open the frontend, send a chat message, take a screenshot of the chat response and save as `02_chat_response_firstname_lastname.png`.
- Commit code and push to your GitHub Classroom repo.

## 7. Tests and sanity checks (automated LLM checklist)
- Verify `frontend/src/components/ChatInterface.jsx` posts `{ message: string }` to `VITE_API_URL`.
- Verify backend `POST /api/chat` forwards the body to `OLLAMA_URL` when set, and returns `{ ok: true, reply: string }`.
- If `OLLAMA_URL` is missing, backend returns `ok: true` with a demo reply string.

## 8. Helpful notes for the LLM
- Replace the `OLLAMA_URL` forwarding logic only after verifying the exact API shape of the target LLM host. Different versions may expect `{ prompt: '...' }`, `messages: [...]`, or a custom JSON shape.
- Don’t commit `node_modules` or secrets. Add `node_modules` to `.gitignore`.
- Keep the UI accessible: support `Enter` to send and `Shift+Enter` for newline, and ensure color contrast for dark & light.
