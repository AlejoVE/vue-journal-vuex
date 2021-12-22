import { shallowMount} from '@vue/test-utils'
import Fab  from '@/modules/daybook/components/Fab'
describe('Tests in Fab Component', () => {
    test('should show default icon ', () => {
        const wrapper = shallowMount(Fab)
        expect(wrapper.find('i').classes('fa-plus')).toBe(true)
    })

    test('should  show icon by argument: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        expect(wrapper.find('i').classes('fa-plus')).toBe(false)
        expect(wrapper.find('i').classes('fa-circle')).toBe(true)

    })

    test('should emit event on:click when click', () => {
        const wrapper = shallowMount(Fab)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})
