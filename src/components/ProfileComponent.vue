<template>

  <div>
    <ion-page>
      <ion-card>
        <h3 >Welcome</h3>
        <p> {{user.displayName}} </p>
        <p>{{user.email}} </p>

        <ion-button color="dark"
        type="submit" 
        @click="logOut()">
            Log out
        </ion-button>
      </ion-card>
    </ion-page>
  </div>
    
</template>

<script>
import firebase from "firebase";
import {  IonButton } from "@ionic/vue";

export default {
  components: {
    
    IonButton
  },
  data() {
    return {
      user: {displayName: "", email: ""}
    };
  },
  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   console.log(user)
    //   if (user) {
    //     this.user = user;
    //   } else {
    //     this.user = null;
    //   }
    // });
    const user = firebase.auth().currentUser
    this.user = (user) ? user : null
    console.log("This user object in profile component", this.user)
    console.log("This user name in profile component", this.user.displayName)
  },
  methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/sign/signin')
        })
      })
    }
  }
};
</script>
