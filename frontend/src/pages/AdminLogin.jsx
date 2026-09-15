import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect immediately
  React.useEffect(() => {
    if (admin) {
      const target = location.state?.from?.pathname || '/admin';
      navigate(target, { replace: true });
    }
  }, [admin, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both administrative username and password');
      return;
    }

    setSubmitting(true);
    setError('');

    const res = await login(username.trim(), password);
    setSubmitting(false);

    if (res.success) {
      const target = location.state?.from?.pathname || '/admin';
      navigate(target, { replace: true });
    } else {
      setError(res.message || 'Authentication rejected. Verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0105] text-[#E9DFD2] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-[#120309] border border-[#241018] p-8 sm:p-10 shadow-2xl relative">
        {/* Subtle decorative accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9AB81]/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C9AB81]/40" />

        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#241018] border border-[#C9AB81]/30 flex items-center justify-center mx-auto text-[#C9AB81]">
            <Lock size={20} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9AB81] block">
            Studio Management Portal
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] uppercase tracking-wide">
            MM DECOR STUDIO
          </h1>
          <p className="text-xs text-[#8C817A]">
            Administrative access for project, gallery, and inquiry records.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#2a1016] border border-[#852a39] text-[#fca5a5] text-xs leading-relaxed rounded-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Administrator username"
              className="w-full px-4 py-3 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C9AB81]/10 disabled:opacity-50"
          >
            {submitting ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>Enter Studio Portal</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#241018] text-center">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-widest text-[#8C817A] hover:text-[#C9AB81] transition-colors"
          >
            ← Return to Public Studio Website
          </Link>
        </div>
      </div>
    </div>
  );
};
