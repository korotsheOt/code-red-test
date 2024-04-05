<script setup>
import Article from "./Article.vue";
import { onMounted, ref } from "vue";
import { convertDate, getTargetDate } from "../utils";
import "../data";

const articlesData = ref(window.LATEST_ARTICLES);
const categories = ref(["news", "essay"]);
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
		<div class="articles-block">
			<div class="checkbox-block">
				<label class="checkbox-label" v-for="category in categories" :key="category">
					<input type="checkbox" :value="category" v-model="checkedCategories" @change="handleCategoryCheck()" />
					{{ category }}
				</label>
			</div>
			<ul class="articles-list">
				<li v-for="article in filteredArticlesData" :key="article.title">
					<Article :title="article.title" :date="convertDate(article.publishDate)" :url="article.url" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.checkbox-block {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 2em;
}

.articles-block {
	width: 100%;
	max-width: 500px;
	border: 1px solid #fff;
	padding: 20px 30px;
}

.checkbox-label {
	text-transform: capitalize;
	cursor: pointer;
}

.articles-list {
	list-style: none;
	padding: 0;
}

@media (width <= 768px) {
	.articles-block {
		margin: 0 15px;
		box-sizing: border-box;
	}
}
</style>