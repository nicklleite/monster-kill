<template>
	<div>
		<div class="game-stats">
			<div class="row justify-content-md-center">
				<div class="col-12 col-lg-4">
					<span class="game-player-name text-left text-primary">Player's Name</span>
					<div class="progress playerHealthBar">
						<div
							role="progressbar"
							:class="['progress-bar', `bg-${lifeIndicatorStylePlayer}`]"
							:aria-valuenow="player.currentHealthPoints" :aria-valuemin="0"
							:style="{width: player.currentHealthPoints + '%'}"
							:aria-valuemax="player.healthPoints">{{ player.currentHealthPoints }}</div>
					</div>
					<div class="row justify-content-between mt-2">
						<div class="col-lg-2">
							<span>Mana: </span>
						</div>
						<div class="col-lg-10">
							<div class="progress">
								<div
									role="progressbar"
									class="progress-bar bg-primary"
									:aria-valuenow="player.currentManaPoints" :aria-valuemin="0"
									:style="{width: player.currentManaPoints + '%'}"
									:aria-valuemax="player.manaPoints">{{ player.currentManaPoints }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-4">
					<span class="game-monster-name text-right text-danger">Monster</span>
					<div class="progress monsterHealthBar">
						<div
							role="progressbar"
							:class="['progress-bar', `bg-${lifeIndicatorStyleMonster}`]"
							:aria-valuenow="monster.currentHealthPoints" :aria-valuemin="0"
							:style="{width: monster.currentHealthPoints + '%'}"
							:aria-valuemax="monster.healthPoints">{{ monster.currentHealthPoints }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "GameStats",

	props: {
		monster: Object,
		player: Object,
		lifeIndicatorStylePlayer: String,
		lifeIndicatorStyleMonster: String
	},
	
	data() {
		return {}
	},

	created() {}
}
</script>

<style lang="scss" scoped>
.game-stats {
	font-family: monospace;
	border: 1px solid #74b9ff;
	width: 100%;
	padding: 1rem;
	border-radius: 10px;

	.game-player-name,
	.game-monster-name {
		font-weight: bold;
		font-size: 0.9rem;
		display: block;
	}

	.playerHealthBar,
	.monsterHealthBar {
		height: 2rem;
	}
}
</style>