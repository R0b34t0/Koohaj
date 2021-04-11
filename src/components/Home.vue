<template>
    <div id="home">
        <div id="search">
            <input v-model="searchVal" type="text" id="searchBar" placeholder="Unesite jelo za pretragu">
            <button @click="setValue(),loadDb()" id="btnSearch"><img src="../assets/search.png" id="ikona"></button>
        </div>
        <Meals v-if="searched" :searchVal="searchValue" :mealsDb="mealsDb" :isClicked="isClicked"/>
    </div>
</template>

<script>
import Meals from '../views/Meals'
import {jela} from '../../firebase'


export default {
    components:{
    Meals,
  },
    data() {
        return {
            searchValue:'', //dodana vrijednost da se mora stisnut search da se dobije org vrijednost 
            searchVal: '', // ovo je vrijednost u modelu
            searched: false,
            isClicked: false,
            mealsDb:[], //vrijednost iz db 
            
        }
    },
    methods: {
        setValue: function() {
            this.searchValue = this.searchVal
            this.searched = true //otkriva search vrijednosti
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
    #btnSearch:focus{
        /* outline: none; */
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
        /* ovo nije finalno, moramo naci bolji nacin za ikonu */
        display: flex;
        align-items: center;
    }
</style>