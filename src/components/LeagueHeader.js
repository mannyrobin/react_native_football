import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import LeagueHeaderView from './LeagueHeaderView';

class LeagueHeader extends Component {
    render() {
        const leagueParam = this.props.league;

        const league = leagueParam.level ?
            this.props.mainLeague :
            this.props.friendlyLeagues.find(({ uid }) => uid === leagueParam.uid);
        
        return (<LeagueHeaderView league={league} currentUser={firebase.auth().currentUser} />);
    }
}

const mapStateToProps = ({ mainLeagues, friendlyLeagues }) =>
    ({
        mainLeague: mainLeagues.league,
        friendlyLeagues: friendlyLeagues.friendlyLeaguesListFetch
    });

export default connect(mapStateToProps, null)(LeagueHeader);

