import React, { useState } from 'react';
import { Shield, LayoutDashboard, AlertTriangle, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 glass-panel border-r border-slate-800/50 flex flex-col z-20">
        <div className="p-6 flex items-center gap-4 border-b border-slate-800/50">
          <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/20">
            <Shield className="text-blue-400 w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              DevSecOps
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-0.5">AI Platform</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<AlertTriangle />} label="Vulnerabilities" active={activeTab === 'vulns'} onClick={() => setActiveTab('vulns')} />
          <NavItem icon={<Activity />} label="CI/CD Pipelines" active={activeTab === 'scans'} onClick={() => setActiveTab('scans')} />
        </nav>
        
        <div className="p-6">
          <div className="glass-panel rounded-2xl p-4 text-sm text-slate-400 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
            <p className="relative z-10 font-medium text-slate-300">Powered by Groq</p>
            <p className="relative z-10 text-xs mt-1.5 text-slate-500">Model: Llama-3-70B</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {/* Lueur de fond décorative */}
        <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
        
        <div className="p-10 relative z-20 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab !== 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
              <Activity className="w-16 h-16 text-slate-700 mb-4" />
              <h2 className="text-xl font-medium text-slate-400">Module under construction</h2>
              <p className="text-sm mt-2">Database integration pending...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default App;
