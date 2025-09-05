const db = require('../db/database');

const getAllPosts = async (req, res) => {
    try {
        const curr_user_id = req.session.user.user_id;
        const result = await db.query("SELECT * FROM posts,users WHERE posts.user_id = users.user_id");
        const posts_users = result.rows.reverse();
        let curr_user_img;
        for (const post of posts_users) {
            if (post.user_id === curr_user_id) {
                curr_user_img = post.profile_image_url
            }
        }
        res.render("community-feed.ejs", { posts_users, curr_user_img: curr_user_img });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
};

const createPost = async (req, res) => {
    try {
        const { content, tags } = req.body;
        const user_id = req.session.user.user_id;
        const tagArray = tags.split(",");

        await db.query(
            "INSERT INTO posts (user_id, post, tags) VALUES ($1, $2, $3)",
            [user_id, content, tagArray]
        );
        res.redirect('/feed');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
};

const getDashboardPosts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts,users WHERE posts.user_id = users.user_id");
        const posts_users = result.rows.reverse();
        const user_id = req.session.user.user_id;
        const result2 = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        curr_user_data = result2.rows
        console.log(curr_user_data)

        const {
            name,
            batch,
            job_title,
            location,
            branch,
            company,
            profile_image_url
        } = curr_user_data[0]

        res.render("dashboard.ejs", {
            name: name,
            img: profile_image_url,
            batch: batch,
            job: job_title,
            location: location,
            branch: branch,
            posts: posts_users
        });
    } catch (error) {
        console.error('Error fetching dashboard posts:', error);
        res.status(500).send('Error fetching dashboard posts');
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getDashboardPosts
}; 