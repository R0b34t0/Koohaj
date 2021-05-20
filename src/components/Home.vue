<template>
    <div id="home">
        <div id="search">
            <input v-model="searchVal" type="text" id="searchBar" placeholder="Unesite jelo za pretragu">
            <button @click="setValue(),loadDb()" id="btnSearch"><img src="../assets/search.png" id="ikona"></button>
            <!-- Random button -->
            <button @click="random()" class="btnRandom" id="btnRandom">
            <img src="../assets/random.svg"> 
            
        </button>
        </div>
        <Meals v-if="searched" :searchVal="searchValue" :mealsDb="mealsDb" :randomVal="randomVal" :isClicked="false"/>
         <h2 v-if="this.loginButton" @click="prijava()" class="prijavaBtn">Prijava</h2>
         <h2 v-if="!this.loginButton" @click="odjava()" class="prijavaBtn">Odjava</h2>
         <h2 v-if="this.unosButton" @click="this.$router.push('/unos')" class="unosBtn">Unos</h2>
        <Login v-if="this.clicked" v-on:loginSucc="loginSuccessful"/>
        

        <p id="ispis"></p>
        
    </div>
</template>

<script>
import Meals from '../views/Meals'
import {auth, db,jela} from '../../firebase'
import Login from '../views/Login'




export default {
    //name: 'Home',
    components: {
        Meals,
        Login,
    },


    methods: {
  
        random(){
            this.searchVal = '';
            this.mealsDb.length = 0;
            jela.get().then(snap=>{
                let randomIndex = Math.floor(Math.random()*snap.size)
                
                snap.docs.map((doc,index)=>{
                    if(index===randomIndex){
                        this.mealsDb.push([doc.id, doc.data()])
                        this.searched = true;
                        this.searchValue = doc.data().imeJela.toLowerCase();
                        this.randomVal=true;
  
                    }
                })
            })
        },
          
   

        prijava(){
        this.clicked = true;
        },
        odjava(){
            auth.signOut();
            this.clicked = false;
            this.loginButton = true;
            alert('Odjavljeni ste')
        },
        loginSuccessful(value){
            this.clicked = value;
            this.loginButton = false;
        },
        setValue: function() {
            this.searchValue = this.searchVal.toLowerCase();
            this.searched = true //otkriva search vrijednosti
            this.randomVal = false; // u slucaju da netko stisne random pa trazi
        },
        loadDb: function() {
        this.mealsDb = []
            jela.get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    
                    //   mozda moze i bolje. Ali ideja je da gore ispraznim array za svakih search, inace bi se duplalo za svaki pritisak searcha
                    this.mealsDb.push([
                        doc.id,
                        doc.data()])
                    // }

                })
      
      
    })
        },
     
        
    },
        data() {
        return {
            searchValue:'', //dodana vrijednost da se mora stisnut search da se dobije org vrijednost 
            searchVal: '', // ovo je vrijednost u modelu
            searched: false,
            isClicked: false,
            mealsDb:[], //vrijednost iz db 
            clicked: false, // prikazuje Login.vue
            loginButton: true, // prikazuje Login.vue
            unosButton: false, // prikazuje Unos.vue
            randomVal: false, //testiranje ako ce raditi za random
        }
    },
    beforeMount() {
        // loginButton 
        if(auth.currentUser) {
            this.loginButton = false;
            this.unosButton = true;
        }
        else {
            this.loginButton = true;
            this.unosButton = false;   
        }
    },
    
}
</script>

<style>
    button{
        cursor: pointer;
    }
    #home{
        margin-top: 50px;
    }
    #searchBar{
        border-radius: 10px 0 0 10px;
        width: 35%;
        height: 20px;
        border: 1px solid #979797;
    }
    
    #btnSearch {
        transform: translate(-30%,7%);
        border-radius: 0 10px 10px 0;
        border: 1px solid #979797;
        position:absolute;
        top: 86px;
    }
    #ikona{
        height:20px;        
        display: flex;
        align-items: center;
    }
    #btnRandom{
        height:25px;
        width:40px;        
        display: flex;
        align-items: center;
        top: 87px;
    }
    .prijavaBtn{
    color: #ffffff;
    position: absolute;
    top: 0;
    cursor: pointer;
    left: 90%;
    right: 10%;
    }

    .btnRandom{
    position: absolute;
    top: 90px;
    left: 70%;
    right: 30%;
    }
    .unosBtn{
        cursor: pointer;
        color: #ffffff;
        position: absolute;
        top: 0;
    }
</style>