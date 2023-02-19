<template>
  <div class="card show-card">
    <router-link :to="{ name: 'activeShow', params: { id: show.id } }">
      <img :src="getImageUrl(show.poster_path)" class="card-img-top" :alt="show.name" />
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ show.name }}</h5>
      <p class="card-text">{{ show.overview }}</p>
    </div>
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
.show-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.show-card__poster-container {
  width: 150px;
  margin-right: 20px;
}

.show-card__poster {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
}

.show-card__info {
  flex: 1;
}

.show-card__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.show-card__description {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
