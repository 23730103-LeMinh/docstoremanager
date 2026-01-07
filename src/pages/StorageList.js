import { useContext } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react"; // Import Grid.js for table rendering

const StorageList = () => {
  const { setActiveList } = useContext(DocStoreContext);

  const storageColumns = [
    "Storage ID",
    "Storage",
    "Type of document",
    "Location",
    "Date Added",
    // "Action",
  ];
  const storageList = [
    ["1", "Main Storage", "Legal", "New York", "2025-01-15"],
    ["2", "Backup Storage", "Accounting", "Los Angeles", "2025-02-20"],
    ["3", "Cloud Storage", "Technical", "Online", "2025-03-10"],
    ["4", "Archive Storage", "Physical", "Chicago", "2025-04-05"],
    ["5", "Contracts Vault", "Contract", "Houston", "2025-05-12"],
    ["6", "Finance Dept", "Invoice", "Seattle", "2025-06-18"],
  ];

  return (
    <div className="storage-list-container">
      <h2 className="">Storage List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary">+ ADD STORAGE</button>
      </div>
      <Grid
        columns={storageColumns}
        data={storageList}
        pagination={{
          enabled: true,
          limit: 5, // Show 5 entries per page
        }}
        sort={true}
        // on={{
        //   rowClick: (event) => {
        //     if (event.target.classList.contains("btn-secondary")) {
        //       setActiveList("shelf");
        //     }
        //   },
        // }}
      />
    </div>
  );
};

export default StorageList;
