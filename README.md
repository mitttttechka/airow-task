The application file is app.js.

The application exposes http server with GET endpoint for fetching all the user posts with max. 5 comments for each post.
GET endpoint is reachable by route /user/:userId/posts.
In case if no posts are available for the userId, it responses with 404 code error.
