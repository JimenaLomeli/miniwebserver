
const credentials = require('./credentials.js')
const request = require('request')

const omdbMovie = function(title, callback) {
	const url = 'http://www.omdbapi.com/?apikey=' + credentials.apikey + 
				'&t=' + title 

	console.log(url)
	request({ url, json: true }, function(error, response) {
		if(error) {
			callback('Unable to connect to OMDB service', undefined)
		} else { 
			const data = response.body
			if(data.Response == 'False') {
			callback(data.Error, undefined)
			} else {

			 	const info = {
					title : data.Title,
					plot : data.Plot,
					//rating : data.Ratings[0].Value,
					rating : data.imdbRating,
					seasons : data.totalSeasons
				}
				callback(undefined, info)
			}
		}
	})
} 

const omdbSeason = function(title, season, callback) {
	const url = 'http://www.omdbapi.com/?apikey=' + credentials.apikey + 
				'&t=' + title + '&Season=' + season
	request({url, json: true}, function(error, response){
		if(error) {
			callback('Unable to connect to OMDB service', undefined)
		} else {
			const data = response.body
			const info = {
				season : season,
				episodes : []
			}
			for( i in data.Episodes ) {
				info.episodes.push( data.Episodes[i].Title)
			}
			callback(undefined,info)
		}

	})
}

module.exports = {
	omdbMovie : omdbMovie,
	omdbSeason : omdbSeason
}
