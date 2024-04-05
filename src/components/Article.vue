<script setup>
defineProps({
	title: String,
	date: String,
	url: String
})
</script>

<template>
	<div class="article">
		<a class="article-link" :href="url">
			<p class="article-text">
				<span class="article-text__title">{{ title }}</span>
				<span class="article-text__date">{{ date }}</span>
			</p>
		</a>
	</div>
</template>

<style scoped>
.article-text {
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-between;
}

.article-link {
	color: inherit;
	text-decoration: none;
}

.article-text__title {
	max-width: 70%;
	text-overflow: ellipsis;
	white-space: nowrap; 
	overflow: hidden; 
}

.article-text__date {
	max-width: 25%;
}
</style>
