import React from 'react';

// navigator imports
import AuthNavigator from './AuthNavigator';
import AuthSuccessNavigator from './AuthSuccessNavigator';

//redux imports
import { connect } from 'react-redux';

function AppNavigator({ isLoggedIn }) {
    return isLoggedIn ? (
        <AuthSuccessNavigator />
    ) : (
            <AuthNavigator />
        )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.Authentication.isLoggedIn
})

export default connect(mapStateToProps, null)(AppNavigator);