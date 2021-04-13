<template>
  <ul>
    <div class="listStyle" v-if="this.searchVal">
      <!-- potencijalno se moze izbaciti searchval -->
      <!-- v-on="checkValues()" -->
      <li v-for="(test,index) in this.mealsDb" :key="test[0]">
        <div v-on="getImage(test[1].imeSlike)"> 
          <!-- v-if="checkValues(test[1])" -->
          <!--  -->
        <p :class="[isClicked ? 'clickedTitle' : '']" >{{test[1].imeJela}}</p>
        <img :class="[isClicked ? 'clicked' : '']" @click="openMeal(index)" :src="test[1].link" class="images" > 
        <!-- imgLink -->
        <div v-if="isClicked" :class="[isClicked ? 'clickedText' : '']" v-for="recipe in test[1].sastojci" :key="recipe">
          {{recipe}}
          </div>
        </div>
        <!-- <div v-for="value in test[1]" :key="value" >
          {{value}}   
          izbaceno trenutno, razmisljam da bude click da otkrije tekst
        </div> -->
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
      isClicked: Boolean,
    },
    data() {
    return {
      isClicked: false,
      meals: [
        ['pizza',["voda (150ml)", "secer (1 zlicica)", "kvasac (15g)", "passata (80g)", 
                "mozzarella (70g)"],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
        ['broccoli',['sol','papar','persin'],'https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg'],
        ['pizza1',['a','b','c'],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
        ['pizza1',['a','b','c'],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
      ],
      mealsDb: this.mealsDb, 
      // provjeriti ovu inicijalizaciju
      imgLink:'',
    }
  },
  methods: {
    getImage: async function(imageName){
      // this.isClicked = false
      // Create a reference to the file we want to download
      // console.log(imageName);
      var storageRef = storage.ref()
      var imageRef = storageRef.child(imageName+'.jpg');
    // Get the download URL
      this.imgLink = await imageRef.getDownloadURL().catch((error)=>{
        console.log(error);
      })
      
      // console.log(this.imgLink);
    },
    openMeal: function(arrPosition) {
      let tempVar = this.mealsDb[arrPosition]
      this.mealsDb.length = 0
      this.mealsDb.push(tempVar)
      this.toggleClass() // prebaceno iz poziva u buttonu
    },
    toggleClass: function() {
      this.isClicked = true;
    },
    setTitle: function(className) {
      // [isClicked ? 'clickedTitle' : '']
      // if(this.isClicked) 
    }
    
  },
  watch: {
    mealsDb: function(){
      this.isClicked = false
    }
  },
  beforeUpdate() {    
    // console.log(this.mealsDb[1][1].includes(this.searchVal));
    // console.log(this.mealsDb[0]);
    let tempArr = []
    tempArr = this.mealsDb.filter(value => value[1].imeJela.includes(this.searchVal))
    // console.log(tempArr);
    this.mealsDb.length = 0
    this.mealsDb.push.apply(this.mealsDb, tempArr)
    // console.log(value[1])
  }
  
}
</script>

<style>

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
  z-index: 2;
  position: absolute; 
  font-size: 40px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  margin-top: 350px;
  
  /* padding-top: 30px;  */
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
  /* -1 */
  position: absolute; 
  font-size: 30px;
  justify-content: center;
  
  /* padding-top: 30px;  */
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
