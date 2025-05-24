import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin } from 'antd';
import axios from 'axios';
import { Tag } from 'antd'; // import this if not already

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null); // blog id being marked

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/blogs/getBlogs');
      if (res.data.success) {
        console.log(res.data.data)
        setBlogs(res.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch blogs.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchMostBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/blogs/getMarkMostLiked');
      if (res.data.success) {
        console.log(res.data.data)
        setBlogs(res.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch blogs.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostBlogs();
  }, []);

  // Handle marking blog as most liked
  const markAsMostLiked = async (blogId) => {
    setMarking(blogId);
    try {
      const res = await axios.put(`http://localhost:8080/api/blogs/markMostLiked/${blogId}`);
      if (res.data.success) {
        message.success('Marked as most liked!');
        fetchBlogs(); // refresh blogs
      } else {
        message.error('Failed to mark blog.');
      }
    } catch (error) {
      message.error('Error occurred while marking.');
      console.error(error);
    } finally {
      setMarking(null);
    }
  };

  // Table columns

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'About',
    dataIndex: 'about',
    key: 'about',
  },
  {
    title: 'Liked Status',
    key: 'likedStatus',
    render: (_, record) => (
      record.mostLiked ? (
        <Tag color="green">Most Liked</Tag>
      ) : (
        <Tag color="red">Not Liked</Tag>
      )
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Button
        type="primary"
        loading={marking === record._id}
        onClick={() => markAsMostLiked(record._id)}
      >
        Mark as Most Liked
      </Button>
    ),
  },
];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Blogs</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="_id"
          bordered
        />
      )}
    </div>
  );
};

export default Blogs;
