import React, { createContext, useContext, useState } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favourite, setFavourite] = useState([]);

    const favouriteToggle = (item) => {
        let newItem = []

        if (!favourite.find(el => el._id === item._id))
            newItem = [...favourite, item];
        else
            newItem = favourite.filter(el => el._id !== item._id)

        setFavourite(newItem);
    };

    return (
        <FavContext.Provider value={{ favourite, favouriteToggle }}>
            {children}
        </FavContext.Provider>
    );
};

export const useFavourite = () => {
    return useContext(FavContext);
};