<template>
  <section class="row">
    <div class="col-12">
      <GiftForm />
    </div>
  </section>
  <section class="row">
    <div v-for="gift in gifts" :key="gift.id" class="col-md-3 p-5">
      <!-- <p>{{ gift.tag }}</p> -->
      <GiftCard :giftProp="gift" />
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { giftsService } from "../services/GiftsService.js"
import { AppState } from "../AppState.js"
import GiftCard from "../components/GiftCard.vue"
import GiftForm from "../components/GiftForm.vue"


export default {
  setup() {
    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getGifts();
    });

    return {
      gifts: computed(() => AppState.gifts)
    };
  },
  components: { GiftCard, GiftForm }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
