import { useContext } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";

const ShelfList = () => {
  const { setActiveList } = useContext(DocStoreContext);
  return (
    <div className="storage-list-container">
      <h2 className="">Shelf List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => setActiveList("storage")}>BACK</button>
        <button className="btn btn-primary">+ ADD SHELF</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Storage ID</th>
            <th>Storage</th>
            <th>Type of document</th>
            <th>Location</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample document types: Legal, Accounting, Technical, HR, Contract, Invoice, Policy, Blueprint */}
          <tr>
            <td>1</td>
            <td>Main Storage</td>
            <td>Legal</td>
            <td>New York</td>
            <td>2025-01-15</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Backup Storage</td>
            <td>Accounting</td>
            <td>Los Angeles</td>
            <td>2025-02-20</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Cloud Storage</td>
            <td>Technical</td>
            <td>Online</td>
            <td>2025-03-10</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Archive Storage</td>
            <td>Physical</td>
            <td>Chicago</td>
            <td>2025-04-05</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Contracts Vault</td>
            <td>Contract</td>
            <td>Houston</td>
            <td>2025-05-12</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Finance Dept</td>
            <td>Invoice</td>
            <td>Seattle</td>
            <td>2025-06-18</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setActiveList("document")}
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShelfList;
