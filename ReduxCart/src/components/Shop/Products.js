import React from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
  { id: 'p1', 
    price:6, 
    title: 'My First Book',
    description: 'The first book I ever wrote',
  },

  { id: 'p2', 
    price:9, 
    title: 'My Second Book',
    description: 'THe second book I ever wrote',
  },

  { id: 'p3', 
    price:6, 
    title: 'My Third Book',
    description: 'The third book I ever wrote',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products here!</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description= {product.description}
        />
        ))};
      </ul>
    </section>
  );
};

export default Products;
