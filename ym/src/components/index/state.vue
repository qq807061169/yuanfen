<template>
	<div class="wraps">
		<div class="color-greed"></div>
		<div class="font">安全期</div>
		<div class="color-red"></div>
		<div class="font">姨妈期</div>
		<div class="color-yellow"></div>
		<div class="font">排卵期</div>
	</div>
</template>

<script>
	export default {
		name:"state",
		data() {
			return {
						
			};
		}
	}
</script>

<style scoped>
	.wraps{
		display: flex;
		width: 80%;
		margin: .1rem auto 0 auto;
		font-size: .3rem;
		justify-content: space-around;
		color: #949494;
	}
	.color-greed,.color-red,.color-yellow{
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
	}
	.color-greed{
		background: #fea54d;
	}
	.color-red{
		background: #fd74ba !important
	}
	.color-yellow{
		background: #ca4dfe;
	}
	
</style>
