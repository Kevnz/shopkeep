import React from 'react';

export default class Customer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div>{this.props.firstName}</div>
                <div>{this.props.lastName}</div>
                <div>{this.props.email}</div> 
            </div>
            );
    }
}