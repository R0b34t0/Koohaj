<template>
    <div>
        <h1 class="mainText">Popis unosa</h1>
        <div v-for="jela in this.mealsDb" :key="jela[0]">
            <div class="jela">
                <p>{{jela[1].imeJela}}</p>
                <p>{{jela[1].opisKuhanja}}</p>
                <p class="deleteBtn" @click="izbrisi(jela[0])">Izbrisi</p>
            </div>
        </div>
    </div>
</template>

<script>
import {storage, auth,jela} from '../../firebase'

export default {
    data() {
        return {
            mealsDb: [],
        }
    },
    methods: {
        loadDb(){
        let user = auth.currentUser.uid;

            this.mealsDb = []
            jela.get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(doc.data().korisnik === user){
                        this.mealsDb.push([
                            doc.id,
                            doc.data()
                            ])
                    }
                })
            })
        },
        izbrisi(ID){
            if(confirm('Jeste sigurni da zelite ukloniti podatak?')){
                jela.doc(ID).delete().then(() => {
                    // definiranje pozicije slike u storage-u
                storage.ref().child(ID+'.jpg').delete().then(() => {
                // File deleted successfully
                    alert("Podatak uspjesno izbrisan");
                    this.loadDb();
                    }).catch((error) => {
                        console.log(error);
                    });

                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        }
    },
    beforeMount() {
        this.loadDb();
    }
}
</script>

<style>
    .mainText{
        margin-top: 50px;
    }
    .jela{
        display: grid;
        grid-template-columns: 100px 100px 100px;
        margin: 20px;
        justify-content: center;
    }
    .jela p{
        border: 1px solid black;
    }
    .deleteBtn {
        cursor: pointer;
    }
</style>