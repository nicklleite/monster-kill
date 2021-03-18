<template>
	<div class="game-log-wraper">
		<p v-for="l in logs" :key="l.id">
			<span v-if="l.critical" class="log-message-critical">{{l.message}}</span>
			<span v-else-if="l.monsterHeal" class="log-message-monster-heal">{{l.message}}</span>
			<span v-else>{{l.message}}</span>
		</p>
	</div>
</template>

<script>
	export default {
		name: "GameLog",

		data() {
			return {}
		},

		props: {
			logs: Array
		},
	}
</script>

<style scoped lang="scss">

	.game-log-wraper {
		width: 100%;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 10px;
		font-family: monospace;
		overflow-y: auto;
		max-height: 20vh;

		p {
			margin: 0;

			.log-message-critical {
				color: #c00;
				font-weight: bold
			}

			.log-message-monster-heal {
				color: #28a745;
				font-weight: bold;
			}
		}
	}
	
</style>