<template>
	<div class="game-wrap">
		<div class="container game-wrap-content">
			<h1 class="text-center">⚔ Monster Kill ⚔</h1>
			<hr>
			<GameStats
				:player="player" :lifeIndicatorStylePlayer="lifeIndicatorStylePlayer"
				:monster="monster" :lifeIndicatorStyleMonster="lifeIndicatorStyleMonster" />
			<hr>
			<GameControls
				:specialAttackAvailable="specialAttackAvailable"
				:isGameExecuting="isGameExecuting"
				@player-attack="playerAttack"
				@player-special-attack="playerSpecialAttack"
				@reset-game="resetGame"
				@give-up="giveUp"
				@start-game="startGame" />
			<hr>
			<GameLog :logs="logs" />
		</div>
	</div>
</template>

<script>
import GameStats from '@/components/GameStats'
import GameControls from '@/components/GameControls'
import GameLog from '@/components/GameLog'

import { mapState } from 'vuex'
import uuid from 'uuid'

export default {
	name: 'Game',

	components: {
		GameStats, GameControls, GameLog
	},

	data() {
		return {
			logs: [],
			isGameExecuting: false,
			specialAttackAvailable: false,
			lifeIndicatorStylePlayer: 'success',
			lifeIndicatorStyleMonster: 'success'
		}
	},

	computed: {
		...mapState(['player', 'monster'])
	},

	methods: {
		resetGame(giveup = true, customMessage = `${this.getCurrentDate()} - !!!Game Reseted!!!`) {

			this.player.currentHealthPoints = this.player.healthPoints
			this.player.currentManaPoints = 0
			this.monster.currentHealthPoints = this.monster.healthPoints
			this.player.currentSpecialAttackUses = this.player.specialAttackUses
			this.lifeIndicatorStylePlayer = 'success'
			this.lifeIndicatorStyleMonster = 'success'

			if (giveup) {
				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - The player have surrended! - !!!Game Over!!!`
				})
			} else {
				this.logs = []

				this.logAction({
					id: uuid.v4(),
					message: customMessage
				})
			}

			this.isGameExecuting = false
			this.clearIntervals()
		},

		giveUp() {
			this.resetGame(true)
			this.isGameExecuting = false
			this.clearIntervals()
		},

		startGame() {
			this.logAction({
				id: uuid.v4(),
				message: `Look out! A MONSTER!`
			})

			// Let the monster be alive!
			let exec = setInterval(() => {
				this.monsterAttack()

				if (this.player.currentHealthPoints === 0) {
					this.logAction({
						id: uuid.v4(),
						message: `${this.getCurrentDate()} - !!!GAME OVER!!!`
					})

					clearInterval(exec)
				}

			}, this.monster.cooldown)

			this.isGameExecuting = true
		},

		// Attacks
		playerAttack() {
			let criticRoll = this.generateRandomNumber(1, 100)
			this.lifeIndicatorStyleMonster = this.lifeIndicator(this.monster)

			if (criticRoll < this.player.criticalPercent) {
				this.monster.currentHealthPoints -= this.player.attack * this.player.criticalMultiplier

				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - PLAYER HIT A CRITICAL STRIKE! Damage dealt: ${this.player.attack * this.player.criticalMultiplier}`,
					critical: true
				})
			} else {
				this.monster.currentHealthPoints -= this.player.attack

				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - Player used Normal Attack! Damage dealt: ${this.player.attack}`
				})
			}

			this.generateManaPoints()

			// Enable the special attack
			if (this.player.currentManaPoints == 100) {
				this.specialAttackAvailable = !this.specialAttackAvailable
			}

			console.log("Monster's Current Health: ", this.monster.currentHealthPoints)
			if (this.monster.currentHealthPoints <= 0) {
				this.resetGame(false, `${this.getCurrentDate()} - !!!YOU WIN!!!`)
				this.isGameExecuting = false
				this.clearIntervals()
			}
		},

		playerSpecialAttack() {
			if (this.player.currentSpecialAttackUses > 0) {
				let criticRoll = this.generateRandomNumber(1, 100)

				if (criticRoll < this.player.criticalPercent) {
					this.monster.currentHealthPoints -= this.player.specialAttack * this.player.criticalMultiplier

					this.logAction({
						id: uuid.v4(),
						message: `${this.getCurrentDate()} - SPECIAL ATTACK HIT A CRITICAL STRIKE! Damage dealt: ${this.player.specialAttack * this.player.criticalMultiplier}`,
						critical: true
					})
				} else {
					this.monster.currentHealthPoints -= this.player.specialAttack

					this.logAction({
						id: uuid.v4(),
						message: `${this.getCurrentDate()} - SPECIAL ATTACK! Damage dealt: ${this.player.specialAttack * this.player.criticalMultiplier}`,
					})
				}

				this.player.currentSpecialAttackUses = this.player.currentSpecialAttackUses - 1
				console.log('Special Attack Count: ', this.player.currentSpecialAttackUses)

				this.specialAttackAvailable = !this.specialAttackAvailable
				this.player.currentManaPoints = 0
			} else {
				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - NO SPECIAL ATTACKS LEFT!!!`,
				})
			}
		},

		playerHeal() {

		},

		monsterAttack() {
			this.player.currentHealthPoints -= this.monster.attack
			this.lifeIndicatorStylePlayer = this.lifeIndicator(this.player)

			if (this.player.currentHealthPoints < 100) {
				let healRoll = this.generateRandomNumber(1, 100)

				if (healRoll < this.monster.healChancePercent) {
					this.monster.currentHealthPoints += this.monster.healPoints

					this.logAction({
						id: uuid.v4(),
						message: `${this.getCurrentDate()} - MONSTER HEALED HIMSELF! + ${this.monster.healPoints}HP`,
						monsterHeal: true
					})
				}
			}

			if (this.player.currentHealthPoints < 0) {
				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - !!!GAME OVER!!!`
				})

				this.isGameExecuting = false
			} else {
				this.logAction({
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - Monster used Normal Attack! Damage dealt: ${this.monster.attack}`
				})
			}
		},

		lifeIndicator(obj) {
			if (obj.currentHealthPoints > 75) {
				return 'success'
			} else if (obj.currentHealthPoints <= 75 && obj.currentHealthPoints > 20) {
				return 'warning'
			} else if (obj.currentHealthPoints <= 20) {
				return 'danger'
			}
		},

		generateManaPoints() {
			let manaGenerated = this.generateRandomNumber(10, 15)

			this.player.currentManaPoints += manaGenerated

			if (this.player.currentManaPoints > 100) {
				this.player.currentManaPoints = this.player.manaPoints
			} else {
				let toLog = {
					id: uuid.v4(),
					message: `${this.getCurrentDate()} - Mana generated: ${manaGenerated}`
				}
				this.logAction(toLog)
			}
		},

		getCurrentDate() {
			let d = new Date();

			// Date
			let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
			let month = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()

			// Time
			let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
			let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
			let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()

			return `[${day}/${month}/${d.getFullYear()} ${hours}:${minutes}:${seconds}]`
		},

		generateRandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		logAction(logObject) {
			this.logs = [logObject, ...this.logs]
		},

		clearIntervals() {
			// A little "hack" to clear all the intervals on page
			// From: https://bit.ly/2PvpSmE (Stack Overflow)
			// ----------------------------------------------------------------
			// Set a fake timeout to get the highest timeout id
			var interval = setInterval(";");
			for (var i = 0 ; i < interval ; i++) {
				clearInterval(i); 
			}
		}
	},

	created() {
		const toLog = {
			id: uuid.v4(),
			message: `${this.getCurrentDate()} - Welcome to the Game!`
		}

		this.logAction(toLog)
	}
}
</script>

<style lang="scss" scoped>
	.game-wrap {
		padding-top: 5rem;
		padding-bottom: 5rem;
	}
</style>
