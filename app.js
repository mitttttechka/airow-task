const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const data = 'https://jsonplaceholder.typicode.com';

app.get('/user/:userId/posts', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch user's posts
        const postsResponse = await axios.get(`${data}/posts?userId=${userId}`);
        const posts = postsResponse.data;

        if (posts.length === 0) {
            // Return 404 if no posts found for the user
            return res.status(404).json({ error: 'Error 404. No posts found for the user.' });
        }

        // Fetch comments for each post (max 5 comments per post)
        const postsWithComments = await Promise.all(posts.map(async (post) => {
            const commentsResponse = await axios.get(`${data}/comments?postId=${post.id}&_limit=5`);
            const comments = commentsResponse.data;
            return { ...post, comments };
        }));

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(postsWithComments, null, 2));
        // res.json(postsWithComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
