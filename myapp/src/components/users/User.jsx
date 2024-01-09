import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser } from "../../redux/actions/UserAction";
import axios from "axios";
import "./user.css";

const User = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchAllPermissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/user/allpermissions"
      );
      setPermissions(response.data.userPermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const fetchAllUserPermissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/user/allUserpermissions"
      );
      setUserPermissions(response.data.userPermissions);
    } catch (error) {
      console.error("Error fetching userPermissions:", error);
    }
  };

  useEffect(() => {
    async function getData() {
      await fetchAllPermissions();
      // await fetchAllUserPermissions();
      await usersLoginData();
    }

    getData();
  }, []);

  useEffect(() => {
    const storedOptions =
      JSON.parse(localStorage.getItem("selectedOptions")) || {};
    setSelectedOptions(storedOptions);

    dispatch(allUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.userReducer);
  const [backUsers, setBackUsers] = useState([]);

  const usersLoginData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/v1/user");
      setBackUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handlePermissionChangeNew = async (userId, permissionId, e) => {
    try {
      const response = await axios.put(
        "http://localhost:8001/api/v1/user/updatePermission",
        { userId: userId, permissionId: permissionId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Data send::::", response);

      if (response.data.success) {
        const existingUserPermissionIndex = userPermissions.findIndex(
          (uP) => uP.userId === userId && uP.permissionId === permissionId
        );

        if (existingUserPermissionIndex !== -1) {
          const updatedUserPermissions = [...userPermissions];
          updatedUserPermissions.splice(existingUserPermissionIndex, 1);
          setUserPermissions(updatedUserPermissions);
        } else {
          const newUserPermission = {
            userId: userId,
            permissionId: permissionId,
          };
          setUserPermissions([...userPermissions, newUserPermission]);
        }
      } else {
        console.log(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error handling permission change:", error);
    }
  };

  return (
    <>
      <section className="users">
        <div className="user-wrapper section-spacing">
          <h1>All Users</h1>
          {backUsers && (
            <ul>
              {backUsers.map((userData) => (
                <li key={userData.user_id}>
                  <strong>Name:</strong> {userData.name},{" "}
                  <strong>Email:</strong> {userData.email}
                  {permissions?.map((permission, i) => (
                    <div key={i}>
                      <input
                        type="checkbox"
                        checked={userPermissions.some(
                          (uP) =>
                            uP.userId === userData.user_id &&
                            uP.permissionId === permission.per_id
                        )}
                        onChange={(e) =>
                          handlePermissionChangeNew(
                            userData.user_id,
                            permission.per_id
                          )
                        }
                      />
                      {permission?.name}
                    </div>
                  ))}
                  <button
                    onClick={() => dispatch(deleteUser(userData.user_id))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default User;
