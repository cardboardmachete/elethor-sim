<template>
  <div>
    <div class="flex space-x-5">
      <div class="basis-1/3">
        <h5 class="text-xl font-semibold mb-1">
          Player Stats
        </h5>
        <StatsTable :stats="player" />
        <h5 class="text-xl font-semibold mb-1">
          Monster Stats
        </h5>
        <StatsTable :stats="monster" />
      </div>
      <div class="basis-1/3">
        <h5 class="text-xl font-semibold mb-1">
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
        <h5 class="text-xl font-semibold my-2">
          BREAKDOWN
        </h5>
        <DamageTable :log="log" />
        <ProcTable :log="log" />
      </div>
      <div class="basis-1/4 ml-auto max-h-[65vh] overflow-y-auto">
        <h5 class="text-xl font-semibold my-2">
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
              'text-purple-300': entry.startsWith('You punctured'),
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
