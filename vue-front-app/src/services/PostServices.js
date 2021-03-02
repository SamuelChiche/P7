import axios from 'axios';

class PostServices {
    getAll(){
        return axios.get("http://localhost:3000/post")
    }

    create(fd){
        return axios.post("http://localhost:3000/post", fd)
    }

    getOne(id){
        return axios.get("http://localhost:3000/post/" + id)
    }

    edit(){
        return axios.get("http://localhost:3000/post")
    }

    delete(id){
        return axios.delete("http://localhost:3000/post/" + id)
    }

    getFromUser(id){
        return axios.get("http://localhost:3000/post/user/" + id)
    }
}

export default new PostServices