<template>
  <template v-if="entry">
    <div class="entry-title  d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="fs-3 mx-1">{{month}}</span>
        <span class="fs-4 mx-2 fw-light ">{{yearDay}}</span>
      </div>
      <div>
        <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpg, image/jpeg"/>
        <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger">Delete <i class="fa fa-trash-alt"></i></button>
        <button @click="onSelectImage" class="btn btn-primary mx-2">Upload photo <i class="fa fa-upload"></i></button>
        <button class="btn btn-"></button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="What happened today?"></textarea>
    </div>
    <Fab @on:click="saveEntry" icon="far fa-save"/>
    <img v-if='entry.picture && !localImage' :src="entry.picture" />
    <img v-if="localImage" :src="localImage" class="img-thumbnail" alt="entry-picture" />
  </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Swal from 'sweetalert2'
import { mapGetters, mapActions } from 'vuex'
import uploadImage from '../helpers/uploadImage'

import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
  name: 'EntryView',
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
      entry: null,
      localImage: null,
      file: null
    }
  },
  methods: {
    loadEntry() {

      let entry;

      if(this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id)
        if(!entry) return this.$router.push({name: 'no-entry'})
      }

      this.entry = entry
    },
    async saveEntry(){

      new Swal({
        title: 'Saving...',
        allowOutsideClick: false
      })

      Swal.showLoading()

      if(this.file) {
        const picture = await uploadImage(this.file)
        this.entry.picture = picture
      }

      if(this.entry.id){
        await this.updateEntry(this.entry)
      } else {
        const id = await this.createEntry(this.entry)
        this.$router.push({name: 'entry', params: { id }})
      }

      Swal.fire('Saved!', '', 'success')
    },
    async onDeleteEntry(){
      const { isConfirmed } =  await new Swal({
        title: 'Are you sure?',
        showDenyButton: true,
        denyButtonText: 'Cancel',
        confirmButtonText: "Yes, delete it!",
      })

      if(!isConfirmed) return
      Swal.showLoading()

      await this.deleteEntry(this.entry.id)
      this.$router.push({name: 'no-entry'})

      Swal.fire('Deleted!', '', 'success')
    },

    onSelectedImage(event){
      const file = event.target.files[0]
      if(!file) {
        this.localImage = null
        this.file = null
        return
      }
      this.file = file
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage(){
      this.$refs.imageSelector.click()
    },
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry'])
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
      this.file = null
      this.localImage = null
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