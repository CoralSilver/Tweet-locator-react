import React from 'react';
import PropTypes from 'react-proptypes';
import './Tweets.scss';
import moment from 'moment';
import Linkify from 'react-linkify';
 
const Tweets = (props) => {
  let tweets = props.tweets;

  return (
    <section className="tweets">
      {
        tweets.map((tweet, index) => {
          const userURl = `https://twitter.com/${tweet.screenName}`;
          const date = moment(tweet.createdAt).fromNow();

          return (
            <div className='tweet-container' key={index}>
              <img src={tweet.profileImg} className='tweet-container__profile-image' alt='profile'/>
              <span className='tweet-container__user-name'>
                <a href={userURl} target='_blank'>
                  {tweet.screenName}
                </a>
              </span>
              <span className='tweet-container__date'>{date}</span>
              <div><Linkify properties={{target: '_blank'}}>{tweet.text}</Linkify></div>
              {tweet.img &&
                <img src={tweet.img} alt='tweet' className='tweet-container__media-image img--responsive'/>
              }
            </div>
          )
        })
      }
    </section>
  )
};

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired,
};

export default Tweets;
