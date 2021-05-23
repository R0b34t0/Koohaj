<template>
  <div class="unos">
    <h1 @click="this.$router.push('/pregledUnosa')" class="pregledUnosa">Pregled svih unosa</h1>
    <h1>Unos jela</h1>
    <input type="text" placeholder="Unesite naziv jela" v-model="imeJela"/>
    <br>
    <textarea placeholder="Unesite opis jela" v-model="opisKuhanja"></textarea>
    <br>
    <div class="form-group" v-for="(input, k) in inputs" :key="input">
      <br>
      <input
        type="text"
        placeholder="Unesite sastojak"
        v-model="sastojci[k]"
                
      />
      
      <span>
        <button @click="remove(k)" v-show="k || (!k && inputs.length > 1)">
          -
        </button>
        <button @click="add(k)" v-show="k == inputs.length - 1">+</button>
      </span>
    </div>
    <br>
    <label for="file">Unesite fotografiju jela:</label>
    <input @change="loadVal" type="file" id="file" ref="myFiles"/>
    <button @click="uploadData">Unesi jelo</button>
  </div>
</template>

<script>
import {jela,storage,auth} from "../../firebase";

export default {
  data() {
    return {
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
      if(this.files.name && this.imeJela && this.opisKuhanja && (this.sastojci.length>0 && this.sastojci[0]!=="")) {
        jela.add({
            imeJela: this.imeJela,
            opisKuhanja: this.opisKuhanja,
            sastojci: this.sastojci,
            korisnik: auth.currentUser.uid,
        }).then((docRef)=>{
          this.loadImg(docRef.id)
          alert('Podaci su spremljeni')
          this.imeJela='';
            this.opisKuhanja='';
            this.sastojci='';
        })
      }
      else alert('Unesite sve potrebne podatke')

  }
     
    

  },
};
</script>

<style>
.unos {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 173px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}

.pregledUnosa{
  width: 300px;
  border: 3px solid black;
  cursor: pointer;
}
</style>
