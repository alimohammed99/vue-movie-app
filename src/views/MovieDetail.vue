<template>
    <div class="movie-detail">
        <h2>{{ movie.Title }}</h2>
        <p>{{ movie.Year }}</p>
        <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
        <p>{{ movie.Plot }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import env from '@/env.js';

const movie = ref({});
const errorMessage = ref('');
const route = useRoute();

const fetchMovieDetails = async () => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${env.apiKey}&i=${route.params.id}&plot=full`);

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error || 'No results found');
        }

        movie.value = data;
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        errorMessage.value = error.message || 'An error occurred';
    }
};

onBeforeMount(fetchMovieDetails);
</script>

<style lang="scss">
.movie-detail {
    padding: 16px;

    h2 {
        color: #fff;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 16px;
    }

    .featured-img {
        display: block;
        max-width: 200px;
        margin-bottom: 16px;
    }

    p {
        color: #fff;
        font-size: 18px;
        line-height: 1.4;
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }
}
</style>
