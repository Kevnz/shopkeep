import React from 'react';

export default class LoginLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (window.user){
            return (
                <a href="/logout" className="logout">Log out</a>
            );
        } else {
            return <a href="/auth/google">Sign in with Google</a>
        }
    }
}
