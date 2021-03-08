<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label :for="name" class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input class="input" type="number" :name="name" :value="0">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    label: String,
  },
};
</script>
