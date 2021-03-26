var CLIENTID = "bakC8pUGqob1xs0TNSU0ioSUUJi7llMdgg3eNJqCX-OIL8uh6u9PebzwfzYQ7qS_";
var CLIENTSECRET = "RlaEuibZVK7gOW8xSBYfhxc35Ev68dPAx2vt8StFaIlyLF3HIpc5xQwY1VfnitxLRox0OGbmODRU0MapAnZNyQ";
var accessToken = "?access_token=tv9KFPyz0q7p8zNCnO4bGyCpkOVSPKbdUUVZ_CExf3VgfDnWVTbq7C_oslUsPfpo";
var API = "https://api.genius.com/search";
var APISong = "https://api.genius.com/songs/";
var songID = "2471960";
var maxSong = 2471960;
//Max song is 489579 ;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var xhr = new XMLHttpRequest(); //XML HTTP Request
xhr.onload = function() {
    
        if (xhr.status === 200 || xhr.status === 304) {
            // Success! Do stuff with data.
            //console.log(xhr.responseText); 
        }
    
};



xhr.open("GET", APISong + songID + accessToken, false);


xhr.send();
//console.log(xhr.status);
console.log(xhr.statusText);
geniusData = xhr.response;

var json = JSON.parse(geniusData);
var song = json['response']['song'];




function randomSong() {
    xhr.open("GET", APISong + songID + accessToken, false);
    xhr.send();
    geniusData = xhr.response;

    while (xhr.status === 404) { //Checks if the Random Song Exists
        songID = getRandomInt(1, maxSong);
        xhr.open("GET", APISong + songID + accessToken, false);
        xhr.send();
        geniusData = xhr.response;
    }
}





function newRandomSong() {
    songID = getRandomInt(1, maxSong);
    randomSong();

      json = JSON.parse(geniusData);
    song = json['response']['song'];
    document.getElementById("songImage").innerHTML = "<img src=\"" + song['song_art_image_url'] + "\"alt=\"Cover-art\" style=\"width:100%; height:100%;\">";

    document.getElementById("song").innerHTML = "SONG: <a target=\"_blank\" href=" + song['url'] + " >" + song['title'].toUpperCase() + "</a>";

    document.getElementById("artist").innerHTML = "ARTIST: <a target=\"_blank\"  href=" + song['primary_artist']['url'] + ">" + song['primary_artist']['name'].toUpperCase() + "</a>";
    document.getElementById("releaseDate").innerHTML = "RELEASE DATE: " + song['release_date'];
}







//RANDOM SONG EACH LOAD // 
$(document).ready(function() {
            newRandomSong(); 
});