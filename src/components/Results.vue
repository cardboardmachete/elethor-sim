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
          Player: {{ log.final.user.finalHealth }} / {{ log.final.user.maxHealth }}
        </p>
        <p class="has-text-weight-bold">
          Monster: {{ log.final.monster.finalHealth }} / {{ log.final.monster.maxHealth }}
        </p>
        <ul>
          <li
            v-for="(entry, index) in log.messages"
            :key="index"
            class="is-size-7"
            :class="{
              'has-text-danger': entry.startsWith('The monster did'),
              'has-text-success': entry.startsWith('You killed'),
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

export default {
  props: {
    player: [Object, null],
    monster: [Object, null],
    log: [Object, null],
  },
  components: {
    StatsTable,
  },
};
</script>
