import { useContext, useEffect, useState } from 'react';
import { Link as ReactRouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routePaths } from '../../constants/routePaths';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginRequest } from '../../api/generatedSdk';
import { usersApi } from '../../api';
import { UserContext, UserInfo } from '../../contexts/UserContext';
import { Box, TextField, Link as MuiLink } from '@mui/material';
import { PageTitle } from '../../components/pageTitle';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';

export type RouterState = {
  errorMessage?: string;
};

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const [credentialsAreValid, setCredentialsAreValid] = useState(false);
  const navigate = useNavigate();

  const state = useLocation().state as RouterState | null;

  if (state?.errorMessage) {
    toast.error(state.errorMessage, {
      toastId: 'loginPageErrorMessage',
    });
  }

  useEffect(() => {
    // clear the state
    navigate(routePaths.login, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email must be a valid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values: FormValues) => {
      await loginMutation.mutateAsync(values);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const loginRequest: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      const loginResult = await usersApi.login({ loginRequest });
      const userInfo: UserInfo = {
        userId: loginResult.user.id,
        fiatCurrency: loginResult.user.fiatCurrencyTypeName,
        token: loginResult.accessToken,
      };
      setUserInfo(userInfo);
      setCredentialsAreValid(true);
    },
    onError: () => {
      toast.error('Invalid email or password', {
        toastId: 'invalidCredentials',
      });
    },
  });

  if (credentialsAreValid) return <Navigate replace to={routePaths.home} />;

  return (
    <Box component="form" sx={{ margin: '0 auto', maxWidth: '375px' }} onSubmit={formik.handleSubmit}>
      <PageTitle sx={{ textAlign: 'center', marginBottom: '1rem' }}> Login </PageTitle>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label="Email"
          size="small"
          required
          {...formik.getFieldProps('email')}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
          fullWidth
          label="Password"
          size="small"
          type="password"
          required
          {...formik.getFieldProps('password')}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loginMutation.isPending}
          disabled={!formik.isValid || !formik.dirty}
        >
          Sign In
        </LoadingButton>
        <MuiLink component={ReactRouterLink} to={routePaths.signUp}>
          Need an account? Sign up
        </MuiLink>
        <MuiLink component={ReactRouterLink} to={routePaths.resetPasswordStepOne}>
          Forgot your password? Reset it
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Login;
