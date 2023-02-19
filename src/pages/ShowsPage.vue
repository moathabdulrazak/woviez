<template>
  <div>
    <div class="px-5">
      <form class="search-form" @submit.prevent="handleSearch">
        <input
          class=""
          placeholder="Search TV shows..."
          type="text"
          id="query"
          name="query"
          v-model="searchQuery"
        />
        <button class="btn btn-dark" type="submit">search</button>
      </form>
    </div>

    <div class="show-list">
      <template v-if="shows.length > 0">
        <ShowCard v-for="show in shows" :key="show.id" :show="show" />
      </template>
      <template v-else>
        <p>No TV shows found.</p>
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
import ShowCard from "../components/ShowCard.vue";
const API_KEY = "88d2c735e36149b50c9d46f09826ec06";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_SHOWS_ENDPOINT = "/tv/popular";
const SEARCH_SHOWS_ENDPOINT = "/search/tv";
const DEFAULT_PARAMS = {
  api_key: API_KEY,
  language: "en-US",
  query: "",
  page: 1,
};

export default {
  name: "ShowPage",
  components: { ShowCard },
  data() {
    return {
      shows: [],
      currentPage: DEFAULT_PARAMS.page,
      totalPages: 1,
      endpoint: `${BASE_URL}${POPULAR_SHOWS_ENDPOINT}`,
      searchQuery: "",
    };
  },
  methods: {
    async getShows(params) {
      try {
        const res = await axios.get(this.endpoint, { params });
        this.shows = res.data.results;
        this.currentPage = res.data.page;
        this.totalPages = res.data.total_pages;
      } catch (error) {
        console.error(error);
      }
    },
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        this.endpoint = `${BASE_URL}${SEARCH_SHOWS_ENDPOINT}`;
        this.getShows({ ...DEFAULT_PARAMS, query });
      } else {
        this.endpoint = `${BASE_URL}${POPULAR_SHOWS_ENDPOINT}`;
        this.getShows(DEFAULT_PARAMS);
      }
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.getShows({ ...DEFAULT_PARAMS, page: this.currentPage - 1 });
        this.scrollToTop();
      }
    },
    handleNextPage() {
      if (this.currentPage < this.totalPages) {
        this.getShows({ ...DEFAULT_PARAMS, page: this.currentPage + 1 });
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
    this.getShows(DEFAULT_PARAMS);
  },
};
</script>
