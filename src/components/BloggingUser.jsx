import React, { useEffect, useState } from "react";
import { Table, Modal, Popconfirm } from "antd";
import { toast } from "react-toastify";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";

const BloggingUser = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/blog-users/');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/blog-users/delete/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const undoDeleteUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/blog-users/restore/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error restoring user:', error);
      throw error;
    }
  };

  useEffect(() => {
    getAllUsers().then(setUsers).catch(() => {
      toast.error("Failed to fetch users");
    });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      toast.success("User deleted");
      getAllUsers().then(setUsers);
    });
  };

  const handleUndo = (id) => {
    undoDeleteUser(id).then(() => {
      toast.success("User restored");
      getAllUsers().then(setUsers);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {!record.isDeleted ? (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <button className="text-red-500 hover:text-red-700" title="Delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </Popconfirm>
          ) : (
            <button
              onClick={() => handleUndo(record._id)}
              className="text-green-500 hover:text-green-700"
              title="Undo Delete"
            >
              <FontAwesomeIcon icon={faUndo} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const activeUsers = users.filter(user => !user.isDeleted);
  const deletedUsers = users.filter(user => user.isDeleted);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registered Users</h1>
      <Table
        columns={columns}
        dataSource={activeUsers}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        className="rounded-lg shadow mb-8"
      />

      <h2 className="text-lg font-semibold mb-4 text-gray-700">Deleted Users</h2>
      <Table
        columns={columns}
        dataSource={deletedUsers}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        className="rounded-lg shadow"
      />
    </div>
  );
};

export default BloggingUser;
