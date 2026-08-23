'use client';
import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { changePassword } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword({ currentPassword, newPassword });
      setMessage(res.data?.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-100/80 shadow-sm/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/tasks" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Tasky Logo" width={32} height={32} className="object-contain transition-transform group-hover:scale-110" priority />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Tasky</h1>
          </Link>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/tasks" className="text-gray-500 hover:text-gray-900 font-medium transition-colors text-base">
              Dashboard
            </Link>
            <span className="text-[#63ba54] font-semibold text-base">Settings</span>
            <button
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors text-base"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 max-w-lg mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Security</h2>
            <p className="text-gray-500 text-sm mb-8">Update your password to keep your account secure.</p>

            {error && (
              <div className="w-full mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100/50">
                {error}
              </div>
            )}
            {message && (
              <div className="w-full mb-8 p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-medium border border-green-100/50 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#63ba54]" />
                {message}
              </div>
            )}
            <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
              <div className="space-y-1.5 relative">
                <label className="block text-sm font-semibold text-gray-700">Current Password</label>
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? 'text' : 'password'} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm pr-10"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5 relative">
                <label className="block text-sm font-semibold text-gray-700">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm pr-10"
                    placeholder="Create new password"
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
                <label className="block text-sm font-semibold text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 focus:border-[#63ba54] focus:bg-white focus:ring-4 focus:ring-[#63ba54]/10 transition-all text-sm pr-10"
                    placeholder="Confirm new password"
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
                className="mt-6 w-full py-3.5 rounded-xl bg-[#63ba54] hover:bg-[#54a646] text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
