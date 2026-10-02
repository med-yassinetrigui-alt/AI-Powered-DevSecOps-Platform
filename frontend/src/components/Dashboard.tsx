import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Bug, Activity, ArrowRight, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              Live Environment
            </span>
            <span className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Online
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Security Overview
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 font-medium">
            Real-time threat analysis and autonomous AI remediation.
          </motion.p>
        </div>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`px-6 py-3 rounded-xl font-medium transition-all shadow-lg flex items-center gap-2 ${
            isScanning 
              ? 'bg-blue-600/50 text-blue-200 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
          }`}
          onClick={simulateScan}
          disabled={isScanning}
        >
          {isScanning ? <Activity className="w-5 h-5 animate-pulse" /> : <Zap className="w-5 h-5" />}
          {isScanning ? 'Analyzing Repo...' : 'Run Security Scan'}
        </motion.button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Security Score" value="A-" subtitle="Excellent condition" color="text-emerald-400" icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />} delay={0.1} />
        <StatCard title="Critical Risks" value="0" subtitle="Resolved by AI" color="text-rose-400" icon={<ShieldAlert className="w-8 h-8 text-rose-400" />} delay={0.2} />
        <StatCard title="High Risks" value="2" subtitle="Pending review" color="text-amber-400" icon={<Bug className="w-8 h-8 text-amber-400" />} delay={0.3} />
        <StatCard title="Total Findings" value="14" subtitle="Across 3 repositories" color="text-blue-400" icon={<Activity className="w-8 h-8 text-blue-400" />} delay={0.4} />
      </div>

      {/* Main Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        
        {/* Remediations List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="xl:col-span-2 glass-panel rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xl font-bold text-slate-100">Recent AI Actions</h3>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">View all</button>
          </div>
          <div className="space-y-4 relative z-10">
            <RemediationItem 
              title="Hardcoded AWS Access Key" 
              desc="Removed plaintext AKIA key and replaced with environment variable."
              repo="backend/auth.py" 
              status="Merged" 
              time="2 hours ago" 
              iconColor="text-rose-400"
              bg="bg-rose-500/10"
              border="border-rose-500/20"
            />
            <RemediationItem 
              title="Missing Groq Attribution" 
              desc="Added Powered by Groq text to README.md file."
              repo="README.md" 
              status="PR Open" 
              time="5 hours ago" 
              iconColor="text-blue-400"
              bg="bg-blue-500/10"
              border="border-blue-500/20"
            />
            <RemediationItem 
              title="SQL Injection Vulnerability" 
              desc="Sanitized user input using parameterized SQLAlchemy queries."
              repo="backend/database.py" 
              status="Merged" 
              time="1 day ago" 
              iconColor="text-amber-400"
              bg="bg-amber-500/10"
              border="border-amber-500/20"
            />
          </div>
        </motion.div>
        
        {/* Analytics & Risk */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel rounded-3xl p-8 border border-slate-700/50 flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Risk Distribution</h3>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            <ProgressBar label="Critical" percentage={5} value="0" color="bg-rose-500" glow="shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <ProgressBar label="High" percentage={15} value="2" color="bg-amber-500" glow="shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <ProgressBar label="Medium" percentage={40} value="5" color="bg-yellow-500" glow="shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <ProgressBar label="Low" percentage={80} value="7" color="bg-emerald-500" glow="shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              AI Agents have successfully remediated <strong className="text-slate-200">92%</strong> of critical vulnerabilities this week.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, color, icon, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel p-6 rounded-3xl border border-slate-700/50 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-800/30 rounded-full blur-2xl group-hover:bg-slate-700/30 transition-colors"></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/50 shadow-inner">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h4 className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">{title}</h4>
        <div className={`text-5xl font-black mb-2 tracking-tighter ${color}`}>{value}</div>
        <p className="text-sm font-medium text-slate-500">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function RemediationItem({ title, desc, repo, status, time, iconColor, bg, border }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className={`flex items-start justify-between p-5 rounded-2xl bg-slate-800/20 hover:bg-slate-800/40 transition-all border ${border} cursor-pointer group`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${bg} shrink-0 mt-1`}>
          <Bug className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <h4 className="font-bold text-slate-100 mb-1 text-lg group-hover:text-blue-400 transition-colors">{title}</h4>
          <p className="text-sm text-slate-400 mb-2 leading-relaxed max-w-lg">{desc}</p>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="px-2.5 py-1 bg-slate-900/50 rounded-md border border-slate-700/50">{repo}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
          status === 'Merged' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        } flex items-center gap-1.5`}>
          {status === 'Merged' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
          {status}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ label, percentage, value, color, glow }) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        <span className="text-sm font-bold text-slate-500 group-hover:text-slate-300 transition-colors">{value}</span>
      </div>
      <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className={`h-full ${color} ${glow} rounded-full`}
        ></motion.div>
      </div>
    </div>
  );
}
