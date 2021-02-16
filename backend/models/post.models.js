const sql = require('./db')

const Post = (post) => {
    this.user.id = post.user_id,
    this.text = post.text
};

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            throw err
        } else {
            result (null, res.insertId)
        }
    })
};

Post.getAll = (result) => {
    sql.query('SELECT * FROM posts', (error, results, fields) => {
        if (error){
            result(null, error)
        } else {
            result(null, results)
        }
    })
};

Post.getAllFromUser = (id, result) => {
    sql.query('SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE id = ?', id , (error, results, fields) => {
        if (error){
            result(null, error)
        } else {
            result(null, results)
        }
    })
}

module.exports = Post;
