const sql = require("./db")

const User = (user)=>{
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.is_admin = user.is_admin;
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ?`, id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else {
            result(null, results)
        }
    })
}


User.getAll = (result) => {
   sql.query('SELECT * FROM users', (error, results, fields) => {
        if (error){
            result(null, error)
        } else {
            result(null, results)
        }
    })
}

User.updateById = (id, user, result) => {
    sql.query('UPDATE users SET name = ?, email = ? WHERE id = ?',
    [user.name, user.email, user.id], (error, results, fields) => {
        if (error) {
            result(null, error)
        } else if (results.affectedRows === 0) {
            result({ kind : "not_found"}, null);
        } else {
            result(null, results)
        }
    })
};

User.deleteById = (id, result) => {
    sql.query('DELETE FROM users WHERE id = ?', id, (error, results, fields) => {
        if (error) {
            result(null, error)
        } else if (results.affectedRows === 0) {
            result({ kind : "not_found"}, null);
        } else {
            result(null, results)
        }
    })
};
 
module.exports = User;