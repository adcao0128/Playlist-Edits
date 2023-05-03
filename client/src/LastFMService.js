const lastfmurl = 'http://ws.audioscrobbler.com/2.0?';
const lastfmkey = require('./config.js').lastfm();
const spotifyID = require('./config.js').clientID();
const spotifySecret = require('./config.js').getSecret();
const buffer = require('buffer/').Buffer;

import $ from "jquery";

async function getAllTracks(user) {
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
}

async function getAllSongs(userTrackList) {
    return userTrackList.map((e)=>e.name);
}
/*
async function getTopSongs(user) {
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
        //return response;    //const spotifykey = require('./config').spotify();
    } catch (error) {
        console.log(error);
    }
}
*/

async function getSongFrequency(user){
    let songList = await getAllSongs(await getAllTracks(user));
    let songFrequency = [];
    for(const song of songList){
        songFrequency[song] = (songFrequency[song] || 0) + 1;
    }
    return songFrequency;
}

async function getAccessToken(){
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
}

async function getSpotifyPlayList(spotifyPlayList){
    try {        
        let spotifyLink = spotifyPlayList;
        let splittedLink = spotifyLink.split("/");
        let playlistID = splittedLink[splittedLink.length - 1];
        const response = await $.ajax({
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`
            }
        });
        let playlist = response.items.map((n)=>n.track.name);
        return playlist;
    } catch (error) {
        console.log(error);
    }
}

class LastFMService {
    static async makeSuggestions(lastfmUserName, spotifyPlayListLink){
        try {
            let spotifyPlayList = await getSpotifyPlayList(spotifyPlayListLink);
            let songFrequency = await getSongFrequency(lastfmUserName);
            return [spotifyPlayList, songFrequency];
        } catch (error) {
            console.log(error);
        }

    }
}

export default LastFMService;