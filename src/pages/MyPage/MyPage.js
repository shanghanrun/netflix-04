import React from 'react';
import './MyPage.style.css'; // CSS 파일을 가져옵니다.
import { useMovieStore } from '../../store/movieStore';
import {Modal, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const MyPage = () => {

  const {title, seatList} = useMovieStore()
  const navigate = useNavigate()
  function handleCloseModal() {
	navigate('/')
  }

  return (
	<div>MyPage
		<Modal show={true} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>영화 좌석예약</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <h3 style={{fontWeight:'bold'}}>제목 : {title}</h3>
                  <h3>예약 좌석</h3>
                  <div style={{borderBottom: '2px solid gray', width: '400px', marginBottom: '10px' }}></div>
                  <div>[ {seatList.join(', ')} ]</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        확인
                    </Button>
                </Modal.Footer>
        </Modal>
	</div>
  )
}

export default MyPage