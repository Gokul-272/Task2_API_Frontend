'use client';
import React, { useState, Suspense } from 'react';
import { Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '../../api/auth.api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({ newPassword, token });
      setMessage(res.data?.message || 'Password reset successful!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 sm:p-10 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Reset Password</h2>

        {error && <div className="w-full mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100/50">{error}</div>}

        {message ? (
          <div className="w-full flex flex-col items-center">
            <CheckCircle2 size={48} className="text-[#63ba54] mb-4" />
            <p className="text-green-700 font-medium mb-8 text-center">{message}</p>
            <Link href="/login" className="w-full py-3.5 rounded-xl bg-[#63ba54] hover:bg-[#54a646] text-white font-bold transition-colors flex items-center justify-center text-sm">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="w-full flex flex-col gap-5">
            <div className="space-y-1.5 relative">
              <label className="block text-sm font-semibold text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-[#63ba54] hover:bg-[#54a646] text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
