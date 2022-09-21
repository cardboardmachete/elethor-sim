<template>
  <table class="table is-narrow is-fullwidth is-size-7 bg-slate-700 text-slate-50">
    <tr>
      <td>
        <span class="font-bold">ATTACK SPEED</span>
      </td>
      <td>
        <span>{{ stats.attackSpeed }}</span>
      </td>
    </tr>
    <tr v-if="stats.maxHealth">
      <td>
        <span class="font-bold">HEALTH</span>
      </td>
      <td>
        <span>{{ stats.maxHealth.toLocaleString() }}</span>
      </td>
    </tr>
    <tr v-for="(stat, attr) in validAttributes" :key="attr">
      <td v-if="!(effects.includes(attr) && stat === 0)">
        <span class="font-bold">{{ attr.replace(/_/g, ' ').toUpperCase() }}</span>
      </td>
      <td v-if="!(effects.includes(attr) && stat === 0)">
        <span>{{ stat.toLocaleString() }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    stats: Object,
  },
  data() {
    return {
      exclude: ['empowerment'],
      effects: ['puncture'],
      percentages: [
        'min_damage', 'max_damage', 'damage', 'ignore_damage_reduction', 'damage_reduction',
        'empowerment'
      ],
    };
  },
  computed: {
    validAttributes() {
      return Object.keys(this.stats.attributes)
        .filter((key) => !this.exclude.includes(key))
        .reduce((carry, key) => {
          if (this.percentages.includes(key)) {
            carry[key] = `${Math.round(this.stats.attributes[key] * 100)}%`
          } else {
            carry[key] = this.stats.attributes[key];
          }
          return carry;
        }, {});
    },
  },
};
</script>
