import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // frontend origin
app.use(express.json());

// Connect to PostgreSQL
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
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) res.json({ success: true, message: "Login successful" });
    else res.status(401).json({ success: false, message: "Invalid username or password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// NEW: Get profile route - retrieves saved profile data
app.get("/api/profile/:username", async (req, res) => {
  const { username } = req.params;
  
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const result = await pool.query(
      "SELECT * FROM profile WHERE username = $1",
      [username]
    );
    
    if (result.rows.length > 0) {
      const profile = result.rows[0];
      
      // Convert expertise back to array if it was stored as string
      if (profile.expertise && typeof profile.expertise === 'string') {
        profile.expertise = profile.expertise.split(', ').filter(item => item.trim() !== '');
      }
      
      res.json({ success: true, profile });
    } else {
      // Return empty profile structure if no profile exists yet
      res.json({ 
        success: true, 
        profile: {
          username,
          first_name: '',
          last_name: '',
          email: '',
          bio: '',
          graduation_year: '',
          degree: '',
          major: '',
          gpa: '',
          honors: '',
          certifications: '',
          expertise: [],
          photo: ''
        }
      });
    }
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

// Profile save route
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
    // 1️⃣ Insert or update profile
    const profileQuery = `
      INSERT INTO profile 
      (username, first_name, last_name, email, bio, graduation_year, degree, major, gpa, honors, certifications, expertise, photo)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (username)
      DO UPDATE SET 
        first_name = COALESCE(EXCLUDED.first_name, profile.first_name),
        last_name = COALESCE(EXCLUDED.last_name, profile.last_name),
        email = COALESCE(EXCLUDED.email, profile.email),
        bio = COALESCE(EXCLUDED.bio, profile.bio),
        graduation_year = COALESCE(EXCLUDED.graduation_year, profile.graduation_year),
        degree = COALESCE(EXCLUDED.degree, profile.degree),
        major = COALESCE(EXCLUDED.major, profile.major),
        gpa = COALESCE(EXCLUDED.gpa, profile.gpa),
        honors = COALESCE(EXCLUDED.honors, profile.honors),
        certifications = COALESCE(EXCLUDED.certifications, profile.certifications),
        expertise = COALESCE(EXCLUDED.expertise, profile.expertise),
        photo = COALESCE(EXCLUDED.photo, profile.photo)
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
      Array.isArray(expertise) ? expertise.join(", ") : expertise || null, // safe string
      photo || null,
    ];
    const profileResult = await pool.query(profileQuery, profileValues);

    // 2️⃣ Insert or update alumni card
    const alumniQuery = `
      INSERT INTO alumni
      (username, name, year, department, location, role, company, image, skills, featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (username)
      DO UPDATE SET
        name = COALESCE(EXCLUDED.name, alumni.name),
        year = COALESCE(EXCLUDED.year, alumni.year),
        department = COALESCE(EXCLUDED.department, alumni.department),
        location = COALESCE(EXCLUDED.location, alumni.location),
        role = COALESCE(EXCLUDED.role, alumni.role),
        company = COALESCE(EXCLUDED.company, alumni.company),
        image = COALESCE(EXCLUDED.image, alumni.image),
        skills = COALESCE(EXCLUDED.skills, alumni.skills),
        featured = COALESCE(EXCLUDED.featured, alumni.featured)
      RETURNING *;
    `;
    const alumniValues = [
      username,
      `${firstName || ""} ${lastName || ""}`.trim(),
      graduationYear || null,
      degree || null, // map degree to department if needed
      major || null,
      "Current Role", // placeholder
      "Current Company", // placeholder
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

// Alumni list route
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