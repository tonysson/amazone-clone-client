import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import authReducer from './../features/Auth/authSlice.ts';
import { configureStore } from '@reduxjs/toolkit';
import {BrowserRouter as Router } from 'react-router-dom';

function reducer(
	ui,
	{
		preloadedState,
		store = configureStore({ reducer: { auth: authReducer }, preloadedState }),
        ...renderOptions
	}={}
) {

    function wrapper({children}){
        return <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    }

    return rtlRender(ui , {wrapper , ...renderOptions})
}

export * from '@testing-library/react';
export {reducer}
