import React from 'react';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div>{this.props.name}</div>
                <div>{this.props.description}</div>
                <div>{this.props.catagory}</div>
                <div>{this.props.key}</div> 
            </div>
            );
    }
}