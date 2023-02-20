<template>
  <div>
    <div class="px-5">
      <form class="search-form" @submit.prevent="handleSearch">
        <input
          class=""
          placeholder="Search movies..."
          type="text"
          id="query"
          name="query"
          v-model="searchQuery"
        />
        <button class="btn text-light" type="submit">search</button>
      </form>
    </div>

    <div class="movie-list">
      <template v-if="movies.length > 0">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </template>
      <template v-else>
        <p>No movies found.</p>
      </template>
    </div>

    <div class="pagination pb-3 text-light">
      <button class="btn-color"  @click="handlePreviousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}/{{ totalPages }}</span>
      <button class="btn-color" @click="handleNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
const API_KEY = "88d2c735e36149b50c9d46f09826ec06";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_ENDPOINT = "/movie/popular";
const SEARCH_MOVIES_ENDPOINT = "/search/movie";
const DEFAULT_PARAMS = {
  api_key: API_KEY,
  language: "en-US",
  query: "",
  page: 1,
};

export default {
  name: "MoviePage",
  components: { MovieCard },
  data() {
    return {
      movies: [],
      currentPage: DEFAULT_PARAMS.page,
      totalPages: 1,
      endpoint: `${BASE_URL}${POPULAR_MOVIES_ENDPOINT}`,
      searchQuery: "",
    };
  },
  methods: {
    async getMovies(params) {
      try {
        const res = await axios.get(this.endpoint, { params });
        this.movies = res.data.results;
        this.currentPage = res.data.page;
        this.totalPages = res.data.total_pages;
      } catch (error) {
        console.error(error);
      }
    },
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        this.endpoint = `${BASE_URL}${SEARCH_MOVIES_ENDPOINT}`;
        this.getMovies({ ...DEFAULT_PARAMS, query });
      } else {
        this.endpoint = `${BASE_URL}${POPULAR_MOVIES_ENDPOINT}`;
        this.getMovies(DEFAULT_PARAMS);
      }
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.getMovies({ ...DEFAULT_PARAMS, page: this.currentPage - 1 });
        this.scrollToTop();
      }
    },
    handleNextPage() {
      if (this.currentPage < this.totalPages) {
        this.getMovies({ ...DEFAULT_PARAMS, page: this.currentPage + 1 });
        this.scrollToTop();
      }
    },
    scrollToTop() {
      const scrollOptions = {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
      window.scrollTo(scrollOptions);
    },
  },
  mounted() {
    this.getMovies(DEFAULT_PARAMS);
  },
};
</script>


<style>
.btn-color{
  background-color: #FF0000;
}
  .movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .pagination button {
    background-color: #ffffff;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    color: black;
    font-size: 1rem;
    margin: 0 5px;
    padding: 5px 10px;
    transition: background-color 0.3s ease;
  }
  .pagination button:hover {
    background-color: rgb(255, 0, 0);
    color: white;
  }
  .pagination button:disabled {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
  .search-form {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .search-form label {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  .search-form input {
    font-size: 1rem;
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 5px;
    width: 300px;
  }
</style>
