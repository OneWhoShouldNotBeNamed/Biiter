<template >
  <div>
    <ul>
      <li v-for="beat in beats" :key="beat.id">{{ beat.beat }}</li>
    </ul>
  </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
import ApiService from "@/common/api.service";
import router from '../router'


export default {
  data() {
    return {
      beats: [],
      errors: []
    };
  },

  mounted() {
    ApiService.get("/user/")
      .then(response => (this.beats = response.data))
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
