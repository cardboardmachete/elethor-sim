<template>
  <div class="container section">
    <h1 class="title is-1">
      The Simulator
    </h1>
    <p class="subtitle ml-3">
      'El Grande' Edition
    </p>
    <div class="content">
      <h5>Helpful Hints</h5>
      <ul>
        <li>
          Values that would be percentages (like IDR) should be input as decimals. 80% -> 0.8.
        </li>
        <li>
          Providing a Player ID will silently calculate everything with that player's corporation buffs, companions, masteries, compendium, and current injections.
        </li>
      </ul>
    </div>

    <form ref="form" class="form mt-6" @submit.prevent="submit">
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">
            Player
          </h4>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Preset</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control select">
                  <select @input="setPreset">
                    <option />
                    <option v-for="preset in presets" :key="preset.name">
                      {{ preset.name }}
                    </option>
                  </select>
                </p>
              </div>
              <div class="field is-narrow">
                <p class="control">
                  <input type="text" class="input" placeholder="Player ID" v-model="playerId">
                </p>
              </div>
            </div>
          </div>

          <StatContainer :stats="playerStats" source="player" />
        </div>
        <div class="column">
          <h4 class="title is-4">
            Monster
          </h4>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Monster</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control select">
                  <select @input="setMonster">
                    <option />
                    <option v-for="monster in monsters" :key="monster.id">
                      {{ monster.name }}
                    </option>
                  </select>
                </p>
              </div>
            </div>
          </div>

          <StatContainer :stats="monsterStats" source="monster" />
        </div>
      </div>
      <h4 class="title is-4">
        Options
      </h4>
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <label class="checkbox">
              <input type="checkbox" v-model="multikill">
              Multikill Buff
            </label>
          </div>
          <div class="level-item">
            <label class="checkbox">
              <input type="checkbox" v-model="scaling">
              New SVG/FTD Scaling
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="button is-large is-success">
        Simulate
      </button>
    </form>
    <Results
      v-if="playerResults"
      :player="playerResults"
      :monster="monsterResults"
      :log="combatLog"
    />
  </div>
</template>

<script>
import StatContainer from './components/StatContainer.vue'
import Results from './components/Results.vue';
import presets from './helpers/presets';

export default {
  data: () => ({
    multikill: true,
    scaling: false,
    playerId: null,
    playerStats: [
      { label: 'Level', name: 'level', value: 1 },
      { label: 'Fortitude', name: 'fortitude', value: 1 },
      { label: 'Speed', name: 'speed', value: 1 },
      { label: 'Savagery', name: 'savagery', value: 1 },
      { label: 'Pierce', name: 'pierce', value: 1 },
      { label: 'Armor', name: 'armor', value: 1 },
      { label: 'IDR', name: 'ignore_damage_reduction', value: 0 },
      { label: 'Min Damage', name: 'min_damage', value: 0 },
      { label: 'Max Damage', name: 'max_damage', value: 0 },
      { label: 'Damage', name: 'damage', value: 0 },
      { label: 'Puncture', name: 'puncture', value: 4 },
      { label: 'Health Multi', name: 'health_multiplier', value: 1 },
    ],
    monsterStats: [
      { label: 'Level', name: 'level', value: 1 },
      { label: 'Fortitude', name: 'fortitude', value: 1 },
      { label: 'Speed', name: 'speed', value: 1 },
      { label: 'Savagery', name: 'savagery', value: 1 },
      { label: 'Pierce', name: 'pierce', value: 1 },
      { label: 'Armor', name: 'armor', value: 1 },
      { label: 'DR', name: 'damage_reduction', value: 0 },
      { label: 'Puncture', name: 'puncture', value: 4 },
      { label: 'Health Multi', name: 'health_multiplier', value: 1 },
    ],
    presets,
    monsters: [],
    playerResults: null,
    monsterResults: null,
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
  }),
  methods: {
    submit() {
      const body = new FormData(this.$refs.form);
      body.set('options[multikill]', this.multikill);
      body.set('options[scaling]', this.scaling);

      if (this.playerId) {
        body.set('player.id', this.playerId);
      }

      fetch('https://elethor.com/api/simulate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body,
      })
        .then((response) => response.json())
        .then(({ log, monster, user }) => {
          this.playerResults = user;
          this.monsterResults = monster;
          this.combatLog = log.log;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMonsters() {
      fetch('https://elethor.com/api/sim/monsters')
        .then((r) => r.json())
        .then((data) => {
          this.monsters = data;
        });
    },
    setMonster(e) {
      const monster = this.monsters.find((m) => m.name === e.target.value);

      this.monsterStats = this.monsterStats.map((stat) => {
        if (stat.label === 'Level') {
          stat.value = monster.level;
        } else if (stat.label === 'Health Multi') {
          stat.value = monster.attributes?.[stat.name] ?? 1;
        } else {
          stat.value = monster.attributes?.[stat.name] ?? 0;
        }

        return stat;
      });
    },
    setPreset(e) {
      const preset = this.presets.find((m) => m.name === e.target.value);

      this.playerStats = this.playerStats.map((stat) => {
        if (stat.label === 'Level') {
          stat.value = preset.level;
        } else if (stat.label === 'Health Multi') {
          stat.value = preset.attributes?.[stat.name] ?? 1;
        } else {
          stat.value = preset.attributes?.[stat.name] ?? 0;
        }

        return stat;
      });
    },
  },
  mounted() {
    this.getMonsters();
  },
  components: {
    StatContainer,
    Results,
  },
};
</script>
