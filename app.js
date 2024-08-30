const app = Vue.createApp({
    data() {
        return {
            globals: {
                // Indicates the state of the life of player and monster
                healthIndicators: {
                    excelentHealth: 85, // 85% to 100%
                    excelentHealthColor: "green", // TODO: Convert to HEX
                    goodHealth: 70, // 70% to 84%
                    goodHealthColor: "yellow", // TODO: Convert to HEX
                    regularHealth: 50, // 50% to 69%
                    regularHealthColor: "orange", // TODO: Convert to HEX
                    badHealth: 30, // 30% to 49%
                    badHealthColor: "brown", // TODO: Convert to HEX
                    criticalHealth: 15, // 15% to 29%
                    criticalHealthColor: "red", // TODO: Convert to HEX
                    dead: 0, // Needless to say
                },

                buffs: {
                    damage: {
                        chance: 0.01, // 1% chance to increase damage.
                        multiplier: 1.5, // 50% increase in damage.
                    },

                    heal: {
                        chance: 0.05, // 5% chance to heal.
                        multiplier: 0.012, // 1.2% of max health.
                    }
                },

                player: {
                    level: 1,
                    initialMaxHealth: 69, // 100%
                    skills: {
                        basic: {},
                        special: {},
                    }
                },

                monster: {
                    initialMaxHealth: 72, // 100%
                    skills: {
                        basic: {},
                        special: {},
                    }
                },
            },

            player: {},

            monster: {},

            // TODO
            // - Add base damage and critical percentage for player
            // - Add base damage and critical percentage for monster
            // - Add experience points for player and monster, and consequently, think about the amount of each status that should be increased at level up (maybe do in separete objects)
            // - Save the stats of the player in the local storage
        };
    },

    methods: {
        attackMonster() {
            console.log("attackMonster");
            const attackValue = Math.floor(Math.random() * 10);
            this.monsterHealth -= attackValue;
            // this.attackPlayer();
        },

        attackPlayer() {
            console.log("attackPlayer");
            const attackValue = Math.floor(Math.random() * 10);
            this.playerHealth -= attackValue;
        },
    },
});

app.mount("#game");
