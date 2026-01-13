import React, { createContext, useState, useCallback } from 'react';

export const DocStoreContext = createContext();

export const DocStoreProvider = ({ children }) => {

    const [docstoreInfo, setDocstoreInfo] = useState(null);
    const [activeMenu, setActiveMenu] = useState("dashboard"); // "dashboard", "docstores", "about"
    const [dashboardActiveTab, setDashboardActiveTab] = useState("storages"); // "storages", "shelves", "documents", "users"
    const [activeList, setActiveList] = useState("storage"); // "storage", "shelf", "document"
    const [storageList, setStorageList] = useState([]);
    const [shelfList, setShelfList] = useState([]);
    const [documentList, setDocumentList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [logList, setLogList] = useState([]);
    const [storageListSection, setStorageListSection] = useState([]);
    const [shelfListSection, setShelfListSection] = useState([]);
    const [documentListSection, setDocumentListSection] = useState([]);
    const [storageDetail, setStorageDetail] = useState([]);
    const [shelfDetail, setShelfDetail] = useState([]);
    const [documentDetail, setDocumentDetail] = useState([]);
    const [selectedStorageId, setSelectedStorageId] = useState(null);
    const [selectedShelfId, setSelectedShelfId] = useState(null);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const value = {
        docstoreInfo,
        setDocstoreInfo,
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
        setDashboardActiveTab,
        userList,
        setUserList,
        logList,
        setLogList,
        storageListSection,
        setStorageListSection,
        shelfListSection,
        setShelfListSection,
        documentListSection,
        setDocumentListSection,
        selectedStorageId,
        setSelectedStorageId,
        selectedShelfId,
        setSelectedShelfId,
        selectedDocumentId,
        setSelectedDocumentId,
    };

    return (
        <DocStoreContext.Provider value={value}>
            {children}
        </DocStoreContext.Provider>
    );
};