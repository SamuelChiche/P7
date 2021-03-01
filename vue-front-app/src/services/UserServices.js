import axios from 'axios';

class UserServices {
    getOne(id){
        return axios.get("http://localhost:3000/user/" + id)
    }
    deleteOne(id){
        return axios.delete("http://localhost:3000/user/" + id)
    }
}

export default new UserServices