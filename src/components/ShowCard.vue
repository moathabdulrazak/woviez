<template>
  <div class="movie-card">
    <router-link :to="{ name: 'activeShow', params: { id: show.id } }">
      <img :src="getImageUrl(show.poster_path)" class="card-img-top" :alt="show.name" />
      <div class="card-body">
        <h5 class="card-title text-light">{{ show.name }}</h5>
        <!-- <p class="card-text text-light">{{ show.overview }}</p> -->
      </div>
    </router-link>
    </div>
  <!-- <router-link :to="{ name: 'activeShow'}">
 <button>go to show</button>
    </router-link> -->
</template>

<script>

export default {
  name: "ShowCard",
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
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
