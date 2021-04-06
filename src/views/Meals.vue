<template>
  
  <ul>
    <div class="listStyle" v-if="this.searchVal" >
      <li v-for="(test,index) in this.meals" :key="test[0]">
        <!-- {{test[0]}} : {{test[1]}} -->
        <!-- <img :src="'{{test[2]}}'"> -->
        <!-- <img src="./assets/pizza.jpg" alt=""> -->
        <div v-if="checkValues(test[0])">
          <p :class="[isClicked ? 'clickedTitle' : '']" >{{test[0]}}</p>
        <img :class="[isClicked ? 'clicked' : '']" @click="openMeal(index),toggleClass()" v-bind:src="test[2]" class="images" > 
        <!-- @mouseover="hover = true" @mouseleave="hover=false"  -->
        <div v-if="isClicked" :class="[isClicked ? 'clickedText' : '']" v-for="recipe in test[1]" :key="recipe">{{recipe}}</div>
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
import {jela} from '../../firebase'


export default {
    props: [
      'searchVal',
    ],
    data() {
    return {
      hover:false,
      isClicked: false,
      meals: [
        ['pizza',["voda (150ml)", "secer (1 zlicica)", "kvasac (15g)", "passata (80g)", 
                "mozzarella (70g)"],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
        ['broccoli',['sol','papar','persin'],'https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg'],
        ['pizza1',['a','b','c'],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
        ['pizza1',['a','b','c'],'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg'],
      ],
      img1: '../assets/pizza.jpg'
    }
  },
  methods: {
    checkValues: function(firstValue){
    return (this.searchVal === '' ? false : firstValue.includes(this.searchVal))
    },
    openMeal: function(arrPosition) {
      this.meals = [this.meals[arrPosition]]
    },
    toggleClass: function() {
      this.isClicked = true;
    }
    
  },
  mounted() {
    //   jela.get().then((querySnapshot)=>{
    //   querySnapshot.forEach((doc)=>{
        
        //Komentirano dok ne osposobimo pull svih potrebnih podataka
    //     // console.log(doc.data());
    //     // var tempArr = 
        
    //     // tempArr.push([doc.id, doc.data()])
    //     // console.log(tempArr);
    //     // console.log(typeof doc.data());
    //     // if(Array.isArray(tempArr)){
    //       this.meals.push([
    //         doc.id,
    //         doc.data()])
    //     // }
    //   })
    // })
  },

  
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
