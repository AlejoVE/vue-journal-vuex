// export const myAction = async ({commit}) => {
// }

import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit}) => {
    try {
        const {data} = await journalApi.get("/entries.json")
        const entries = []
        for (let id of Object.keys(data)) {
            entries.push({
                id,
                ...data[id]
            })
        }
        commit("setEntries", entries)
    } catch (error) {
        console.log('ERROR ACTION: loadEntries', error)
    }
}

export const createEntry = async (/*{commit}*/) => {

}

export const updateEntry = async ({commit}, entry) => {
    try {
        const {text, date, picture} = entry
        const dataToSave = {text, date, picture}
        await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
        commit("updateEntry", {...entry})
    } catch (error) {
        console.log('ERROR ACTION: updateEntry', error)
    }
}