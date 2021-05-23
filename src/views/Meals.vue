<template>
  <ul>
    <div class="listStyle" v-if="this.searchVal">
      <li v-for="(jelo,index) in this.mealsDb" :key="jelo[0]">
        
        <div v-on="getImage(jelo[1].imeSlike)"> 
       
        <p :class="[isClicked ? 'clickedTitle' : '']" >{{jelo[1].imeJela}}</p>
        <img :class="[isClicked ? 'clicked' : '']" @click="openMeal(index)" :src="jelo[1].link" class="images" > 
        <div :class="[isClicked ? 'clickedText' : '']" v-for="recipe in jelo[1].sastojci" :key="recipe">
          <div v-if="isClicked">
            {{recipe}}
            </div>
          </div>
          <p class="opisKuhanja" v-if="isClicked"> 
            {{jelo[1].opisKuhanja}}
            </p>
        </div>
        </li>
    </div>
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

.opisKuhanja, .opisKuhanja p{
position: absolute;
top: 0px;
right: 0px;
width: 400px;
border-style: solid;
}
.listStyle {
  position: relative;
  list-style-type: none; 
  /* width: 200px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
  z-index: 1;
}

.listStyle li {
  padding-top: 50px;
  padding-bottom: 50px;
   width: 100px; 
  height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.listStyle img{
  width: 180px;
  cursor: pointer;
  z-index: 1;
}

.listStyle .clicked{
  position: absolute;
  width: 300px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  margin-top: 10px;  
}

.listStyle .clickedTitle{
  opacity: 1;
  z-index: 2;
  position: absolute; 
  font-size: 40px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  margin-top: 350px;
}

.listStyle .clickedText{
  z-index: 2;
  /* position: absolute;  */
  font-size: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}



.listStyle p {
  z-index: -1;
  width: 300px;
  font-size: 30px;
  position: absolute; 
  top: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  
}

.listStyle img:hover{
  opacity: 0.3;
}

p:hover{
  z-index: 0;
}


@media only screen and (max-width: 770px){
  .listStyle{
    grid-template-columns: repeat(3, 1fr);
  }

  
}

@media only screen and (max-width: 660px){
  .listStyle{
    grid-template-columns: repeat(2, 1fr);
  }

  
}
 

</style>
