import createVuexStore from "../../../mocks-data/mock-store"
import authApi from '@/api/authApi'


describe('Vuex: Tests in auth module', () => {

    test('Initial state', () => {

        const store = createVuexStore({
                status: 'authenticating', // 'authenticated' | 'not-authenticated'
                user: null,
                idToken: null,
                refreshToken: null,
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( status ).toBe('authenticating')
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
    })

    //  Mutations =================
    test('Mutations: loginUser', () => {

        const store = createVuexStore({
            status: 'authenticating', // 'authenticated' | 'not-authenticated'
            user: null,
            idToken: null,
            refreshToken: null,
        })

        const payload = {
            user: { name: 'Luis', email: 'luis@gmail.com'},
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456',
        }

        store.commit('auth/loginUser', payload )

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( status ).toBe('authenticated')
        expect( user ).toEqual( payload.user )
        expect( idToken ).toBe( payload.idToken )
        expect( refreshToken ).toBe( payload.refreshToken )

    })

    test('Mutations: logout', () => {

        const initialState = {
            user: { name: 'Luis', email: 'luis@gmail.com'},
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456',
        }

        const store = createVuexStore( initialState )

        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth

        const localIdToken = localStorage.getItem('idToken')
        const localRefreshToken = localStorage.getItem('refreshToken')

        expect( status ).toBe('not-authenticated')
        expect( user ).toBeFalsy()
        expect( idToken ).toBeFalsy()
        expect( refreshToken ).toBeFalsy()
        expect( localIdToken ).toBeFalsy()
        expect( localRefreshToken ).toBeFalsy()

    })

    // Getters ================
    test('Getters: currentStatus & username', () => {

        const initialState = {
            status: 'authenticated',
            user: { name: 'Luis', email: 'luis@gmail.com'},
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456',
        }

        const store = createVuexStore( initialState )

        expect(store.getters['auth/currentStatus']).toBe('authenticated')
        expect(store.getters['auth/username']).toBe('Luis')

    })

    // Actions ================
    test('Actions: createUser - error, user already exists', async () => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated' | 'not-authenticated'
            user: null,
            idToken: null,
            refreshToken: null,
        })

        const newUser = { name: 'Luis', email: 'test@gmail.com', password: '123456'}

        const res = await  store.dispatch('auth/createUser', newUser )

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( res ).toEqual( { ok: false, message: 'EMAIL_EXISTS' } )
        expect( status ).toBe('not-authenticated')
        expect( user ).toBeFalsy()
        expect( idToken ).toBeFalsy()
        expect( refreshToken ).toBeFalsy()

    })

    test('Actions: createUser signInUser - delete user', async () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated' | 'not-authenticated'
            user: null,
            idToken: null,
            refreshToken: null,
        })

        const newUser = { name: 'Luis', email: 'test@gmail.com', password: '123456'}

        // SignIn
        await store.dispatch('auth/singInUser', newUser )
        const {  idToken } = store.state.auth

        // Delete user
        await authApi.post(':delete', { idToken })

        // Create user again
        const res = await store.dispatch('auth/createUser', newUser )
        const { status, user, idToken:token, refreshToken } = store.state.auth

        expect( res ).toEqual({ ok: true })
        expect( status ).toBe('authenticated')
        expect( user ).toEqual({ name: 'Luis', email: 'test@gmail.com' })
        expect( typeof token ).toBe('string')
        expect( typeof refreshToken ).toBe('string')

    })

    test('Actions: checkAuthentication - POSITIVE', async () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated' | 'not-authenticated'
            user: null,
            idToken: null,
            refreshToken: null,
        })

         // SignIn
         await store.dispatch('auth/singInUser', { email: 'luis@gmail.com', password: '123456' } )
         const {  idToken } = store.state.auth

         store.commit('auth/logout')

         localStorage.setItem('idToken', idToken)

         const res = await store.dispatch('auth/checkAuthentication')
         const { status, user, idToken: token } = store.state.auth

         expect( res ).toEqual({ ok: true })
         expect( status ).toBe('authenticated')
         expect( user ).toEqual({ name: 'Luis', email: 'luis@gmail.com' })
         expect( typeof token ).toBe('string')
    })

    test('Actions: checkAuthentication - NEGATIVE', async () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated' | 'not-authenticated'
            user: null,
            idToken: null,
            refreshToken: null,
        })

        localStorage.removeItem('idToken')
        const resp1 = await  store.dispatch('auth/checkAuthentication')

        expect( resp1 ).toEqual({ ok: false, message: 'No token' })
        expect( store.state.auth.status ).toBe('not-authenticated')

        localStorage.setItem('idToken', 'ABC-123')
        const resp2 = await  store.dispatch('auth/checkAuthentication')

        expect( resp2 ).toEqual({ ok: false, message: 'INVALID_ID_TOKEN'})

    })
    
    
})
