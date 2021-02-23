<script>
import axios from 'axios';
export default {
    name : Upvote,
    data : {
        upvoted : false ,
        downvoted : false
    },
    mounted : {
        onInit (post_id) {
            user_id = JSON.parse(this.$store.user).id;
            axios.post('http://localhost:3000/post/uvote/' + post_id, user_id)
                .then(res => this.upvoted)
                .catch(err => err)
            axios.post('http://localhost:3000/post/dvote/' + post_id, user_id)
                .then(res => this.downvoted)
                .catch(err => err)
        }   
    }
}
</script>