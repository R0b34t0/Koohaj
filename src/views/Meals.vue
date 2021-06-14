<template>
    <!-- :class="[isClicked ? 'clickedTitle' : '']" -->
   
  <ul v-if="this.searchVal" class="listStyle">
      <li class="popisJela" v-for="(jelo,index) in this.mealsDb" :key="jelo[0]">
        <!-- slika, ime jela, sastojci, opis kuhanja -->
        <!-- <div v-on="getImage(jelo[1].imeSlike)">  -->
        <p :class="[isClicked ? 'clickedTitle' : 'unClickedTitle']">{{jelo[1].imeJela}}</p>
        <div :class="[isClicked ? 'clickedMeal' : 'unClickedMeal']" >
          <ul v-if="isClicked" class="recipe" >
              <li v-for="recipe in jelo[1].sastojci" :key="recipe">
                {{recipe}}
                </li>
            </ul>
          <img class="images" v-on="getImage(jelo[1].imeSlike)" @click="openMeal(index)" :src="jelo[1].link"> 
            <p class="opisKuhanja" v-if="isClicked"> 
              {{jelo[1].opisKuhanja}}
              </p>

        </div>
        <!-- </div> -->
        </li>
  </ul>

</template>

<script>
import {storage} from '../../firebase'

export default {
    props: {
      searchVal: String,
      mealsDb: Array,
      randomVal: Boolean,
    },
    data() {
    return {
      isClicked: false,
      imgLink:'',
    }
  },
  methods: {
    getImage: async function(imageName){
      (this.randomVal === true) ? this.isClicked = this.randomVal : '' 
      var storageRef = storage.ref()
      var imageRef = storageRef.child(imageName+'.jpg');
        // Get the download URL
      this.imgLink = await imageRef.getDownloadURL().catch((error)=>{
        console.log(error);
      })
      
    },
    openMeal: function(arrPosition) {
      let tempVar = this.mealsDb[arrPosition]
      this.mealsDb.length = 0
      this.mealsDb.push(tempVar)
      this.toggleClass() // prebaceno iz poziva u buttonu
    },
    toggleClass: function() {
      this.isClicked = true;
    }
    
  },
  watch: {
    mealsDb: function(){
      this.isClicked = false
    }
  },
  beforeUpdate() {   
    let tempArr = [];
    tempArr = this.mealsDb.filter(value => value[1].imeJela.toLowerCase().startsWith(this.searchVal))

    this.mealsDb.length = 0
    this.mealsDb.push.apply(this.mealsDb, tempArr)
  } 
}
</script>

<style>

  .listStyle{
    display: table;
    margin: 0 auto;
    list-style-type: none;
  }


  .clickedMeal{
    border: 3px solid #794614;
    align-items: center;
    width: 300px;
  }

  .clickedMeal img {
    width: 300px;
    padding-top: 4px;
  }

  .opisKuhanja {
    border-top: 3px dashed #794614;
    width: 300px;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  .recipe{
    list-style-type: none;
    border-bottom: 3px dashed #794614;
    /* margin-bottom: 10px; */
    margin: 0;
    /* width: 300px; */
  }
  .recipe li {
    margin-right: 40px;
  }
  .popisJela {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    justify-content: center;
  }
  .unClickedMeal{
    z-index: 0;
  }

  .unClickedMeal img{
    cursor: pointer;
    width: 200px;
  }

  .unClickedMeal img:hover{
    opacity: 0.4;
  }

  .unClickedTitle {
    position: absolute;
    color: black;
    font-size: 30px;
    width: 200px;
  }

  .clickedTitle {
    font-size: 50px;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {

  p {
    font-size: 40px;
  }

  .recipe li {
    font-size: 40px;
  }

  .clickedMeal img {
    width:220px;
  }

    .clickedMeal{
    display: block;
    margin-left: auto;
    margin-right: auto 
    }
  }

</style>
