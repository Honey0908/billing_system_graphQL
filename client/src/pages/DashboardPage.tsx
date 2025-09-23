import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Statistic,
  Space,
} from 'antd';
import {
  LogoutOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Firm {
  id: string;
  name: string;
  email: string;
}

const DashboardPage: React.FC = () => {
  // Check if user is authenticated
  const token = localStorage.getItem('authToken');
  const userStr = localStorage.getItem('user');
  const firmStr = localStorage.getItem('firm');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user: User | null = userStr ? JSON.parse(userStr) : null;
  const firm: Firm | null = firmStr ? JSON.parse(firmStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('firm');
    navigate('/login');
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileTextOutlined className="text-white text-lg" />
          </div>
          <div>
            <Title level={4} className="!mb-0 !text-neutral-800">
              {firm?.name || 'Billing System'}
            </Title>
            <Text type="secondary" className="text-xs">
              {user?.role === 'ADMIN' ? 'Administrator' : 'Staff Member'}
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <Text className="block text-sm font-medium">{user?.name}</Text>
            <Text type="secondary" className="text-xs">
              {user?.email}
            </Text>
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </Button>
        </div>
      </Header>

      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <Title level={2} className="!mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </Title>
            <Text type="secondary" className="text-base">
              Here's what's happening with your billing system today.
            </Text>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200">
                <Statistic
                  title="Total Bills"
                  value={24}
                  prefix={<FileTextOutlined className="text-indigo-600" />}
                  valueStyle={{ color: '#4f46e5' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200">
                <Statistic
                  title="Total Revenue"
                  value={12458}
                  prefix={<DollarOutlined className="text-emerald-600" />}
                  precision={2}
                  valueStyle={{ color: '#059669' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center bg-gradient-to-br from-purple-50 to-violet-100 border-violet-200">
                <Statistic
                  title="Products"
                  value={18}
                  prefix={<ShoppingOutlined className="text-violet-600" />}
                  valueStyle={{ color: '#7c3aed' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center bg-gradient-to-br from-orange-50 to-amber-100 border-amber-200">
                <Statistic
                  title="Team Members"
                  value={5}
                  prefix={<TeamOutlined className="text-amber-600" />}
                  valueStyle={{ color: '#d97706' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <span className="flex items-center gap-2">
                    <FileTextOutlined className="text-indigo-600" />
                    Quick Actions
                  </span>
                }
                className="h-full"
              >
                <Space direction="vertical" className="w-full" size="middle">
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                  >
                    Create New Bill
                  </Button>
                  {user?.role === 'ADMIN' && (
                    <Button size="large" block>
                      Add New Product
                    </Button>
                  )}
                  <Button size="large" block>
                    View All Bills
                  </Button>
                  <Button size="large" block>
                    View Products
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <span className="flex items-center gap-2">
                    <FileTextOutlined className="text-emerald-600" />
                    Recent Activity
                  </span>
                }
                className="h-full"
              >
                <Space direction="vertical" className="w-full">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <div>
                      <Text className="block font-medium">
                        Bill #001 created
                      </Text>
                      <Text type="secondary" className="text-xs">
                        2 hours ago
                      </Text>
                    </div>
                    <Text strong className="text-emerald-600">
                      $234.50
                    </Text>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <div>
                      <Text className="block font-medium">
                        Product "Widget A" added
                      </Text>
                      <Text type="secondary" className="text-xs">
                        1 day ago
                      </Text>
                    </div>
                    <Text strong className="text-blue-600">
                      $45.00
                    </Text>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <div>
                      <Text className="block font-medium">
                        Bill #002 created
                      </Text>
                      <Text type="secondary" className="text-xs">
                        2 days ago
                      </Text>
                    </div>
                    <Text strong className="text-emerald-600">
                      $567.25
                    </Text>
                  </div>
                  <div className="text-center mt-4">
                    <Button type="link" size="small">
                      View All Activity
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
