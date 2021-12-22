import Entry from '@/modules/daybook/components/Entry'
import {shallowMount} from '@vue/test-utils'
import journalState from '../../../mocks-data/test-journal-state'

describe('Tests in Entry Component', () => {
    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(Entry, {
        global: {
            mocks: {
                $router: mockRouter
            }
        },
        props: {
            entry: journalState.entries[0]
        }
    })

    test('should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should redirect when click in entry-container', () => {
        const entryContainer =  wrapper.find('.entry-container')

        entryContainer.trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: {id: journalState.entries[0].id} })
    })

    test('Tests in computed properties', () => {
        const {day, month, yearDay} = wrapper.vm

        expect(day).toBe(13)
        expect(month).toBe('Dec')
        expect(yearDay).toBe('2021, Mon')
    })

})
