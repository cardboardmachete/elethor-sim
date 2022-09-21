<template>
  <table class="table is-narrow is-fullwidth is-size-7 bg-slate-700 text-slate-50">
    <tbody>
      <tr>
        <td />
        <td class="font-bold">TOTAL</td>
        <td class="font-bold">AVG</td>
      </tr>
      <tr>
        <td class="font-bold">Damage</td>
        <td>{{ log.totalDamage.toLocaleString() }}</td>
        <td>{{ avgTotalDamage.toLocaleString() }}</td>
      </tr>
      <tr>
        <td class="font-bold">Puncture</td>
        <td>{{ log.totalPuncture.toLocaleString() }}</td>
        <td>{{ avgTotalPuncture.toLocaleString() }}</td>
      </tr>
      <tr v-if="log.totalReflect > 0">
        <td class="font-bold">Reflect</td>
        <td>{{ log.totalReflect.toLocaleString() }}</td>
        <td>{{ avgTotalReflect.toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    log: Object,
  },
  computed: {
    totalAttacks() {
      return Math.max(this.log.totalAttacks, 1);
    },
    avgTotalDamage() {
      return Math.round(this.log.totalDamage / this.totalAttacks);
    },
    avgTotalPuncture() {
      return Math.round(this.log.totalPuncture / this.totalAttacks);
    },
    avgTotalReflect() {
      return Math.round(this.log.totalReflect / this.totalAttacks);
    },
  },
};
</script>
