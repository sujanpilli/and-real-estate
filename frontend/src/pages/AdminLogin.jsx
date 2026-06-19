import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Lock } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.login(data.username, data.password);
      localStorage.setItem('token', response.data.access_token);
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-slate-900 dark:bg-slate-850 text-white dark:text-yellow-400 rounded-xl mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Admin Login</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm font-medium">Access the control panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Username</label>
            <input 
              {...register('username')}
              type="text" 
              className={`w-full border ${errors.username ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all`}
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Password</label>
            <input 
              {...register('password')}
              type="password" 
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all`}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-yellow-400 text-white dark:text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-yellow-300 transition-colors disabled:opacity-70 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
