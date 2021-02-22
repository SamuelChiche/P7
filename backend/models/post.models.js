const sql = require('./db')

const Post = (post) => {
    this.user.id = post.user_id,
    this.text = post.text,
    this.title = post.title,
    this.user_name = post.user_name
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

Post.findById = (id, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ?`, id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else {
            result(null, results)
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

Post.deleteById = (id, result) => {
    sql.query('DELETE FROM posts WHERE post_id = ?', id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else if (results.affectedRows === 0) {
            result({ kind : "not_found"}, null);
        } else {
            result(null, results)
        }
    })
}

module.exports = Post;
