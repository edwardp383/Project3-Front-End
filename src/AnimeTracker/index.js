import React, { Component } from 'react';

class AnimeTracker extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			img: "",
			synopsis: "",
			episodes:[],
			episodesWatched:[]
		}
	}
	componentDidMount() {
		this.getAnime()
	}
	getAnime = async () => {
	    try{
	      	const animeResponse = await fetch(process.env.REACT_APP_BACK_URL + `/api/v1/anime/${this.props.animeId}`);
	      	
	      	if(animeResponse.status !== 200){
	        	throw Error(animeResponse.statusText);
	      	}

	      	const anime = await animeResponse.json();
	      	this.setState({
	        	title: anime.data.title,
	        	img: anime.data.img,
	        	synopsis: anime.data.synopsis,
	        	episodes: anime.data.episodes,
	        	episodesWatched: anime.data.episodesWatched
	      	})

	    }catch(err){
	      console.log('there was an error -- see below');
	      console.log(err);
	    }
  	}
	render() {
		console.log(this.state);
		const episodes = this.state.episodes;
		const episodeList = episodes.map((episode, i) => {
			return(
				<div key={i}>
					<p> {this.state.title} episode {episode}</p>
					<form>
						<input type="checkbox" name={i} />
					</form>
				</div>
			)
		})
		return (
			<div>
				<h1>{this.state.title}</h1>
				<img src={this.state.img} />
				<p>{this.state.synopsis}</p>
				{episodeList}
				<button onClick={this.saveAnime} >Save</button>
			</div>
		);
	}
}
export default AnimeTracker