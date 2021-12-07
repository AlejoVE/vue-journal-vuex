<template>
  <div class="entry-title  d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="fs-3 mx-1">December</span>
      <span class="fs-4 mx-2 fw-light ">2021, Thursday</span>
    </div>
    <div>
      <button class="btn btn-danger">Delete <i class="fa fa-trash-alt"></i></button>
      <button class="btn btn-primary mx-2">Upload photo <i class="fa fa-upload"></i></button>
      <button class="btn btn-"></button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="What happened today?"></textarea>
  </div>
  <Fab icon="far fa-save"/>
  <img src="https://cdn.pixabay.com/photo/2021/11/02/10/46/cat-6762936_960_720.jpg" class="img-thumbnail" alt="entry-picture" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  }
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>