<template>
    <div id="home">
        <div id="search">
            <input v-model="searchVal" type="text" id="searchBar" placeholder="Unesite jelo za pretragu">
            <!-- probaj dodat lazy za v-model i vidi sto ce se dogodit -->
            <button @click="setValue(),loadDb()" id="btnSearch"><img src="../assets/search.png" id="ikona"></button>
        </div>
        <Meals v-if="searched" :searchVal="searchValue" :mealsDb="mealsDb" :randomVal="randomVal" :isClicked="false"/>
         <h2 v-if="this.loginButton" @click="prijava()" class="prijavaBtn">Prijava</h2>
        <Login v-if="this.clicked" v-on:loginSucc="loginSuccessful"/>
        <button @click="random()" class="btnRandom">Random</button>

        <p id="ispis"></p>
        
    </div>
</template>

<script>
import Meals from '../views/Meals'
import {db,jela} from '../../firebase'
import Login from '../views/Login'




export default {
    //name: 'Home',

    components: {
        Meals,
        Login,
    },


    methods: {
  
        random(){
            this.mealsDb = [];
            this.mealsDb.length = 0;
            jela.get().then(snap=>{
                // console.log(snap.data);
                let randomIndex = Math.floor(Math.random()*snap.size)
                // console.log(randomIndex);
                
                snap.docs.map((doc,index)=>{
                    // console.log(doc,index);
                    if(index===randomIndex){
                        // console.log(doc.data());
                        this.mealsDb.push([doc.id, doc.data()])
                        this.searched = true;
                        this.searchValue = doc.data().imeJela;
                        this.randomVal=true;
  
                    }
                })
            })

                        
                        },
          
   

        prijava(){
        this.clicked = true;
        },
        loginSuccessful(value){
            this.clicked = value;
            this.loginButton = false;
        },
        setValue: function() {
            this.searchValue = this.searchVal
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
      
        // console.log(this.mealsDb)
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
            randomVal: false, //testiranje ako ce raditi za random
        }
    },
    
}
</script>

<style>
    #home{
        margin-top: 50px;
    }
    #searchBar{
        border-radius: 10px 0 0 10px;
        width: 35%;
        height: 20px;
        border: 1px solid #979797;
    }
    /*  #btnSearch:focus{
         outline: none; 
    }
    */
    #btnSearch {
        transform: translate(-30%,7%);
        border-radius: 0 10px 10px 0;
        border: 1px solid #979797;
        position:absolute;
        top: 86px;
    }
    #ikona{
        height:20px;
        /* ovo nije finalno, moramo naci bolji nacin za ikonu */
        display: flex;
        align-items: center;
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
    cursor: pointer;
    left: 70%;
    right: 30%;
    }
  
</style>