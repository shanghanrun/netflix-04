import React from 'react'
import {Alert, Container} from 'react-bootstrap'
import MovieCard from '../../../common/MovieCard/MovieCard';
import { useSimilarMovies } from '../../../hooks/useSimilarMovies';


const SimilarMovies = ({id}) => {
	const {data,isLoading, isError,error} = useSimilarMovies({id});
  	console.log('similar movies :', data);

  	if(isLoading){
	return <h1>Loading...</h1>
	}
	if(isError){
		return <Alert vairant="danger">{error.message}</Alert>
	}

  return (
	<Container className="d-flex justify-content-center flex-wrap gap-2"> 
		{data.results.map((movie, index)=>
			<MovieCard movie={movie} key={index} />
		)}
	</Container>
  )
}

export default SimilarMovies