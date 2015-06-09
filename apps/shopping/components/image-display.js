'use strict';
import React from 'react';
import uuid from 'uuid';

export default class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div className="primary-image"><img src={this.props.images[0].url + '?' + uuid.v4()} /></div>

            </div>
            );
    }
}