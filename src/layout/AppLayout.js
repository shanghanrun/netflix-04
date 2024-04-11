import React, { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import {Outlet} from 'react-router-dom'
import './AppLayout.style.css'

const AppLayout = () => {
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
					<img src="./netflix.webp" width={150} height={60} alt="로고" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll"/>
				<Navbar.Collapse  id="navbarScroll" >
					<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: '100px' }}
					navbarScroll
					>
						<Nav.Link className="home" href="/">Home</Nav.Link>
						<Nav.Link className="movies" href="/movies">Movies</Nav.Link>
						<Nav.Link className="choice" href="/choice">Choice</Nav.Link>
						<Nav.Link className="reserve" href="/reserve">Reserve</Nav.Link>
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