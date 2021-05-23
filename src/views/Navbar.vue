<template>
    <div id="heading">
        <div @click="navigateHome()">
        <h1>Koohaj!</h1>
        <img src="../assets/logo.png" class="logo">
        </div>

        <h2 v-if="this.loginButton" @click="prijava" class="prijavaBtn">Prijava</h2>
         <h2 v-if="!this.loginButton" @click="odjava" class="prijavaBtn">Odjava</h2>
         <h2 v-if="this.unosButton" @click="this.$router.push('/unos')" class="unosBtn">Unos</h2>
        <Login v-if="this.clicked" v-on:loginSucc="loginSuccessful"/>
    </div>
</template>
<script>
import {auth} from "../../firebase";
import Login from '../views/Login'

export default {
    components:{
        Login,
    },
    data() {
        return {
            clicked: false, // prikazuje Login.vue
            loginButton: true, // prikazuje Login.vue
            unosButton: false, // prikazuje Unos.vue
        }
    },
    methods: {
        checkButtons(){
            if(auth.currentUser) {
            this.loginButton = false;
            this.unosButton = true;
        }
        else {
            this.loginButton = true;
            this.unosButton = false;   
        }
        },
        navigateHome() {
            this.$router.push('/')
            this.clicked = false;
        },
        prijava(){
        this.clicked = true;
        },
        odjava(){
            auth.signOut();
            this.clicked = false;
            this.loginButton = true;
            this.unosButton = false;
            alert('Odjavljeni ste')
            this.$router.go();
        },
        loginSuccessful(value){
            this.clicked = value;
            this.loginButton = false;
            this.unosButton = true;
        },
    },
    beforeMount() {
        // loginButton 
        this.checkButtons();
    },
    watch:{
        $route(to, from){
            if(to.fullPath === "/unos") this.unosButton = false;
            else this.checkButtons();
        }
    }
    
}
</script>
<style>
    #heading h1 {
        color: white;
        font-size: 25px;
        display: flex;
        justify-content: center;
        padding: 5px;
    }
    #heading{
        cursor: pointer;
        position: absolute;
        background-color: #794614;
        width:100%;
        left: 0;
        top: 0;
        height: 70px;
    }
    .logo{
        width: 70px;
        height: 70px;
        position: absolute;
        text-align: center;
        top: 0;
        margin-left: -130px;
        
    }

    .prijavaBtn{
    color: #ffffff;
    position: absolute;
    top: 0;
    cursor: pointer;
    right: 0;
    padding-right: 30px;
    }
    .unosBtn{
        padding-left: 30px;
    }
</style>