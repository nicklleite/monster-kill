const app = Vue.createApp({
    data() {
        return {
            globals: {
                // Indicates the state of the life of player and monster
                healthIndicators: {
                    excelentHealth: 85, // 85% to 100%
                    excelentHealthColor: "#00a876", // TODO: Convert to HEX
                    goodHealth: 70, // 70% to 84%
                    goodHealthColor: "yellow", // TODO: Convert to HEX
                    regularHealth: 50, // 50% to 69%
                    regularHealthColor: "orange", // TODO: Convert to HEX
                    badHealth: 30, // 30% to 49%
                    badHealthColor: "brown", // TODO: Convert to HEX
                    criticalHealth: 15, // 15% to 29%
                    criticalHealthColor: "red", // TODO: Convert to HEX
                    dead: 0, // Needless to say
                    deadHealthColor: "#000", // TODO: Convert to HEX
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

            player: {
                health: 100,
            },

            monster: {
                health: 100,
            },

            // TODO
            // - Add base damage and critical percentage for player
            // - Add base damage and critical percentage for monster
            // - Add experience points for player and monster, and consequently, think about the amount of each status that should be increased at level up (maybe do in separete objects)
            // - Save the stats of the player in the local storage
        };
    },

    computed: {
        monsterHealthBarStyles() {
            let healthColorBar = "";

            if (this.monster.health === this.globals.healthIndicators.dead) {
                return { width: "100%", backgroundColor: this.globals.healthIndicators.deadHealthColor };
            }

            if (this.monster.health >= this.globals.healthIndicators.excelentHealth) {
                healthColorBar = this.globals.healthIndicators.excelentHealthColor;
            } else if (this.monster.health >= this.globals.healthIndicators.goodHealth) {
                healthColorBar = this.globals.healthIndicators.goodHealthColor;
            } else if (this.monster.health >= this.globals.healthIndicators.regularHealth) {
                healthColorBar = this.globals.healthIndicators.regularHealthColor;
            } else if (this.monster.health >= this.globals.healthIndicators.badHealth) {
                healthColorBar = this.globals.healthIndicators.badHealthColor;
            } else {
                healthColorBar = this.globals.healthIndicators.criticalHealthColor;
            }

            return { width: this.monster.health + "%", backgroundColor: healthColorBar };
        },
        
        playerHealthBarStyles() {
            let healthColorBar = "";

            if (this.player.health === this.globals.healthIndicators.dead) {
                return { width: "100%", backgroundColor: this.globals.healthIndicators.deadHealthColor };
            }

            if (this.player.health >= this.globals.healthIndicators.excelentHealth) {
                healthColorBar = this.globals.healthIndicators.excelentHealthColor;
            } else if (this.player.health >= this.globals.healthIndicators.goodHealth) {
                healthColorBar = this.globals.healthIndicators.goodHealthColor;
            } else if (this.player.health >= this.globals.healthIndicators.regularHealth) {
                healthColorBar = this.globals.healthIndicators.regularHealthColor;
            } else if (this.player.health >= this.globals.healthIndicators.badHealth) {
                healthColorBar = this.globals.healthIndicators.badHealthColor;
            } else {
                healthColorBar = this.globals.healthIndicators.criticalHealthColor;
            }

            return { width: this.player.health + "%", backgroundColor: healthColorBar };
        },
    },

    methods: {
        attackMonster() {
            const attackValue = Math.floor(Math.random() * 10);
            this.monster.health -= attackValue;

            if (this.monster.health < attackValue) {
                this.monster.health = 0;
            }

            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = Math.floor(Math.random() * 10);

            if (this.player.health < attackValue) {
                this.player.health = 0;
            }

            this.player.health -= attackValue;

            // Log
            console.log(`Player delt ${attackValue} damage to monster.`);
            console.log(`Player health: ${this.player.health}`);
        },
    },
});

app.mount("#game");
