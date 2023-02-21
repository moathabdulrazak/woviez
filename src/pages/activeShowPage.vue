<template>
<div class="active-show-page">
  <div class="d-flex">
    <div class="show-poster">
      <img class="img-fluid pt-3" :src="'https://image.tmdb.org/t/p/w300' + show.poster_path" alt="Poster for {{ show.name }}">
    </div>
    <div class="show-details pt-3 text-light">
      <h1>{{ show.name }}</h1>
      <div class="overview">{{ show.overview }}</div>
    </div>
  </div>

  <div class="season-selector">
    <h2 class="pt-2">Select Season:</h2>
    <div class="text-light">
      <button class="btn"
        v-for="season in seasons"
        :key="season.id"
        :class="{ active: season.season_number === selectedSeason }"
        @click="selectedSeason = season.season_number; currentPage = 1;"
      >
        {{ season.name }}
      </button>
    </div>
  </div>
</div>

    <div class="episode-list p-3">
  <div v-for="episode in visibleEpisodes" :key="episode.id" class="episode">
    <button
        class="watched-button"
        @click="toggleWatched(episode)"
        :class="{ watched: isEpisodeWatched(episode) }"
      >
        {{ isEpisodeWatched(episode) ? "watched" : "not watched" }}
      </button>
    <div class="episode-number">{{ episode.episode_number }}</div>
    <router-link :to="{name: 'episode', params: { id: show.id, season: selectedSeason, episode: episode.episode_number }}">
      <div class="episode-title text-light">{{ episode.name }}</div>
      <div class="episode-actions">

      <img class="img-fluid" :src="getEpisodePoster(episode)" alt="">
    </div>
    </router-link>
    <!-- <div class="episode-airdate">{{ episode.air_date }}</div> -->

  </div>
</div>
<div class="pagination pb-3">
  <button
    class="previous-season"
    :disabled="!hasPreviousSeason"
    @click="previousSeason"
  >
    Previous Season
  </button>
  <!-- <button
    class="previous-page"
    :disabled="!hasPreviousPage"
    @click="previousPage"
  >
    &lt;
  </button> -->
  <!-- <div class="page-number">{{ currentPage }}</div> -->
  <!-- <button
    class="next-page"
    :disabled="!hasNextPage"
    @click="nextPage"
  >
    &gt;
  </button> -->
  <button
    class="next-season"
    :disabled="!hasNextSeason"
    @click="nextSeason"
  >
    Next Season
  </button>
</div>
</template>
<script>
const API_KEY = "88d2c735e36149b50c9d46f09826ec06";
const EPISODES_PER_PAGE = 150;

export default {
  name: "ActiveShowPage",
  data() {
    return {
      show: null,
      seasons: [],
      selectedSeason: 1,
      currentPage: 1,
      watchedEpisodes: []
    };
  },
  async created() {
    const showId = this.$route.params.id;
    const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&append_to_response=seasons`;
    const response = await fetch(url);
    const data = await response.json();
    this.show = data;
    this.seasons = data.seasons;
    this.loadWatchedEpisodes();
    await Promise.all(this.seasons.map(async (season) => {
      const seasonUrl = `https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${API_KEY}`;
      const seasonResponse = await fetch(seasonUrl);
      const seasonData = await seasonResponse.json();
      season.episodes = seasonData.episodes;
    }));
  },
  computed: {
    selectedSeasonEpisodes() {
      const season = this.seasons.find(s => s.season_number == this.selectedSeason);
      return season ? season.episodes : [];
    },
    visibleEpisodes() {
      const startIndex = (this.currentPage - 1) * EPISODES_PER_PAGE;
      const endIndex = startIndex + EPISODES_PER_PAGE;
      return this.selectedSeasonEpisodes.slice(startIndex, endIndex);
    },
    hasNextPage() {
      const startIndex = this.currentPage * EPISODES_PER_PAGE;
      const endIndex = startIndex + EPISODES_PER_PAGE;
      return this.selectedSeasonEpisodes.length > endIndex;
    },
    hasPreviousPage() {
      const startIndex = (this.currentPage - 2) * EPISODES_PER_PAGE;
      return startIndex >= 0;
    },
    hasNextSeason() {
      const nextSeason = this.selectedSeason + 1;
      return this.seasons.some(s => s.season_number === nextSeason);
    },
    hasPreviousSeason() {
      const previousSeason = this.selectedSeason - 1;
      return this.seasons.some(s => s.season_number === previousSeason);
    },
    selectedSeasonIndex() {
      return this.seasons.findIndex(s => s.season_number === this.selectedSeason);
    }
  },
  methods: {
    nextPage() {
      const endIndex = (this.currentPage * EPISODES_PER_PAGE);
      if (this.selectedSeasonEpisodes.length > endIndex) {
        this.currentPage += 1;
      } else {
        const nextSeason = this.selectedSeason + 1;
        if (this.seasons.some(s => s.season_number === nextSeason)) {
          this.selectedSeason = nextSeason;
          this.currentPage = 1;
        }
      }
      window.scrollTo(0, 0);
    },
    previousPage() {
      const startIndex = ((this.currentPage - 2) * EPISODES_PER_PAGE);
      if (startIndex >= 0) {
        this.currentPage -= 1;
      } else {
        const previousSeason = this.selectedSeason - 1;
        if (this.seasons.some(s => s.season_number === previousSeason)) {
          this.selectedSeason = previousSeason;
          const lastPage = Math.ceil(this.selectedSeasonEpisodes.length / EPISODES_PER_PAGE);
          this.currentPage = lastPage;
        }
      }
      window.scrollTo

(0, 0);
},
nextSeason() {
const nextSeason = this.selectedSeason + 1;
if (this.seasons.some(s => s.season_number === nextSeason)) {
this.selectedSeason = nextSeason;
this.currentPage = 1;
window.scrollTo(0, 0);
}
},
previousSeason() {
const previousSeason = this.selectedSeason - 1;
if (this.seasons.some(s => s.season_number === previousSeason)) {
this.selectedSeason = previousSeason;
const lastPage = Math.ceil(this.selectedSeasonEpisodes.length / EPISODES_PER_PAGE);
this.currentPage = lastPage;
window.scrollTo(0, 0);
}
},
toggleWatched(episode) {
  if (!this.isEpisodeWatched(episode)) {
    this.watchedEpisodes.push(episode);
  }
  localStorage.setItem(`watched_${this.show.id}`, JSON.stringify(this.watchedEpisodes));
},
loadWatchedEpisodes() {
  const watched = localStorage.getItem(`watched_${this.show.id}`);
  if (watched) {
    this.watchedEpisodes = JSON.parse(watched);
  }
},
isEpisodeWatched(episode) {
  return this.watchedEpisodes.some(ep => ep.id === episode.id);
},
getEpisodePoster(episode) {
  if (episode.still_path) {
    return `https://image.tmdb.org/t/p/w185${episode.still_path}`;
  } else {
    return "/static/placeholder.png";
  }
},
getSeasonPoster(season) {
  if (season.poster_path) {
    return `https://image.tmdb.org/t/p/w185${season.poster_path}`;
  } else {
    return "/static/placeholder.png";
  }
}
}
};
</script>
<style>
.show-poster {
  max-width: 30%;
  margin-right: 1rem;
}
.show-poster img {
  width: 100%;
  height: auto;
}
.show-details {
  max-width: 70%;
}
.active-show-page {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 1200px;
}

.show-details {
  margin-bottom: 20px;
}

.show-details h1 {
  font-size: 40px;
  margin: 0;
}

.overview {
  font-size: 18px;
  margin-top: 10px;
}

.season-selector {
  margin-bottom: 20px;
}

.season-selector h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.season-buttons {
  display: flex;
  flex-wrap: wrap;
}

.season-buttons button {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
}

.season-buttons button.active {
  background-color: #333;
  color: #fff;
}

.episode-list {
  display: flex;
  flex-wrap: wrap;
}

.episode {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  width: 33.33%;
}

.episode-number {
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
}

.episode-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.episode-airdate {
  font-size: 16px;
  margin-bottom: 5px;
}

.episode-actions {
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: auto;
}

.watched-button {
  background-color: #000000;
  border: 1px solid #ccc;
  color: #ffffff;
  font-size: 16px;

}

.watched-button.watched {
  background-color: #ff0000;
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #000000;
  border: 1px solid #ccc;
  color: #a70000;
  font-size: 16px;
  margin-right: 10px;
  /* padding: 10px 20px; */
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.disabled {
  background-color: #ccc;
  border-color: #ccc;
  color: #ffffff;
  cursor: not-allowed;
}

.pagination .page-number {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
}

</style>