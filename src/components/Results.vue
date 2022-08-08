<template>
  <div class="section">
    <div class="columns">
      <div class="column">
        <h5 class="title is-5">
          Player Stats
        </h5>
        <StatsTable :stats="player" />
      </div>
      <div class="column">
        <h5 class="title is-5">
          Monster Stats
        </h5>
        <StatsTable :stats="monster" />
      </div>
      <div class="column">
        <h5 class="title is-5">
          Combat Log
        </h5>
        <p class="has-text-weight-bold">
          {{ log.result }}
        </p>

        <p class="has-text-weight-bold">
          Kills: {{ log.totalKills.toLocaleString() }}
        </p>
        <p class="has-text-weight-bold">
          Player: {{ log.final.user.finalHealth }} / {{ log.final.user.maxHealth }}
        </p>
        <p class="has-text-weight-bold">
          Monster: {{ log.final.monster.finalHealth }} / {{ log.final.monster.maxHealth }}
        </p>
        <h5 class="title is-5 my-2">
          BREAKDOWN
        </h5>
        <DamageTable :log="log" />
        <ProcTable :log="log" />

        <h5 class="title is-5 my-2">
          DETAILS
        </h5>
        <ul>
          <li
            v-for="(entry, index) in log.messages"
            :key="index"
            class="is-size-7"
            :class="{
              'has-text-danger': entry.startsWith('The monster did'),
              'has-text-success mb-3 has-text-weight-bold': entry.startsWith('You killed'),
              'has-text-info': entry.startsWith('You reflected'),
            }"
            v-html="entry"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import StatsTable from './StatsTable.vue'
import DamageTable from './Log/DamageTable.vue'
import ProcTable from './Log/ProcTable.vue'

export default {
  props: {
    player: [Object, null],
    monster: [Object, null],
    log: [Object, null],
  },
  components: {
    StatsTable,
    DamageTable,
    ProcTable,
  },
};
</script>
