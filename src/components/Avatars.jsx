import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const Avatars = () => {
  const [badges, setBadges] = useState([]);
  const [users, setUsers] = useState([]); // Added users state
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch badges
  const fetchBadges = async () => {
    try {
      const res = await axios.get("/api/badges");
      setBadges(res.data.badges); // adjust if your response is plain array
    } catch (error) {
      toast.error("Failed to load badges");
    }
  };

  // Fetch users to assign badges
  const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/blog-users/"); // Same as in Registered Users
    const data = res.data;

    // If your backend returns { users: [...] }
    if (Array.isArray(data.users)) {
      setUsers(data.users);
    } else if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
      toast.error("Unexpected user data format");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users");
  }
};


  useEffect(() => {
    fetchBadges();
    fetchUsers(); // Load users when component mounts
  }, []);

  // Submit new badge
  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:8080/api/badges", values);
      toast.success("Badge added successfully");
      setModalVisible(false);
      form.resetFields();
      fetchBadges();
    } catch (error) {
      toast.error("Failed to add badge");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) =>
        assignedTo ? `${assignedTo.name} (${assignedTo.email})` : "Not Assigned",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Badges Management</h2>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          + Add New Badge
        </Button>
      </div>

      <Table dataSource={badges} columns={columns} rowKey="_id" />

      <Modal
        title="Add New Badge"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Badge Title"
            name="title"
            rules={[{ required: true, message: "Please enter badge title" }]}
          >
            <Input placeholder="Pro Blogger" />
          </Form.Item>

          <Form.Item
            label="FontAwesome Icon Class"
            name="icon"
            rules={[{ required: true, message: "Please enter icon class" }]}
          >
            <Input placeholder="fa-star" />
          </Form.Item>

          <Form.Item
            label="Color (Tailwind)"
            name="color"
            initialValue="yellow-400"
          >
            <Select>
              <Select.Option value="yellow-400">Yellow</Select.Option>
              <Select.Option value="blue-400">Blue</Select.Option>
              <Select.Option value="green-400">Green</Select.Option>
              <Select.Option value="red-400">Red</Select.Option>
              <Select.Option value="purple-400">Purple</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Assign to User"
            name="assignedTo"
            rules={[{ required: true, message: "Please select a user" }]}
          >
            <Select placeholder="Choose a user">
              {(users || []).map((user) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Badge
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Avatars;
