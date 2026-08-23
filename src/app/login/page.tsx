'use client';
import React, { useState } from 'react';
import { Mail, Lock, User, Square, Circle, Triangle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../api/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginApi({ email, password });
      login();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl min-h-[500px]">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex flex-1 relative items-center justify-center p-10 bg-white">
          <div className="w-80 h-80 bg-gray-50 rounded-full flex items-center justify-center relative">
            
            {/* Laptop Illustration */}
            <div className="w-48 h-32 bg-gray-600 rounded-lg flex items-center justify-center relative shadow-[inset_0_0_0_6px_#374151]">
              <User size={56} className="text-gray-400" strokeWidth={1.5} />
              
              {/* Laptop base */}
              <div className="absolute -bottom-[12px] w-[220px] h-[10px] bg-gray-200 rounded-b-lg border-t-[3px] border-gray-300"></div>
            </div>
            
          </div>
          
          {/* Decorative Floating Shapes */}
          <Circle size={20} className="absolute text-blue-500 top-1/4 left-1/4" strokeWidth={3} />
          <Triangle size={20} className="absolute text-green-500 bottom-1/3 left-1/4 -rotate-12" strokeWidth={3} />
          <Triangle size={20} className="absolute text-green-500 top-1/3 right-1/4 rotate-45" strokeWidth={3} />
          <Square size={16} className="absolute text-gray-300 top-1/4 right-1/3 rotate-12" strokeWidth={3} />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Tasky</h2>
          
          {error && <div className="w-full max-w-sm mb-6 p-3 bg-red-100 text-red-600 rounded-xl text-center text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
            
            {/* Email Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-14">
              <Mail className="text-gray-500 mr-3" size={20} />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-14 relative">
              <Lock className="text-gray-500 mr-3" size={20} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 h-14 rounded-full bg-[#63ba54] hover:bg-[#52a344] text-white font-bold text-lg tracking-wide transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
            
            <div className="flex justify-center mt-4">
              <Link href="/forgot-password" className="text-gray-600 hover:text-[#63ba54] text-sm font-medium transition-colors">
                Forgot Username / Password?
              </Link>
            </div>
          </form>

          {/* Create Account Link */}
          <div className="mt-8">
            <Link href="/register" className="text-gray-600 hover:text-[#63ba54] text-sm font-medium transition-colors flex items-center gap-1">
              Create your Account <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
