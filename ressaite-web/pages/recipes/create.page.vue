<template>
  <form @submit.prevent="submitRecipeCreation">
    <rst-input v-model="form.recipe.title" />
    <rst-input v-model="form.recipe.description" />
    <rst-input v-model="form.recipe.title" />

    <div v-for="(step, stepIndex) in form.recipe.steps" :key="stepIndex">
      <p>Step #{{ stepIndex }}</p>
      <rst-input v-model="step.body" />
      <button class="rst-button" @click="deleteRecipeStep(stepIndex)">Delete Step</button>
    </div>

    <p @click="addRecipeStep">Add step</p>

    <button class="rst-button" type="submit">Login!</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import type { RecipeCreation, RecipeStep } from '@al-un/ressaite-core/recipe/models/recipe'
import type { Material, MaterialCreation } from '@al-un/ressaite-core/recipe/models/material'

import RstInput from '@/components/ui/form/RstInput.vue'

interface FormData {
  recipe: RecipeCreation
}

const form: FormData = reactive({
  recipe: {
    title: 'My recipe title',
    description: 'My recipe description',
    lang: 'en',
    steps: [] as RecipeCreation['steps'],
    materials: [] as RecipeCreation['materials']
  }
})

function addRecipeStep() {
  form.recipe.steps.push({ body: '' })
}

function deleteRecipeStep(stepIndex: number) {
  form.recipe.steps = form.recipe.steps.filter((_, index) => index !== stepIndex)
}

async function submitRecipeCreation() {
  console.log('Create recipe', form.recipe)
}
</script>
