<template>
  <StatField label="Level" :name="`${source}[level]`" />
  <StatField label="Fortitude" :name="`${source}[fortitude]`" />
  <StatField label="Speed" :name="`${source}[speed]`" />
  <StatField label="Savagery" :name="`${source}[savagery]`" />
  <StatField label="Pierce" :name="`${source}[pierce]`" />
  <StatField label="Armor" :name="`${source}[armor]`" />
  <StatField v-show="source === 'player'" label="IDR" :name="`${source}[ignore_damage_reduction]`" />
  <StatField v-show="source === 'monster'" label="DR" :name="`${source}[damage_reduction]`" />
  <StatField label="Min Damage" :name="`${source}[min_damage]`" />
  <StatField label="Max Damage" :name="`${source}[max_damage]`" />
  <StatField label="Puncture" :name="`${source}[puncture]`" />
  <StatField label="Damage" :name="`${source}[damage]`" />
</template>

<script>
import StatField from './StatField.vue';

export default {
  props: {
    source: String,
  },
  components: {
    StatField,
  },
};
</script>
