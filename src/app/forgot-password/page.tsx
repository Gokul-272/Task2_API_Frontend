'use client';
import React, { useState, Suspense } from 'react';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { forgotPassword } from '../../api/auth.api';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      setMessage(res.data?.message || 'Password reset link sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 sm:p-10 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-8 text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && <div className="w-full mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100/50">{error}</div>}
        {message && <div className="w-full mb-6 p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-medium border border-green-100/50">{message}</div>}

        <form onSubmit={handleForgot} className="w-full flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full py-3.5 rounded-xl bg-[#63ba54] hover:bg-[#54a646] text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8">
          <Link href="/login" className="text-gray-400 hover:text-[#63ba54] text-sm transition-colors">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
