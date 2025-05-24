import React, { useState, useEffect } from "react";
import "../index.css";
import axios from 'axios';

import { Button, Modal, Checkbox, Form, Input, Select,Space, Table, Tag } from "antd";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
       // 1. Registering the user
      console.log("📤 Sending data:", values);
      const response = await axios.post("http://localhost:8080/api/admin/register", values);

      console.log("✅ Success:", response.data);
       // 2. Send verification email
    const emailResponse = await axios.post("http://localhost:8080/api/email/send-verification", {
      email: values.email 
    });

    if (emailResponse.data.success) {
      console.log("📧 Verification email sent.");
    } else {
      console.warn("⚠️ Email not sent.");
    }
    //3. fetching registered users
      fetchAdmins();
    } catch (error) {
      if (error.response) {
        console.error("🚨 Signup failed:", error.response.data); // Logs exact error from backend
      } else {
        console.error("❌ Network error:", error.message);
      }
    }
  };
  //ant design form
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name', //map function nu replace krke use krlea (dataIndex name should be same as backend name ,role etc )
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    ,
   
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      email: 32,
      role: 'Sydney No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 32,
      role: 'Sydney No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      email: 32,
      role: 'Sydney No. 1 Lake Park',
     
    },
  ];

  //fetching data from backend 
  
    const [admins, setAdmins] = useState([]);
    // console.log(admins)
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/register');
        setAdmins(response.data); // store data in state
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
  
    useEffect(() => {
    
  
      fetchAdmins();
    }, []);
  

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Register
      </Button>
      <Modal
        open={open}
        title="Admin Form"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key="back" onClick={handleCancel}>
          //   Cancel
          // </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}
          // >
          //   Submit
          // </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role"rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}>
            <Select>
              <Select.Option value="Trainer">Trainer</Select.Option>
              <Select.Option value="User">User</Select.Option>
              <Select.Option value="Parents">Parents</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Register Admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>

        {/* <div className="admins mt-7">
        <h2>Admin Panel - Registered Admins</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div> */}
        <Table columns={columns} dataSource={admins} rowKey="_id" />

    </>
  );
};





export default User;
