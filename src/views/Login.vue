<template>
<div class="loginWindow" >
    <div class="loginForm" v-if="!register"> 
        <input v-model="mail" type="email" placeholder="Unesite e-mail">
        <input v-model="password" type="password" placeholder="Unesite lozinku">
        <button @click="login">Prijava</button>
        <h4 @click="this.register=true">Niste korisnik? Registrirajte se!</h4>
    </div>
    <div class="loginForm" v-if="register">

        <input v-model="mail" type="email" placeholder="Unesite e-mail">
        <input v-model="password" type="password" placeholder="Unesite lozinku">
        <input v-model="password2" type="password" placeholder="Potvrdite lozinku">
        <br>
        <button @click="registracija"> Registriraj se</button>
        <h4 @click="this.register=false">Povratak na prijavu</h4>
        
    </div>

</div>
</template>

<script>

import {auth} from '../../firebase';


export default {
        data() {
        return {
            mail:'',
            password:'',
            password2:'',
            register: false,
        }
    },
    props:{
        clicked:Boolean,
    },
    methods: {
        login() {
            if(this.mail.trim() !== '' && this.password.trim() !==''){
                auth.signInWithEmailAndPassword(this.mail, this.password)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        this.$emit('loginSucc', false);
                        
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert('Korisnicko ime ili lozinka nije ispravna')
                    });
            }
            else{
                alert('Unesite e-mail ili lozinku')
            }
        },
        // 
        registracija(){
            if(this.mail.trim() !== '' && this.password.trim() !==''){
                if(this.password===this.password2){
                    if(this.password.length>5){
                            auth.createUserWithEmailAndPassword(this.mail, this.password)
                            .then((userCredential) => {
                
                            // Signed in 
                                alert("Registrirani ste!")      
                                this.login()  
                            })
                                .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                            });
                
                    }else alert("Lozinka mora biti veca od 5 znakova");
                }else alert("Lozinke se ne podudaraju!");
            }else alert("Niste unijeli sve potrebne podatke");

        }
    },
}

</script>

<style>
    .loginWindow {
        z-index: 2;
        position: absolute;
        width: 100vw;
        height: 100vw;
        top: 70px;
        background: #794614;
    }

    .loginForm{
        margin-top: 150px;
        display: flex;
        flex-direction: column;
        width: 200px;
        margin-left: auto;
        margin-right: auto;
        transform: scale(1.5);
        }
    .loginForm button {
        margin-top: 5px;
        border-radius: 10px 10px;
    }
</style>