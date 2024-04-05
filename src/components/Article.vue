<script setup>
defineProps({
	title: String,
	date: String,
	url: String
})
</script>

<template>
	<div>
		<a :href="url">
			<span>{{ title }}</span>
			<span>{{ date }}</span>
		</a>
	</div>
</template>

<style scoped></style>
