import React, {useState,useEffect} from 'react'
import { useSearchParams} from 'react-router-dom'
import { useMovieStore } from '../../store/movieStore'
import { useSearchMovies } from '../../hooks/useSearchMovies'
import { Alert } from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

// 여기로 오는 경로 2가지
// navbar 링크를 통해 온 경우 ==> popularMovies를 보여준다.
// keyword를 통해서 온 경우 => keyword관련 영화들을 보여준다.

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams()
  const keyword = query.get('q')
  console.log('keyword :', keyword)
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([])
  const {movieList, setMovieList} = useMovieStore();

  const {data, isLoading, isError, error} = useSearchMovies({keyword, page})
  console.log('searched data :', data)

  const handlePageClick=({selected})=>{
    setPage(selected +1)
  }

  useEffect(()=>{
    if(data){
      setMovies(data.results)
      setMovieList(data.results)
    }
  },[data])

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <Alert variant="danger">{error.message}</Alert>
  }
  return (
    <Container style={{color:'white'}}>
      <Row>
        <Col lg={4} xs={12}>
          {/* <SortDropdown setMovies={setMovies}/>
          <FilterDropdown 
            setYearStart={setYearStart}
            setYearEnd={setYearEnd}
            setScoreStart={setScoreStart}
            setScoreEnd={setScoreEnd}
            />
          <GenreDropdown setMovies={setMovies}/> */}
        </Col>
        <Col lg={8} xs={12}>
          <Row>  
            {movies.map((movie, index)=>
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            )}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data.total_pages}  //데이터의 토탈페이지
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page-1}
          />
        </Col> 
      </Row>
    </Container>
  )
}

export default MoviesPage