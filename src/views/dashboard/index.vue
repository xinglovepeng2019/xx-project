<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      name:

      <image-upload></image-upload>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import imageUpload from "@/components/ImageUpload";

export default {
  name: "Dashboard",
  components: {
    imageUpload,
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
