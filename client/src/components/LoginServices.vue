<template>
  <div>
        <div>
          <div class="row center">
            <label for="lastfmAccount">LastFM Account: </label><br />
            <input type="text" id="lastfmAccount" name="lastfmAccount" v-model="lastfmUsername"><br />  
          </div>
          <br> 
          <div class="row center">          
            <label for="spotifyPlaylistLink">Spotify Playlist Link: </label><br />
            <input class="increaseWidth" type="text" id="spotifyPlaylistLink" name="spotifyPlaylistLink" v-model="spotifyPlaylistLink"><br />
          </div> 
          <br>
          <div class="row center">          
            <button class="increaseSize" v-on:click="track">Submit</button> <br />
          </div> 
        </div>

        <div class="row">
          <h1>Least Played in Past Month</h1>          
          <div class="column left" style="background-color:#aaa;">
            <h2>Oldest Songs in your Playlist</h2>
            <div v-for="(song, index) in oneEditOld" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
          <div class="column right" style="background-color:#bbb;">
            <h2>Recently Added Songs in your Playlist</h2>
            <div v-for="(song, index) in oneEditRecent" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <h1>Leasted Played All-Time</h1>
          <div class="column left" style="background-color:#aaa;">
            <h2>Oldest Songs in Your Playlist</h2>
            <div v-for="(song, index) in allTimeEditOld" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
          <div class="column right" style="background-color:#bbb;">
            <h2>Recently Added Songs in your Playlist</h2>
            <div v-for="(song, index) in allTimeEditRecent" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <h1>Most Played in Past Month</h1>          
          <div class="column left" style="background-color:#aaa;">
            <h2>Oldest Songs in Your Playlist</h2>
            <div v-for="(song, index) in mostOneEditOld" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
          <div class="column right" style="background-color:#bbb;">
            <h2>Recently Added Songs in your Playlist</h2>
            <div v-for="(song, index) in mostOneEditRecent" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <h1>Most Played All-Time</h1>
          <div class="column left" style="background-color:#aaa;">
            <h2>Oldest Songs in Your Playlist</h2>
            <div v-for="(song, index) in mostAllTimeEditOld" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
          <div class="column right" style="background-color:#bbb;">
            <h2>Recently Added Songs in your Playlist</h2>
            <div v-for="(song, index) in mostAllTimeEditRecent" :key="index">
              <p>{{ `Song Name: ${song[0]}` }}<br> {{`Amount Played: ${song[2]}`}}</p>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
  import LastFMService from '../LastFMService.js';
  export default {
    name: 'LoginServices',
    data() {
      return {
        allTimeEditOld: [],
        allTimeEditRecent: [],
        oneEditOld: [],
        oneEditRecent: [],
        mostAllTimeEditOld: [],
        mostAllTimeEditRecent: [],
        mostOneEditOld: [],
        mostOneEditRecent: [],
        lastfmUsername: "allan-cao91",
        spotifyPlaylistLink: "https://open.spotify.com/playlist/5xGyD6yI1owfzvSdo27Pqf?si=e57c581e2cf44dce",
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
      async track() {
        //Get a user's total list of songs from LastFM
        let monthLists = await LastFMService.getPastMonthLists(this.lastfmUsername, this.spotifyPlaylistLink);
        let allTimeLists = await LastFMService.getAllTimeLists(this.lastfmUsername, this.spotifyPlaylistLink);

        //Create deep copies of these lists so the long API call doesn't need to be ran every time.
        let oldLeastMonthLists = structuredClone(monthLists);
        let recentLeastMonthList = structuredClone(monthLists);
        let oldLeastAllTimeLists = structuredClone(allTimeLists);
        let recentLeastAllTimeLists = structuredClone(allTimeLists);

        let oldMostMonthLists = structuredClone(monthLists);
        let recentMostMonthList = structuredClone(monthLists);
        let oldMostAllTimeLists = structuredClone(allTimeLists);
        let recentMostAllTimeLists = structuredClone(allTimeLists);

        /*Suggest the playlist edits. Gives the edits for least listened songs in the past
        month, in the oldest/most recently added songs in the playlist*/
        let pastOld = await LastFMService.oneEditOutOld(oldLeastMonthLists);
        this.oneEditOld = pastOld;
        let pastRecent = await LastFMService.oneEditOutRecent(recentLeastMonthList);
        this.oneEditRecent = pastRecent;
        /*Suggest the playlist edits. Gives the edits for least listened songs all time, 
        in the oldest/most recently added songs in the playlist*/
        let old = await LastFMService.editOutOld(oldLeastAllTimeLists);
        this.allTimeEditOld = old;
        let recent = await LastFMService.editOutRecent(recentLeastAllTimeLists);
        this.allTimeEditRecent = recent;
        /*Suggest the playlist edits. Gives the edits for most listened songs in the past
        month, in the oldest/most recently added songs in the playlist*/
        let mostOneOld = await LastFMService.mostOneEditOutOld(oldMostMonthLists);
        this.mostOneEditOld = mostOneOld;
        let mostOneRecent = await LastFMService.mostOneEditOutRecent(recentMostMonthList);
        this.mostOneEditRecent = mostOneRecent;
        /*Suggest the playlist edits. Gives the edits for most listened songs 
        all time, in the oldest/most recently added songs in the playlist*/
        let mostOld = await LastFMService.mostEditOutOld(oldMostAllTimeLists);
        this.mostAllTimeEditOld = mostOld;
        let mostRecent = await LastFMService.mostEditOutRecent(recentMostAllTimeLists);
        this.mostAllTimeEditRecent = mostRecent;
      }
      
    }
}
</script>

<style>

.center {
  display: flex;
  justify-content: center;
}

.divide {
  padding: 5%;
}

.increaseWidth {
  width: 30%;
}

.increaseSize {
  width: 10%;
  height: 10%;
}

* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
}

.left {
  width: 50%;
}

.right {
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
