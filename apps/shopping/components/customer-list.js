import React from 'react';
import Customer from './customer';
export default class CustomerList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let customerNodes = this.state.settings.map((customer) => {
            return (<Customer customer={customer} />);
        });
        return (
            <div> 
                {customerNodes} 
            </div>
            );
    }
}