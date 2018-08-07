import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeaguesInvitations, acceptInvitation, declineInvitation } from '../actions';
import InvitationsList from './InvitationsList';

class LeagueInvitations extends Component {
    componentDidMount() {
        this.props.fetchLeaguesInvitations();
    }

    render() {
        return (
            <InvitationsList 
                invitations={this.props.invitations} 
                onPressAccept={this.props.acceptInvitation} 
                onPressDecline={this.props.declineInvitation} 
            />);
    }
}

const mapStateToProps = ({ invitationsData }) => ({
    invitations: invitationsData.invitations
});

export default connect(mapStateToProps, 
    { fetchLeaguesInvitations, acceptInvitation, declineInvitation })(LeagueInvitations);
