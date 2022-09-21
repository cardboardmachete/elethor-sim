<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal grow-[2]">
      <label :for="name" class="font-semibold">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input class="input bg-slate-200 shadow-inner" :name="name" :value="value">
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
    value: Number,
  },
};
</script>
