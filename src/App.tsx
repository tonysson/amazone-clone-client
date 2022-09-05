import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './shared/utils/theme';
import HomePage from './pages/Home.page';
import Signin from './pages/Signin.page';
import Register from './pages/Register.page';
import PrivateRoute from './features/Auth/components/PrivateRoute';
import Cart from './pages/Cart.page';

function App ()
{
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/cart" element={<PrivateRoute page={<Cart />} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          
          <Route path="*" element={<Navigate replace to='/' />} />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>

   
  );
}

export default App;
