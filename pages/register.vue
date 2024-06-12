<template>
    <div class="flex items-center justify-center w-full h-screen" >
        <div class="bg-white bg-opacity-80 p-8 rounded-2xl shadow-md w-full max-w-md ">
            <h2 class="text-2xl font-bold mb-6">Register</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-800">Email</label>
                    <InputText name="email" type="email" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-800">Password</label>
                    <InputText name="password" type="password" />
                </div>

                <div class="mb-6">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-800">Confirm Password</label>
                    <InputText name="passwordConfirm" type="password" />
                </div>

                <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-800">Kayıt Ol</button>
                <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
            </form>
            <p class="mt-4">
                Zaten hesabınız var mı? <router-link to="/login" class="text-indigo-600 hover:underline">Giriş Yap!</router-link>
            </p>
        </div>
    </div>
    <MyLoader v-if="!authStore.loading" />
</template>


<script setup>
definePageMeta({
  layout: 'blank'
})

const error = ref(null)

const authStore = useAuthStore()
const router = useRouter()
const snackbar = useSnackbar();

import * as yup from 'yup';

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().required('Bu alan boş geçilemez').email('Eposta adresi giriniz'),
        password: yup.string().required('Bu alan boş geçilemez').min(6, 'En az 6 karakter giriniz'),
        passwordConfirm: yup.string().required('Bu alan boş geçilemez').min(6).oneOf([yup.ref('password')], 'alanlar eşleşmiyor'),
    }),
});


const register = handleSubmit(async (values) => {
    console.log("handle submit");
    error.value = null

    try {
        await authStore.signUp(values.email, values.password)
        if (authStore.user) {
            snackbar.add({
                type: 'success',
                text: 'Kayıt Başarılı. Lütfen eposta adresine gelen mail onaylayın!'
            })
            router.push('/dashboard') // Kayıt sonrası yönlendirme
        }

    } catch (err) {
        error.value = err.message
        snackbar.add({
            type: 'error',
            text: err.message
        })
    }
})

</script>