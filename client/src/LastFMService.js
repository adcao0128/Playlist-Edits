const lastfmurl = 'http://ws.audioscrobbler.com/2.0?';
const lastfmkey = require('./config.js').lastfm();
const spotifyID = require('./config.js').clientID();
const spotifySecret = require('./config.js').getSecret();
const Buffer = require('buffer').Buffer;

import $ from "jquery";

class LastFMService {
    //A method to return all the tracks a user has listend to from last fm;
    static async getAllTracks(user) {
        try {
            let currentPage = 1;
            let totalPages = 1;
            let userTrackList = [];
            //A loop to call the api for every page of songs.
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
                setTimeout(() => {console.log(currentPage)}, 250);
            }
            return userTrackList;
        }  catch (error) {
            console.log(error);
        }
    }
    //A method to get all the tracks a user has listened to in the past month
    static async getAllPastMonthTracks(user) {
        try {
            //Gets the date from a month ago to pass to the api
            let today = new Date();
            let pastMonth = new Date();
            pastMonth.setMonth(today.getMonth() - 1);
            let pastMonthInUnix = Math.floor(pastMonth.getTime() / 1000);
            let currentPage = 1;
            let totalPages = 1;
            let userTrackList = [];
            //A loop to call the api for the past month's tracks
            while (currentPage <= totalPages) {
                const response = await $.ajax({
                    url: lastfmurl,
                    data: {
                        method: "user.getrecenttracks",
                        limit: "200",
                        user: `${user}`,
                        page: `${currentPage}`,
                        from: `${pastMonthInUnix}`,
                        api_key: lastfmkey,
                        format: "json"
                    }
                });
                userTrackList = userTrackList.concat(response.recenttracks.track);
                totalPages = parseInt(response.recenttracks['@attr'].totalPages);
                currentPage++;
                setTimeout(() => {console.log(currentPage)}, 250);
            }
            return userTrackList;
        }  catch (error) {
            console.log(error);
        }
    }
    //A method to map a tracklist to song names used in all time scenarios
    static async getAllSongs(userTrackList) {
        return userTrackList.map((e)=>e.name);
    }
    //A method to map a tracklist to song names used in past month scenarios
    static async getPastMonthSongs(userTrackList){
        return userTrackList.map((e)=>e.name);
    }
    //A method to get the frequency of songs given all user tracks
    static async getAllTimeSongFrequency(user){
        let songList = await this.getAllSongs(await this.getAllTracks(user)); //This call to get tracks is different
        let songFrequency = [];
        //A loop for the song frequency
        for(const song of songList){
            songFrequency[song] = (songFrequency[song] || 0) + 1;
        }
        return songFrequency;
    }
    //A method to get the frequency of songs given a past month of user tracks
    static async getPastMonthSongFrequency(user){
        let songList = await this.getPastMonthSongs(await this.getAllPastMonthTracks(user)); //This call to get tracks is different
        let songFrequency = [];
        //A loop for song frequency
        for(const song of songList){
            songFrequency[song] = (songFrequency[song] || 0) + 1;
        }
        return songFrequency;
    }
    //A method to get a Spotify access token using an api call
    static async getAccessToken(){
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',          
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + Buffer.from(`${spotifyID}:${spotifySecret}`).toString('base64')
            },
            body: 'grant_type=client_credentials'
        });
        const tokenData = await response.json();
        return tokenData.access_token;
    }
    //A method to get a user's spotify playist given a link using an api call
    static async getSpotifyPlayList(spotifyPlayList){
        try {
            //splits the link
            let spotifyLink = spotifyPlayList;         
            let splittedLink = spotifyLink.split("/");
            let playlistID = splittedLink[splittedLink.length - 1];
            let token = await this.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
            });
            let playlistData = await response.json();
            let playlist = playlistData.tracks.items.map((i)=>[i.track.name, i.added_at]); //We only want the track name and when it was added to the playlist
            return playlist;
        } catch (error) {
            console.log(error);
        }
    }
    //A method to only get the song frequencies that are in a given playlist
    static async getPlaylistFrequency(playlist, totalTrackList){
        for(const index in playlist){
            //Only add it to the playlist if it is included
            if(Object.keys(totalTrackList).includes(playlist[index][0])){
                //Gives the song name, the date added, and its frequency
                playlist[index] = [playlist[index][0], new Date(`${playlist[index][1]}`), totalTrackList[playlist[index][0]]]; 
            }
        }
        return playlist;
    }
    //A method to remove the half most recent additions to a playlist
    static async removeRecentAdditions(playlist){
        //Sort by date
        const songSorter = (a, b) => {
          return b[1] - a[1];
        };
        playlist.sort(songSorter);
        for(let i = 0; i < (playlist.length / 2); i++){
            playlist.shift();
        }
        return playlist;
    }
    //A method to sort by a song's frequency, by ascending order
    static async sortByFrequency(playlist){
        const songSorter = (a, b) => {
          return a[2] - b[2];
        };
        playlist.sort(songSorter);
        return playlist;
    }
    //A method to sort by a song's frequency by descending order
    static async sortByMostFrequency(playlist){
        const songSorter = (a, b) => {
          return b[2] - a[2];
        };
        playlist.sort(songSorter);
        return playlist;
    }
    //A method to give suggestions. Only want to give the first set of songs.
    static async getSuggestions(playlist) {
        let leastPlayed = playlist.slice(0, playlist.length / 4);
        return leastPlayed;
    }  
    //A method to get the all time tracks, and the spotify playlist associated
    static async getAllTimeLists(lastfmUserName, spotifyPlayListLink){
        try {
            let spotifyPlayList = await this.getSpotifyPlayList(spotifyPlayListLink);
            let songFrequency = await this.getAllTimeSongFrequency(lastfmUserName);
            return [spotifyPlayList, songFrequency]; //Return in order of spotify, then lastfm tracks
        } catch (error) {
            console.log(error);
        }

    }
    //A method to get the past month tracks with a spotify list associated
    static async getPastMonthLists(lastfmUserName, spotifyPlayListLink){
        try {
            let spotifyPlayList = await this.getSpotifyPlayList(spotifyPlayListLink);
            let songFrequency = await this.getPastMonthSongFrequency(lastfmUserName);
            return [spotifyPlayList, songFrequency]; //Return in order of spotify, then lastfm tracks
        } catch (error) {
            console.log(error);
        }

    }
    //A method to sort a playlist track by when it was added, most recent to oldest
    static async sortByLatestAddition(playlist){
        const songSorter = (a, b) => {
          return a[1] - b[1];
        };
        playlist.sort(songSorter);
        return playlist;
    }
    //A method to sort a playlist track by when it was added, oldest to most recent
    static async removeLatestAddition(playlist) {
        const songSorter = (a, b) => {
            return a[1] - b[1];
        };
        playlist.sort(songSorter);
        for(let i = 0; i < (playlist.length / 2); i++){
            playlist.shift();
        }
        return playlist;
    }
    //A method to give edit out suggestions for the oldest songs in the playlist, based on what is least listened to all time
    static async editOutOld(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeRecentAdditions(playlist);
        playlist = await this.sortByFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the most recent songs in the playlist, based on what is least listened to all time
    static async editOutRecent(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeLatestAddition(playlist);
        playlist = await this.sortByFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the oldest songs in the playlist, based on what is least listened to in the past month
    static async oneEditOutOld(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeRecentAdditions(playlist);
        playlist = await this.sortByFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the most recently added songs in the playlist, based on what is least listened to in the past month
    static async oneEditOutRecent(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeLatestAddition(playlist);
        playlist = await this.sortByFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the oldest songs in the playlist based on what is most listened to all time
    static async mostEditOutOld(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeRecentAdditions(playlist);
        playlist = await this.sortByMostFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the most recently added songs in the playlist based on what is most listened to all time
    static async mostEditOutRecent(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeLatestAddition(playlist);
        playlist = await this.sortByMostFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the oldest songs in the playlist based on what is most listened in the past month
    static async mostOneEditOutOld(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeRecentAdditions(playlist);
        playlist = await this.sortByMostFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
    //A method to give edit out suggestions for the most recently added songs in the playlist based on what is most listened to in the past month
    static async mostOneEditOutRecent(lists){
        let spotifyPlayList = lists[0];
        let lastfm = lists[1];
        let playlist = await this.getPlaylistFrequency(spotifyPlayList, lastfm);
        playlist = await this.removeLatestAddition(playlist);
        playlist = await this.sortByMostFrequency(playlist);
        playlist = await this.getSuggestions(playlist);
        return playlist;
    }
}

export default LastFMService;