<script setup>
import Article from "./Article.vue";
import { onMounted, ref } from "vue";
import { convertDate, getTargetDate } from "../utils";
import "../data";

const articlesData = ref(window.LATEST_ARTICLES);
const filteredArticlesData = ref();
const checkedCategories = ref([]);

const handleCategoryCheck = () => {
	if (checkedCategories.value.length) {
		filteredArticlesData.value = articlesData.value.filter((article) => {
			return checkedCategories.value.includes(article.category);
		}
		);
	} else {
		filteredArticlesData.value = articlesData.value;
	}

	filteredArticlesData.value.slice(0, 5);

	filterArticlesByDate();
	sortArticlesByDate();
};

const filterArticlesByDate = () => {
	const targetDate = getTargetDate(7);
	filteredArticlesData.value = filteredArticlesData.value.filter((article) => new Date(article.publishDate) >= targetDate);
}

const sortArticlesByDate = () => {
	filteredArticlesData.value.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

onMounted(() => {
	handleCategoryCheck();
})
</script>

<template>
	<div class="wrapper">
		<h2>Latest Updates</h2>
		<div class="articles-list">
			<input type="checkbox" id="news" value="news" v-model="checkedCategories" @change="handleCategoryCheck()" />
			<label for="news">News</label>

			<input type="checkbox" id="essay" value="essay" v-model="checkedCategories"
				@change="handleCategoryCheck()" />
			<label for="essay">Essay</label>

			<ul>
				<li v-for="article in filteredArticlesData" :key="article.title">
					<Article :title="article.title" :date="convertDate(article.publishDate)" :url="article.url" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped></style>
