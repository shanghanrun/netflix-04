import {create} from 'zustand'

export const useMovieStore = create((set)=>({
	movieList: [],
	setMovieList: (val)=>
		set((state)=> ({
			movieList: [...state.movieList, ...val]}))
}))