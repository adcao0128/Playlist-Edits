(function(){var t={86:function(t){t.exports={lastfm:function(){return"8d73052660775037569a3245833ebc65"},clientID:function(){return"4ea73fc2416a4e8fbf73786f34b2aa2d"},getSecret:function(){return"b5b42f4e81b342d0907595017f2319fb"}}},5329:function(t,e,n){"use strict";var i=n(9242),s=n(3396);function l(t,e,n,i,l,a){const o=(0,s.up)("LoginServices");return(0,s.wg)(),(0,s.j4)(o)}var a=n(7139);const o={class:"row center"},r=(0,s._)("label",{for:"lastfmAccount"},"LastFM Account: ",-1),c=(0,s._)("br",null,null,-1),u=(0,s._)("br",null,null,-1),d=(0,s._)("br",null,null,-1),y={class:"row center"},g=(0,s._)("label",{for:"spotifyPlaylistLink"},"Spotify Playlist Link: ",-1),h=(0,s._)("br",null,null,-1),m=(0,s._)("br",null,null,-1),w=(0,s._)("br",null,null,-1),f={class:"row center"},p=(0,s._)("br",null,null,-1),k={class:"row"},v=(0,s._)("h1",null,"Least Played in Past Month",-1),b={class:"column left",style:{"background-color":"#aaa"}},_=(0,s._)("h2",null,"Oldest Songs in your Playlist",-1),O=(0,s._)("br",null,null,-1),P={class:"column right",style:{"background-color":"#bbb"}},A=(0,s._)("h2",null,"Recently Added Songs in your Playlist",-1),S=(0,s._)("br",null,null,-1),E={class:"row"},T=(0,s._)("h1",null,"Leasted Played All-Time",-1),L={class:"column left",style:{"background-color":"#aaa"}},R=(0,s._)("h2",null,"Oldest Songs in Your Playlist",-1),F=(0,s._)("br",null,null,-1),U={class:"column right",style:{"background-color":"#bbb"}},$=(0,s._)("h2",null,"Recently Added Songs in your Playlist",-1),D=(0,s._)("br",null,null,-1),q={class:"row"},M=(0,s._)("h1",null,"Most Played in Past Month",-1),z={class:"column left",style:{"background-color":"#aaa"}},j=(0,s._)("h2",null,"Oldest Songs in Your Playlist",-1),B=(0,s._)("br",null,null,-1),x={class:"column right",style:{"background-color":"#bbb"}},C=(0,s._)("h2",null,"Recently Added Songs in your Playlist",-1),Y=(0,s._)("br",null,null,-1),H={class:"row"},K=(0,s._)("h1",null,"Most Played All-Time",-1),N={class:"column left",style:{"background-color":"#aaa"}},I=(0,s._)("h2",null,"Oldest Songs in Your Playlist",-1),G=(0,s._)("br",null,null,-1),V={class:"column right",style:{"background-color":"#bbb"}},W=(0,s._)("h2",null,"Recently Added Songs in your Playlist",-1),Z=(0,s._)("br",null,null,-1);function J(t,e,n,l,J,Q){return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("div",null,[(0,s._)("div",o,[r,c,(0,s.wy)((0,s._)("input",{type:"text",id:"lastfmAccount",name:"lastfmAccount","onUpdate:modelValue":e[0]||(e[0]=t=>J.lastfmUsername=t)},null,512),[[i.nr,J.lastfmUsername]]),u]),d,(0,s._)("div",y,[g,h,(0,s.wy)((0,s._)("input",{class:"increaseWidth",type:"text",id:"spotifyPlaylistLink",name:"spotifyPlaylistLink","onUpdate:modelValue":e[1]||(e[1]=t=>J.spotifyPlaylistLink=t)},null,512),[[i.nr,J.spotifyPlaylistLink]]),m]),w,(0,s._)("div",f,[(0,s._)("button",{class:"increaseSize",onClick:e[2]||(e[2]=(...t)=>Q.track&&Q.track(...t))},"Submit"),(0,s.Uk)(),p])]),(0,s._)("div",k,[v,(0,s._)("div",b,[_,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.oneEditOld,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),O,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))]),(0,s._)("div",P,[A,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.oneEditRecent,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),S,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))])]),(0,s._)("div",E,[T,(0,s._)("div",L,[R,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.allTimeEditOld,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),F,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))]),(0,s._)("div",U,[$,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.allTimeEditRecent,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),D,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))])]),(0,s._)("div",q,[M,(0,s._)("div",z,[j,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.mostOneEditOld,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),B,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))]),(0,s._)("div",x,[C,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.mostOneEditRecent,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),Y,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))])]),(0,s._)("div",H,[K,(0,s._)("div",N,[I,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.mostAllTimeEditOld,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),G,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))]),(0,s._)("div",V,[W,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(J.mostAllTimeEditRecent,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s._)("p",null,[(0,s.Uk)((0,a.zw)(`Song Name: ${t[0]}`),1),Z,(0,s.Uk)(" "+(0,a.zw)(`Amount Played: ${t[2]}`),1)])])))),128))])])])}n(2801),n(1295);var Q=n(3022),X=n.n(Q);const tt="http://ws.audioscrobbler.com/2.0?",et=n(86).lastfm(),nt=n(86).clientID(),it=n(86).getSecret(),st=n(5361).lW;class lt{static async getAllTracks(t){try{let e=1,n=1,i=[];while(e<=n){const s=await X().ajax({url:tt,data:{method:"user.getrecenttracks",limit:"200",user:`${t}`,page:`${e}`,api_key:et,format:"json"}});i=i.concat(s.recenttracks.track),n=parseInt(s.recenttracks["@attr"].totalPages),e++,setTimeout((()=>{console.log(e)}),250)}return i}catch(e){console.log(e)}}static async getAllPastMonthTracks(t){try{let e=new Date,n=new Date;n.setMonth(e.getMonth()-1);let i=Math.floor(n.getTime()/1e3),s=1,l=1,a=[];while(s<=l){const e=await X().ajax({url:tt,data:{method:"user.getrecenttracks",limit:"200",user:`${t}`,page:`${s}`,from:`${i}`,api_key:et,format:"json"}});a=a.concat(e.recenttracks.track),l=parseInt(e.recenttracks["@attr"].totalPages),s++,setTimeout((()=>{console.log(s)}),250)}return a}catch(e){console.log(e)}}static async getAllSongs(t){return t.map((t=>t.name))}static async getPastMonthSongs(t){return t.map((t=>t.name))}static async getAllTimeSongFrequency(t){let e=await this.getAllSongs(await this.getAllTracks(t)),n=[];for(const i of e)n[i]=(n[i]||0)+1;return n}static async getPastMonthSongFrequency(t){let e=await this.getPastMonthSongs(await this.getAllPastMonthTracks(t)),n=[];for(const i of e)n[i]=(n[i]||0)+1;return n}static async getAccessToken(){const t=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic "+st.from(`${nt}:${it}`).toString("base64")},body:"grant_type=client_credentials"}),e=await t.json();return e.access_token}static async getSpotifyPlayList(t){try{let e=t,n=e.split("/"),i=n[n.length-1],s=await this.getAccessToken();const l=await fetch(`https://api.spotify.com/v1/playlists/${i}`,{method:"GET",headers:{Authorization:`Bearer ${s}`}});let a=await l.json(),o=a.tracks.items.map((t=>[t.track.name,t.added_at]));return o}catch(e){console.log(e)}}static async getPlaylistFrequency(t,e){for(const n in t)Object.keys(e).includes(t[n][0])&&(t[n]=[t[n][0],new Date(`${t[n][1]}`),e[t[n][0]]]);return t}static async removeRecentAdditions(t){const e=(t,e)=>e[1]-t[1];t.sort(e);for(let n=0;n<t.length/2;n++)t.shift();return t}static async sortByFrequency(t){const e=(t,e)=>t[2]-e[2];return t.sort(e),t}static async sortByMostFrequency(t){const e=(t,e)=>e[2]-t[2];return t.sort(e),t}static async getSuggestions(t){let e=t.slice(0,t.length/4);return e}static async getAllTimeLists(t,e){try{let n=await this.getSpotifyPlayList(e),i=await this.getAllTimeSongFrequency(t);return[n,i]}catch(n){console.log(n)}}static async getPastMonthLists(t,e){try{let n=await this.getSpotifyPlayList(e),i=await this.getPastMonthSongFrequency(t);return[n,i]}catch(n){console.log(n)}}static async sortByLatestAddition(t){const e=(t,e)=>t[1]-e[1];return t.sort(e),t}static async removeLatestAddition(t){const e=(t,e)=>t[1]-e[1];t.sort(e);for(let n=0;n<t.length/2;n++)t.shift();return t}static async editOutOld(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeRecentAdditions(i),i=await this.sortByFrequency(i),i=await this.getSuggestions(i),i}static async editOutRecent(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeLatestAddition(i),i=await this.sortByFrequency(i),i=await this.getSuggestions(i),i}static async oneEditOutOld(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeRecentAdditions(i),i=await this.sortByFrequency(i),i=await this.getSuggestions(i),i}static async oneEditOutRecent(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeLatestAddition(i),i=await this.sortByFrequency(i),i=await this.getSuggestions(i),i}static async mostEditOutOld(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeRecentAdditions(i),i=await this.sortByMostFrequency(i),i=await this.getSuggestions(i),i}static async mostEditOutRecent(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeLatestAddition(i),i=await this.sortByMostFrequency(i),i=await this.getSuggestions(i),i}static async mostOneEditOutOld(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeRecentAdditions(i),i=await this.sortByMostFrequency(i),i=await this.getSuggestions(i),i}static async mostOneEditOutRecent(t){let e=t[0],n=t[1],i=await this.getPlaylistFrequency(e,n);return i=await this.removeLatestAddition(i),i=await this.sortByMostFrequency(i),i=await this.getSuggestions(i),i}}var at=lt,ot={name:"LoginServices",data(){return{allTimeEditOld:[],allTimeEditRecent:[],oneEditOld:[],oneEditRecent:[],mostAllTimeEditOld:[],mostAllTimeEditRecent:[],mostOneEditOld:[],mostOneEditRecent:[],lastfmUsername:"allan-cao91",spotifyPlaylistLink:"https://open.spotify.com/playlist/5xGyD6yI1owfzvSdo27Pqf?si=e57c581e2cf44dce"}},methods:{resetDeletions(){this.songDeletions=[]},resetAdditions(){this.songAdditions=[]},resetLastFMUsername(){this.lastfmUsername=""},resetSpotifyPlaylistLink(){this.spotifyPlaylistLink=""},async track(){let t=await at.getPastMonthLists(this.lastfmUsername,this.spotifyPlaylistLink),e=await at.getAllTimeLists(this.lastfmUsername,this.spotifyPlaylistLink),n=structuredClone(t),i=structuredClone(t),s=structuredClone(e),l=structuredClone(e),a=structuredClone(t),o=structuredClone(t),r=structuredClone(e),c=structuredClone(e),u=await at.oneEditOutOld(n);this.oneEditOld=u;let d=await at.oneEditOutRecent(i);this.oneEditRecent=d;let y=await at.editOutOld(s);this.allTimeEditOld=y;let g=await at.editOutRecent(l);this.allTimeEditRecent=g;let h=await at.mostOneEditOutOld(a);this.mostOneEditOld=h;let m=await at.mostOneEditOutRecent(o);this.mostOneEditRecent=m;let w=await at.mostEditOutOld(r);this.mostAllTimeEditOld=w;let f=await at.mostEditOutRecent(c);this.mostAllTimeEditRecent=f}}},rt=n(89);const ct=(0,rt.Z)(ot,[["render",J]]);var ut=ct,dt={name:"App",components:{LoginServices:ut}};const yt=(0,rt.Z)(dt,[["render",l]]);var gt=yt;(0,i.ri)(gt).mount("#app")}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var l=e[i]={exports:{}};return t[i].call(l.exports,l,l.exports,n),l.exports}n.m=t,function(){var t=[];n.O=function(e,i,s,l){if(!i){var a=1/0;for(u=0;u<t.length;u++){i=t[u][0],s=t[u][1],l=t[u][2];for(var o=!0,r=0;r<i.length;r++)(!1&l||a>=l)&&Object.keys(n.O).every((function(t){return n.O[t](i[r])}))?i.splice(r--,1):(o=!1,l<a&&(a=l));if(o){t.splice(u--,1);var c=s();void 0!==c&&(e=c)}}return e}l=l||0;for(var u=t.length;u>0&&t[u-1][2]>l;u--)t[u]=t[u-1];t[u]=[i,s,l]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,l,a=i[0],o=i[1],r=i[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(r)var u=r(n)}for(e&&e(i);c<a.length;c++)l=a[c],n.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return n.O(u)},i=self["webpackChunkclient"]=self["webpackChunkclient"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(5329)}));i=n.O(i)})();
//# sourceMappingURL=app.fa436310.js.map