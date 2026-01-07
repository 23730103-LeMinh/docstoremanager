import React, { createContext, useState, useCallback } from 'react';

export const DocStoreContext = createContext();

export const DocStoreProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState("dashboard"); // "dashboard", "docstores", "about"
    const [dashboardActiveTab, setDashboardActiveTab] = useState("storages"); // "storages", "shelves", "documents", "users"
    const [activeList, setActiveList] = useState("storage"); // "storage", "shelf", "document"
    const [storageList, setStorageList] = useState([]);
    const [shelfList, setShelfList] = useState([]);
    const [documentList, setDocumentList] = useState([]);

    const value = {
        activeMenu,
        setActiveMenu,
        activeList,
        setActiveList,
        storageList,
        setStorageList,
        shelfList,
        setShelfList,
        documentList,
        setDocumentList,
        dashboardActiveTab,
        setDashboardActiveTab
    };

    return (
        <DocStoreContext.Provider value={value}>
            {children}
        </DocStoreContext.Provider>
    );
};