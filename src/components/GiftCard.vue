<template>
  <div @click="openGift(giftProp)" role="button" class="rounded bg-light shadow">
    <!-- For the components to know what the code name (in this case, gift) which is the thing in your v-for is, you have to pass it through as a prop--not import it -->
    <p>{{ giftProp.tag }}</p>
    <div v-if='giftProp.opened == true'>
      <img :src="giftProp.imgUrl" :alt="giftProp.tag" class="rounded-top img-small img-fluid">
    </div>
    <div v-else>
      <p>Unopened Gift</p>
    </div>
  </div>
</template>


<script>
import { Gift } from "../models/Gift.js";
import Pop from "../utils/Pop.js";
import { giftsService } from "../services/GiftsService.js";

export default {
  props: {
    giftProp: { type: Gift, required: true }
  },

  setup() {
    return {
      async openGift(gift) {
        try {
          await giftsService.openGift(gift)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}


</script>



<style lang="scss" scoped>
.img-small {
  max-height: 30vh;
  padding-left: 30px;
  padding-bottom: 30px;
}
</style>