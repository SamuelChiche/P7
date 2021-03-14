import axios from 'axios';

//Appels API pour les posts
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

    edit(id, data){
        return axios.put("http://localhost:3000/post/" + id, data )
    }

    delete(id){
        return axios.delete("http://localhost:3000/post/" + id)
    }

    getFromUser(id){
        return axios.get("http://localhost:3000/post/user/" + id)
    }
}

export default new PostServices