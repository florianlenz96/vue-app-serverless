<script setup>
import { ref, onMounted } from "vue";

defineProps({
  msg: String,
});

const createAuthor = async () => {
  const id = Math.floor(Math.random() * 1000000);
  const response = await fetch("/data-api/rest/Author", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MS-API-ROLE": "admin",
    },
    body: JSON.stringify({
      id: id,
      first_name: "John",
      middle_name: "M",
      last_name: "Doe",
    }),
  });
  console.log(response.body);
  await fetchData();
};

const fetchData = async () => {
  const response = await fetch("api/greeting");
  const authorsResponse = await fetch("/data-api/rest/Author");
  authors.value = await authorsResponse.json();
  greeting.value = await response.text();
};

onMounted(async () => {
  await fetchData();
});

const authors = ref([]);
const greeting = ref("");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <h2>{{ greeting }}</h2>

  <button @click="createAuthor">Create Author</button>

  <ul>
    <li v-for="author in authors.value" :key="author.id">
      {{ author.first_name }} {{ author.last_name }}
    </li>
  </ul>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
