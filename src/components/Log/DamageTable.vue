<template>
  <table class="table is-narrow is-fullwidth is-size-7">
    <tbody>
      <tr>
        <th />
        <th>TOTAL</th>
        <th>AVG</th>
      </tr>
      <tr>
        <th>Damage</th>
        <td>{{ log.totalDamage.toLocaleString() }}</td>
        <td>{{ avgTotalDamage.toLocaleString() }}</td>
      </tr>
      <tr>
        <th>Puncture</th>
        <td>{{ log.totalPuncture.toLocaleString() }}</td>
        <td>{{ avgTotalPuncture.toLocaleString() }}</td>
      </tr>
      <tr v-if="log.totalReflect > 0">
        <th>Reflect</th>
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
