import React from 'react';
import Product from './product';
export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        console.log(this.state);
        console.log(this.props);
        let productNodes = this.props.products.products.map((product) => {
            return (<Product product={product} />)
        })
        return (
            <div> 
                {productNodes} 
            </div>
            );
    }
}