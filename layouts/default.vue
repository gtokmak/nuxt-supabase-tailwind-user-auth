<template>
    <div class="flex items-center  bg-slate-400 border">
        <header class="">
            <nav>
                <ul>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/post">Post Index</NuxtLink></li>
                    <li><NuxtLink to="/post/1">Post 1</NuxtLink></li>
                
                </ul>
            </nav>
        </header>
    </div>
    <div class="containe mx-auto mt-4   w-screen h-screen" >
        <slot/>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>