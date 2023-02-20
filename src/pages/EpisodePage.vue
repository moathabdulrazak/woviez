<template>
  <div class="active-show-page">
    <div class="show-details">
      <div class="show-image">
        <img :src="'https://image.tmdb.org/t/p/w500' + show?.poster_path" :alt="show?.name">
      </div>
      <div class="show-info">
        <h1 class="show-title">{{ show?.name }}</h1>
        <p class="show-overview">{{ show?.overview }}</p>
      </div>
    </div>

    <div class="seasons-dropdown">
      <label for="season-select">Seasons:</label>
      <select id="season-select" v-model="selectedSeason">
        <option v-for="season in seasons" :key="season.id" :value="season.season_number">Season {{ season.season_number }}</option>
      </select>
    </div>

    <div class="episodes-list">
      <div class="episodes-grid">
        <div v-for="episode in getSelectedSeasonEpisodes()" :key="episode.id" class="episode-card">
          <router-link :to="{ name: 'episode', params: { id: show.id, season: selectedSeason, episode: episode.episode_number }}">
            <div class="thumbnail">
              <img :src="'https://image.tmdb.org/t/p/w185' + episode.still_path" :alt="episode.name">
            </div>
            <div class="episode-title">{{ episode.name }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = "88d2c735e36149b50c9d46f09826ec06";
export default {
  name: "ActiveShowPage",
  data() {
    return {
      show: null,
      seasons: [],
      selectedSeason: null,
    };
  },
  async created() {
    const showId = this.$route.params.id;
    const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&append_to_response=seasons`;
    const response = await fetch(url);
    const data = await response.json();
    this.show = data;

    this.seasons = data.seasons;
    this.selectedSeason = this.seasons[0].season_number;

    this.seasons.forEach((season) => {
      season.episodes = [];
      const seasonUrl = `https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${API_KEY}`;
      fetch(seasonUrl)
        .then((response) => response.json())
        .then((data) => {
          season.episodes = data.episodes;
        });
    });
  },
  methods: {
    getSelectedSeasonEpisodes() {
      return this.seasons.find((season) => season.season_number === this.selectedSeason)?.episodes || [];
    },
  },
};
</script>

<style>
.active-show-page {
  font-family: Arial, sans-serif;
  margin: 20px;
  max-width: 800px;
}

.show-title {
  font-size: 32px;
  margin-bottom: 10px;
}

.show-overview {
  margin-bottom: 30px;
}

.seasons-dropdown {
  margin-bottom: 20px;
}

.episodes-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.episode-thumbnail {
  width: calc(25% - 10px);
  margin-bottom: 20px;
}

.episode-thumbnail img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}

.episode-thumbnail p {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>