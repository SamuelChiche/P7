import axios from 'axios';

class CommentServices {
    getAll(){
        return axios.get("http://localhost:3000/comment")
    }

    create(data){
        return axios.post("http://localhost:3000/comment", data)
    }

    getOne(id){
        return axios.get("http://localhost:3000/comment/" + id)
    }

    edit(id, data){
        return axios.put("http://localhost:3000/comment/" + id, data)
    }

    delete(id){
        return axios.delete("http://localhost:3000/comment/" + id)
    }

    getFromPost(id){
        return axios.get("http://localhost:3000/comment/post/" + id)
    }
}

export default new CommentServices