import { createStore } from "vuex"
import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList'
import journal from '@/modules/daybook/store/journal'
import journalState from '../../../mocks-data/test-journal-state'


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

describe('Tests in EntryList Component', () => {
    const store = createVuexStore(journalState)

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })


    test('should call getEntryByTerm with no arguments and get two entries', () => {
        expect(wrapper.findAll('entry-stub ').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Should call getEntryByTerm and filter entries', async () => {
         const input = wrapper.find('input')
         await input.setValue('Hello')

        expect(wrapper.findAll('entry-stub ').length).toBe(1)

    })

    test('should redirect on click', () => {
         wrapper.find('button').trigger('click')

         expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'} })

    })


})
