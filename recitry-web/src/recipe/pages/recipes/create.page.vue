<template>
  <form @submit.prevent="submitRecipe">
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

import type { RecipeFormData } from '@al-un/ressaite-core/recipe/recipe.models'

import RstInput from '@/core/components/ui/form/RstInput.vue'

interface FormData {
  recipe: RecipeFormData
}

const form: FormData = reactive({
  recipe: {
    title: 'My recipe title',
    description: 'My recipe description',
    lang: 'en',
    steps: [] as RecipeFormData['steps'],
    materials: [] as RecipeFormData['materials']
  }
})

function addRecipeStep() {
  form.recipe.steps.push({ body: '' })
}

function deleteRecipeStep(stepIndex: number) {
  form.recipe.steps = form.recipe.steps.filter((_, index) => index !== stepIndex)
}

async function submitRecipe() {
  console.log('Create recipe', form.recipe)
}
</script>
