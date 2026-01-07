import React, { useState, createContext, useContext } from "react";
import StorageList from "./StorageList";
import ShelfList from "./ShelfList";
import DocumentList from "./DocumentList";

import { DocStoreContext } from "../context/DocStoreContext.js";


const DocStores = () => {

  const { activeList } = useContext(DocStoreContext);


  return (
    <div className="docstores-container">
      <div className="d-flex justify-content-between mb-3">
      </div>
        {activeList === "storage" && <StorageList />}
        {activeList === "shelf" && <ShelfList />}
        {activeList === "document" && <DocumentList />}
    </div>
  );
};

export default DocStores;
