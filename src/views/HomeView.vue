<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <!-- The ID here is gotten from the Api -->

        <img
          src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
          alt="Naruto Poster" class="featured-img" />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            village's leader and strongest ninja.
          </p>
        </div>
      </router-link>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <!-- "@submit.prevent" prevents the form from reloading which is the normal form behavious -->

      <input type="text" placeholder="What are you looking for?" v-model="searchQuery" />
      <input type="submit" value="Search" />
    </form>

    
    <!-- "Dragon ball" is a name of a movie you can search for. -->


    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <!-- The key is the unique ID of the movies from the open API. -->

        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <!-- The 'to' here is binded too. -->

          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <!-- I appended the 'src' from the fetch -->

            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Error message -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <!-- Will only show if there's error. -->
  </div>
</template>

<script setup>
import { ref } from "vue";

import env from "@/env.js"; //Remember our api key is in the env.js file so I need to import it

// Initializing the search which is used to target the input field
const searchQuery = ref("");

// This is gonna hold the list/array of movies from our response
const movies = ref([]);

const errorMessage = ref(""); // Reactive variable for error message

const SearchMovies = async () => {
  try {
    // Reset error message first before anything incase of anything
    errorMessage.value = "";

    if (searchQuery.value !== "") {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${env.apiKey}&s=${searchQuery.value}`
      );

      // If the response status is not 'OK'
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again later.");
      }

      const data = await response.json();

      // This indicates an error response from the API
      if (data.Response === "False") {
        throw new Error(data.Error || "No results found.");
      }

      // Populate the list/array of movies with the results gotten from the fetching
      movies.value = data.Search;

      // Empty the input field again and get it ready for the next searching
      searchQuery.value = "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Set error message
    errorMessage.value = error.message || "An error occurred.";
  }
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      max-width: 50%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aaa;
            font-size: 14px;
          }

          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
