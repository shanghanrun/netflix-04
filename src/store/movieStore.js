import {create} from 'zustand'

export const useMovieStore = create((set)=>({
	movieList: [],
	index:-1,
	title:'',
	seatList:[],
	user:{},
	setUser:(val)=>set({user: val}),
	setMovieList: (val)=>
		set((state)=> ({
			movieList: [...state.movieList, ...val]})),
	setIndex:(val) =>set((state)=>({index: val})),
	setTitle:(val) =>set((state)=>({title: val})),
	setSeatList:(val)=>set((state)=>({seatList: val}))
}))