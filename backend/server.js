require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// PRISMA SETUP
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


const app = express();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = "supersecret";

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
// Step 1: Redirect to Google
app.get("/login", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/callback&response_type=code&scope=email profile&access_type=offline`;

  res.redirect(url);
});

// Step 2: Callback
app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;

    // Exchange code → token
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/callback"
    });

    const accessToken = tokenRes.data.access_token;

    // Get user info
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { email, name, picture } = userRes.data;

    // Save user in DB
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name, picture }
      });
    }

    // Create JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d"
    });

    // Redirect back to frontend
    res.redirect(`http://localhost:5173/callback?token=${token}`);

  } catch (err) {
    console.log(err);
    res.send("Error in login");
  }
});

// Protected route
app.get("/dashboard", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) return res.send("No token");

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    res.json(user);
  } catch {
    res.send("Invalid token");
  }
});

// const server = app.listen(3000);
const port = 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })