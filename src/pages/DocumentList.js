import { useContext } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";
const DocumentList = () => {
  const { setActiveList } = useContext(DocStoreContext);

  return (
    <div className="document-list-container">
      <h2 className="">Document List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => setActiveList("shelf")}  >BACK</button>
        <button className="btn btn-primary">+ ADD DOCUMENT</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Document Name</th>
            <th>Type of document</th>
            <th>Shelf ID</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample document types: Legal, Accounting, Technical, HR, Contract, Invoice, Policy, Blueprint */}
          <tr>
            <td>1</td>
            <td>Contract Agreement</td>
            <td>Contract</td>
            <td>101</td>
            <td>2025-01-15</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Financial Report Q1 2025</td>
            <td>Invoice</td>
            <td>102</td>
            <td>2025-02-20</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Technical Specification Doc</td>
            <td>Technical</td>
            <td>103</td>
            <td>2025-03-10</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Employee Handbook</td>
            <td>HR</td>
            <td>104</td>
            <td>2025-04-05</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Company Policy Update</td>
            <td>Policy</td>
            <td>105</td>
            <td>2025-05-12</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Project Blueprint</td>
            <td>Blueprint</td>
            <td>106</td>
            <td>2025-06-18</td>
            <td>
              <button className="btn btn-sm btn-secondary">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DocumentList;
