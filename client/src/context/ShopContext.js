import { createContext, useEffect, useReducer } from "react";

const initState = {
    loading: false,
    error: false,
    shop: JSON.parse(localStorage.getItem('shop')) || null
};

export const ShopContext = createContext(initState);

const ShopReducer = (state, action) => {
    switch (action.type) {
        case "SET_SHOP_START":
            return {
                ...state,
                loading: true,
                error: false,
            };
        case "SET_SHOP_SUCCESS":
            return {
                loading: false,
                error: false,
                shop: action.payload, 
            };
        case "SET_SHOP_FAILURE":
            return {
                ...state,
                loading: false,
                error: true,
            };
        case "CLEAR_SHOP":
            return {
                loading: false,
                error: false,
                shop: null, 
            };
        default:
            return state;
    }
};

export const ShopContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ShopReducer, initState);

    useEffect(() => {
        localStorage.setItem('shop', JSON.stringify(state.shop));
    }, [state.shop]);

    return (
        <ShopContext.Provider value={{
            shop: state.shop,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}
        </ShopContext.Provider>
    );
};
