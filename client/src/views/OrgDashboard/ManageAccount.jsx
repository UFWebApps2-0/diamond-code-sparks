import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ManageAccount.less"; // Import the styles

export default function ManageAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  return (
    <div id="container nav-padding">
      {" "}
      {/* Use the id for styling */}
      <NavBar />
      <div id="manage-account">
        {" "}
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          {/* // Add more options as needed */}
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* // Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* // Replace this with actual data */}
            <tr>
              <td>John Doe</td>
              <td>john.doe@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
