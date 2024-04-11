import React, { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import {Outlet} from 'react-router-dom'
import './AppLayout.style.css'
import { useMovieStore } from '../store/movieStore';

const MyNavLink = ({ to, state, children }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to, { state });
  };

  return (
    <Nav.Link className="nav-link mypage" href={to} onClick={handleClick}>
      {children}
    </Nav.Link>
  );
};

const AppLayout = () => {
	const {title, seatList} = useMovieStore()
	const formRef = useRef()
	const navigate = useNavigate()
	const searchByKeyword=(e)=>{
		e.preventDefault()
		// keyword로 url 바꿔주기
		const formData = new FormData(formRef.current)
		const keyword = formData.get('keyword')
		console.log('gotten keyword : ', keyword)
		navigate(`/movies?q=${keyword}`)
		// 폼 초기화
		formRef.current.reset();
	}

  return (
	<div style={{background: 'black', color:'white'}}>
		<Navbar  expand="lg" >
			<Container fluid>
				<Navbar.Brand href="/">
					<img src="netflix.png" width={150} height={40} alt="로고" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll"/>
				<Navbar.Collapse  id="navbarScroll" >
					<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: '100px' }}
					navbarScroll
					>
						{/* <Nav.Link className="home" href="/">Home</Nav.Link>  */}
						<MyNavLink to="/" state={{ title, seatList }}>Home</MyNavLink>
						<Nav.Link className="movies" href="/movies">Movies</Nav.Link>
						{/* <Nav.Link className="time" href="/time">Time</Nav.Link> */}
						<Nav.Link className="choice" href="/choice">Choice</Nav.Link>
						<Nav.Link className="reserve" href="/reserve">Reserve</Nav.Link>
						<MyNavLink to="/mypage" state={{ title, seatList }}>MyPage</MyNavLink>
					</Nav>
					<Form ref={formRef} className="d-flex" 
						onSubmit={searchByKeyword}>
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							name="keyword"
						/>
						<Button variant="danger" type="submit">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<Outlet/>
	</div>
  )
}

export default AppLayout