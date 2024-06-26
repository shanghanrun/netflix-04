import {useQuery} from '@tanstack/react-query'
import api from '../utils/api'

const fetchRecommendations =({id})=>{ //똑같은 객체형태로 받으면 잘 받아진다.
	console.log('id : ', id )
	return api.get(`movie/${id}/recommendations`)
}

export const useRecommendations = ({id}) => { 
	return useQuery({
		queryKey:['recommendations', id], 
		queryFn: ()=>fetchRecommendations({id}),
		select: (result)=> result.data,  
		retry:1,
	})
}