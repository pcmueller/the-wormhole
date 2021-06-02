import React, {Component} from 'react';
// import apiCalls from '../../utilities/apiCalls';
import utils from '../../utilities/utils';
import countries from '../../utilities/countries';
import Background from '../../assets/images/black-cloth.jpeg';
import Header from '../Header/Header';
import Form from '../Form/Form';
import TopArtists from '../TopArtists/TopArtists';
import TopTracks from '../TopTracks/TopTracks';
import { actionGetTopArtists } from '../../actions/index.js'
import { isLoading, setTopArtists } from '../../reducers/setTopArtists';
import { fetchTopArtists } from '../../thunks/fetchTopArtists';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // location: this.getRandomLocation(),
      topArtists: [],
      topTracks: [],
      selectedArtistID: '',
      // selectedArtistImage: '',
      input: '',
      error: ''
    }
  }

   componentDidMount = async () => {
    const { isLoading, hasErrored } = this.props

    try {
    //  isLoading(true);

     const topArtists = await fetchTopArtists();
    //  isLoading(false);
  //   console.log(topArtists)
     actionGetTopArtists(topArtists);
    } catch (error) {

    //  isLoading( false);
    //  hasErrored(error.message);
    }
    // this.retrieveTopArtists(this.state.location.string);
    // this.retrieveTopTracks(this.state.location.string);
  }
  //
  // getRandomLocation = () => {
  //   const randomCountry= utils.getRandomElement(countries)
  //   const formattedStr = utils.formatLocationStr(randomCountry);
  //
  //   return { name: randomCountry, string: formattedStr };
  // }
  //
  // retrieveTopArtists = (location) => {
  //   apiCalls.getTopArtists(location)
  //     .then(data => {
  //       this.setState({topArtists: data})
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({error: error.message})
  //     })
  // }
  //
  // retrieveTopTracks = (location) => {
  //   apiCalls.getTopTracks(location)
  //     .then(data => {
  //       this.setState({ topTracks: data })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       console.log(`Sorry, could not retrieve data for ${this.state.location.name}`);
  //       this.setState({ error: error.message })
  //     })
  // }
  //
  // retrieveArtistImage = (id) => {
  //   apiCalls.getArtistImage(id)
  //     .then(data => {
  //       // this.setState({ selectedArtistImage: data })
  //       return data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({ error: error.message })
  //     })
  // }

  render() {
    const { isLoading } = this.props
    const { topArtists } = this.state
    // if (this.state.error > 1) {
    //   console.log(this.state.error);
    //   return <h2 className='message'>{this.state.error}</h2>
    // }
    //
    // if (this.state.error < 1 && (this.state.topArtists < 1 || this.state.topTracks < 1)) {
    //   return <h2 className='message'>Page Loading</h2>
    // }
    //
    // else {
      return (
        <div className="App" style={{ backgroundImage: `url(${Background})`}}>
          <Header />
          <Form />
          <main className='main-section'>
            <section className='location-display'>
              <TopArtists topArtists={ topArtists } />
            </section>
          </main>
        </div>
      );
    }
  }

  const mapStateToProps = ({ setTopArtists }) => ({
    topArtists: setTopArtists,
  })

  export const mapDispatchToProps = dispatch => ({
    isLoading: id => dispatch(isLoading(id)),
    actionGetTopArtists: data => dispatch(actionGetTopArtists(data))
  })


export default connect(mapStateToProps, mapDispatchToProps)(App);


{/*        // location={this.state.location.name}*/}
{/*// retrieveArtistImage={this.retrieveArtistImage}/>*/}
{/*<TopTracks location={this.state.location.name} topTracks={this.state.topTracks}/>*/}
