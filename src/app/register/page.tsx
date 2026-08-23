'use client';
import React, { useState } from 'react';
import { Mail, Lock, User, Square, Circle, Triangle, Eye, EyeOff } from 'lucide-react';
import { register } from '../../api/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl min-h-[600px]">

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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tasky</h2>

          {error && <div className="w-full max-w-sm mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-center text-sm">{error}</div>}
          {success && <div className="w-full max-w-sm mb-4 p-3 bg-green-100 text-green-600 rounded-xl text-center text-sm">Account created successfully! Redirecting...</div>}

          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">

            {/* Name Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-12">
              <User className="text-gray-500 mr-3" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-12">
              <Mail className="text-gray-500 mr-3" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-12 relative">
              <Lock className="text-gray-500 mr-3" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 text-sm pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 h-12 relative">
              <Lock className="text-gray-500 mr-3" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 text-sm pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="mt-4 h-14 rounded-full bg-[#63ba54] hover:bg-[#52a344] text-white font-bold text-lg tracking-wide transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8">
            <Link href="/login" className="text-gray-600 hover:text-[#63ba54] text-sm font-medium transition-colors flex items-center gap-1">
              &larr; Back to Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
