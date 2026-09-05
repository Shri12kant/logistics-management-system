import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function Admin() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/contact");
            setContacts(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Sanitize string to prevent Excel Formula Injection (CSV injection attacks)
    const sanitizeExcelField = (val) => {
        if (val === null || val === undefined) return "";
        const str = String(val).trim();
        if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@") || str.startsWith("\t")) {
            return `'${str}`;
        }
        return str;
    };

    const exportToExcel = () => {
        if (contacts.length === 0) return toast.error("No contacts available");

        const excelData = contacts.map((c) => ({
            ID: c.id,
            Name: sanitizeExcelField(c.name),
            Email: sanitizeExcelField(c.email),
            Phone: sanitizeExcelField(c.phoneNumber),
            Service: sanitizeExcelField(c.serviceType),
            Message: sanitizeExcelField(c.message),
            Status: sanitizeExcelField(c.status)
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(
            new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
            `PragyaShippingAndLogistics_Contacts_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
        toast.success("Excel downloaded securely");
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/api/contact/${id}/status`, { status });
            setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
            if (selectedContact?.id === id) setSelectedContact({ ...selectedContact, status });
            toast.success("Status updated");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this contact?")) return;
        try {
            setDeletingId(id);
            await api.delete(`/api/contact/${id}`);
            setContacts((prev) => prev.filter((c) => c.id !== id));
            if (selectedContact?.id === id) setSelectedContact(null);
            toast.success("Contact deleted");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete contact");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredContacts = contacts.filter((contact) => {
        const q = search.toLowerCase();
        return (
            String(contact.name || "").toLowerCase().includes(q) ||
            String(contact.email || "").toLowerCase().includes(q) ||
            String(contact.phoneNumber || "").toLowerCase().includes(q) ||
            String(contact.serviceType || "").toLowerCase().includes(q) ||
            String(contact.message || "").toLowerCase().includes(q) ||
            String(contact.status || "").toLowerCase().includes(q)
        );
    });

    const getStatusClass = (status) => {
        switch (status) {
            case "NEW":
                return "bg-blue-50 text-blue-800 border-blue-300";
            case "READ":
                return "bg-amber-50 text-amber-800 border-amber-300";
            case "RESOLVED":
                return "bg-emerald-50 text-emerald-800 border-emerald-300";
            default:
                return "bg-slate-50 text-slate-800 border-slate-300";
        }
    };

    return (
        <AdminLayout
            title="Contacts"
            subtitle="Customer inquiries from the website"
            actions={
                <>
                    <button
                        type="button"
                        onClick={() => {
                            fetchContacts();
                            toast.success("Refreshed");
                        }}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg shadow-xs transition"
                    >
                        Refresh
                    </button>
                    <button type="button" onClick={exportToExcel} className="btn-steel !py-2 text-sm font-semibold rounded-lg shadow-xs">
                        Export Excel
                    </button>
                </>
            }
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="bg-white border border-slate-200 px-5 py-4 rounded-xl shadow-xs flex-1">
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Total Contacts</p>
                    <p className="font-display text-3xl font-extrabold text-slate-900 mt-1">{contacts.length}</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-4 rounded-xl shadow-xs flex-[2]">
                    <input
                        type="text"
                        placeholder="Search name, email, phone, service..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-display font-bold text-slate-900 text-lg">Inquiry Messages</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Showing {filteredContacts.length} of {contacts.length} total messages
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#0a1628] text-white">
                            <tr>
                                {["ID", "Customer", "Email", "Phone", "Service", "Status", "Message", "Actions"].map((h) => (
                                    <th key={h} className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider text-slate-200 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-slate-500">Loading contacts...</td>
                                </tr>
                            ) : filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-slate-500">No contacts found</td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition text-slate-800">
                                        <td className="px-5 py-4 font-mono text-xs text-slate-500 font-semibold">#{contact.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-[#0a1628] text-signal flex items-center justify-center font-bold text-xs shadow-xs">
                                                    {contact.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-slate-900">{contact.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">{contact.email}</td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">{contact.phoneNumber}</td>
                                        <td className="px-5 py-4">
                                            <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 text-xs font-semibold rounded">
                                                {contact.serviceType}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select
                                                value={contact.status || "NEW"}
                                                onChange={(e) => updateStatus(contact.id, e.target.value)}
                                                className={`px-2.5 py-1.5 border rounded-md text-xs font-bold ${getStatusClass(contact.status)}`}
                                            >
                                                <option value="NEW">NEW</option>
                                                <option value="READ">READ</option>
                                                <option value="RESOLVED">RESOLVED</option>
                                            </select>
                                        </td>
                                        <td className="px-5 py-4 max-w-[200px]">
                                            <p className="truncate text-slate-600" title={contact.message}>{contact.message}</p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedContact(contact)}
                                                className="text-blue-700 hover:text-blue-900 font-bold text-xs bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition mr-2"
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteContact(contact.id)}
                                                disabled={deletingId === contact.id}
                                                className="text-red-600 hover:text-red-800 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded hover:bg-red-100 transition disabled:opacity-50"
                                            >
                                                {deletingId === contact.id ? "..." : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedContact && (
                <div className="fixed inset-0 bg-[#0a1628]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
                    <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#0a1628] text-white px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-display text-xl font-bold text-white">Contact Details</h2>
                                <p className="text-slate-400 text-xs font-mono mt-0.5">ID: #{selectedContact.id}</p>
                            </div>
                            <button type="button" onClick={() => setSelectedContact(null)} className="text-2xl text-slate-400 hover:text-white leading-none">×</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Name</p>
                                    <p className="font-bold text-slate-900 text-base mt-1">{selectedContact.name}</p>
                                </div>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Email</p>
                                    <p className="font-bold text-slate-900 text-base mt-1">{selectedContact.email}</p>
                                </div>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Phone</p>
                                    <p className="font-bold text-slate-900 text-base mt-1">{selectedContact.phoneNumber}</p>
                                </div>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Service Type</p>
                                    <p className="font-bold text-slate-900 text-base mt-1">{selectedContact.serviceType}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-2">Update Status</p>
                                <select
                                    value={selectedContact.status || "NEW"}
                                    onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                                    className={`px-3 py-2 border rounded-lg font-bold text-sm ${getStatusClass(selectedContact.status)}`}
                                >
                                    <option value="NEW">NEW</option>
                                    <option value="READ">READ</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-2">Inquiry Message</p>
                                <div className="bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl leading-relaxed whitespace-pre-wrap text-sm font-medium">
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3 bg-slate-50">
                            <button
                                type="button"
                                onClick={() => setSelectedContact(null)}
                                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition text-sm"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteContact(selectedContact.id)}
                                className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-xs text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default Admin;
