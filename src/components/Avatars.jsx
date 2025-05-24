import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const Avatars = () => {
  const [badges, setBadges] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  //  Fetch badges using Axios
 const fetchBadges = async () => {
  try {
    const res = await axios.get("/api/badges");
    // If your backend returns { badges: [...] }, use this:
    setBadges(res.data.badges);  

    // If your backend returns plain array, then:
    // setBadges(res.data);
  } 
  catch (error) {
    toast.error("Failed to load badges");
  }
};


  useEffect(() => {
    fetchBadges();
  }, []);

  // Submit new badge using Axios
  const onFinish = async (values) => {
    try {
      await axios.post("/api/badges", values);
      toast.success("Badge added successfully");
      setModalVisible(false);
      form.resetFields();
      fetchBadges(); // refresh table
    } 
    catch (error) {
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
