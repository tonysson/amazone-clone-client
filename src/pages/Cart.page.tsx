import React, { useEffect } from 'react'
import Header from '../features/products/components/Header'
import { getProducts } from '../features/products/productSlice';
import { useAppDispatch, useAppSelector } from './../hooks/redux/hooks';

import Product from './../features/products/components/Product';
import { fontWeight } from '@mui/system';
import PaymentGateway from '../features/products/components/Payment';

const Cart = () =>
{

  const dispatch = useAppDispatch();
  const { products, cart } = useAppSelector((state) => state.product);

  useEffect(() =>
  {
    dispatch(getProducts());
  }, [dispatch]);


  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0)

  const totalPrice = cart.reduce((acc: number, item: { quantity: number; price: number; }) => acc + item.quantity * item.price, 0)


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
      <div style={{ width: '80%', margin: 'auto' }}>
        <hr style={{ marginTop: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '20px' }}>
          <span style={{ marginRight: '16px' }} >
            Subtotal ({totalQty}) items
          </span>
          <span style={{ marginBottom: '48px', fontWeight: 500 }} >
            ${totalPrice.toFixed(2)}
          </span>
        </div>
            {totalQty > 0 && <PaymentGateway/>}
      </div>
    </div>
  )
}

export default Cart