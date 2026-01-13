import { useContext, useEffect, useState } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react"; // Import Grid.js for table rendering
import { h, html } from "gridjs";
import { apiRequest } from "../utils/api.js";

const StorageList = () => {
  const { setActiveList, storageListSection, setStorageListSection, selectedStorageId, setSelectedStorageId } =
    useContext(DocStoreContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    location: "",
  });

  const [showAddNewModal, setShowAddNewModal] = useState(false);

  const storageColumns = [
    { name: "Storage ID", id: "id" },
    { name: "Storage", id: "name" },
    { name: "Location", id: "location" },
    { name: "Date Added", id: "date_added" },
    {
      name: "Actions",
      formatter: (cell, row) => {
        return html(`
          <button class="btn btn-sm btn-info me-1" data-action="view" data-id="${row.cells[0].data}">View</button>
          <button class="btn btn-sm btn-warning me-1" data-action="update" data-id="${row.cells[0].data}">Update</button>
          <button class="btn btn-sm btn-danger" data-action="delete" data-id="${row.cells[0].data}">Delete</button>
        `);
      },
    },
  ];

  const handleClickDelete = (id) => {
    console.log("Clicked delete for storage ID:", id);
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    // Call the delete function here
    try {
      await apiRequest("DELETE", `/storage-delete/${selectedDeleteId}/`);
      // Refresh the list
      const storages = await apiRequest("GET", "/storages/");
      setStorageListSection(storages);
    } catch (error) {
      console.error("Error deleting storage:", error);
    }
    setShowDeleteModal(false);
  };

  const handleView = (id) => {
    console.log("View storage:", id);
    setSelectedStorageId(id);
    // Add your view logic here
    setActiveList("shelf");
  };

  const handleClickUpdate = (id) => {
    console.log("Update storage:", id);
    setShowUpdateModal(true);
    // Pre-fill form data if needed
    const storage = storageListSection.find((item) => item.id === id);
    if (storage) {
      setFormData({
        id: storage.id,
        name: storage.name,
        location: storage.location || "",
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // Handle update logic here
    try {
      // Assuming we have the storage ID in formData or elsewhere
      const id = storageListSection.find(
        (item) => item.id === formData.id
      )?.id;
      console.log("Submitting update for storage ID:", id);
      if (id) {
        let data = {
          id: formData.id,
          name: formData.name,
          location: formData.location,
        }
        await apiRequest("POST", `/storage-update/`, data);
        // Refresh the list
        const storages = await apiRequest("GET", "/storages/");
        setStorageListSection(storages);
      }
    } catch (error) {
      console.error("Error updating storage:", error);
    }
    setFormData({
      id: null,
      name: "",
      location: "",
    });
    setShowUpdateModal(false);
  };

  const handleClose = () => {
    setFormData({
      id: null,
      name: "",
      location: "",
    });
    setShowUpdateModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickAdd = () => {
    setShowAddNewModal(true);
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    // Handle add new storage logic here
    try {
      await apiRequest("POST", `/storage-create/`, formData);
      // Refresh the list
      const storages = await apiRequest("GET", "/storages/");
      setStorageListSection(storages);
    } catch (error) {
      console.error("Error adding new storage:", error);
    }
    setFormData({
      id: null,
      name: "",
      location: "",
    });
    setShowAddNewModal(false);
  };

  useEffect(() => {
    // Fetch storage data from backend API
    const fetchStorages = async () => {
      try {
        const storages = await apiRequest("GET", "/storages/");
        setStorageListSection(storages);
      } catch (error) {
        console.error("Error fetching storage data:", error);
      }
    };

    fetchStorages();
  }, [setStorageListSection]);

  useEffect(() => {
    // Add event listener for action buttons
    const handleActionClick = (e) => {
      if (e.target.dataset.action) {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;

        if (action === "view") {
          handleView(id);
        } else if (action === "update") {
          handleClickUpdate(id);
        } else if (action === "delete") {
          handleClickDelete(id);
        }
      }
    };
    document.addEventListener("click", handleActionClick);
    return () => document.removeEventListener("click", handleActionClick);
  }, [storageListSection]);

  return (
    <div className="storage-list-container">
      <h2 className="">Storage List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleClickAdd}>+ ADD STORAGE</button>
      </div>
      <Grid
        columns={storageColumns}
        data={storageListSection}
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

      {/* delete confirm Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={handleCloseDelete}
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this item?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseDelete}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update form modal */}
      {showUpdateModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Update Storage</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleClose}
                    />
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{"backgroundColor": "#e9ecef"}}
                        name="id"
                        value={formData.id}
                        // onChange={handleChange}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Add New Storage Modal */}
      {showAddNewModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleAddSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Storage</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowAddNewModal(false)}
                    />
                  </div>  
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input  
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddNewModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default StorageList;
