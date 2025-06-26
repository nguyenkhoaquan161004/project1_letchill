import React, { createContext, useContext, useState } from "react";

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
    const [isCreator, setIsCreator] = useState(false);

    return (
        <CreatorContext.Provider value={{ isCreator, setIsCreator }}>
            {children}
        </CreatorContext.Provider>
    )
}

export const useCreator = () => useContext(CreatorContext);