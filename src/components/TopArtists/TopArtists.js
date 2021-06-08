import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { artists } from '../../actions';
import moreCowBell from '../../assets/images/artistImages/moreCowBell.png'
import { getTopArtists } from '../../utilities/apiCalls';

const TopArtists = () => {

  const dispatch = useDispatch();

  const [artistCards, setArtistCards] = useState([]);
  // const [artistImages, setArtistImages] = useState([]);

  const location = useSelector(state => state.location);
  const topArtists = useSelector(state => state.topArtists);

  useEffect(() => {
    fetchArtistsData()
  }, []);

  useEffect(() => {
    fetchArtistsData()
  }, [location]);

  useEffect(() => {
    if (topArtists.length > 1) {
      setArtistCards(buildCards(topArtists))
    }
  }, [topArtists]);

  const fetchArtistsData = async () => {
    const apiData = await getTopArtists(location.string);
    if (apiData) {
      const allArtists = apiData.topartists.artist;
      const filtered = filterArtists(allArtists);
      dispatch(artists(filtered));
    }
  }

  // const fetchArtistImage = async (id) => {
  //   const imageObj = await apiCalls.getArtistImagePage(id);
  //   const pageURL = await locateImagePageURL(imageObj);
  //   artistImages.push(pageURL || undefined);
  // }

  // const locateImagePageURL = (imageObj) => {
  //   const imageKeys = Object.keys(imageObj.relations);
  //   let imageURL = '';

  //   imageKeys.forEach(key => {
  //     if (imageObj.relations[key].type === 'image') {
  //       imageURL = imageObj.relations[key].url.resource;
  //     }
  //   });

  //   return imageURL;
  // }

  const filterArtists = (data) => {
    const topArtists = data.reduce((topTen, artistObj) => {
      if (data.indexOf(artistObj) < 12) {
        // fetchArtistImage(artistObj.mbid);
        topTen.push(artistObj);
      }
      return topTen;
    }, []);
    return topArtists;
  }

  const buildCards = (topArtists) => topArtists.map(artist => {

    let nameString = artist.name.replaceAll(' ', '+');
    // let imgURL = artistImages[topArtists.indexOf(artist)];

    return (
      <article id={artist.mbid} key={artist.mbid} className='top-artist-card'>
        <p>{artist.name}</p>
        <Link to={`/artist:${nameString}`} id={nameString} className='link-container'>
          <img src={moreCowBell} alt='artist-portrait'/>
        </Link>
      </article>
    )
  });

  return (
    topArtists.length < 1 ?
      <section className='message-box'>
        {/* <p className='message'>Page Loading</p> */}
      </section>
      :
      <section className='top-artists-box'>
        <h3>Top Artists</h3>
        <div className='artists-list'>
          {artistCards}
        </div>
      </section>
  )
}

export default TopArtists;
