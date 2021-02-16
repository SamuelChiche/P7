<template>
    <div class="header">
        <div class="header container">
        <router-link to="/"><img src="../assets/icon-left-font-monochrome-white.png" alt=""></router-link>
        <Logout/>
        </div>
    </div>
</template>

<script>
import Logout from '../components/Logout'
export default {
    name : 'Header',
    components : {
        Logout
    }
}
</script>

<style lang="scss">
    .header{
        background-color:#091F43 ;

        img{
            width: 250px;
            height: 80px;
            text-align: center;
        }    
    }
</style>