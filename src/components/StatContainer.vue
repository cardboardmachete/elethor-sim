<template>
  <StatField
    v-for="stat in stats"
    :key="stat.label"
    :label="stat.label"
    :name="`${source}[${stat.name}]`"
    :value="stat.value"
  />
</template>

<script>
import StatField from './StatField.vue';

export default {
  props: {
    stats: Array,
    source: String,
  },
  components: {
    StatField,
  },
};
</script>
