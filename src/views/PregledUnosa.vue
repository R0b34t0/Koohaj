<template>
  <div>
    <h1 class="mainText">Popis unosa</h1>
    <table class="jela">
      <tr>
        <th>Identifikator jela</th>
        <th>Ime jela</th>
      </tr>
      <tr v-for="jela in this.mealsDb" :key="jela[0]">
        <td>{{ jela[0] }}</td>
        <td>{{ jela[1].imeJela }}</td>
        <td class="deleteBtn" @click="izbrisi(jela[0])">
          <img src="../assets/trash.png" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { storage, auth, jela } from "../../firebase";

export default {
  data() {
    return {
      mealsDb: [],
    };
  },
  methods: {
    loadDb() {
      let user = auth.currentUser.uid;

      this.mealsDb = [];
      jela.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().korisnik === user) {
            this.mealsDb.push([doc.id, doc.data()]);
          }
        });
      });
    },
    izbrisi(ID) {
      if (confirm("Jeste sigurni da zelite ukloniti podatak?")) {
        jela
          .doc(ID)
          .delete()
          .then(() => {
            // definiranje pozicije slike u storage-u
            // nakon sto se izbrise dokument zove se funkcija za brisanje slike u storage-u
            storage
              .ref()
              .child(ID + ".jpg")
              .delete()
              .then(() => {
                // File deleted successfully
                alert("Podatak uspjesno izbrisan");
                this.loadDb();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    },
  },
  beforeMount() {
    this.loadDb();
  },
};
</script>

<style>
.mainText {
  margin-top: 50px;
}
.jela {
  margin-left: auto;
  margin-right: auto;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.deleteBtn {
  cursor: pointer;
}
.deleteBtn img {
  width: 28px;
}
</style>