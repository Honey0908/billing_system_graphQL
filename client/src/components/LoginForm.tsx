import React, { useActionState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface FormState {
  success: boolean;
  error: string | null;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

const initialState: FormState = { success: false, error: null };

async function simulateLogin(values: LoginFormValues): Promise<FormState> {
  await new Promise((r) => setTimeout(r, 900));
  if (values.email === 'fail@example.com') {
    return { success: false, error: 'Invalid credentials supplied.' };
  }
  return { success: true, error: null };
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm<LoginFormValues>();
  const action = async (
    _: FormState,
    formData: LoginFormValues
  ): Promise<FormState> => {
    const result = await simulateLogin(formData);
    if (result.success) {
      onSuccess?.();
    }
    return result;
  };
  const [state, formAction, isPending] = useActionState<
    FormState,
    LoginFormValues
  >(action, initialState);

  const onFinish = (values: LoginFormValues) => {
    formAction(values);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/40 via-purple-400/30 to-pink-400/30 rounded-2xl blur-lg opacity-60" />
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl p-8">
        <div className="text-center mb-6">
          <Title level={3} style={{ marginBottom: 4 }}>
            Sign In
          </Title>
          <Text type="secondary">Access your billing dashboard</Text>
        </div>

        {state.error && (
          <div className="mb-4">
            <Alert type="error" showIcon message={state.error} />
          </div>
        )}
        {state.success && (
          <div className="mb-4">
            <Alert type="success" showIcon message="Login successful (demo)" />
          </div>
        )}

        <Form<LoginFormValues>
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label={<span className="font-medium">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-neutral-400" />}
              placeholder="you@example.com"
              allowClear
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
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

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isPending}
            className="!h-11 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          >
            Sign In
          </Button>

          <div className="text-center text-sm">
            <Text type="secondary">Don't have an account? </Text>
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </div>
        </Form>
      </div>
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-4 w-56 h-56 bg-indigo-300/30 rounded-full blur-3xl" />
    </div>
  );
};

export default LoginForm;
