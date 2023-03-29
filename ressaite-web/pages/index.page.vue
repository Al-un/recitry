<template>
  <div>Hello, this is a copied home page</div>
  <p>Counter is {{ store.count }} and doubled is {{ store.doubleCount }}</p>
  <div><button @click="pouet">Click to boost the counter</button></div>
</template>

<script setup>
import { useCounterStore } from '../src/stores/counter'

const store = useCounterStore()

const pouet = () => {
  store.increment()
}
</script>
