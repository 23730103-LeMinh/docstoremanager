import React, { useState, useContext } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react";

const Dashboard = () => {
  const { dashboardActiveTab, setDashboardActiveTab } =
    useContext(DocStoreContext);

  const storageColumns = [
    "ID",
    "Storage",
    "Type of Document",
    "Location",
    "Date Added",
  ];
  const shelfColumns = [
    "Shelf ID",
    "Shelf",
    "Type of document",
    "Storage",
    "Date Added",
  ];
  const documentColumns = [
    "Document ID",
    "Document",
    "Type of document",
    "Storage",
    "Shelf",
    "Status",
    "Date Added",
  ];
  const userColumns = ["User ID", "User's name", "Role", "Date Added"];
  const storageList = [
    ["1", "Main Storage", "Legal", "New York", "2025-01-15"],
    ["2", "Backup Storage", "Accounting", "Los Angeles", "2025-02-20"],
    ["3", "Cloud Storage", "Technical", "Online", "2025-03-10"],
    ["4", "Archive Storage", "Physical", "Chicago", "2025-04-05"],
    ["5", "Contracts Vault", "Contract", "Houston", "2025-05-12"],
  ];

  const shelfList = [
    ["1", "Shelf A", "Legal", "Main Storage", "2025-01-15"],
    ["2", "Shelf B", "Accounting", "Backup Storage", "2025-02-20"],
    ["3", "Shelf C", "Technical", "Cloud Storage", "2025-03-10"],
    ["4", "Shelf D", "Physical", "Archive Storage", "2025-04-05"],
    ["5", "Shelf E", "Contract", "Contracts Vault", "2025-05-12"],
  ]; // Sample shelf data
  const documentList = [
    [
      "1",
      "Contract Agreement",
      "Contract",
      "Main Storage",
      "Shelf A",
      "Active",
      "2025-01-15",
    ],
    [
      "2",
      "Financial Report Q1 2025",
      "Invoice",
      "Backup Storage",
      "Shelf B",
      "Active",
      "2025-02-20",
    ],
    [
      "3",
      "Technical Specification Doc",
      "Technical",
      "Cloud Storage",
      "Shelf C",
      "Active",
      "2025-03-10",
    ],
    [
      "4",
      "Employee Handbook",
      "HR",
      "Archive Storage",
      "Shelf D",
      "Active",
      "2025-04-05",
    ],
    [
      "5",
      "Company Policy Update",
      "Policy",
      "Contracts Vault",
      "Shelf E",
      "Active",
      "2025-05-12",
    ],
  ]; // Sample document data

  const userList = [
    ["1", "Alice Johnson", "Admin", "2025-01-15"],
    ["2", "Bob Smith", "Editor", "2025-02-20"],
    ["3", "Charlie Brown", "Viewer", "2025-03-10"],
    ["4", "Diana Prince", "Editor", "2025-04-05"],
    ["5", "Ethan Hunt", "Admin", "2025-05-12"],
  ]; // Sample user data

  const logs = [
    "[2025-11-25 12:00:05] User John uploaded 'file1.pdf'",
    "[2025-11-25 12:05:10] User Jane deleted 'file2.docx'",
    "[2025-11-25 12:10:15] Admin updated permissions for 'file3.xlsx'",
    "[2025-11-25 12:15:20] User John downloaded 'file4.txt'",
    "[2025-11-25 12:20:25] User John uploaded 'file5.pdf'",
    "[2025-11-25 12:25:30] User Jane deleted 'file6.docx'",
    "[2025-11-25 12:30:35] Admin updated permissions for 'file7.xlsx'",
    "[2025-11-25 12:35:40] User John downloaded 'file8.txt'",
    "[2025-11-25 12:40:45] User John uploaded 'file9.pdf'",
    "[2025-11-25 12:45:50] User Jane deleted 'file10.docx'",
    "[2025-11-25 12:50:55] Admin updated permissions for 'file11.xlsx'",
    "[2025-11-25 12:55:00] User John downloaded 'file12.txt'",
    "[2025-11-25 13:00:05] User John uploaded 'file13.pdf'",
    "[2025-11-25 13:05:10] User Jane deleted 'file14.docx'",
    "[2025-11-25 13:10:15] Admin updated permissions for 'file15.xlsx'",
    "[2025-11-25 13:15:20] User John downloaded 'file16.txt'",
    "[2025-11-25 13:20:25] User Alice modified 'file17.pdf'",
    "[2025-11-25 13:25:30] User Bob shared 'file18.docx'",
    "[2025-11-25 13:30:35] Admin archived 'file19.xlsx'",
    "[2025-11-25 13:35:40] User Charlie restored 'file20.txt'",
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
                <small>Number of storages: 10</small>
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
                <small>Number of shelves: 50</small>
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
                <small>Number of documents: 200</small>
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
                <small>Number of users: 10</small>
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
            {logs.map((log, index) => (
              <li key={index} className="list-group-item">
                {log}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
