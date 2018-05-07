import React from 'react';
import Button from '../components/Button/Button';
import './LoginPage.scss';
import * as LoginService from 'oauthio-web';
import {
    BrowserRouter as Router,
    Route,
    Redirect,

} from 'react-router-dom';
import LocationMarker from 'shared/assets/location-marker.png';

class LoginPage extends React.Component {
    constructor() {
        super();
        
        this.state = {
            redirectToReferrer: false
        }

        OAuth.initialize('7bIgDNbrQL4S2mH034k8dO4KxBE');        
    }

    login = () => {
        OAuth.popup('twitter', { cache: true }).done((twitter) => {
            // redirect to home page
            this.setState({ redirectToReferrer: true });
        }).fail((err) => {
            console.log('login failed')
        })
    }

    render() {
        const OAuth = LoginService.OAuth;
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to='/home' />
            )
        }

        return (
            <section className="login-container">
                <h1>Nearby Tweet Locator</h1>
                <img src={LocationMarker} className="login-container__image img--responsive" alt="logo image"/>
                <Button
                    text={'Log in'}
                    onClick={this.login}
                />
            </section>
        )
    }
}

export default LoginPage;