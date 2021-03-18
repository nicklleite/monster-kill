<template>
	<div>
		<div class="game-controls" v-if="isGameExecuting">
			<ActionButton btnVariant="danger" btnActionText="Attack" btnSize="sm" :disabled="disabledAttack" @click.prevent="playerAttack" @keyup.delete="playerAttack" />
			<ActionButton btnVariant="warning" btnActionText="Special Attack" btnSize="sm" :disabled="!specialAttackAvailable" @click.prevent="playerSpecialAttack" />
			<ActionButton btnVariant="success" btnActionText="Heal" btnSize="sm" @click.prevent="playerHealing" :disabled="!healAvailable" /> | 
			<ActionButton btnVariant="primary" btnActionText="Give Up" btnSize="sm" @click="giveUp" />
			<ActionButton btnVariant="primary" btnActionText="Reset" btnSize="sm" @click.prevent="resetGame" />
		</div>

		<div class="game-controls" v-else>
			<ActionButton btnVariant="primary" btnActionText="Start Game!" btnSize="sm" @click.prevent="startGame" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ActionButton from './ActionButton'

export default {
	name: "GameControls",
	props: {
		isGameExecuting: Boolean,
		specialAttackAvailable: Boolean,
		healAvailable: Boolean
	},

	components: {
		ActionButton
	},

	data() {
		return {
			disabledAttack: false
		}
	},

	computed: {
		...mapState(['player', 'monster'])
	},

	methods: {
		playerAttack() {
			// Emmiting the event
			this.$emit('player-attack')

			// Inactivate de attack button after an attack
			this.disabledAttack = !this.disabledAttack

			// Cooldown
			setTimeout(() => {
				this.disabledAttack = !this.disabledAttack
			}, this.player.cooldown)
		},

		playerSpecialAttack() {
			// Emmiting the event
			this.$emit('player-special-attack')
		},

		playerHealing() {
			// Emmiting the event
			this.$emit('player-heal')
		},

		startGame() {
			// Emmiting the event
			this.$emit('start-game')
		},

		resetGame() {
			// Emmiting the event
			this.$emit('reset-game')
		},

		giveUp() {
			// Emmiting the event
			this.$emit('give-up')
		}
	}
}
</script>

<style lang="scss" scoped>
	.game-controls {
		text-align: center;

		button {
			color: white;
			margin: 0 0.5rem;
		}
	}
</style>