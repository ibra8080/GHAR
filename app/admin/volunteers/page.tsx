"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle, XCircle, Clock, Download, Search, Filter, ExternalLink, FileText } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ghar2026admin";

const CALENDLY_LINKS = {
  ibrahim: "https://calendly.com/ibrahim-m-abusaif",
  eman: "https://calendly.com/eman-saad",
};

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  specialty: string;
  availability: string;
  message: string;
  linkedin_url: string;
  cv_url: string;
  status: string;
  notes: string;
  interviewer: string;
  created_at: string;
};

export default function AdminVolunteersPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [detailsPopup, setDetailsPopup] = useState<Volunteer | null>(null);
  const [approvePopup, setApprovePopup] = useState<Volunteer | null>(null);
  const [rejectPopup, setRejectPopup] = useState<Volunteer | null>(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState<"ibrahim" | "eman">("ibrahim");
  const [sending, setSending] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const fetchVolunteers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });
    setVolunteers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchVolunteers(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [authenticated]);

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from("volunteers").update({ status: newStatus }).eq("id", id);
    fetchVolunteers();
  };

  const handleApprove = async () => {
    if (!approvePopup) return;
    setSending(true);

    await supabase.from("volunteers").update({
      status: "approved",
      interviewer: selectedInterviewer,
    }).eq("id", approvePopup.id);

    await fetch("/api/send-volunteer-approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: approvePopup.name,
        email: approvePopup.email,
        calendlyLink: CALENDLY_LINKS[selectedInterviewer],
        interviewer: selectedInterviewer === "ibrahim" ? "Ibrahim Abusaif" : "Eman Saad",
      }),
    });

    setSending(false);
    setApprovePopup(null);
    fetchVolunteers();
  };

  const handleReject = async () => {
    if (!rejectPopup) return;
    setSending(true);

    await supabase.from("volunteers").update({ status: "rejected" }).eq("id", rejectPopup.id);

    await fetch("/api/send-volunteer-rejection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: rejectPopup.name,
        email: rejectPopup.email,
      }),
    });

    setSending(false);
    setRejectPopup(null);
    fetchVolunteers();
  };

  const specialties = [...new Set(volunteers.map(v => v.specialty).filter(Boolean))];

  const filtered = volunteers.filter((v) => {
    const matchSearch = v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase()) ||
      v.country?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    const matchSpecialty = filterSpecialty === "all" || v.specialty === filterSpecialty;
    return matchSearch && matchStatus && matchSpecialty;
  });

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === "pending").length,
    approved: volunteers.filter(v => v.status === "approved").length,
    rejected: volunteers.filter(v => v.status === "rejected").length,
    interviewed: volunteers.filter(v => v.status === "interviewed").length,
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Country", "Specialty", "Availability", "LinkedIn", "Status", "Date"];
    const rows = filtered.map(v => [
      v.name, v.email, v.phone || '', v.country, v.specialty,
      v.availability, v.linkedin_url || '', v.status,
      new Date(v.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ghar-volunteers.csv";
    a.click();
  };

  const statusBadge = (status: string) => {
    if (status === "approved") return <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle size={12} />Approved</span>;
    if (status === "rejected") return <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full"><XCircle size={12} />Rejected</span>;
    if (status === "interviewed") return <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"><CheckCircle size={12} />Interviewed</span>;
    return <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full"><Clock size={12} />Pending</span>;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-dark mb-2 text-center">Admin Access</h1>
          <p className="text-gray-400 text-sm text-center mb-8">GHAR Foundation — Admin Panel</p>
          <div className="flex flex-col gap-4">
            <input type="password" placeholder="Enter admin password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
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
            <h1 className="text-2xl font-bold text-dark">Volunteers Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">GHAR Foundation — Admin Panel</p>
          </div>
          <button onClick={exportCSV}
            className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-dark" },
            { label: "Pending", value: stats.pending, color: "text-yellow-500" },
            { label: "Approved", value: stats.approved, color: "text-green-500" },
            { label: "Rejected", value: stats.rejected, color: "text-red-500" },
            { label: "Interviewed", value: stats.interviewed, color: "text-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search by name, email or country..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm focus:outline-none w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="interviewed">Interviewed</option>
            </select>
            <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
              <option value="all">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Approve Popup */}
        {approvePopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
              <h3 className="text-lg font-bold text-dark mb-2">✅ Approve Volunteer</h3>
              <p className="text-gray-400 text-sm mb-6">
                Send interview invitation to <strong>{approvePopup.name}</strong>
              </p>
              <p className="text-xs text-gray-400 mb-3">Select interviewer:</p>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { key: "ibrahim" as const, label: "Ibrahim Abusaif", link: CALENDLY_LINKS.ibrahim },
                  { key: "eman" as const, label: "Eman Saad", link: CALENDLY_LINKS.eman },
                ].map(({ key, label, link }) => (
                  <button key={key}
                    onClick={() => setSelectedInterviewer(key)}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors text-sm ${selectedInterviewer === key ? "border-primary bg-primary/5 text-primary font-medium" : "border-gray-200 text-gray-600"}`}>
                    <span>{label}</span>
                    <span className="text-xs text-gray-400 truncate max-w-32">{link}</span>
                  </button>
                ))}
              </div>
              {sending ? (
                <div className="text-center text-gray-400 text-sm py-4">Sending...</div>
              ) : (
                <>
                  <button onClick={handleApprove}
                    className="w-full bg-primary hover:bg-secondary text-white py-2.5 rounded-lg text-sm font-medium transition-colors mb-2">
                    ✅ Approve & Send Invitation
                  </button>
                  <button onClick={() => setApprovePopup(null)}
                    className="w-full text-gray-300 hover:text-dark text-xs transition-colors mt-1">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Reject Popup */}
        {rejectPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
              <h3 className="text-lg font-bold text-dark mb-2">❌ Reject Volunteer</h3>
              <p className="text-gray-400 text-sm mb-6">
                Send rejection email to <strong>{rejectPopup.name}</strong>?
              </p>
              {sending ? (
                <div className="text-center text-gray-400 text-sm py-4">Sending...</div>
              ) : (
                <>
                  <button onClick={handleReject}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mb-2">
                    ❌ Reject & Send Email
                  </button>
                  <button onClick={async () => {
                    await supabase.from("volunteers").update({ status: "rejected" }).eq("id", rejectPopup.id);
                    setRejectPopup(null);
                    fetchVolunteers();
                  }} className="w-full border border-gray-200 text-gray-400 hover:text-dark py-2.5 rounded-lg text-sm transition-colors mb-2">
                    Reject without email
                  </button>
                  <button onClick={() => setRejectPopup(null)}
                    className="w-full text-gray-300 hover:text-dark text-xs transition-colors mt-1">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Details Popup */}
        {detailsPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-dark mb-6">👤 {detailsPopup.name}</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">Email</span>
                  <span className="text-dark">{detailsPopup.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-dark">{detailsPopup.phone || '—'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">Country</span>
                  <span className="text-dark">{detailsPopup.country}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">Specialty</span>
                  <span className="text-dark">{detailsPopup.specialty}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-dark">{detailsPopup.availability}</span>
                </div>
                {detailsPopup.linkedin_url && (
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400">LinkedIn</span>
                    <a href={detailsPopup.linkedin_url} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline">View Profile</a>
                  </div>
                )}
                {detailsPopup.cv_url && (
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400">CV</span>
                    <a href={detailsPopup.cv_url} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline">Download CV</a>
                  </div>
                )}
                {detailsPopup.message && (
                  <div className="flex flex-col gap-1 border-b border-gray-50 pb-2">
                    <span className="text-gray-400">Message</span>
                    <p className="text-dark leading-relaxed bg-gray-50 rounded-lg p-3 mt-1">
                      {detailsPopup.message}
                    </p>
                  </div>
                )}
                {detailsPopup.interviewer && (
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400">Interviewer</span>
                    <span className="text-dark capitalize">{detailsPopup.interviewer}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2">
                  <span className="text-gray-400">Applied</span>
                  <span className="text-dark">{new Date(detailsPopup.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setDetailsPopup(null)}
                className="w-full mt-6 text-gray-400 hover:text-dark text-sm transition-colors border border-gray-200 rounded-lg py-2">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No volunteers found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Name</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Email</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Phone</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Country</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Specialty</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Availability</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Links</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Status</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Date</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-dark">{volunteer.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{volunteer.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{volunteer.phone || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{volunteer.country}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{volunteer.specialty}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{volunteer.availability}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {volunteer.linkedin_url && (
                            <a href={volunteer.linkedin_url} target="_blank" rel="noopener noreferrer"
                              className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors">
                              <ExternalLink size={10} />LinkedIn
                            </a>
                          )}
                          {volunteer.cv_url && (
                            <a href={volunteer.cv_url} target="_blank" rel="noopener noreferrer"
                              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors">
                              <FileText size={10} />CV
                            </a>
                          )}
                          {!volunteer.linkedin_url && !volunteer.cv_url && <span className="text-xs text-gray-300">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">{statusBadge(volunteer.status)}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(volunteer.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setDetailsPopup(volunteer)}
                            className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors font-medium">
                            👁 View
                          </button>
                          {volunteer.status === "pending" && (
                            <>
                              <button onClick={() => setApprovePopup(volunteer)}
                                className="text-xs bg-green-50 text-green-600 hover:bg-green-100 px-2 py-1.5 rounded-lg transition-colors font-medium">
                                ✅ Approve
                              </button>
                              <button onClick={() => setRejectPopup(volunteer)}
                                className="text-xs bg-red-50 text-red-500 hover:bg-red-100 px-2 py-1.5 rounded-lg transition-colors font-medium">
                                ❌ Reject
                              </button>
                            </>
                          )}
                          {volunteer.status === "approved" && (
                            <button onClick={() => updateStatus(volunteer.id, "interviewed")}
                              className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1.5 rounded-lg transition-colors font-medium">
                              🎤 Mark Interviewed
                            </button>
                          )}
                          {(volunteer.status === "rejected" || volunteer.status === "interviewed") && (
                            <span className="text-xs text-gray-300">—</span>
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