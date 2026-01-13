import React, { useState, useContext, useEffect } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react";
import { apiRequest } from "../utils/api.js";

const Dashboard = () => {
  const {docstoreInfo, setDocstoreInfo, dashboardActiveTab, setDashboardActiveTab, userList, setUserList,
     logList, setLogList, storageList, setStorageList,
      shelfList, setShelfList, documentList, setDocumentList } =
    useContext(DocStoreContext);

  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const infos = await apiRequest("GET","/docstore-stats/");
        setDocstoreInfo(infos);

        const storages = await apiRequest("GET","/storages/");
        setStorageList(
          storages
        );
        const shelves = await apiRequest("GET","/shelves/");
        setShelfList(
          shelves
        );
        const documents = await apiRequest("GET","/documents/");
        setDocumentList(
          documents
        );
        const users = await apiRequest("GET","/users/");
        setUserList(
          users
        );
        const logs = await apiRequest("GET","/logentries/");
        console.log("Fetched logs:", logs);

        setLogList(
          logs
          // logs.data.map((log) => 
          //   `User: ${log.user}, Action: ${log.action}, Object: ${log.object_type}, Date: ${new Date(log.date_added).toLocaleDateString()}`
          // )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setStorageList, setShelfList, setDocumentList, setUserList, setLogList]);

  const storageColumns = [
    { name: "Storage ID", id: "id" },
    { name: "Storage", id: "name" },
    { name: "Location", id: "location" },
    { name: "Date Added", id: "date_added" }
  ];
  const shelfColumns = [
    { name: "Shelf ID", id: "id" },
    { name: "Shelf", id: "name" },
    { name: "Storage", id: "storage" },
    { name: "Date Added", id: "date_added" },
  ];
  const documentColumns = [
    { name: "Document ID", id: "id" },
    { name: "Document Title", id: "title" },
    { name: "Storage", id: "storage" },
    { name: "Shelf", id: "shelf" },
    { name: "Status", id: "status" },
    { name: "Date Added", id: "date_added" },
  ];
  const userColumns = [
    { name: "User ID", id: "id" },
    { name: "User's name", id: "full_name" },
    { name: "Role", id: "role" },
    { name: "Date Added", id: "date_added" },
  ];
  

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-9 border-end">
          {" "}
          {/* Left column: 75% */}
          <h3>DASHBOARD</h3>
          <div className="row text-center my-4">
            <div className="col">
              <div
                className={`p-3 border ${
                  dashboardActiveTab === "storages"
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                role="button"
                onClick={() => setDashboardActiveTab("storages")}
              >
                <h4>Storages</h4>
                <small>Number of storages: {docstoreInfo ? docstoreInfo.numOfStorages : 0}</small>
              </div>
            </div>
            <div className="col">
              <div
                className={`p-3 border ${
                  dashboardActiveTab === "shelves"
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                role="button"
                onClick={() => setDashboardActiveTab("shelves")}
              >
                <h4>Shelves</h4>
                <small>Number of shelves: {docstoreInfo ? docstoreInfo.numOfShelves : 0}</small>
              </div>
            </div>
            <div className="col">
              <div
                className={`p-3 border ${
                  dashboardActiveTab === "documents"
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                role="button"
                onClick={() => setDashboardActiveTab("documents")}
              >
                <h4>Documents</h4>
                <small>Number of documents: {docstoreInfo ? docstoreInfo.numOfDocuments : 0}</small>
              </div>
            </div>
            <div className="col">
              <div
                className={`p-3 border ${
                  dashboardActiveTab === "users"
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                role="button"
                onClick={() => setDashboardActiveTab("users")}
              >
                <h4>Users</h4>
                <small>Number of users: {docstoreInfo ? docstoreInfo.numOfUsers : 0}</small>
              </div>
            </div>
          </div>
          {dashboardActiveTab === "storages" && (
            <>
              <h4>Storages</h4>
              <Grid
                data={storageList}
                columns={storageColumns}
                pagination={{
                  enabled: true,
                  limit: 5,
                }}
                sort={true}
              />
            </>
          )}
          {dashboardActiveTab === "shelves" && (
            <>
              <h4>Shelves</h4>
              <Grid
                data={shelfList}
                columns={shelfColumns}
                pagination={{
                  enabled: true,
                  limit: 5,
                }}
                sort={true}
              />
            </>
          )}
          {dashboardActiveTab === "documents" && (
            <>
              <h4>Documents</h4>
              <Grid
                data={documentList}
                columns={documentColumns}
                pagination={{
                  enabled: true,
                  limit: 5,
                }}
                sort={true}
              />
            </>
          )}
          {dashboardActiveTab === "users" && (
            <>
              <h4>Users</h4>
              <Grid
                data={userList}
                columns={userColumns}
                pagination={{
                  enabled: true,
                  limit: 5,
                }}
                sort={true}
              />
            </>
          )}
        </div>
        <div className="col-3">
          <h3>Logging</h3>
          <ul className="list-group list-group-flush">
            {logList.map((log, index) => (
              <li key={index} className="list-group-item">
                [{new Date(log.timestamp).toLocaleString()}] {log.user} {log.action} {log.object_type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
