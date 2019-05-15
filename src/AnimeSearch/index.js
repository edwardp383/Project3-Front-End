// import React, { Component } from 'react';

// class AnimeSearch extends Component {
// 	getMovies = async () => {

//     try {
//       const response = await fetch('http://localhost:9000/api/v1/movies');

//       if(response.status !== 200){
//         // for http errors, Fetch doesn't reject the promise on 404 or 500
//         throw Error(response.statusText);
//       }

//       const moviesParsed = await response.json();
//       // after setState render is automatically called

//       this.setState({movies: moviesParsed.data});

//     } catch (err){
//       console.log(err);
//     }
//   }
// 	render() {
// 		return (
// 			<div></div>
// 		);
// 	}
// }

// export default AnimeSearch