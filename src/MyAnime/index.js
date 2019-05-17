import React, { Component } from 'react';
import AnimeList from '../AnimeList'

class MyAnime extends Component {
	constructor() {
		super();
		this.state = {
			anime: [],
			userId: ""
		}
	}
	componentDidMount(){
		this.getAnime()

	}
  	getAnime = async () => {
	    try {
	      	const response = await fetch(process.env.REACT_APP_BACK_URL + `/api/v1/anime/list/${this.props.userId}`);

	      	if(response.status !== 200){
	        	throw Error(response.statusText);
	      	}

	      	const animeParsed = await response.json();

	      	this.setState({anime: animeParsed.data});

	    } catch (err){
	      	console.log(err);
	    }
  	}
	render() {
		console.log(this.state.anime);
		return (
			<div>
				<h1>My Anime</h1>
				<AnimeList anime={this.state.anime} />
			</div>
		);
	}
}

export default MyAnime