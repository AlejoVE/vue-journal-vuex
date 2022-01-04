<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img class="d-inline-block align-text-top mx-2" src="@/assets/logo.png" height="24" alt="logo"/>
            {{ username }}
        </a>
        <div class="d-flex">
            <button @click="onLogout" class="btn btn-outline-info mx-5 my-2"><i class="fa fa-sign-out-alt"></i></button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../../auth/composables/useAuth'
export default {
    name: 'NavBar',
    setup(){

        const router = useRouter()

        const { logout, username } = useAuth()

        return {
            username,
            onLogout(){
                router.push({ name: 'login' })
                logout()
            }
        }

    }
}
</script>