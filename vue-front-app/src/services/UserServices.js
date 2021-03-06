import axios from 'axios';

//Appels API pour les utilisateurs
class UserServices {
    getOne(id){
        return axios.get("http://localhost:3000/user/" + id)
    }
    getAll(){
        return axios.get("http://localhost:3000/user")
    }
    deleteOne(id){
        return axios.delete("http://localhost:3000/user/" + id)
    }
}

export default new UserServices