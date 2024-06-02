import React, {useState} from 'react';
import './MyPage.style.css'; // CSS 파일을 가져옵니다.
// import { useMovieStore } from '../../store/movieStore';
import {Modal, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useMovieStore } from '../../store/movieStore';

const MyPage = () => {
	const {user} = useMovieStore()
//   const {title, seatList} = useMovieStore()
	const title = localStorage.getItem('title')
	const seat = localStorage.getItem('seat')
	const image = localStorage.getItem('image')

	console.log('user : ', user)
 
	function moveToHM(){
		// const url = `https://hm-shopping-full3.netlify.app`;
		// REACT_APP_PROXY=https://eloquent-pastelito-120fb6.netlify.app
		const movie ={title:title, seat:seat, image:image}
		const movieInfo = encodeURIComponent(JSON.stringify(movie));
		// const url =`https://hm-shopping-full3.netlify.app/gotoshopping?info=${movieInfo}`
		const url =`${process.env.REACT_APP_PROXY}/gotoshopping?info=${movieInfo}`
		window.location.href = url;
	}

  return (
	<div>
		<div className="mypage-body" style={{}}>
			<h1 style={{marginBottom:'20px'}}>MyPage</h1>
			<h3 style={{fontWeight:'bold', marginBottom:'20px'}}>유저 : {user?.name}</h3>
			<h3 style={{fontWeight:'bold', marginBottom:'20px'}}>이메일 : {user?.email}</h3>
			<div style={{display:'flex', gap:'20px'}}>
				<img src={image} width="400px" alt=''/>
				<div>
					<h3 style={{fontWeight:'bold', marginBottom:'20px'}}>제목 : {title}</h3>
					<h3>예약 좌석</h3>
					<div style={{borderBottom: '2px solid gray', width: '400px', marginBottom: '10px' }}></div>
					<div>{seat}</div>
					<Button style={{margin:'20px'}} onClick={moveToHM}>hm-shopping으로 이동</Button>
				</div>
			</div>
			
			
		</div>
		<div style={{height:'20px'}}></div>
		
	</div>
  )
}

export default MyPage