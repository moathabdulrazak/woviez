<template>
  <div class="episode-page">
    <div class="video-container2">
      <iframe allowfullscreen :src="episodeUrl" frameborder="0"></iframe>
    </div>
    <div class="episode-details">
      <h2 class="title text-light">{{ episode?.name }}</h2>
      <p class="air-date text-light ">Air date: {{ episode?.air_date }}</p>
      <p class="overview text-light">{{ episode?.overview }}</p>
      <div class="buttons">
        <button class="btn text-light " v-if="prevEpisode" @click="goToEpisode(prevEpisode)" :disabled="loading">
          Previous Episode
        </button>
        <button class="btn text-light" v-if="nextEpisode" @click="goToEpisode(nextEpisode)" :disabled="loading">
          Next Episode
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodePage",
  data() {
    return {
      episode: null,
      show: null,
      season: null,
      prevEpisode: null,
      nextEpisode: null,
    };
  },
  async created() {
    await this.fetchEpisodeDetails();
  },
  watch: {
    $route: {
      immediate: true,
      async handler() {
        await this.fetchEpisodeDetails();
      },
    },
  },
  computed: {
    episodeUrl() {
      const { id, season, episode } = this.$route.params;
      return `https://autoembed.to/tv/tmdb/${id}-${season}-${episode}`;
    },
  },
  methods: {
    async fetchEpisodeDetails() {
      const { id, season, episode } = this.$route.params;

      // Fetch episode details
      const episodeResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=88d2c735e36149b50c9d46f09826ec06`
      );
      if (!episodeResponse.ok) {
        throw new Error(`HTTP error! status: ${episodeResponse.status}`);
      }
      this.episode = await episodeResponse.json();

      // Fetch show details
      const showResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=88d2c735e36149b50c9d46f09826ec06`
      );
      if (!showResponse.ok) {
        throw new Error(`HTTP error! status: ${showResponse.status}`);
      }
      this.show = await showResponse.json();

      // Fetch season details
      const seasonResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=88d2c735e36149b50c9d46f09826ec06`
      );
      if (!seasonResponse.ok) {
        throw new Error(`HTTP error! status: ${seasonResponse.status}`);
      }
      this.season = await seasonResponse.json();

      // Set prev and next episode URLs
      const episodeCount = this.season.episodes.length;
      const currentEpisodeIndex = this.season.episodes.findIndex(
        (e) => e.episode_number === this.episode.episode_number
      );
      if (currentEpisodeIndex > 0) {
        this.prevEpisode = `/onShow/${id}/seasons/${season}/episodes/${
          this.season.episodes[currentEpisodeIndex - 1].episode_number
        }`;
      }
      if (currentEpisodeIndex < episodeCount - 1) {
        this.nextEpisode = `/onShow/${id}/seasons/${season}/episodes/${
          this.season.episodes[currentEpisodeIndex + 1].episode_number
        }`;
      }
    },
    goToEpisode(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style>
.episode-page {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.video-container2 {
  width: 100%;
  max-width: 600px;
}

.video-container2 iframe {
  width: 100%;
  height: 400px;
}

.episode-details {
  width: 100%;
  max-width: 600px;
}

.title {
  font-size: 2rem;
 
}
</style>