import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
// Get profile - with better debugging
app.get("/api/profile/:username", async (req, res) => {
  const { username } = req.params;
  console.log(`Fetching profile for username: "${username}"`); // Debug log
  
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const result = await pool.query(
      "SELECT * FROM profile WHERE username = $1",
      [username]
    );

    console.log(`Query result for ${username}:`, result.rows.length, "rows"); // Debug log

    if (result.rows.length > 0) {
      let profile = result.rows[0];
      console.log(`Profile found:`, profile.username); // Debug log

      // Convert expertise back to array
      if (profile.expertise && typeof profile.expertise === "string") {
        profile.expertise = profile.expertise.split(",").map((s) => s.trim());
      } else if (!profile.expertise) {
        profile.expertise = []; // Ensure it's always an array
      }

      res.json({ success: true, profile });
    } else {
      console.log(`No profile found for username: "${username}"`); // Debug log
      res.json({ success: true, profile: null });
    }
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

// Add a debug route to check what usernames exist
app.get("/api/debug/usernames", async (req, res) => {
  try {
    const result = await pool.query("SELECT username FROM profile");
    const usernames = result.rows.map(row => row.username);
    res.json({ usernames });
  } catch (err) {
    console.error("Debug error:", err);
    res.status(500).json({ error: "Debug error" });
  }
});
// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "alumni_db",
  password: "manmeet",
  port: 5432,
});

// Test route
app.get("/", (req, res) => res.send("Backend is running 🚀"));

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0)
      res.json({ success: true, message: "Login successful" });
    else
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get profile
app.get("/api/profile/:username", async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const result = await pool.query(
      "SELECT * FROM profile WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0) {
      let profile = result.rows[0];

      // Convert expertise back to array
      if (profile.expertise && typeof profile.expertise === "string") {
        profile.expertise = profile.expertise.split(",").map((s) => s.trim());
      }

      res.json({ success: true, profile });
    } else {
      res.json({ success: true, profile: null });
    }
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

// Save profile
app.post("/api/profile/save", async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    bio,
    graduationYear,
    degree,
    major,
    gpa,
    honors,
    certifications,
    expertise,
    photo,
  } = req.body;

  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    // Profile table
    const profileQuery = `
      INSERT INTO profile 
      (username, first_name, last_name, email, bio, graduation_year, degree, major, gpa, honors, certifications, expertise, photo)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (username)
      DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        email = EXCLUDED.email,
        bio = EXCLUDED.bio,
        graduation_year = EXCLUDED.graduation_year,
        degree = EXCLUDED.degree,
        major = EXCLUDED.major,
        gpa = EXCLUDED.gpa,
        honors = EXCLUDED.honors,
        certifications = EXCLUDED.certifications,
        expertise = EXCLUDED.expertise,
        photo = EXCLUDED.photo
      RETURNING *;
    `;
    const profileValues = [
      username,
      firstName || null,
      lastName || null,
      email || null,
      bio || null,
      graduationYear || null,
      degree || null,
      major || null,
      gpa || null,
      honors || null,
      certifications || null,
      Array.isArray(expertise) ? expertise.join(", ") : expertise || null,
      photo || null,
    ];
    const profileResult = await pool.query(profileQuery, profileValues);

    // Alumni table
    const alumniQuery = `
      INSERT INTO alumni
      (username, name, year, department, location, role, company, image, skills, featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (username)
      DO UPDATE SET
        name = EXCLUDED.name,
        year = EXCLUDED.year,
        department = EXCLUDED.department,
        location = EXCLUDED.location,
        role = EXCLUDED.role,
        company = EXCLUDED.company,
        image = EXCLUDED.image,
        skills = EXCLUDED.skills,
        featured = EXCLUDED.featured
      RETURNING *;
    `;
    const alumniValues = [
      username,
      `${firstName || ""} ${lastName || ""}`.trim(),
      graduationYear || new Date().getFullYear(), // fallback to current year
      degree || null,
      major || null,
      "Student/Alumni", // better than placeholder
      null,
      photo || null,
      Array.isArray(expertise) ? expertise.join(", ") : expertise || null,
      true,
    ];
    const alumniResult = await pool.query(alumniQuery, alumniValues);

    res.json({ profile: profileResult.rows[0], alumni: alumniResult.rows[0] });
  } catch (err) {
    console.error("Profile save error:", err);
    res.status(500).json({
      error: "Server error while saving profile",
      details: err.message,
    });
  }
});

// Alumni list
app.get("/api/alumni", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alumni");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Error fetching alumni" });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
