import React, { Component } from 'react';


class AnimeResults extends Component {
  constructor() {
    super();
    this.state = {
      showId: null
    }
  }
  // revealShow = (e) => {

  //   console.log(e.currentTarget.id)

  //   this.setState({
  //     showId: e.currentTarget.id
  //   });

  // }
	render() {
    const anime = this.props.anime;
    const animelist = anime.map((anime, i) => {
      console.log();
      return(
        <div key={i}>
          <img src={anime.attributes.posterImage.tiny}/>
          <p> {anime.attributes.canonicalTitle} </p>
        </div>
      )
    })
		return (
			<div>
        {animelist}
      </div>
		);
	}
}

export default AnimeResults