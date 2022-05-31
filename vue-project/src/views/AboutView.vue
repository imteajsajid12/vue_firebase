<template>
  <div class="about">
    <br />
    <br />
    <div class="row">
      <div class="col-md-6">
        <form action="">
          <div class="row g-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="message.name"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="message.number"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
            <div class="col">
              <input type="file" @change="uploadImage" class="form-control" />
            </div>
            <div class="submit">
              <a v-on:click.prevent="save()" v-if="show" class="btn btn-danger">
                Sbmit
              </a>
              <a v-on:click.prevent="update()" v-else class="btn btn-primary">
                Update
              </a>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <!--table-->
        <div class="container">
          <div class="table-responsive table--no-card m-b-40">
            <table table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>number</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tr v-for="(data, key) in datas" :key="key">
                <td>{{ key + 1 }}</td>
                <td>{{ data.data().name }}</td>
                <td>{{ data.data().number }}</td>
                <td>
                  <img
                    :src="`${data.data().file}`"
                    alt=" {{ data.data().file }}"
                    style="height: 100px; width: 100px"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    @click="this.Edit(data.id)"
                    class="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    @click="this.delete(data.id, data.data().file)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
//import * as test from "../assets/test";
import firebase from "../config/firebase";
export default {
  components: { firebase },
  data() {
    return {
      show: true,
      id: "",
      image: "",
      file: "",
      message: {
        name: "",
        number: "",
      },
      datas: [],
    };
  },
  methods: {
    save() {
      //image Uploads//
      var storageRef = firebase.fb
        .storage()
        .ref("/product/" + Math.random() + "_" + this.image.name);
      //console.log(storageRef);
      let uploadTask = storageRef.put(this.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          alert(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            //this.message.file.push(downloadURL);
            this.message.file = downloadURL;
            //store
            firebase.fairebase_store(this.message);
            this.message.name = "";
            this.message.number = "";
            this.message.image = "";
            this.Read();
          });
        }
      );
    },
    Edit(id) {
      this.show = false;
      firebase.db
        .collection("Admin")
        .doc(id)
        .get()
        .then((datas) => {
          let data = datas.data();
          this.message.name = data.name;
          this.message.number = data.number;
          this.message.image = data.file;
          this.id = datas.id;
        });
    },
    update() {
      firebase.db
        .collection("Admin")
        .doc(this.id)
        .update(this.message)
        .then((datas) => {
          this.message.name = "";
          this.message.number = "";
          this.datas = [];
          this.Read();
          alert("Update Done");
        });
    },
    uploadImage(e) {
      let file = e.target.files[0];
      this.image = file;
    },
    delete(id, img) {
      console.log(id);
      console.log(img);
      firebase.db.collection("Admin").doc(id).delete();
      // Create a reference to the file to delete
      let image = firebase.fb
        .storage()
        .refFromURL(img)
        .delete()
        .then(() => {
          // File deleted successfully
          this.datas = [];
          this.Read();
          alert("Delete");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          alert(error);
        });
    },
    Read() {
      this.datas = [];
      firebase.db
        .collection("Admin")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id}`);
            console.log(doc.data());
            this.datas.push(doc);
            //this.id.push(doc.id);
          });
        });
    },
  },
  mounted() {
    // firebase.fairebase_show(this.data)
    this.Read();
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    align-items: center;
  }
}
</style>
