<template>
  <div class="movie-overview" @click="scrollToTop">
    <div class="movie-poster">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title + ' poster'" />
    </div>
    <div class="movie-details">
      <h1 class="text-light">{{ movie.title }}</h1>
      <div class="movie-rating text-light">{{ movie.vote_average * 10 }}%</div>
      <div class="movie-release text-light">{{ movie.release_date }}</div>
      <p class="movie-overview-text text-light">{{ movie.overview }}</p>
    </div>
  </div>
  <div class="movie-page">
    <div class="video-container">
      <iframe :src="movieUrl" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
const API_KEY = "88d2c735e36149b50c9d46f09826ec06";

export default {
  data() {
    return {
      movie: {
        title: "",
        vote_average: "",
        release_date: "",
        overview: "",
        poster_path: "",
      },
    };
  },
  computed: {
    movieUrl() {
      const movieId = this.$route.params.id;
      return `https://autoembed.to/movie/tmdb/${movieId}?api_key=${API_KEY}`;
    },
  },
  async created() {
    const movieId = this.$route.params.id;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.movie = data;
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.movie-overview {
  display: flex;
  align-items: center;
  margin: 2rem;
  cursor: pointer;
}

.movie-poster img {
  width: 300px;
}

.movie-details {
  margin-left: 2rem;
}

.movie-rating {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.movie-release {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #888;
}

.movie-overview-text {
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #ddd;
}

.movie-page {
  background-color: #141414;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.video-container {
  position: relative;
  width: 80%;
  height: 0;
  padding-bottom: 56.25%;
  margin-top: 2rem;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
