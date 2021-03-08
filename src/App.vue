<template>
  <div class="container section">
    <form ref="form" class="form" @submit.prevent="submit">
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">
            Player
          </h4>
          <StatContainer source="player" />
        </div>
        <div class="column">
          <h4 class="title is-4">
            Monster
          </h4>
          <StatContainer source="monster" />
        </div>
      </div>
      <h4 class="title is-4">
        Options
      </h4>
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <label class="checkbox">
              <input type="checkbox" v-model="incursion">
              Incursion?
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="button is-large is-success">
        Simulate
      </button>
    </form>
    <Results
      v-if="playerStats"
      :player="playerStats"
      :monster="monsterStats"
      :log="combatLog"
    />
  </div>
</template>

<script>
import StatContainer from './components/StatContainer.vue'
import Results from './components/Results.vue';

export default {
  data() {
    return {
      incursion: false,
      playerStats: null,
      monsterStats: null,
      combatLog: {
        messages: [],
        final: {
          user: {
            maxHealth: 0,
            finalHealth: 0,
          },
          monster: {
            maxHealth: 0,
            finalHealth: 0,
          },
        },
      },
    };
  },
  methods: {
    submit() {
      const body = new FormData(this.$refs.form);
      body.set('options[incursion]', this.incursion);

      fetch('https://elethor.com/api/simulate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body,
      })
        .then((response) => response.json())
        .then(({ log, monster, user }) => {
          this.playerStats = user;
          this.monsterStats = monster;
          this.combatLog = log.log;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    StatContainer,
    Results,
  },
};
</script>
