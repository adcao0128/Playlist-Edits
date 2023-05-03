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
  const lastfmurl = 'http://ws.audioscrobbler.com/2.0?';
  const lastfmkey = require('./config.js').lastfm();
  const spotifyID = require('./config.js').clientID();
  const spotifySecret = require('./config.js').getSecret();
  const buffer = require('buffer/').Buffer;
  import $ from "jquery";

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
      async getAllTracks(user) {
          try {
              let currentPage = 1;
              let totalPages = 1;
              let userTrackList = [];
              while (currentPage <= totalPages) {
                  const response = await $.ajax({
                      url: lastfmurl,
                      data: {
                          method: "user.getrecenttracks",
                          limit: "200",
                          user: `${user}`,
                          page: `${currentPage}`,
                          api_key: lastfmkey,
                          format: "json"
                      }
                  });
                  userTrackList = userTrackList.concat(response.recenttracks.track);
                  totalPages = parseInt(response.recenttracks['@attr'].totalPages);
                  currentPage++;
                  setTimeout(() => {console.log(currentPage)}, 100);
              }
              return userTrackList;
          }  catch (error) {
              console.log(error);
          }
      },
      async getAllSongs(userTrackList) {
          return userTrackList.map((e)=>e.name);
      },
      async getTopSongs(user) {
          try {
              const response = await $.ajax({
                  url: lastfmurl,
                  data: {
                      method: "user.gettoptracks",
                      user: `${user}`,
                      period: "12month",
                      api_key: lastfmkey,
                      format: "json"
                  }
              });
              console.log(response.toptracks.track);
          } catch (error) {
              console.log(error);
          }
      },
      async getSongFrequency(user){
          let songList = await this.getAllSongs(await this.getAllTracks(user));
          let songFrequency = [];
          for(const song of songList){
              songFrequency[song] = (songFrequency[song] || 0) + 1;
          }
          return songFrequency;
      },
      async getAccessToken(){
          const credentials = buffer.from(`${spotifyID}:${spotifySecret}`,'base64').toString('base64');
          const response = await $.ajax({
              url: 'https://accounts.spotify.com/api/token', 
              data: {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': `Basic ${credentials}`
                  },
                  body: 'grant_type=client_credentials',
              }
          });
          return response.access_token;
      },
      async getSpotifyPlayList(spotifyPlayList){
          try {        
              let spotifyLink = spotifyPlayList;
              let splittedLink = spotifyLink.split("/");
              let playlistID = splittedLink[splittedLink.length - 1];
              const response = await $.ajax({
                  url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                  headers: {
                      'Authorization': `Bearer ${await this.getAccessToken()}`
                  }
              });
              let playlist = response.items.map((n)=>n.track.name);
              return playlist;
          } catch (error) {
              console.log(error);
          }
      },
      async makeSuggestions(lastfmUserName, spotifyPlayListLink){
          try {
              let spotifyPlayList = await this.getSpotifyPlayList(spotifyPlayListLink);
              let songFrequency = await this.getSongFrequency(lastfmUserName);
              return [spotifyPlayList, songFrequency];
          } catch (error) {
              console.log(error);
          }
      },
      async track() {
        let result = await this.makeSuggestions();
        setTimeout(() => {
          console.log(result);
        }, 1000);
        this.songDeletions = result[0];
        this.songAdditions = result[1];
      },
    }
  }
</script>
