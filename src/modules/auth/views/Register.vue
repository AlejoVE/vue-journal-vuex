<template>
    <span class="login100-form-title p-b-41">
        Sign up
    </span>
    <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

        <div class="wrap-input100 validate-input" data-validate = "Enter your name">
            <input v-model="userForm.name" class="input100" type="text" placeholder="name" required>
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Enter email">
            <input v-model="userForm.email" class="input100" type="email" placeholder="Email" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="userForm.password" class="input100" type="password" placeholder="Password" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Create account
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'login'}">Already have an account?</router-link>
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
        const { createUser } = useAuth()

        const userForm = ref({
            name: 'Luis',
            email: 'luis@gmail.com',
            password: '123456',
        })

        return {
            userForm,
            onSubmit: async () => {
                 const { ok, message } = await createUser(userForm.value)
                 if(!ok) return Swal.fire('Error', message, 'error')
                 router.push({ name: 'no-entry'})
            }
        }
    }

}
</script>
