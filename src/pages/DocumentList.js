import { use, useContext, useEffect, useState } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
import { Grid } from "gridjs-react"; // Import Grid.js for table rendering
import { h, html } from "gridjs";
import { apiRequest } from "../utils/api.js";

const DocumentList = () => {
  const {
    setActiveList,
    selectedShelfId,
    selectedStorageId,
    documentListSection,
    setDocumentListSection,
  } = useContext(DocStoreContext);

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    document_type: "",
    storage: "",
    shelf: "",
  });

  const documentTypes = [
    { name: "Report", value: "report" },
    { name: "Invoice", value: "invoice" },
    { name: "Memo", value: "memo" },
    { name: "Contract", value: "contract" },
  ];

  const documentColumns = [
    { name: "Document ID", id: "id" },
    { name: "Title", id: "title" },
    { name: "Document Type", id: "document_type" },
    { name: "Storage", id: "storage" },
    { name: "Shelf", id: "shelf" },
    { name: "Date Added", id: "date_added" },
    {
      name: "Actions",
      formatter: (cell, row) => {
        return html(`
          <button class="btn btn-sm btn-warning me-1" data-action="update" data-id="${row.cells[0].data}">Update</button>
          <button class="btn btn-sm btn-danger" data-action="delete" data-id="${row.cells[0].data}">Delete</button>
        `);
      },
    },
  ];

  const handleClickDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiRequest("DELETE", `/document-delete/${selectedDeleteId}/`);
      // Refresh document list after deletion
      fetchDocuments();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleClickUpdate = (id) => {
    const docToUpdate = documentListSection.find((doc) => doc.id === id);
    if (docToUpdate) {
      setFormData({
        id: docToUpdate.id,
        title: docToUpdate.title,
        document_type: docToUpdate.document_type,
        storage: docToUpdate.storage,
        shelf: docToUpdate.shelf,
      });
      setShowUpdateModal(true);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        id: formData.id,
        title: formData.title,
        document_type: formData.document_type,
        storage: selectedStorageId,
        shelf: selectedShelfId,
      }
      await apiRequest("POST", `/document-update/`, data);
      setShowUpdateModal(false);
      setFormData({
        id: null,
        title: "",
        document_type: "",
        storage: "",
        shelf: "",
      });
      // Refresh document list after update
      await fetchDocuments();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleClickCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setFormData({
      id: null,
      title: "",
      document_type: "",
      storage: "",
      shelf: "",
    });
  };

  const handleCloseModal = (setCloseModalState) => {
    setCloseModalState(false);
    setFormData({
      id: null,
      title: "",
      document_type: "",
      storage: "",
      shelf: "",
    });
  }

  const fetchDocuments = async () => {
    try {
      const data = await apiRequest(
        "GET",
        `/documents-by-shelf/${selectedShelfId}/`
      );
      let storageId = data.storage_id;
      let shelfId = data.shelf_id;
      let displayData = data.documents.map((doc) => ({
        ...doc,
        storage: storageId,
        shelf: shelfId,
      }));
      setDocumentListSection(displayData);
      // You can set the documents to state here if needed
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleCloseAddNew = () => {
    setShowAddNewModal(false);
    setFormData({
      id: null,
      title: "",
      document_type: "",
      storage: "",
      shelf: "",
    });
  };

  const handleAddNewSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDocumentData = {
        title: formData.title,
        document_type: formData.document_type,
        shelf: selectedShelfId,
        storage: selectedStorageId,

      };
      await apiRequest("POST", `/document-create/`, newDocumentData);
      setShowAddNewModal(false);
      // Refresh document list after adding new document
      await fetchDocuments();
      setFormData({
        id: null,
        title: "",
        document_type: "",
        storage: "",
        shelf: "",
      });
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await apiRequest(
          "GET",
          `/documents-by-shelf/${selectedShelfId}/`
        );
        let storageId = data.storage_id;
        let shelfId = data.shelf_id;
        let displayData = data.documents.map((doc) => ({
          ...doc,
          storage: storageId,
          shelf: shelfId,
        }));
        setDocumentListSection(displayData);
        // You can set the documents to state here if needed
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (selectedShelfId) {
      fetchDocuments();
    }
  }, [selectedShelfId]);

  useEffect(() => {
    // Add event listener for action buttons
    const handleActionClick = (e) => {
      if (e.target.dataset.action) {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;

        if (action === "update") {
          handleClickUpdate(id);
        } else if (action === "delete") {
          handleClickDelete(id);
        }
      }
    };
    document.addEventListener("click", handleActionClick);
    return () => document.removeEventListener("click", handleActionClick);
  }, [documentListSection]);

  return (
    <div className="document-list-container">
      <h2 className="">Document List</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={() => setActiveList("shelf")}
        >
          BACK
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddNewModal(true)}
        >
          + ADD DOCUMENT
        </button>
      </div>

      <Grid
        columns={documentColumns}
        data={documentListSection}
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

      {/* Modals for Add, Update, Delete can be implemented here */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this document?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteConfirm()}
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
                <h5 className="modal-title">Update Document</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClickCloseUpdateModal}
                ></button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Document ID</label>
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
                    <label className="form-label">Document Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Document Type</label>
                    <select
                      className="form-select"
                      name="document_type"
                      value={formData.document_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          document_type: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select type</option>
                      <option value="report">Report</option>
                      <option value="invoice">Invoice</option>
                      <option value="contract">Contract</option>
                      <option value="memo">Memo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Shelf</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ backgroundColor: "#e9ecef" }}
                      name="shelf"
                      value={formData.shelf}
                      onChange={(e) =>
                        setFormData({ ...formData, shelf: e.target.value })
                      }
                      readOnly
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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClickCloseUpdateModal}
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

      {showAddNewModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Document</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseAddNew}
                ></button>
              </div>
              <form onSubmit={handleAddNewSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Document Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Document Type</label>
                    <select
                      className="form-select"
                      name="document_type"
                      value={formData.document_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          document_type: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select type</option>
                      <option value="report">Report</option>
                      <option value="invoice">Invoice</option>
                      <option value="contract">Contract</option>
                      <option value="memo">Memo</option>
                    </select>
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
                    Add Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DocumentList;
