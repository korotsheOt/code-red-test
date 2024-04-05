<script setup>
import { ref } from "vue";
import "../data";

const articlesData = ref(window.LATEST_ARTICLES);

</script>

<template>
	<div class="wrapper">
		<h2>Latest Updates</h2>
		<div class="articles-list">
			<input type="checkbox" id="news" value="news" />
			<label for="news">News</label>
			<input type="checkbox" id="essay" value="essay" />
			<label for="essay">Essay</label>

			<ul>
				<li v-for="article in articlesData" :key="article.title">
					<span>{{ article.title }}</span>
					<span>{{ article.publishDate }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
</style>
