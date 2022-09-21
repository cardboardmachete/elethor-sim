<template>
  <table class="table is-narrow is-fullwidth is-size-7 bg-slate-700 text-slate-50">
    <tbody>
      <tr>
        <td class="font-bold">Ability</td>
        <td class="font-bold"># of Procs</td>
      </tr>
      <tr>
        <td class="font-bold">Incapacitate</td>
        <td>{{ log.incapacitate }}</td>
      </tr>
      <tr v-if="log.frenzyBoost > 0">
        <td class="font-bold">Frenzy Boost</td>
        <td>+{{ log.frenzyBoost }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    log: Object,
  },
};
</script>
