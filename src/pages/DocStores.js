import React, { useState, createContext, useContext, useEffect } from "react";
import StorageList from "./StorageList";
import ShelfList from "./ShelfList";
import DocumentList from "./DocumentList";

import { DocStoreContext } from "../context/DocStoreContext.js";

const DocStores = () => {
  const { activeList, setActiveList } = useContext(DocStoreContext);

  useEffect(() => {
    setActiveList("storage");
    // first load the storage list
  }, []);

  return (
    <div className="docstores-container">
      <div className="d-flex justify-content-between mb-3"></div>
      {activeList === "storage" && <StorageList />}
      {activeList === "shelf" && <ShelfList />}
      {activeList === "document" && <DocumentList />}
    </div>
  );
};

export default DocStores;
