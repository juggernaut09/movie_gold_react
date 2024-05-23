import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Header } from './components/header/Header';
import { Trailer } from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const [reviewTexts, setReviewTexts] = useState();

  const getMovies = async () => {

    try {

      const response = await axios.get("http://localhost:8080/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);

    } catch (err) {
      console.log(err);
    }
    
  }
  
  const getMovieData = async(movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      console.log("singleMovie.reviews", singleMovie.reviewIds);
      setReviews(singleMovie.reviewIds);

      const response2 = await axios.get(`http://localhost:8080/api/v1/reviews/details/${movieId}`);
      setReviewTexts(response2.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])
 
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element = {<Layout/>}>
          <Route path="/" element = {<Home movies = {movies}/>}/></Route>
          <Route path="/Trailer/:ytTrailerId" element = {<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element= {<Reviews getMovieData={getMovieData} movie = {movie} reviews={reviews} reviewTexts={reviewTexts} setReviews={setReviews}/>}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
