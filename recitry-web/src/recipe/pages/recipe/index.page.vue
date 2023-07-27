<template>
  <div>Hello, this is a recipe page with title {{ recipe.title }}</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { Recipe } from '@al-un/recitry-core/recipe/recipe.models'

defineProps({
  recipe: { type: Object as PropType<Recipe>, required: true }
})
</script>

<script lang="ts">
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export function onBeforeRender(pageContext: PageContextBuiltIn) {
  const recipeId = pageContext.routeParams.recipeId

  return {
    pageContext: {
      pageProps: {
        recipe: { title: 'pouet la recette ' + recipeId }
      },
      documentProps: {
        title: "C'est la meilleure recette"
      }
    }
  }
}
</script>

<style></style>
