<template>
  <section class="row">
    <div class="col-12">
      <form @submit.prevent="createGift()">
        <div class="mb-3">
          <label for="tag" class="form-label">Gift tag...</label>
          <input v-model="gift.tag" required name="tag" type="text" class="form-control" id="tag">
          <label for="url" class="form-label">Image url...</label>
          <input v-model="gift.url" required name="url" type="url" class="form-control" id="url">
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
    const gift = ref({})
    //the editable is an object, we use dot notation in the v-model to indicate the properties
    return {
      gift,
      async createGift() {
        try {
          logger.log(gift.value)
          await giftsService.createGift(gift.value);
          gift.value = {}
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