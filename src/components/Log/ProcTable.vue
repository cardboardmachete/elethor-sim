<template>
  <table class="table is-narrow is-fullwidth is-size-7">
    <tbody>
      <tr>
        <th>Ability</th>
        <th># of Procs</th>
      </tr>
      <tr>
        <th>Incapacitate</th>
        <td>{{ log.incapacitate }}</td>
      </tr>
      <tr v-if="log.frenzyBoost > 0">
        <th>Frenzy Boost</th>
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
