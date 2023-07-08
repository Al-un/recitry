<template>
  <label class="rst-select">
    <div v-if="$attrs['label']" class="rst-select">{{ $attrs['label'] }}</div>
    <slot></slot>
    <select @change="(event) => $emit('update:modelValue', (event.target as any).value)">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="modelValue === option.value"
      >
        {{ option.label }}
      </option>
      =
    </select>
  </label>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface SelectOption {
  label: string
  value: string | number
}

defineProps({
  modelValue: { type: [String, Number], required: true },
  options: { type: Array as PropType<SelectOption[]>, required: true }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss">
/* .rst-input__label, */
.rst-select__label {
  color: var(--rst-txt-sub);
  font-size: var(--rst-font-size-small);
  font-weight: bold;
  margin-bottom: 4px;
}

.rst-select {
  select {
    width: 100%;

    // Styling select without JS:
    // - https://web.dev/learn/forms/styling-form-controls/
    // - https://www.filamentgroup.com/lab/select-css.html
    // ----- Reset default appearance
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--rst-bg-content);

    // ----- Take care of right down arrow
    //
    // Quote from "Style select like 2019":
    //
    // The linear gradient background is important to keep, because its
    // presence actually prevents IE9 and older from recognizing the background
    // property, and as a result it won’t show the custom icon alongside its
    // unhideable native one. If you want a flat color, use a linear gradient
    // between two of the same color values.
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, var(--rst-bg-content) 0%, var(--rst-bg-content) 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;

    // ----- Reset sizing
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0.5em 1.4em 0.5em 0.8em;

    // ----- Reset borders
    border: 1px solid var(--rst-divider);
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 8px;

    //   display: block;
    //   font-size: 16px;
    //   font-family: sans-serif;
    //   font-weight: 700;
    //   color: #444;
    //   line-height: 1.3;

    &::-ms-expand {
      display: none;
    }
    &:hover {
      border-color: #888;
    }
    .select-css:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222;
      outline: none;
    }
    & option {
      font-weight: normal;
    }
  }
}
</style>
