import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';
import * as LoginService from 'oauthio-web';
import Button from '../components/Button/Button';
import Range from '../components/Range/Range';
import Tweets from '../components/Tweets/Tweets';
import Header from '../components/Header/Header';
import './Home.scss';


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

  componentWillMount = () => {
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

  //TODO add Google map instead of displaying lat and long
  success = (pos) => {
    let crd = pos.coords;
    let currentPosition = this.state;
    this.setState({ currentPosition: crd });
  }

  getTweets = () => {
    const twitter = LoginService.OAuth.create('twitter');
    const currentPosition = this.state.currentPosition;
    const lat = currentPosition.latitude;
    const lon = currentPosition.longitude;
    const range = this.state.rangeValue;
    const baseApi = `https://api.twitter.com/1.1/search/tweets.json?q=&geocode=`;
    const apiParams = `${lat},${lon},${range}mi&result_type=recent`;
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
    this.setState({ rangeValue: event.target.value });
  }

  logout = () => {
    LoginService.OAuth.clearCache();
    this.setState({ redirectToReferrer: true });
  }

  render() {
    let tweets = this.state.tweets;
    let position = this.state.currentPosition;

    if (this.state.redirectToReferrer) {
        return (
            <Redirect to='/' />
        )
    }

    return (
      <div>
        <Header onClick={this.logout}/>
        <section className="main-container container">
          {!position &&
            <div className='find-tweets-container'>
              <p>Finding your location...</p>
            </div>
          }
          {position &&
            <div className='find-tweets-container'>
              <span>Latitude: {position.latitude.toFixed(5)}, Longitude: {position.longitude.toFixed(5)}</span>
              <Range
                updateValue={this.updateValue}
                rangeValue={this.state.rangeValue} />
              <Button
                onClick={this.getTweets}
                text={'Find nearby tweets'} />
            </div>
          }
          {(tweets.length > 0) &&
            <Tweets
              tweets={tweets}
            />
          }
        </section>
      </div>
    )
  }

}

export default Home;
