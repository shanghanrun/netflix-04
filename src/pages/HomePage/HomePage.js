import React, {useEffect} from 'react'
import Banner from './components/Banner/Banner'
import PopularMoviesSlider from './components/PopularMoviesSlider/PopularMoviesSlider'
import TopRatedMoviesSlider from './components/TopRatedMoviesSlider/TopRatedMoviesSlider'
import UpcomingMoviesSlider from './components/UpcomingMoviesSlider/UpcomingMoviesSlider'
import axios from 'axios'

//1.배너 => popular movie를 들고와서 첫번째 아이템을 보여주자.
//2. popular movie
//3. top rated movie
//4. upcoming movie
const HomePage = () => {

  useEffect(()=>{
    // URL에서 토큰을 추출하는 함수
    function getTokenFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get('token');
    }

    const token = getTokenFromUrl();
    if (token) {
      // 로컬 스토리지 또는 세션 스토리지에 토큰을 저장
      localStorage.setItem('token', token);
      // token에서 유저 id, name, email얻기
      // 백엔드에 토큰 검증 요청 보내기
      axios.get(`/api/user/verify-token?token=${token}`)
        .then(response => {
          const { id, name, email } = response.data;
          // 사용자 정보를 로컬 스토리지에 저장
          localStorage.setItem('user', JSON.stringify({ id, name, email }));
          //혹은 userStore를 만들어서 관리
        })
        .catch(error => {
          console.error('Error verifying token:', error);
        });
      

    }
  },[])

  return (
	<div>
	{/* <div style={{color: "white"}}> */}
    <Banner />
    <PopularMoviesSlider/>
    <TopRatedMoviesSlider />
    <UpcomingMoviesSlider />
  </div>
  )
}

export default HomePage