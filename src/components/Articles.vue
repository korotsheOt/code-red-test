<script setup>
import { onMounted, ref } from "vue";
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
	const currentDate = new Date();
	const targetDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

	filteredArticlesData.value = filteredArticlesData.value.filter((article) => new Date(article.publishDate) >= targetDate);
}

const sortArticlesByDate = () => {
	filteredArticlesData.value.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

const convertDate = (date) => {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	});
};

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
					<span>{{ article.title }}</span>
					<span>{{ convertDate(article.publishDate) }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped></style>
