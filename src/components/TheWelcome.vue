<script setup lang="ts">
import { ref } from 'vue'
import useFetch from './useFetch'

const count = ref({ a: 0, b: 0 })

const incrementA = () => {
  return count.value.a++
}
const incrementB = () => {
  return count.value.b++
}

const reset = () => {
  return (count.value.a = 0), (count.value.b = 0)
}

type PostList = {
  userId: number
  id: number
  title: string
  body: string
}[]

const { dataList, loading, error, userList } = useFetch<PostList>(
  'https://jsonplaceholder.typicode.com/posts'
)
</script>

<template>
  <div>
    <div class="flex flex-row gap-4">
      <button class="bg-stone-400 px-[20px] rounded-lg" @click="incrementA">incrementA!</button>
      <button class="bg-stone-400 px-[20px] rounded-lg" @click="incrementB">incrementB!</button>
      <button class="bg-stone-400 px-[20px] rounded-lg" @click="reset">reset</button>
    </div>
    <div class="flex flex-row gap-4">
      <p>A:{{ count.a }}</p>
      <p>B:{{ count.b }}</p>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error!</div>
    <div v-else>
      <div class="flex gap-[10px]">
        <button
          class="p-[3px_8px] bg-stone-400 rounded-md"
          v-for="(user, index) in userList"
          v-bind:key="index"
        >
          {{ user }}
        </button>
      </div>
      <ul v-if="!loading">
        <ul class="flex gap-3" v-for="(data, index) in dataList" :key="index">
          <li>{{ data.userId }}</li>
          <li>{{ data.title }}</li>
        </ul>
      </ul>
    </div>
  </div>
</template>
