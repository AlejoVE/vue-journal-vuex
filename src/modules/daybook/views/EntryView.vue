<template>
  <template v-if="entry">
    <div class="entry-title  d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="fs-3 mx-1">{{month}}</span>
        <span class="fs-4 mx-2 fw-light ">{{yearDay}}</span>
      </div>
      <div>
        <button class="btn btn-danger">Delete <i class="fa fa-trash-alt"></i></button>
        <button class="btn btn-primary mx-2">Upload photo <i class="fa fa-upload"></i></button>
        <button class="btn btn-"></button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="What happened today?"></textarea>
    </div>
    <Fab icon="far fa-save"/>
    <img src="https://cdn.pixabay.com/photo/2021/11/02/10/46/cat-6762936_960_720.jpg" class="img-thumbnail" alt="entry-picture" />
  </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  },

  data(){
    return {
      entry: null
    }
  },
  methods: {
    loadEntry() {
      const entry = this.getEntryById(this.id)
      if(!entry) return this.$router.push({name: 'no-entry'})
      this.entry = entry
    }
  },
  computed: {
    ...mapGetters('journal',['getEntryById']),
    day(){
      const {day} = getDayMonthYear(this.entry.date)
      return day
    },
    month(){
      const {month} = getDayMonthYear(this.entry.date)
      return month
    },
    yearDay(){
      const {yearDay} = getDayMonthYear(this.entry.date)
      return yearDay
    }
  },
  created(){
    this.loadEntry()
  },
  watch: {
    id(){
      this.loadEntry()
    }
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