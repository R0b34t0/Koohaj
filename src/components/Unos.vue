<template>
  <div class="unos">
    <input type="text" placeholder="Unesite jelo" v-model="imeJela"/>
    <!-- <textarea placeholder="Unesite opis kuhanja"> -->
    <textarea placeholder="Unesite opis jela" v-model="opisKuhanja"></textarea>
    <div class="form-group" v-for="(input, k) in inputs" :key="input">
      <input
        type="text"
        placeholder="Unesite sastojak"
        v-model="sastojci[k]"
                
      />
      
      <span>
        <button @click="remove(k)" v-show="k || (!k && inputs.length > 1)">
          makni
        </button>
        <button @click="add(k)" v-show="k == inputs.length - 1">dodaj</button>
      </span>
    </div>
    <label for="file">Unesite fotografiju jela:</label>
    <input @change="loadVal" type="file" id="file" ref="myFiles"/>
    <button @click="uploadData">Upload</button>
  </div>
</template>

<script>
import {jela} from "../../firebase";
import {storage} from "../../firebase";

export default {
  data() {
    return {
        fileOrg:'',
        imeJela:'',
        opisKuhanja:'',
      files: [],
      inputs: [{}],
      URL:'',
      sastojci:[],
    };
  },
  methods: {
    add(index) {
      this.inputs.push({});
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    loadVal() {
        this.files = event.target.files[0]

  },
  loadImg(imgName){
        var uploadTask = storage.ref().child(imgName+'.jpg').put(this.files)

        uploadTask.on('state_changed', 
        (snapshot) => {}, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL)
            this.URL = downloadURL
            // dodan update za jelo ovdje, lakse mi je ovdje updateati nego cekati
            // update u parent funkciji
            jela.doc(imgName).update({
            imeSlike: imgName,
            link: downloadURL,
            })

            });
        }
        );

        
  },

  uploadData(){
      
      jela.add({
          imeJela: this.imeJela,
          opisKuhanja: this.opisKuhanja,
          sastojci: this.sastojci,
      }).then((docRef)=>{
        this.loadImg(docRef.id)

      })

  }
     
    

  },
};
</script>

<style>
.unos {
  display: flex;
  flex-direction: column;
  width: 173px;
  justify-content: center;
  align-items: center;
  align-self: center;
}
</style>
