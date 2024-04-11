import React, {useState} from 'react';
import './MyPage.style.css'; // CSS 파일을 가져옵니다.
import { useMovieStore } from '../../store/movieStore';
import {Modal, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const MyPage = () => {
  const {title, seatList} = useMovieStore()
 

  return (
	<div>
		<div className="mypage-body" style={{ height:"50vh"}}>
			<h1 style={{marginBottom:'20px'}}>MyPage</h1>
			<h3 style={{fontWeight:'bold', 								marginBottom:'20px'}}>제목 : {title}</h3>
			<h3>예약 좌석</h3>
			<div style={{borderBottom: '2px solid gray', width: '400px', marginBottom: '10px' }}></div>
			<div>[ {seatList.join(', ')} ]</div>
			
		</div>
		<div style={{height:'20px'}}></div>
	</div>
  )
}

export default MyPage