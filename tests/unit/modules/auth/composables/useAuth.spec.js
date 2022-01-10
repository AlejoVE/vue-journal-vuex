import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/authStatus': 'authenticated',
        'auth/username': 'Luis',
    }
}

//  Mock vuex library
jest.mock('vuex', () => ({
     useStore: () => mockStore,
}))

describe('Tests in composable useAuth', () => {

    beforeEach( ()=> jest.clearAllMocks )

    test('CreateUser  success', async () => {
        const { createUser } = useAuth()

        const newUser = { name: 'Luis', email: 'Luis@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await createUser(newUser)

        expect(resp).toEqual({ ok: true })
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)

    })

    test('CreateUser  fail, user already exists', async () => {
        const { createUser } = useAuth()

        const newUser = { name: 'Luis', email: 'Luis@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser(newUser)

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)
        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
    })

    test('loginUser  SUCCESS', async () => {
        const { loginUser } = useAuth()

        const loginForm = { password: '123456', email: 'Luis@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await loginUser(loginForm)

        expect(resp).toEqual({ ok: true })
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)
    })

    test('loginUser  FAILED', async () => {
        const { loginUser } = useAuth()

        const loginForm = { password: '123456', email: 'Luis@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: false, message: 'INVALID EMAIL OR PASSWORD' })

        const resp = await loginUser(loginForm)

        expect(resp).toEqual({ ok: false, message: 'INVALID EMAIL OR PASSWORD' })
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)
    })

    test('checkAuthStatus', async () => {
        const { checkAuthStatus } = useAuth()

        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await checkAuthStatus()

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication')
        expect(resp).toEqual({ ok: true })
    })

    test('logout',  () => {
        const { logout } = useAuth()

        logout()

        expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')
        expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')
    })

    //  Getters ================
    test('Getters: currentStatus & username', () => {
        const { authStatus, username } = useAuth()

        expect(authStatus.value).toBe('authenticated')
        expect(username.value).toBe('Luis')
    })
})
