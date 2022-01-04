<template>
    <span class="login100-form-title p-b-41">
        Enter
    </span>
    <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

        <div class="wrap-input100 validate-input" data-validate = "Enter email">
            <input v-model="userForm.email" class="input100" type="text" placeholder="Email" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="userForm.password" class="input100" type="password" placeholder="Password" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Login
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'register'}">Don't have an account? </router-link>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter} from 'vue-router'
import useAuth from '../composables/useAuth'

export default {
 setup(){
        const router = useRouter()
        const { loginUser } = useAuth()

        const userForm = ref({
            email: 'luis@gmail.com',
            password: '123456',
        })

        return {
            userForm,
            onSubmit: async () => {
                console.log('IM here')
                 const { ok } = await loginUser(userForm.value)
                 console.log(ok)
                 if(!ok) return Swal.fire('Error', 'Bad email or password', 'error')
                 router.push({ name: 'no-entry'})
            }
        }
    }
}
</script>
