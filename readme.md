# Institute of Devs — Local dev server for OpenAI demo

This project demonstrates a small front-end that calls a local Express server which proxies requests to the OpenAI API. This avoids importing the `openai` npm package directly in the browser.

Quick start

1. Copy `.env.example` to `.env` and set your `OPENAI_API_KEY`.

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open http://localhost:3000 in your browser and click the "Fetch" button.

Notes
- Keep your API key secret — do not commit `.env`.
- If you prefer bundling the client instead, consider using Vite or webpack.
Hello!
