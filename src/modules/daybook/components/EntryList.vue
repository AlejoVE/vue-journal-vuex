<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="Search entry"/>
        </div>
        <div class="mt-2 d-flex flex-column">
            <button @click="$router.push({name: 'entry', params: {id: 'new'} })" class="btn btn-primary mx-3">
                <i class="fa fa-plus-circle"></i>
                   New entry
            </button>
        </div>
        <div class="entry-scroll-area">
           <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./Entry.vue'))
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm() {
            return this.getEntriesByTerm(this.searchTerm)
        }
    },
    data() {
        return {
            searchTerm: ''
        }
    },
}
</script>

<style lang="scss" scoped>
.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scroll-area {
    height: calc(100vh - 120px);
    overflow: scroll;

}
</style>