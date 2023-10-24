<template>
  <section class="row">
    <div class="col-12">
      <form @submit.prevent="createGift()">
        <div class="mb-3">
          <label for="tag" class="form-label">Gift tag...</label>
          <input v-model="giftTag" required type="text" class="form-control" id="tag">
          <label for="url" class="form-label">Image url...</label>
          <input v-model="giftUrl" required type="url" class="form-control" id="url">
          <button class="btn btn-primary" type="submit">Submit Gift</button>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { giftsService } from "../services/GiftsService.js";

export default {
  setup() {
    const giftTag = ref("")
    const giftUrl = ref("")
    return {
      giftTag,
      giftUrl,
      async createGift() {
        try {
          let content = { tag: giftTag.value, url: giftUrl.value }
          logger.log("Your gift", content)
          await giftsService.createGift(content);
          giftTag.value = ""
          giftUrl.value = ""
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.btn {
  margin-top: 10px;
}
</style>