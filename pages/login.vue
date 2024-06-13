<template>
    <div class="flex items-center justify-center w-full h-screen" >
        <div class="bg-white bg-opacity-80 p-8 rounded-2xl shadow-md w-full  max-w-md">
            <h2 class="text-2xl font-bold mb-6">Giriş</h2>
            <form @submit.prevent="login">

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <InputText name="email" type="email" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
                    <InputText name="password" type="password" />
                </div>

                <button type="submit"
                    class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Giriş Yap!</button>
            </form>
            <p class="mt-4">
                Hesabın yok mu? <router-link to="/register" class="text-indigo-600 hover:underline">Kayıt ol!</router-link>
            </p>

    
        </div>
    </div>
    <MyLoader v-if="!authStore.loading" />
</template>

<script setup>
definePageMeta({
  layout: 'blank'
})
import * as yup from 'yup';
const error = ref(null)
const authStore = useAuthStore()
const router = useRouter()

const snackbar = useSnackbar();

const form = ref({
  email: '', // Varsayılan email
  password: '' // Varsayılan şifre
})

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().required('Bu alan boş geçilemez').email('Eposta adresi giriniz'),
        password: yup.string().required('Bu alan boş geçilemez').min(6,'En az 6 karakter giriniz'),
    }),
    initialValues: form.value
});


const login = handleSubmit(async (values) => {
    error.value = null
    try {
        await authStore.signIn(values.email, values.password)
        if (authStore.user) {
            router.push('/dashboard') // Giriş sonrası yönlendirme
        }
    } catch (err) {
        snackbar.add({
            type: 'error',
            text: err.message
        })
        error.value = err.message
    }
})

</script>