import React, {useState} from 'react'
import {Modal, Button,Alert} from 'react-bootstrap'
import { useVideo } from '../../../hooks/useVideo'
import YouTube from 'react-youtube';

const Video = ({id}) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (videoKey) => {
        setSelectedVideo(videoKey);
        setShowModal(true);
    };
	const opts = {
      height: '410',
    //   width: '760',
		// height: '100%',
		width: '100%',
      	playerVars: {
        	autoplay: 1,
      	},
	  	// origin: window.location.origin,
    };
	function _onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}

	const {data, isLoading, isError, error}= useVideo({id});
	if(isLoading){
		return <h1>Loading...</h1>
	}
	if(isError){
		return <Alert vairant="danger">{error.message}</Alert>
	}
	console.log('data.results : ', data?.results)
	// console.log('key :', data?.results[0].key)
	return (
        <div>
			{/* 비디오 결과가 존재하고 그 길이가 0보다 클 때 버튼을 렌더링합니다. */}
            {data.results.length>0 && data.results.map((item, index) => (
                <Button key={index} variant="primary" 
					onClick={() => handleShowModal(item.key)}
					style={{marginRight: '5px', marginBottom:'5px'}}
				>
                    예고편 {index + 1} 보기
                </Button>
            ))}
            
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>예고편</Modal.Title>
                </Modal.Header>

                <Modal.Body>
					{/* 선택된 비디오가 존재할 때만 YouTube 비디오를 표시합니다. */}
                    {data.results.length>0 && <YouTube videoId={selectedVideo} opts={opts} 
					onReady={_onReady} />}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Video