import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm} from "antd";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks/all");
      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task handler
  const handleAddTask = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/api/tasks/add", values);
      if (res.data.success) {
        toast.success("Task added successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchTasks();
      }
    } catch (err) {
      console.error("Error adding task", err);
      toast.error("Failed to add task");
    }
  };

  //delete task
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    toast.success("Task deleted successfully");
    fetchTasks(); // Refresh the list
  } catch (error) {
    toast.error("Failed to delete task");
  }
};


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <img src={img} alt="task" className="w-20 h-14 rounded object-cover" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => <span className="line-clamp-2">{desc}</span>,
    },
    {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        {/* Optional: Edit button */}
        {/* <Button icon={<EditOutlined />} /> */}

        {/* Delete button with confirmation */}
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      </div>
    ),
  },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daily Tasks Management</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
         + Add New Task
        </Button>
      </div>

      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* Add Task Modal */}
      <Modal
        title="Add New Task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={handleAddTask} form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter description" autoSize={{ minRows: 3 }} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter an image URL" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full mt-2">
            Add Task
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
