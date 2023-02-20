<template>
  <div class="active-show-page">
    <h1 class="show-title">{{ show?.name }}</h1>
    <p class="show-overview">{{ show?.overview }}</p>

    <div class="seasons-dropdown">
      <label for="season-select">Seasons:</label>
      <select id="season-select" v-model="selectedSeason">
        <option v-for="season in seasons" :key="season.id" :value="season.season_number">Season {{ season.season_number }}</option>
      </select>
    </div>

    <div class="episodes-list">
      <ul v-if="selectedSeason">
        <li v-for="episode in getSelectedSeasonEpisodes()" :key="episode.id">
          <router-link :to="{ name: 'episode', params: { id: show.id, season: selectedSeason, episode: episode.episode_number }}">
            {{ episode.name }}
          </router-link>
        </li>
      </ul>
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
}

.show-overview {
  margin-bottom: 30px;
}

.seasons-dropdown {
  margin-bottom: 20px;
}

.episodes-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

select {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-right: 10px;
}

</style>
