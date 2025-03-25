### **HTML / CSS / TypeScript**

**What it is**:

**HTML**: Structure (buttons, forms, headers)

**CSS**: Styling (colors, spacing, layout)

**TypeScript**: A typed superset of JavaScript.

**When**: Frontend development; Typescript helps prevent errors as apps grow.

### **Version Control (Git Basics)**

**What it is**: Track changes to your code and collaborate with others.

**Basic Commands**:

```
git init               # start a repo
git status             # see changes
git add .              # stage all changes
git commit -m "msg"    # commit with a message
git log                # view commit history
git checkout -b dev    # create new branch
git switch main        # switch branch
git pull               # get latest from remote
git push               # send changes to remote
```

**When to use**: Always. Keeps your work safe, trackable, and shareable.

### **React (or Web Frameworks)**

**What it is**: A frontend library for building user interfaces with reusable components.

**How it works**:

React uses **components** (functions that return UI).

UI updates reactively when state changes.

**When**: Building modern, interactive UIs.

**Alternatives**: Vue, Svelte, Next.js (React + SSR), Astro

### **APIs (Application Programming Interfaces)**

**What it is**: A way for your app to talk to another service.

**Example**:

```
fetch("https://api.openai.com/v1/models", {
  headers: { "Authorization": "Bearer YOUR_API_KEY" }
})
```

**When to use**: Anytime you need to get/send data to another service (e.g., weather, maps, AI).

### **OAuth 2.0 & Authentication**

**What it is**: A secure way to let users log in using other platforms without giving you their password.

**Example**:

User clicks “Login with Google” → Redirects to Google → Returns with a token you use to get their info.

**When to use**: Login systems, accessing user-specific data (e.g., calendar, contacts, Google Drive).

### **Webhooks**

**What it is**: A way to receive data when something happens *outside* your app.

**Example**:

Stripe sends a POST request to your /webhook endpoint when a payment is successful.

**When to use**: Get notified automatically of events like new payments, form submissions, etc.

### **Cron Jobs & Background Jobs**

**What it is**:

Cron: Scheduled tasks.

Background: Long-running or delayed tasks off the main thread.

**Example**:

Cron: Run a script every night at midnight to back up a database.

Background: Resize uploaded images after user submits them.

**When to use**: Anything time-based or resource-heavy.

### **Databases (SQL & NoSQL)**

**What it is**: Systems to store and retrieve structured data.

**Example** (SQL):

```
SELECT * FROM users WHERE id = 1;
```

**When to use**: Storing any user data, settings, logs, or application state.

**Popular choices:** Supabase (PostgreSQL), Firebase (realtime apps)

### **Sessions, Cookies, and Tokens**

**What it is**:

**Cookies**: Stored in browser.

**Sessions**: Stored server-side.

**Tokens**: Sent with each request (usually as a header).

**Example**: Store a JWT (token) in localStorage to keep user logged in.

**When to use**: Keeping users logged in, protecting private routes/pages.

### **Environment Variables & Config**

**What it is**: Store secrets and config outside your code.

**Example**: .env

```
STRIPE_SECRET_KEY=sk_test_abc123
```

**When to use**: Always — for API keys, DB passwords, etc. Never hardcode secrets!

### **Error Handling & Logging**

**What it is**: Catching errors and tracking them.

**Example**:

```
try {
  const res = await fetch("/api");
  const data = await res.json();
} catch (err) {
  console.error("Something went wrong:", err);
}
```

**When to use**: Everywhere — especially with APIs, database access, and async code.

### **Error Handling & Logging (Sentry)**

**What it is**: Track bugs and log errors in real time.

**Example (Sentry)**:

```jsx
Sentry.captureException(new Error("Something broke"));
```

**When**: Use Sentry or similar in production to monitor app health.

### **Rate Limits & Retry Logic**

**What it is**: APIs limit how often you can call them; retries handle temporary failures.

**Example**:

429 Too Many Requests → wait and try again after 1 minute.

**When to use**: Any time you call 3rd party APIs.

### **JSON & Serialization**

•	**What it is**: JSON = a format to send structured data between systems.

•	**Example**:

```
const obj = { name: "Sam" };
const json = JSON.stringify(obj);  // convert to string
```

•	**When to use**: Communicating between frontend & backend, or sending API requests.

### **Basic DevOps Concepts**

•	**What it is**: Getting your code live and maintaining it.

•	**Example**:

•	git push to Vercel or Heroku deploys your app.

•	**When to use**: Every app that users need to access online.

### Summary

If you wanted to build an actual app, you’d probably use:

| **Feature** | **Tool Example** |
| --- | --- |
| UI Components | React + Tailwind |
| Styling | CSS / Tailwind |
| Auth | Supabase Auth / Firebase Auth |
| Database | Supabase / Firebase |
| APIs | REST / fetch / axios |
| Cron Jobs | CRON on Render or Zapier |
| Webhooks | Stripe / Slack → Your API |
| Hosting | Vercel / Netlify |
| Monitoring | Sentry |
| Versioning | Git + GitHub |
| Testing | Jest / Playwright |

### **Terminal / Command Line**

**What it is**: A text-based interface for running commands directly on your computer/server.

**Why it matters**: It gives you **precise control** over your system, files, and workflows — faster and more powerful than GUIs in many cases.

**Common Commands**:

```jsx
cd my-app           # change directory
ls                  # list files
mkdir new-folder    # make a folder
rm file.txt         # delete file
npm install         # install packages
node app.js         # run JS app
git add .           # stage changes
git commit -m "msg" # commit changes
```

**When to use**: Running apps, editing files, deploying, managing Git, installing libraries, scripting.