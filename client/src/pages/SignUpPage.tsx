import React, { useActionState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Row, Col } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  PhoneOutlined,
  BankOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface SignUpFormValues {
  // Firm details
  firmName: string;
  firmEmail: string;
  firmPhone?: string;
  firmAddress?: string;
  // Admin details
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
}

interface FormState {
  success: boolean;
  error: string | null;
}

interface SignUpFormProps {
  onSuccess?: () => void;
}

const initialState: FormState = { success: false, error: null };

async function simulateSignUp(values: SignUpFormValues): Promise<FormState> {
  await new Promise((r) => setTimeout(r, 1200));
  if (values.firmEmail === 'exists@example.com') {
    return { success: false, error: 'Firm with this email already exists.' };
  }
  if (values.adminPassword !== values.confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }
  return { success: true, error: null };
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm<SignUpFormValues>();
  const action = async (
    _: FormState,
    formData: SignUpFormValues
  ): Promise<FormState> => {
    const result = await simulateSignUp(formData);
    if (result.success) {
      onSuccess?.();
    }
    return result;
  };
  const [state, formAction, isPending] = useActionState<
    FormState,
    SignUpFormValues
  >(action, initialState);

  const onFinish = (values: SignUpFormValues) => {
    formAction(values);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/40 via-pink-400/30 to-indigo-400/30 rounded-2xl blur-lg opacity-60" />
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl p-8">
        <div className="text-center mb-6">
          <Title level={3} style={{ marginBottom: 4 }}>
            Create Your Account
          </Title>
          <Text type="secondary">Set up your firm and admin account</Text>
        </div>

        {state.error && (
          <div className="mb-4">
            <Alert type="error" showIcon message={state.error} />
          </div>
        )}
        {state.success && (
          <div className="mb-4">
            <Alert
              type="success"
              showIcon
              message="Account created successfully!"
            />
          </div>
        )}

        <Form<SignUpFormValues>
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Firm Information Section */}
          <div className="mb-6">
            <Title level={5} className="!mb-4 flex items-center gap-2">
              <BankOutlined className="text-indigo-600" />
              Firm Information
            </Title>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Firm Name</span>}
                  name="firmName"
                  rules={[
                    { required: true, message: 'Please enter firm name' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<BankOutlined className="text-neutral-400" />}
                    placeholder="Your Firm Name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Firm Email</span>}
                  name="firmEmail"
                  rules={[
                    { required: true, message: 'Please enter firm email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined className="text-neutral-400" />}
                    placeholder="firm@example.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Phone (Optional)</span>}
                  name="firmPhone"
                >
                  <Input
                    size="large"
                    prefix={<PhoneOutlined className="text-neutral-400" />}
                    placeholder="+1 (555) 123-4567"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-medium">Address (Optional)</span>
                  }
                  name="firmAddress"
                >
                  <Input
                    size="large"
                    prefix={
                      <EnvironmentOutlined className="text-neutral-400" />
                    }
                    placeholder="123 Business St, City"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Admin Account Section */}
          <div className="mb-6">
            <Title level={5} className="!mb-4 flex items-center gap-2">
              <UserOutlined className="text-purple-600" />
              Admin Account
            </Title>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Admin Name</span>}
                  name="adminName"
                  rules={[
                    { required: true, message: 'Please enter admin name' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="text-neutral-400" />}
                    placeholder="John Doe"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Admin Email</span>}
                  name="adminEmail"
                  rules={[
                    { required: true, message: 'Please enter admin email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined className="text-neutral-400" />}
                    placeholder="admin@example.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Password</span>}
                  name="adminPassword"
                  rules={[
                    { required: true, message: 'Please enter password' },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    prefix={<LockOutlined className="text-neutral-400" />}
                    placeholder="••••••••"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-medium">Confirm Password</span>}
                  name="confirmPassword"
                  dependencies={['adminPassword']}
                  rules={[
                    { required: true, message: 'Please confirm password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue('adminPassword') === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Passwords do not match!')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    prefix={<LockOutlined className="text-neutral-400" />}
                    placeholder="••••••••"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isPending}
            className="!h-11 font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
          >
            Create Account
          </Button>

          <div className="text-center text-sm mt-4">
            <Text type="secondary">Already have an account? </Text>
            <Link
              to="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </Form>
      </div>
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-4 w-56 h-56 bg-pink-300/30 rounded-full blur-3xl" />
    </div>
  );
};

const SignUpPage: React.FC = () => {
  // Check if user is already authenticated
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUpSuccess = () => {
    // Use navigate instead of window.location.href
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <SignUpForm onSuccess={handleSignUpSuccess} />
      </div>
    </div>
  );
};

export default SignUpPage;
