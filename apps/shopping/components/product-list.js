import React from 'react';
import Product from './product';
export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let productNodes = this.state.settings.map((product) => {
            return (<Product product={product} />)
        })
        return (
            <div> 
                {productNodes} 
            </div>
            );
    }
}