<template>
    <header class="fixed w-full h-16 bg-blue-600 text-white shadow-md">
        <nav class="container mx-auto p-4 flex  items-center">
            <div class="text-lg font-bold">
                <NuxtLink to="/">MyApp</NuxtLink>
            </div>
            <div class="ml-24">
                <ul class="flex space-x-4">
                    <li>
                        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="ml-auto justify-between ">
                <ul class="flex space-x-4" >
                    <li> 
                        <button @click="logout" class="space-x-4 hover:text-slate-300">
                            <Icon name="ic:baseline-logout" size="36px" />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <MyLoader v-if="!authStore.loading" />
</template>

<script setup>
const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
    console.log("logout")
    await authStore.signOut()
    router.push('/login')
}
</script>
