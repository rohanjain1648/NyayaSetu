import React, { useState } from 'react';
import { IndianRupee, FileText, Plus, Download, TrendingUp, Users, CheckCircle, Clock, Search, ArrowRight } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
}

export const NyayaKosh: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [caseDetails, setCaseDetails] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Appearance Fee - High Court', amount: 55000 }
  ]);
  
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemAmount, setNewItemAmount] = useState<string>('');

  const handleAddItem = () => {
    if (!newItemDesc || !newItemAmount) return;
    setItems([...items, { id: Date.now().toString(), description: newItemDesc, amount: Number(newItemAmount) }]);
    setNewItemDesc('');
    setNewItemAmount('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 fade-in">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '₹ 8,45,000', icon: TrendingUp, trend: '+12% from last month', color: 'text-emerald-600' },
          { label: 'Outstanding Dues', value: '₹ 1,20,000', icon: Clock, trend: '4 Invoices Pending', color: 'text-amber-600' },
          { label: 'Active Retainers', value: '12', icon: Users, trend: '2 Renewing this month', color: 'text-blue-600' },
          { label: 'Invoices Paid', value: '48', icon: CheckCircle, trend: 'This Quarter', color: 'text-slate-600' }
        ].map((metric, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</div>
              <div className={`p-2 rounded-lg bg-slate-50 ${metric.color}`}>
                <metric.icon size={18} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div className="text-xs font-medium text-slate-500 mt-1">{metric.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileText className="text-slate-400" /> Invoice Generator
                </h2>
                <p className="text-sm text-slate-500 mt-1">Create professional fee notes and bills.</p>
              </div>
              <button className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition flex items-center gap-2">
                <Download size={14} /> Export PDF
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Reliance Industries Ltd."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Case Reference</label>
                  <input
                    type="text"
                    value={caseDetails}
                    onChange={(e) => setCaseDetails(e.target.value)}
                    placeholder="e.g., SLP (C) No. 1234/2026"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Description</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider w-32 text-right">Amount (₹)</th>
                      <th className="py-3 px-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{item.description}</td>
                        <td className="py-3 px-4 text-sm font-bold text-slate-900 text-right">{item.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 font-bold text-lg">&times;</button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={newItemDesc}
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          placeholder="Add new line item..."
                          className="w-full bg-transparent border-0 text-sm font-medium focus:ring-0 p-0 placeholder-slate-400"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={newItemAmount}
                          onChange={(e) => setNewItemAmount(e.target.value)}
                          placeholder="Amount"
                          className="w-full bg-transparent border-0 text-sm font-bold text-right focus:ring-0 p-0 placeholder-slate-400"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={handleAddItem} className="p-1.5 rounded-lg bg-black text-white hover:bg-slate-800 transition">
                          <Plus size={14} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm font-semibold text-slate-600">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-slate-900 border-t border-slate-200 pt-3">
                    <span>Total Due</span>
                    <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Invoices & Retainers */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Invoices</h3>
              <button className="text-slate-400 hover:text-slate-900"><Search size={16} /></button>
            </div>
            <div className="space-y-4">
              {[
                { client: 'Tata Consultancy', date: '02 Sep 2026', amount: '₹ 1,50,000', status: 'Paid' },
                { client: 'Larsen & Toubro', date: '28 Aug 2026', amount: '₹ 75,000', status: 'Pending' },
                { client: 'Infosys Ltd', date: '15 Aug 2026', amount: '₹ 2,10,000', status: 'Paid' }
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer group">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{inv.client}</div>
                    <div className="text-xs text-slate-500 font-medium">{inv.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900">{inv.amount}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${inv.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {inv.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
              View All Invoices <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Pro Tip</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automate your billing cycle by connecting NyayaKosh with your bank account. The system will automatically reconcile payments and update invoice statuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
