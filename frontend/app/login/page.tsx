"use client"
import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ShoppingBag } from 'lucide-react';
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
import {setUser, logout} from '@/lib/features/auth/authSlice'



type AuthMode = 'login' | 'signup';
import type { LoginFormData, SignupFormData } from '@/types/types';
import { useSignInMutation, useSignUpMutation } from '@/lib/features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';

const LoginSignupPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [signIn, {data: loginDataResponse, isLoading: loginLoading, error: loginError}] = useSignInMutation()
  const [signUp, {data: signupDataResponse, isLoading: signupLoading, error: signupError}] = useSignUpMutation()

  const {user, token} = useSelector((state: any) => state.auth)
  

  const router = useRouter()
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async () => {
    try {
      const result = await signIn(loginData).unwrap()
      dispatch(setUser(result))
      localStorage.setItem("token", result.token)
      router.push("/")
      toast.success("Logged in successfully")

    } catch (error) {
      toast.error("Something went wrong")
      // dispatch(logout())
      console.log(error);
    }
  };

  const handleSignupSubmit = async () => {
    setLoading(true);
    try {
      if(signupData.password !== signupData.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
      const signupDataNew = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      }
      
      const result = await signUp(signupDataNew).unwrap()
      console.log(result);
      toast.success("Account created successfully. Please log in.");
      setLoading(false);
      
      
    } catch (error: any) {
      console.log(signupError);
      if('data' in error && 'message' in error.data) {
        toast.error(error.data.message)
      } else {
        toast.error("Something went wrong")
      }
      
      setLoading(false)
      
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-500 rounded-l-3xl p-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <ShoppingBag className="text-green-600" size={32} />
              </div>
              <h1 className="text-4xl font-bold">gocart</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome to Your Marketplace</h2>
            <p className="text-green-100 text-lg mb-8">
              Buy and sell with confidence. Join thousands of sellers and shoppers in our trusted community.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Payments</h3>
                  <p className="text-green-100 text-sm">Your transactions are safe and encrypted</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Fast Delivery</h3>
                  <p className="text-green-100 text-sm">Get your products delivered quickly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quality Products</h3>
                  <p className="text-green-100 text-sm">Browse thousands of verified products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="bg-white rounded-3xl lg:rounded-l-none lg:rounded-r-3xl shadow-2xl p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">gocart</h1>
            </div>

            {mode === 'login' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 mb-8">Sign in to continue to your account</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">Forgot password?</a>
                  </div>

                  <button
                    onClick={handleLoginSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium text-gray-700">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium text-gray-700">
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                  </div>

                  <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <button onClick={toggleMode} className="text-green-600 hover:text-green-700 font-semibold">
                      Sign up for free
                    </button>
                  </p>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-8">Join our marketplace today</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1" />
                    <label className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-green-600 hover:text-green-700 font-medium">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-green-600 hover:text-green-700 font-medium">Privacy Policy</a>
                    </label>
                  </div>

                  <button
                    onClick={handleSignupSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>

                  <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <button onClick={toggleMode} className="text-green-600 hover:text-green-700 font-semibold">
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;