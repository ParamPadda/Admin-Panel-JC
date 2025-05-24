import React, { useEffect, useState } from 'react';
import { Table, Modal, Form, Input, Button, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchQuestions = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/quiz/all');
    if (data.success) {
      setQuestions(data.quizzes); // Assuming backend returns { success: true, quizzes: [...] }
    } else {
      toast.error("Failed to load quizzes.");
    }
  } catch (error) {
    toast.error("Failed to fetch questions");
  }
};


  const addQuestion = async (values) => {
  try {
    const payload = {
      question: values.question,
      options: [values.option1, values.option2, values.option3, values.option4],
      correctAnswerIndex: parseInt(values.correctIndex),
    };

    const { data } = await axios.post('http://localhost:8080/api/quiz/add', payload);

    if (data.success) {
      toast.success("Question added successfully!");
      form.resetFields();
      setIsModalVisible(false);
      fetchQuestions();
    } else {
      toast.error(data.message || "Failed to add question");
    }
  } catch (error) {
    toast.error("Error adding question");
  }
};


  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Options',
      render: (_, record) => record.options.join(', '),
    },
    {
      title: 'Correct Index',
      dataIndex: 'correctAnswerIndex',
      key: 'correctAnswerIndex',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Button
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={() => handleDelete(record._id)}
          danger
        />
      ),
    },
  ];

 const handleDelete = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:8080/api/quiz/${id}`);
    if (data.success) {
      toast.success("Deleted successfully");
      fetchQuestions();
    } else {
      toast.error("Delete failed");
    }
  } catch {
    toast.error("Failed to delete");
  }
};


  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Quiz Question Manager</h2>
        <Button
          icon={<FontAwesomeIcon icon={faPlus} />}
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add Question
        </Button>
      </div>

      <Table dataSource={questions} columns={columns} rowKey="_id" />

      <Modal
        title="Add New Quiz Question"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={addQuestion}>
          <Form.Item name="question" label="Question" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="option1" label="Option 1" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="option2" label="Option 2" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="option3" label="Option 3" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="option4" label="Option 4" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="correctIndex"
            label="Correct Option Index (0-3)"
            rules={[{ required: true, pattern: /^[0-3]$/, message: 'Enter 0, 1, 2, or 3' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Save Question
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Quizzes;
