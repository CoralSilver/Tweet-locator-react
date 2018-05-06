import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import * as LoginService from 'oauthio-web';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import accessToken from '../../config';
import Button from '../components/Button/Button';
import Range from '../components/Range/Range';
import Tweets from '../components/Tweets/Tweets';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import './Home.scss';

const Map = ReactMapboxGl(accessToken);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
      rangeValue: .5,
      tweets: [],
      redirectToReferrer: false,
    }
  }

  componentDidMount() {
    this.geoFindMe();
  };

  geoFindMe = () => {
    if (!navigator.geolocation) {
      console.log("<p>Geolocation is not supported by your browser</p>");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
  };

  error = () => {
    console.log("Unable to retrieve your location");
  };

  success = (pos) => {
    let crd = pos.coords;
    this.setState({ currentPosition: crd });

    const lat = crd.latitude;
    const lon = crd.longitude;
  }

  getTweets = () => {
    const twitter = LoginService.OAuth.create('twitter');
    const { currentPosition, rangeValue } = this.state;
    const lat = currentPosition.latitude;
    const lon = currentPosition.longitude;
    const baseApi = `https://api.twitter.com/1.1/search/tweets.json?q=&geocode=`;
    const apiParams = `${lat},${lon},${rangeValue}mi&result_type=recent`;
    const apiEndpoint = `${baseApi}${apiParams}`;

    const encodedAPIEndpoint = window.encodeURI(apiEndpoint);

    twitter.get(encodedAPIEndpoint).done(data => {
      let tweetData = data.statuses.map(status => {
        return {
          createdAt: status.created_at,
          text: status.text,
          screenName: status.user.screen_name,
          profileImg: status.user.profile_image_url,
          img: status.entities.media ? status.entities.media[0].media_url_https : null
        }
      })
      let tweets = this.state.tweets;
      this.setState({ tweets: [...tweetData, ...tweets] })
    }).fail(function (err) {
      console.warn(err);
    });
  }

  updateValue = (event) => {
    this.setState({ rangeValue: (event.target.value) * 1 });
  }

  logout = () => {
    LoginService.OAuth.clearCache();
    this.setState({ redirectToReferrer: true });
  }

  render() {
    const { tweets, currentPosition } = this.state;
    let position = this.state.currentPosition;

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div>
        <Header onClick={this.logout} />
        <section className="main-container">
          {!position &&
            <div className='loading-container'>
              <p>Finding your location</p>
              <Loading />
            </div>
          }
          {
            position &&
            <div className='find-tweets-container'>
              <Map
                center={[position.longitude, position.latitude]}  // Must be in longitude, latitude coordinate order
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: "250px",
                  flex: 2,
                }}
                zoom={[13]}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15" }}>
                  <Feature coordinates={[position.longitude, position.latitude]} />
                </Layer>
              </Map>
              <div className="controls">
                <Range
                  updateValue={this.updateValue}
                  rangeValue={this.state.rangeValue} />
                <Button
                  onClick={this.getTweets}
                  text={'Find nearby tweets'} />
              </div>
            </div>
          }
        </section>
        {(tweets.length > 0) &&
          <Tweets
            tweets={tweets}
          />
        }
      </div>
    )
  }

}

export default Home;
