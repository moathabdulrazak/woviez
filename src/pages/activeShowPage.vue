<template>
  <div>
    <h1>{{ show?.name }}</h1>
    <p>{{ show?.overview }}</p>

    <h2>Seasons</h2>
    <ul>
      <li v-for="season in seasons" :key="season.id">
        <h3>Season {{ season.season_number }}</h3>
        <ul>
          <li v-for="episode in season.episodes" :key="episode.id">
            <router-link :to="{ name: 'episode', params: { id: show.id, season: season.season_number, episode: episode.episode_number }}">
              {{ episode.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
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
      };
    },
    async created() {
      const showId = this.$route.params.id;
      const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&append_to_response=seasons`;
      const response = await fetch(url);
      const data = await response.json();
      this.show = data;

      this.seasons = data.seasons;
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
  };
</script>

<style>
</style>
