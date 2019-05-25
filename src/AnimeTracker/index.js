import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
  	handleChange = (e) => {
  		let episodesWatched = this.state.episodesWatched;
  		if (episodesWatched[e.target.name] == false) {

  			episodesWatched[e.target.name] = true;

  		} else if(episodesWatched[e.target.name]) {

  			episodesWatched[e.target.name] = false;

  		}
 		this.setState({
 			episodesWatched: episodesWatched
 		})
  		console.log(this.state.episodesWatched);
  	}
  	saveAnime = async (e) => {
		try{
			e.preventDefault()
			const saveResponse = await fetch(process.env.REACT_APP_BACK_URL + `/api/v1/anime/${this.props.animeId}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

		} catch(err) {
			console.log(err);
		}
  	}
  	deleteAnime = async (e) => {
		try{
			console.log("delete hit");
			e.preventDefault()
			const deleteResponse = await fetch(process.env.REACT_APP_BACK_URL + `/api/v1/anime/${this.props.animeId}`, {
				method: 'DELETE',
          		credentials: 'include',
          		headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await deleteResponse.json();
			console.log(parsedResponse.data);
			if (parsedResponse.data == "Anime Deleted") {
				this.props.history.push("/animesearch")
			}
		} catch(err) {
			console.log(err);
		}
  	}
	render() {
		console.log(this.state);
		const episodes = this.state.episodes;
		const episodeList = episodes.map((episode, i) => {
			if (this.state.episodesWatched[i] == false) {
				return(
					<div className="EpChecks" key={i}>
						<p> {this.state.title} episode {episode}</p>
						<input type="checkbox" name={i} onChange={ this.handleChange } /><br/>
					</div>
				)
			} else if (this.state.episodesWatched[i]) {
				return(
					<div className="EpChecks" key={i}>
						<p> {this.state.title} episode {episode}</p>
						<input type="checkbox" name={i} onChange={ this.handleChange } checked="checked"/><br/>
					</div>
				)
			}
		})

		return (
			<div>
				<h1>{this.state.title}</h1>
				<img src={this.state.img} />
				<p>{this.state.synopsis}</p>
				<form onSubmit={this.deleteAnime}>
					<button>Remove Anime</button>
				</form>
				<div>
					<div>
						<form onSubmit={ this.saveAnime }>
							{episodeList}
							<button>Save</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(AnimeTracker)