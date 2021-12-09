// export const myGetter =  (state) => {
    // return state.something
// }

export const getEntriesByTerm =  (state) => (searchTerm = '')=> {
   if(searchTerm.length === 0) return state.entries

   return state.entries.filter(entry => entry.text.toLowerCase().includes(searchTerm.toLowerCase()))
}

export const getEntryById =  (state) => (id) => {
   const entry = state.entries.find(entry => entry.id === id)

   if(!entry) return
    /* We do it this way because if we return  state.entries directly,
    it will be a reference to the state.entries array, and if we modify the entry,
     it will change the state.entries array as well.
    */
   return {...entry}
}
