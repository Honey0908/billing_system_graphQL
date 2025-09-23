import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Alert,
  Row,
  Col,
  Tooltip,
} from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ShopOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface SignUpValues {
  firmName: string;
  firmEmail: string;
  firmPhone?: string;
  firmAddress?: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
}

const passwordRules = [
  { required: true, message: 'Password is required' },
  { min: 6, message: 'Minimum 6 characters' },
];

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm<SignUpValues>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onFinish = (values: SignUpValues) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    setTimeout(() => {
      if (values.firmEmail === 'exists@example.com') {
        setError('A firm with this email already exists.');
      } else {
        setSuccess(true);
        form.resetFields(['adminPassword', 'confirmPassword']);
      }
      setSubmitting(false);
    }, 1100);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-cyan-400/30 rounded-2xl blur-lg opacity-60" />
      <div className="relative rounded-2xl bg-white/85 backdrop-blur-sm border border-white/50 shadow-xl p-10">
        <div className="text-center mb-8">
          <Title level={3} style={{ marginBottom: 4 }}>
            Create Your Firm
          </Title>
          <Text type="secondary">
            Set up your firm and administrator account
          </Text>
        </div>

        {/* ...rest of your code... */}
        <Form<SignUpValues>
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <div className="mb-2">
            <Divider
              orientation="left"
              orientationMargin={0}
              className="!text-xs text-neutral-400"
            >
              Firm Information
            </Divider>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Firm Name</span>}
                name="firmName"
                rules={[{ required: true, message: 'Enter firm name' }]}
              >
                <Input
                  size="large"
                  prefix={<ShopOutlined className="text-neutral-400" />}
                  placeholder="Acme Corp"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Firm Email</span>}
                name="firmEmail"
                rules={[
                  { required: true, message: 'Enter firm email' },
                  { type: 'email', message: 'Invalid email' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-neutral-400" />}
                  placeholder="billing@acme.com"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Phone</span>}
                name="firmPhone"
              >
                <Input
                  size="large"
                  prefix={<PhoneOutlined className="text-neutral-400" />}
                  placeholder="+1 555 123 4567"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Address</span>}
                name="firmAddress"
              >
                <Input
                  size="large"
                  prefix={<InfoCircleOutlined className="text-neutral-400" />}
                  placeholder="123 Market St"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="mt-4 mb-2">
            <Divider
              orientation="left"
              orientationMargin={0}
              className="!text-xs text-neutral-400"
            >
              Administrator Account
            </Divider>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Admin Name</span>}
                name="adminName"
                rules={[{ required: true, message: 'Enter admin name' }]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="text-neutral-400" />}
                  placeholder="Jane Doe"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Admin Email</span>}
                name="adminEmail"
                rules={[
                  { required: true, message: 'Enter admin email' },
                  { type: 'email', message: 'Invalid email' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-neutral-400" />}
                  placeholder="jane@acme.com"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <span className="font-medium flex items-center gap-2">
                    Password
                    <Tooltip title="Minimum 6 characters.">
                      <InfoCircleOutlined className="text-neutral-400" />
                    </Tooltip>
                  </span>
                }
                name="adminPassword"
                rules={passwordRules}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="text-neutral-400" />}
                  placeholder="••••••••"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-medium">Confirm Password</span>}
                name="confirmPassword"
                dependencies={['adminPassword']}
                hasFeedback
                rules={[
                  { required: true, message: 'Confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('adminPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Passwords do not match')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="text-neutral-400" />}
                  placeholder="••••••••"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          {error && (
            <Alert className="mt-4" message={error} type="error" showIcon />
          )}
          {success && (
            <Alert
              className="mt-4"
              message="Firm created successfully!"
              type="success"
              showIcon
            />
          )}
          <Form.Item className="mt-6 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
            >
              Create Firm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
