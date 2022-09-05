import React, { useEffect, useState } from 'react'
import { AppBar ,Badge , Box , Button , Toolbar } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { logout } from '../../Auth/authSlice'
import { useAppDispatch, useAppSelector } from './../../../hooks/redux/hooks';
import { selectedUser } from './../../Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(selectedUser)
  const productState = useAppSelector(state => state.product)
  const { cart } = productState


  const [cartCount , setCartCount] = useState(0)

  useEffect(() => {
    const totalQty = cart.reduce((acc , item) => acc + item.quantity ,0)
    setCartCount(() => totalQty)
  },[cart])

  const lougoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#131921', color: 'white', padding: '4px' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            onClick={() => navigate('/')}
            style={{
              width: '113px',
              height: '50px',
              paddingTop: '10px',
              cursor: 'pointer',
            }}
            src='/amazon-logo.png'
            alt='amazon logo'
          />
          <div style={{ display: 'flex' }}>
            <div>
              <div>Hello, {user?.name}</div>
              <Button
                onClick={lougoutHandler}
                sx={{ padding: 0, marginRight: '16px' }}
                color='inherit'
              >
                Sign out
              </Button>
            </div>
            <Button onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color='primary'>
                <ShoppingCartOutlinedIcon fontSize='large' />
              </Badge>
              <span>Cart</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header