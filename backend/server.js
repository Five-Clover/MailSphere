import express from "express";
import cookieSession from "cookie-session";
import config from "./config.js";
import store from "./storage/simpleStore.js";

const app = express();
app.use(express.json());

// ---------------- SESSION ----------------
app.use(
  cookieSession({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
// For "/"
app.get("/",(req, res)=>{
res.send("Backend is running");
})
// ---------------- GOOGLE AUTH ----------------

app.get("/auth/google/url", (req, res) => {
  const params = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID,
    redirect_uri: config.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile https://mail.google.com/",
    access_type: "offline",
  });

  res.json({
    url: "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString(),
  });
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  res.json({
    message: "Google callback reached",
    code,
  });
});

// ---------------- MICROSOFT AUTH ----------------

app.get("/auth/microsoft/url", (req, res) => {
  const params = new URLSearchParams({
    client_id: config.MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: config.MICROSOFT_REDIRECT_URI,
    scope: "offline_access Mail.Read User.Read",
  });

  res.json({
    url:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
      params.toString(),
  });
});

app.get("/auth/microsoft/callback", (req, res) => {
  const { code } = req.query;
  res.json({
    message: "Microsoft callback reached",
    code,
  });
});

// ---------------- IMAP CONNECT ----------------

app.post("/connect/imap", (req, res) => {
  const { email, provider } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  store.addAccount({ email, provider });

  res.json({ success: true, email, provider });
});

// ---------------- ACCOUNTS LIST ----------------

app.get("/accounts", (req, res) => {
  res.json({
    accounts: store.getAccounts(),
  });
});

// ---------------- START CATEGORIZATION ----------------

app.post("/start-categorize", (req, res) => {
  res.json({
    message: "Categorization started",
  });
});

// ---------------- START SERVER ----------------

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
