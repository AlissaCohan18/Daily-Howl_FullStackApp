import { useEffect, useState } from "react";
import Photo from "../component/Photo";
import MemeForm from "../component/MemeForm";

const Dashboard = () => {
 
    const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Your Dashboard</h1>
      {users && users.map((user) => <p key={user._id}>{user.email}</p>)}
    </div>
  );
};

export default Dashboard;