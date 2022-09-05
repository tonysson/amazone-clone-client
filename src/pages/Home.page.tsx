
import { useEffect } from 'react';

import Header from './../features/products/components/Header';
import { useAppDispatch, useAppSelector } from './../hooks/redux/hooks';
import { getProducts } from '../features/products/productSlice';
import Product from './../features/products/components/Product';




const HomePage = () => {
 
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() =>
  {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '48px',
        }}
      >
        {products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default HomePage
