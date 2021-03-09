const sql = require('./db')

const Comment = (comment) => {
    this.user_id = comment.user_id,
    this.post_id = comment.post_id,
    this.text = comment.text
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result (null, res.insertId)
        }
    })
};

Comment.findById = (id, result) => {
    sql.query(`SELECT * FROM comments WHERE comment_id = ?`, id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else {
            result(null, results[0])
        }
    })
};

Comment.getAll = (result) => {
    sql.query('SELECT * FROM comments ORDER BY created_at DESC', (error, results, fields) => {
        if (error){
            result(null, error)
        } else {
            result(null, results)
        }
    })
};

Comment.getAllFromPost = (id, result) => {
    sql.query('SELECT * FROM comments INNER JOIN posts ON commnets.post_id = posts.post_id WHERE id = ?', id , (error, results, fields) => {
        if (error){
            result(null, error)
        } else {
            result(null, results)
        }
    })
}

Comment.deleteById = (id, result) => {
    sql.query('DELETE FROM comments WHERE comment_id = ?', id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else if (results.affectedRows === 0) {
            result({ kind : "not_found"}, null);
        } else {
            result(null, results)
        }
    })
}

Comment.updateById = (id, comment, result) => {
    sql.query('UPDATE comments SET text = ? WHERE comment_id = ?',
    [comment.text, id ] , (error, results, fields) => {
        if (error) {
            result(null, error)
        } else if (results.affectedRows === 0) {
            result({ kind : "not_found"}, null);
        } else {
            result(null, results)
        }
    })
};

module.exports = Comment;