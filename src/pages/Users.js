import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">User Management</h2>
      <div className="row g-4">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{user.name}</h3>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Users;