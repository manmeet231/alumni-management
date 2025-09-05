const db = require('../db/database');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (user && user.password === password) {
            req.session.user = {
                name: user.name,
                user_id: user.user_id
            };
            return res.redirect(`/dashboard?username=${user.name}`);
        }
        return res.redirect("/login");
    } catch (error) {
        console.error('Login error:', error);
        res.redirect("/login");
    }
};

const signup = async (req, res) => {
    try {
        const data = req.body;
        console.log("In auth controller")
        console.log(data.email, data.password, data.name)
        console.log(req.body)
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [data.email]);

        if (existingUser.rows.length > 0) {
            return res.redirect("/login");
        }

        await db.query(
            "INSERT INTO users (email, password,name) VALUES ($1, $2,$3)",
            [data.email, data.password, data.name]
        );
        res.redirect("/dashboard");
    } catch (error) {
        console.error('Signup error:', error);
        res.redirect("/signup");
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Logout error:', err);
        res.redirect('/');
    });
};

module.exports = {
    login,
    signup,
    logout
}; 