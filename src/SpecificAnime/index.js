import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SpecificAnime extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			img: "",
			synopsis: "",
			episodes:[],
			episodesWatched:[],
			userId: ""
		}
	}
	componentDidMount(){
    	this.getAnime();
    	this.setState({
    		userId: this.props.userId
    	})
  	}
	getAnime = async () => {
	    try{
	      const animeResponse = await fetch(`https://kitsu.io/api/edge/anime/${this.props.id}`);
	      const anime = await animeResponse.json();
	      const episodes = [];
	      const episodesWatched = [];
	      for (let i = 1; i <= anime.data.attributes.episodeCount; i++) {
	      	episodes.push(i);
	      	episodesWatched.push(false)
	      }
	      console.log(episodes);
	      this.setState({
	        title: anime.data.attributes.canonicalTitle,
	        img: anime.data.attributes.posterImage.small,
	        synopsis: anime.data.attributes.synopsis,
	        episodes: episodes,
	        episodesWatched: episodesWatched
	      })

	    }catch(err){
	      console.log('there was an error -- see below');
	      console.log(err);
	    }
  	}
  	saveAnime = async (e) => {
		e.preventDefault();
		console.log(this.state);
		try{

			const saveResponse = await fetch(process.env.REACT_APP_BACK_URL + '/api/v1/anime', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedResponse = await saveResponse.json();

			if (parsedResponse.data === 'Anime Saved') {
				this.props.history.push('/MyAnime')
			}


		} catch(err) {
			console.log(err);
		}
	}
  	
	render() {
		const episodes = this.state.episodes;
		const episodeList = episodes.map((episode, i) => {
			return(
					<p key={i}> {this.state.title} episode {episode}</p>
			)
		})
		return (
			<div>
				<h1>{this.state.title}</h1>
				<img src={this.state.img} />
				<p>{this.state.synopsis}</p>
				<button onClick={this.saveAnime} >Save</button>
				{episodeList}
			</div>
		);
	}
}

export default withRouter(SpecificAnime)