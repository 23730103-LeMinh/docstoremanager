import { useContext, useState, useEffect, use } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react"; // Import Grid.js for table rendering
import { h, html } from "gridjs";
import { apiRequest } from "../utils/api.js";

const ShelfList = () => {
  const {
    setActiveList,
    shelfListSection,
    setShelfListSection,
    selectedStorageId,
    setSelectedShelfId,
  } = useContext(DocStoreContext);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    storage: "",
    location: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  const shelfColumns = [
    { name: "Shelf ID", id: "id" },
    { name: "Shelf", id: "name" },
    { name: "Storage", id: "storage" },
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

  const handleClickDetele = (id) => {
    console.log("Delete shelf with ID:", id);
    // Implement delete logic here
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async (id) => {
    // Call the delete function here
    try {
      await apiRequest("DELETE", `/shelves/${id}`);
      // Refresh the list
      const shelves = await apiRequest("GET", `/shelves-by-storage/${id}/`);
      setShelfListSection(shelves);
    } catch (error) {
      console.error("Error deleting shelf:", error);
    }
    setShowDeleteModal(false);
  };

  const handleClickUpdate = (id) => {
    console.log("Update shelf with ID:", id);
    // Implement update logic here
    setShowUpdateModal(true);
    const shelfToUpdate = shelfListSection.find((shelf) => shelf.id === id);
    console.log("Shelf to update:", shelfToUpdate);
    if (shelfToUpdate) {
      setFormData({
        id: shelfToUpdate.id,
        name: shelfToUpdate.name,
        storage: shelfToUpdate.storage,
        location: shelfToUpdate.location,
      });
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiRequest("PUT", `/shelf-update/`, formData);
      // Refresh the list
      const shelves = await apiRequest(
        "GET",
        `/shelves-by-storage/${selectedStorageId}/`
      );
      setShelfListSection(shelves);
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
    setShowUpdateModal(false);
    setFormData({
      id: null,
      name: "",
    });
  };

  const handleClickAddNew = () => {
    console.log("Add new shelf");
    setShowAddNewModal(true);
  };

  const handleAddNewSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiRequest("POST", `/shelf-create/`, formData);
      // Refresh the list
      const shelves = await apiRequest(
        "GET",
        `/shelves-by-storage/${selectedStorageId}/`
      );
      setShelfListSection(shelves);
    } catch (error) {
      console.error("Error adding new shelf:", error);
    }
    setShowAddNewModal(false);
    setFormData({
      id: null,
      name: "",
    });
  };

  const handleCloseAddNew = () => {
    setShowAddNewModal(false);
    setFormData({
      id: null,
      name: "",
    });
  };

  useEffect(() => {
    const fetchShelfSections = async () => {
      try {
        const data = await apiRequest(
          "GET",
          `/shelves-by-storage/${selectedStorageId}/`
        );
        let location = data.location;
        let displayData = data.shelves.map((shelf) => ({
          ...shelf,
          location: location || "N/A", // Handle null location
        }));
        setShelfListSection(displayData);
      } catch (error) {
        console.error("Error fetching shelf sections:", error);
      }
    };

    fetchShelfSections();
  }, [setShelfListSection]);

  const handleView = (id) => {
    setSelectedShelfId(id);
    console.log("View shelf with ID:", id);
    // Implement view logic here
    setActiveList("document");
  };

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
          handleClickDetele(id);
        }
      }
    };
    document.addEventListener("click", handleActionClick);
    return () => document.removeEventListener("click", handleActionClick);
  }, [shelfListSection]);

  return (
    <div className="storage-list-container">
      <h2 className="">Shelf List</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={() => setActiveList("storage")}
        >
          BACK
        </button>
        <button className="btn btn-primary" onClick={handleClickAddNew}>
          + ADD SHELF
        </button>
      </div>
      <Grid
        columns={shelfColumns}
        data={shelfListSection}
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

      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this shelf?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleConfirmDelete(formData.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Shelf</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Shelf ID</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ backgroundColor: "#e9ecef" }}
                      name="id"
                      value={formData.id}
                      // onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Shelf Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Storage</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ backgroundColor: "#e9ecef" }}
                      name="storage"
                      value={formData.storage}
                      onChange={(e) =>
                        setFormData({ ...formData, storage: e.target.value })
                      }
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ backgroundColor: "#e9ecef" }}
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div>
        {showAddNewModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Shelf</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseAddNew}
                  ></button>
                </div>
                <form onSubmit={handleAddNewSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Shelf Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseAddNew}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Shelf
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelfList;
