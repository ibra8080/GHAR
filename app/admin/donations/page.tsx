"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle, XCircle, Clock, Download, Search, Filter } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = "ghar2026admin";

type Donor = {
  id: string;
  name: string;
  email: string;
  amount: number;
  donation_type: string;
  project: string;
  payment_method: string;
  status: string;
  created_at: string;
};

export default function AdminDonationsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const fetchDonors = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("donors")
      .select("*")
      .order("created_at", { ascending: false });
    setDonors(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchDonors(); // eslint-disable-line react-hooks/set-state-in-effect
    }, [authenticated]);

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from("donors").update({ status: newStatus }).eq("id", id);
    fetchDonors();
  };

  const filtered = donors.filter((d) => {
    const matchSearch = d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchMethod = filterMethod === "all" || d.payment_method === filterMethod;
    return matchSearch && matchStatus && matchMethod;
  });

  const stats = {
    total: donors.length,
    pending: donors.filter(d => d.status === "pending").length,
    completed: donors.filter(d => d.status === "completed").length,
    totalAmount: donors.filter(d => d.status === "completed").reduce((sum, d) => sum + (d.amount || 0), 0),
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Amount", "Type", "Project", "Payment Method", "Status", "Date"];
    const rows = filtered.map(d => [
      d.name, d.email, d.amount, d.donation_type, d.project,
      d.payment_method, d.status, new Date(d.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ghar-donations.csv";
    a.click();
  };

  const statusBadge = (status: string) => {
    if (status === "completed") return <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle size={12} />Completed</span>;
    if (status === "cancelled") return <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full"><XCircle size={12} />Cancelled</span>;
    return <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full"><Clock size={12} />Pending</span>;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-dark mb-2 text-center">Admin Access</h1>
          <p className="text-gray-400 text-sm text-center mb-8">GHAR Foundation — Donations Dashboard</p>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {passwordError && <p className="text-red-500 text-xs text-center">Incorrect password</p>}
            <button onClick={handleLogin}
              className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold text-sm transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark">Donations Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">GHAR Foundation — Admin Panel</p>
          </div>
          <button onClick={exportCSV}
            className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-gray-400 text-xs mb-1">Total Donations</p>
            <p className="text-2xl font-bold text-dark">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-gray-400 text-xs mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-gray-400 text-xs mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-gray-400 text-xs mb-1">Total Received</p>
            <p className="text-2xl font-bold text-primary">€{stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search by name or email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm focus:outline-none w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
              <option value="all">All Methods</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No donations found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Name</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Email</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Amount</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Project</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Method</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Status</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Date</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((donor) => (
                    <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-dark">{donor.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{donor.email}</td>
                      <td className="px-4 py-3 text-sm font-bold text-primary">€{donor.amount}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{donor.project}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                          {donor.payment_method || 'paypal'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{statusBadge(donor.status)}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(donor.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {donor.status !== "completed" && (
                            <button onClick={() => updateStatus(donor.id, "completed")}
                              className="text-xs bg-green-50 text-green-600 hover:bg-green-100 px-2 py-1 rounded-lg transition-colors">
                              ✅ Complete
                            </button>
                          )}
                          {donor.status !== "cancelled" && (
                            <button onClick={() => updateStatus(donor.id, "cancelled")}
                              className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded-lg transition-colors">
                              ❌ Cancel
                            </button>
                          )}
                          {donor.status !== "pending" && (
                            <button onClick={() => updateStatus(donor.id, "pending")}
                              className="text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 px-2 py-1 rounded-lg transition-colors">
                              🕐 Pending
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}