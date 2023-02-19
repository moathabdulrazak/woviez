<template>
  <div class="movie-card">
    <router-link :to="{ name: 'movie', params: { id: movie.id } }">
      <div>
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title + ' poster'" />
        <h2 class="pt-2 text-light" >{{ movie.title }}</h2>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
  .movie-card {
    /* background-color: rgb(51 27 61 / 14%);
    backdrop-filter: blur(15px); */
    border-radius: 10px;
    /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
    padding: 20px;
    width: 300px;
    cursor: pointer;
  }

  .movie-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .movie-card img {
    border-radius: 5px;
    height: 400px;
    object-fit: cover;
    width: 100%;
  }
  .movie-card img:hover {
    border-radius: 5px;
    height: 400px;
    object-fit: cover;
    width: 100%;
    transform: scale(1.05);
  }
</style>
