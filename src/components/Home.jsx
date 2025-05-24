import React from 'react'
import '../index.css'

import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Avatar, Button, Layout, Menu, theme } from 'antd';
import User from './User';
import Dashboard from './Dashboard';
import Quizzes from './Quizzes';
import Blogs from './Blogs';
import Avatars from './Avatars';
import Tasks from './Tasks';
import BloggingUser from './BloggingUser';




const Home = () => {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [path, setPath]=useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


const HandleMenu =(items)=>{
  console.log(items);
  setPath(items.key);
}


  return (
    <>
   <Layout className=" h-screen" >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical "  />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'users',
              // name:'users',
              icon: <UserOutlined />,
              label: 'Users',
            },
            {
              key: 'dashboard',
              // name:'students',
              icon: <VideoCameraOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'quiz',
              icon: <UploadOutlined />,
              label: 'Quize',
            },
           
            {
              key: 'blogs',
              icon: <UploadOutlined />,
              label: 'Blogs',
            },
            {
              key: 'badges',
              icon: <UploadOutlined />,
              label: 'Badges',
            },
            {
              key: 'blogging-users',
              icon:  <UserOutlined />,
              label: 'Blog Users',
            },
            {
              key: 'tasks',
              icon:  <UploadOutlined />,
              label: 'Daily Tasks',
            },
          ]}
          onClick={HandleMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content  */}
          {path ==='users'? <User/> :null}
          {path ==='dashboard'? <Dashboard/> :null}
          {path ==='quiz'? <Quizzes/> :null}
          {path ==='blogs'? <Blogs/> :null}
          {path ==='badges'? <Avatars/> :null}
          {path ==='blogging-users'? <BloggingUser/> :null}
          
          {path ==='tasks'? <Tasks/> :null}
          
        </Content>
      </Layout>
    </Layout>
    
  </>
  )
}

export default Home