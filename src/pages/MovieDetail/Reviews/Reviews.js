import React from 'react'
import {Alert, Container} from 'react-bootstrap'
import { useReviews } from '../../../hooks/useReviews';


const Reviews = ({id}) => {
	const {data,isLoading, isError,error} = useReviews({id});
  	console.log('Reviews :', data);

  	if(isLoading){
	return <h1>Loading...</h1>
	}
	if(isError){
		return <Alert vairant="danger">{error.message}</Alert>
	}

  return (
	<Container className="review"> 
		{data.results.map((item, index)=>
			(<div key={index}>
				<div>{item.author}</div>
				<div>{item.content}</div>
				<div>{item.created_at}</div>
			</div>)
		)}
	</Container>
  )
}

export default Reviews;