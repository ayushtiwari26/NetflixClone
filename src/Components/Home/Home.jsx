import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "00e2c55206afb9131a87c7ed86979b51";

const url = "https://api.themoviedb.org/3";

const upComing = "upcoming";
const nowPlaying = "now_playing";

const popular = "popular";
const topRated = "top_rated";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({
  title,
  arr = [
    {
      img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F04%2Few1558-ae_854htid5do8g9jd4-2000.jpg&q=60",
    },
  ],
}) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upComingMovies, setupComingMovies] = useState([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topRatedMovies, settopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upComing}?api_key=${apiKey}`);
      setupComingMovies(results);
    };
    const fetchnowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setnowPlayingMovies(results);
    };
    const fetchpopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setpopularMovies(results);
    };
    const fetchtopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      settopRatedMovies(results);
    };
    fetchtopRated();
    fetchUpcoming();
    fetchnowPlaying();
    fetchpopular();
  }, []);
  return (
    <section className="Home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
            <button>Play <BiPlay/></button>
            <button>My List <AiOutlinePlus/></button>
        </div>
        
      </div>

      <Row title={"Upcoming Movies"} arr={upComingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="footer">Made By Ayush</div>
    </section>
  );
};

export default Home;
