import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../constants';

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [...state,  action.payload],
    [DELETE_CUSTOMER]: (state, action) => state.filter(c => c.id !== action.payload),
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const { id } = customerPayload;
        const customers = state;
        const initialValue = [];

        const newCustomers = customers.reduce( (acumulador, customer) => {
            if (customer.id === id) {
                return [...acumulador, customerPayload];
            } else {
                return [...acumulador, customer];
            }
        }, initialValue); 

        return newCustomers;
    }
}, []); //valor iniciar vacio
