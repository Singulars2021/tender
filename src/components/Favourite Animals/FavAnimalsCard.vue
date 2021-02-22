<template>
    <ion-avatar>
      <img
        src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
      />
    </ion-avatar>
</template>

<script>

import {
IonAvatar,
 } from "@ionic/vue";

export default {
  components: {
    IonAvatar
  },
  data() {
    return {
      image: undefined,
      id: undefined,
    }
  }
}
  
</script>

