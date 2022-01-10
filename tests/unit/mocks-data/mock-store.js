import { createStore } from 'vuex'
import journalState from './test-journal-state'

import auth from '@/modules/auth/store'
import journal from '@/modules/daybook/store/journal'

const createVuexStore = ( authInitState, journalInitState = journalState ) =>
createStore({
    modules: {
        auth: {
            ...auth,
            state: {...authInitState}
        },
        journal: {
            ...journal,
            state: {...journalInitState}
        }
    }
})

export default createVuexStore