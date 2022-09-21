<template>
  <div class="bg-slate-800 min-h-screen text-slate-50 pt-12 flex flex-col">
    <div class="max-w-5xl mx-auto grow">
      <div class="text-center">
      <h1 class="text-4xl font-bold">
        The Simulator
      </h1>
      <p class="text-slate-200 font-light text-xl ml-3">
        'Darknight' Edition
      </p>
      </div>

      <div class="mt-3">
        <h5 class="text-lg font-semibold">
          Helpful Hints
        </h5>
        <ul class="list-disc ml-5">
          <li>
            Values that would be percentages (like IDR) should be input as decimals. 80% -> 0.8.
          </li>
          <li>
            Providing a Player ID will silently calculate everything with that player's corporation buffs, companions, masteries, compendium, and current injections.
          </li>
        </ul>
      </div>

      <form ref="form" class="mt-4" @submit.prevent="submit">
        <div class="flex space-x-5">
          <div class="basis-1/2">
            <h4 class="text-2xl font-semibold uppercase text-center mb-4 border-b border-slate-500">
              Player
            </h4>
            <div class="field is-horizontal">
              <div class="field-label is-normal grow-[2]">
                <label class="font-bold">Preset</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control select">
                    <select @input="setPreset" class="!bg-slate-200">
                      <option />
                      <option v-for="preset in presets" :key="preset.name">
                        {{ preset.name }}
                      </option>
                    </select>
                  </p>
                </div>
                <div class="field is-narrow">
                  <p class="control">
                    <input type="text" class="input bg-slate-200" placeholder="Player ID" v-model="playerId">
                  </p>
                </div>
              </div>
            </div>

            <StatContainer :stats="playerStats" source="player" />
          </div>
          <div class="basis-1/2">
            <h4 class="text-2xl font-semibold uppercase text-center mb-4 border-b border-slate-500">
              Monster
            </h4>
            <div class="field is-horizontal">
              <div class="field-label is-normal grow-[2]">
                <label class="font-bold">Monster</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control select">
                    <select @input="setMonster" class="!bg-slate-200">
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

        <div class="mt-5">
        <h4 class="text-2xl font-semibold">
          Options
        </h4>
        <div class="level">
          <div class="level-right">
            <div class="level-item">
              <label class="cursor-pointer inline-block leading-5 relative hover:underline">
                <input type="checkbox" v-model="multikill">
                Multikill Buff
              </label>
            </div>
          </div>
        </div>
        </div>

        <button type="submit" class="button is-large is-success mt-3">
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
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import StatContainer from './components/StatContainer.vue';
import Footer from './components/Footer.vue';
import Results from './components/Results.vue';
import presets from './helpers/presets';

export default {
  data: () => ({
    multikill: true,
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

      if (this.playerId) {
        body.set('player[id]', this.playerId);
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
    Footer,
  },
};
</script>
