import { shallowMount } from '@vue/test-utils'
import Navbar from '@/modules/daybook/components/Navbar.vue'

 import createVuexStore from "../../../mocks-data/mock-store"


describe('Tests in Navbar component', () => {

    const store = createVuexStore({
        user: {
            name: 'Luis',
            email: 'luis@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(() => jest.clearAllMocks())

    test('should show component correctly', () => {
      const wrapper = shallowMount( Navbar, {
          global: {
              plugins: [store]
          }
      })

     expect(wrapper.html()).toMatchSnapshot()
    })

    test('should logout the user and redirect to login',  async () => {
        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [store]
            }
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'login' })

        expect(store.state.auth).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })
    })
    
    
})
