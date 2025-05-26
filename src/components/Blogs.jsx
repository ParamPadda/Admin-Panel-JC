// import React, { useEffect, useState } from 'react';
// import { Table, Button, message, Spin, Alert, Tag } from 'antd';
// import axios from 'axios';

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [marking, setMarking] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch blogs with better error handling
//   const fetchBlogs = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log("Fetching blogs from API...");
//       const res = await axios.get('http://localhost:8080/api/blogs/getBlogs');
//       console.log("API Response:", res.data);
      
//       if (res.data.success) {
//         setBlogs(res.data.data || []);
//         if (res.data.data.length === 0) {
//           message.info('No blogs found in the database.');
//         } else {
//           message.success(`Successfully loaded ${res.data.data.length} blogs`);
//         }
//       } else {
//         setError('API returned success: false');
//         message.error('Failed to fetch blogs: API returned success false');
//       }
//     } catch (error) {
//       console.error('Fetch blogs error:', error);
//       console.error('Error response:', error.response);
      
//       let errorMessage = 'Failed to fetch blogs.';
//       if (error.response) {
//         errorMessage += ` Status: ${error.response.status}`;
//         if (error.response.data && error.response.data.message) {
//           errorMessage += `. ${error.response.data.message}`;
//         }
//       } else if (error.request) {
//         errorMessage += ' No response from server.';
//       } else {
//         errorMessage += ` ${error.message}`;
//       }
      
//       setError(errorMessage);
//       message.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle marking blog as most liked
//   const markAsMostLiked = async (blogId) => {
//     setMarking(blogId);
//     try {
//       const res = await axios.put(`http://localhost:8080/api/blogs/markMostLiked/${blogId}`);
//       if (res.data.success) {
//         message.success('Marked as most liked!');
//         fetchBlogs(); // refresh blogs
//       } else {
//         message.error('Failed to mark blog.');
//       }
//     } catch (error) {
//       console.error('Mark as most liked error:', error);
//       message.error('Error occurred while marking.');
//     } finally {
//       setMarking(null);
//     }
//   };

//   // Table columns
//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       width: '20%',
//     },
//     {
//       title: 'About',
//       dataIndex: 'about',
//       key: 'about',
//       width: '30%',
//       render: (text) => (
//         <div style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: 'Media',
//       key: 'media',
//       width: '15%',
//       render: (_, record) => (
//         <div>
//           {record.hasImage && <Tag color="blue">Image</Tag>}
//           {record.hasAudio && <Tag color="green">Audio</Tag>}
//         </div>
//       ),
//     },
//     {
//       title: 'Likes',
//       dataIndex: 'likes',
//       key: 'likes',
//       width: '10%',
//     },
//     {
//       title: 'Status',
//       key: 'likedStatus',
//       width: '15%',
//       render: (_, record) => (
//         record.mostLiked ? (
//           <Tag color="gold">Most Liked</Tag>
//         ) : (
//           <Tag color="default">Regular</Tag>
//         )
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: '10%',
//       render: (_, record) => (
//         <Button
//           type="primary"
//           size="small"
//           loading={marking === record._id}
//           onClick={() => markAsMostLiked(record._id)}
//           disabled={record.mostLiked}
//         >
//           {record.mostLiked ? 'Featured' : 'Feature'}
//         </Button>
//       ),
//     },
//   ];

//   if (error) {
//     return (
//       <div className="p-4">
//         <Alert
//           message="Error Loading Blogs"
//           description={error}
//           type="error"
//           showIcon
//           action={
//             <Button size="small" onClick={fetchBlogs}>
//               Retry
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Blog Management</h2>
//         <Button onClick={fetchBlogs} loading={loading}>
//           Refresh
//         </Button>
//       </div>
      
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={blogs}
//           rowKey="_id"
//           bordered
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Blogs;


import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin, Alert, Tag } from 'antd';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blogs with better error handling
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching blogs from API...");
      const res = await axios.get('http://localhost:8080/api/blogs/getBlogs');
      console.log("API Response:", res.data);
      
      if (res.data.success) {
        setBlogs(res.data.data || []);
        if (res.data.data.length === 0) {
          message.info('No blogs found in the database.');
        } else {
          message.success(`Successfully loaded ${res.data.data.length} blogs`);
        }
      } else {
        setError('API returned success: false');
        message.error('Failed to fetch blogs: API returned success false');
      }
    } catch (error) {
      console.error('Fetch blogs error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'Failed to fetch blogs.';
      if (error.response) {
        errorMessage += ` Status: ${error.response.status}`;
        if (error.response.data && error.response.data.message) {
          errorMessage += `. ${error.response.data.message}`;
        }
      } else if (error.request) {
        errorMessage += ' No response from server.';
      } else {
        errorMessage += ` ${error.message}`;
      }
      
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle marking/unmarking blog as most liked
  const markAsMostLiked = async (blogId) => {
    setMarking(blogId);
    try {
      const res = await axios.put(`http://localhost:8080/api/blogs/markMostLiked/${blogId}`);
      if (res.data.success) {
        message.success(res.data.message);
        fetchBlogs(); // refresh blogs
      } else {
        message.error('Failed to update blog status.');
      }
    } catch (error) {
      console.error('Mark as most liked error:', error);
      message.error('Error occurred while updating blog status.');
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
      width: '25%',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      width: '40%',
      render: (text) => (
        <div style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
      width: '10%',
    },
    {
      title: 'Status',
      key: 'likedStatus',
      width: '15%',
      render: (_, record) => (
        record.mostLiked ? (
          <Tag color="gold">Featured</Tag>
        ) : (
          <Tag color="default">Regular</Tag>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_, record) => (
        <Button
          type={record.mostLiked ? "default" : "primary"}
          size="small"
          loading={marking === record._id}
          onClick={() => markAsMostLiked(record._id)}
        >
          {record.mostLiked ? 'Unfeature' : 'Feature'}
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Error Loading Blogs"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={fetchBlogs}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Blog Management</h2>
        <Button onClick={fetchBlogs} loading={loading}>
          Refresh
        </Button>
      </div>
      
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
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      )}
    </div>
  );
};

export default Blogs;