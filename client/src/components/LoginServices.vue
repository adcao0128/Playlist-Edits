<template>
  <div>
    <form>
        <label for="lastfmAccount">LastFM Account: </label><br>
        <input type="text" id="lastfmAccount" name="lastfmAccount" @change="saveLastFMUsername($event)"><br>
        <label for="spotifyPlaylistLink">Spotify Playlist Link: </label><br>
        <input type="text" id="spotifyPlaylistLink" name="spotifyPlaylistLink" @change="saveSpotifyPlaylistLink($event)"><br>
        <button v-on:click="track">Submit</button> <br />
        <div
          v-for="(song, index) in songDeletions" :key="index"
        >
          <h1>Songs</h1>
          <p>{{ song }}</p>
        </div>
    </form>
  </div>
</template>

<script>
  import LastFMService from '../LastFMService.js';
  export default {
    name: 'LoginServices',
    data() {
      return {
        songDeletions: [],
        songAdditions: [],
        lastfmUsername: "allan-cao91",
        spotifyPlaylistLink: "https://open.spotify.com/playlist/0Pe4oocsnswRI4v6zPTIwK?si=c806af560256477e",
      }
    },
    methods: {
      resetDeletions() {
        this.songDeletions = [];
      },
      resetAdditions() {
        this.songAdditions = [];
      },
      resetLastFMUsername() {
        this.lastfmUsername = "";
      },
      resetSpotifyPlaylistLink() {
        this.spotifyPlaylistLink = "";
      },
      saveLastFMUsername(event) {
        this.lastfmUsername = event.target.value;
      },      
      saveSpotifyPlaylistLink(event) {
        this.spotifyPlaylistLink = event.target.value;
      },
      async track() {
        let result = await LastFMService.makeSuggestions();
        setTimeout(() => {
          console.log(result);
        }, 1000);
        this.songDeletions = result[0];
        this.songAdditions = result[1];
      }
      
    }
}
</script>
