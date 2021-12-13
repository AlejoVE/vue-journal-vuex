// export const myAction = async ({commit}) => {
// }

import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit}) => {
    try {
        const {data} = await journalApi.get("/entries.json")

        if(!data) return commit("setEntries", [])

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

export const createEntry = async ({commit}, entry) => {
    try {
        const {text, date, picture} = entry
        const dataToSave = {text, date, picture}
        const {data} = await journalApi.post(`/entries.json`, dataToSave)

        dataToSave.id = data.name

        commit("addEntry", dataToSave)

        return data.name
    } catch (error) {
        console.log('ERROR ACTION: createEntry', error)
    }
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

export const deleteEntry = async ({commit}, id) => {
    try {
        console.log('deleteEntry', id)
        await journalApi.delete(`/entries/${id}.json`)
        commit("deleteEntry", id)
    } catch (error) {
        console.log('ERROR ACTION: deleteEntry', error)
    }
}