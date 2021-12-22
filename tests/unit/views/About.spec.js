import { shallowMount} from '@vue/test-utils'
import About from '@/views/About.vue'

describe('Tests in About View', () => {
    test('Should match snapshot', () => {
        const wrapper = shallowMount(About);
        expect(wrapper.html()).toMatchSnapshot();
    })
})
