import { shallowMount } from "@vue/test-utils"

import Login from "@/modules/auth/views/Login.vue"

import createVuexStore from "../../../mocks-data/mock-store"

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe('Tests in Login component', () => {

    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks() )

    test('should show component correctly', () => {
        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Wrong credentials trigger error', async () => {
        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Wrong credentials' })

        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        await wrapper.find('form').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', { email: '', password: ''})
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Bad email or password", "error")
    })

    test('Should redirect to route no-entry', async() => {

        store.dispatch.mockReturnValueOnce({ ok: true })

        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        const [ txtEmail, txtPassword ] = wrapper.findAll('input')
        await txtEmail.setValue('ramiro@gmail.com')
        await txtPassword.setValue('123456')

        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', { email: 'ramiro@gmail.com', password: '123456' })
        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })
})
