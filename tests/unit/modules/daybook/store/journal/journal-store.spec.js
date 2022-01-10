import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import journalState from "../../../../mocks-data/test-journal-state"

import authApi from '@/api/authApi'

const createVuexStore = (initialState) =>(
        createStore({
            modules: {
                journal: {
                    ...journal,
                    state: {...initialState}
                }
            }
        })
     )


describe('Vuex - Test in Journal Module', () => {

    // Firebase authentication
    beforeAll( async () => {
        const { data } = await authApi.post(':signInWithPassword', { email: 'test@gmail.com', password: '123456', returnSecureToken: true })
        localStorage.setItem('idToken', data.idToken)
    })

    // Basics =================
    test('should have initial state', () => {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    // Mutations =================
    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading: false, entries: []})

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
                id: "-MqpUtn-FdzZnSJMrIt3",
                date: 1639427574035,
                text: "This is my text updated from the test"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries
        const entry = storeEntries.find(entry=> entry.id === updatedEntry.id)

        expect(storeEntries.length).toBe(2)
        expect(entry).toEqual(updatedEntry)
    })

    test('mutations: addEntry & deleteEntry', () => {
        const store = createVuexStore(journalState)

        const  newEntry = {
            id: 'ABC-123',
            text: 'This is my new entry',
            date: 1639427574035,
        }

        store.commit('journal/addEntry', newEntry)

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e=>e.id === newEntry.id)).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e=>e.id === newEntry.id)).toBeFalsy()

    })

    // Getters =================
    test('getters: getEntriesByTerm & getEntryById', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('Hello').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('Hello')).toEqual([entry2])

        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1)

    })

    // Actions =================
    test('actions: loadEntries ', async () => {
        const store = createVuexStore({isLoading: false, entries: []})
        await store.dispatch('journal/loadEntries')
        // This entries are coming from Firebase
        expect(store.state.journal.entries.length).toBe(4)
    })

    test('actions: updateEntry ', async () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "-MqpUtn-FdzZnSJMrIt3",
            text: "This is my new super cool text",
            date: 1639427574035,
            otherField: true,
            anotherMore: false
        }

        await store.dispatch('journal/updateEntry', updatedEntry)
        // This entries are coming from Firebase
        const storeEntries = store.state.journal.entries
        const entry = storeEntries.find(e=>e.id === updatedEntry.id)

        expect(storeEntries.length).toBe(2)
        expect(entry).toEqual({
            id: "-MqpUtn-FdzZnSJMrIt3",
            text: "This is my new super cool text",
            date: 1639427574035,
        })
    })

    test('actions: createEntry & deleteEntry', async () => {
        const store = createVuexStore(journalState)
        const newEntry = {
            text: 'This is my new entry, yeah!!',
            date: 1639427574035
        }

       const firebaseId = await store.dispatch('journal/createEntry', newEntry)

       expect( typeof firebaseId).toBe('string')

       const entry = store.state.journal.entries.find(e=>e.id === firebaseId)

       expect(entry).toBeTruthy()

       await store.dispatch('journal/deleteEntry', firebaseId)

       expect(store.state.journal.entries.find(e=>e.id === firebaseId)).toBeFalsy()

    })

})
