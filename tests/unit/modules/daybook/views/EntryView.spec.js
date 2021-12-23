import { createStore } from "vuex"
import { shallowMount } from '@vue/test-utils'
import Swal from 'sweetalert2'
import journal from '@/modules/daybook/store/journal'
import journalState from '../../../mocks-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView'

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

 jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
 }))

describe('Tests in EntryView', () => {
    const store = createVuexStore(journalState)
    // To prevent actions to impact the database
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-MqpUtn-FdzZnSJMrIt3'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('should take out the user because the id does not exists', () => {
        const  wrapper = shallowMount(EntryView, {
            props: {
                id: 'sjnduiasnkld'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toBeCalledWith({name: 'no-entry'})
    })

    test('should show entry correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toBeCalled()
    })

    test('should delete entry and exit', (done) => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))
        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Are you sure?',
            showDenyButton: true,
            denyButtonText: 'Cancel',
            confirmButtonText: "Yes, delete it!",
        })

        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MqpUtn-FdzZnSJMrIt3')
            expect(mockRouter.push).toBeCalledWith({name: 'no-entry'})
            done()
        }, 1)

    })

})

