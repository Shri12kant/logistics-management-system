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
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "READ":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "RESOLVED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
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
                        className="px-4 py-2.5 border border-mist bg-white text-sm font-semibold hover:bg-mist/50"
                    >
                        Refresh
                    </button>
                    <button type="button" onClick={exportToExcel} className="btn-steel text-sm !py-2.5">
                        Export Excel
                    </button>
                </>
            }
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="bg-white border border-mist px-5 py-4 flex-1">
                    <p className="text-muted text-xs uppercase tracking-wider font-semibold">Total</p>
                    <p className="font-display text-3xl font-bold text-ink mt-1">{contacts.length}</p>
                </div>
                <div className="bg-white border border-mist px-5 py-4 flex-[2]">
                    <input
                        type="text"
                        placeholder="Search name, email, phone, service..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            <div className="bg-white border border-mist overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-mist">
                    <h3 className="font-display font-bold text-ink">Messages</h3>
                    <p className="text-sm text-muted">
                        Showing {filteredContacts.length} of {contacts.length}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-ink text-white">
                            <tr>
                                {["ID", "Customer", "Email", "Phone", "Service", "Status", "Message", ""].map((h) => (
                                    <th key={h || "a"} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-muted">Loading contacts...</td>
                                </tr>
                            ) : filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-muted">No contacts found</td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="border-b border-mist hover:bg-fog/80">
                                        <td className="px-4 py-3 text-muted">#{contact.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-ink text-signal flex items-center justify-center font-bold text-xs">
                                                    {contact.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-ink">{contact.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted">{contact.email}</td>
                                        <td className="px-4 py-3">{contact.phoneNumber}</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-mist text-steel px-2 py-0.5 text-xs font-semibold">
                                                {contact.serviceType}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={contact.status || "NEW"}
                                                onChange={(e) => updateStatus(contact.id, e.target.value)}
                                                className={`px-2 py-1.5 border text-xs font-semibold ${getStatusClass(contact.status)}`}
                                            >
                                                <option value="NEW">NEW</option>
                                                <option value="READ">READ</option>
                                                <option value="RESOLVED">RESOLVED</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 max-w-[180px]">
                                            <p className="truncate text-muted">{contact.message}</p>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedContact(contact)}
                                                className="text-steel text-xs font-semibold hover:underline mr-3"
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteContact(contact.id)}
                                                disabled={deletingId === contact.id}
                                                className="text-red-600 text-xs font-semibold hover:underline disabled:opacity-50"
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
                <div className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
                    <div className="bg-white w-full max-w-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-ink text-white px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-display text-xl font-bold">Contact Details</h2>
                                <p className="text-white/50 text-sm">#{selectedContact.id}</p>
                            </div>
                            <button type="button" onClick={() => setSelectedContact(null)} className="text-2xl text-white/70 hover:text-white">×</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-muted text-xs uppercase tracking-wider">Name</p>
                                    <p className="font-semibold text-lg mt-1">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted text-xs uppercase tracking-wider">Email</p>
                                    <p className="font-semibold mt-1">{selectedContact.email}</p>
                                </div>
                                <div>
                                    <p className="text-muted text-xs uppercase tracking-wider">Phone</p>
                                    <p className="font-semibold mt-1">{selectedContact.phoneNumber}</p>
                                </div>
                                <div>
                                    <p className="text-muted text-xs uppercase tracking-wider">Service</p>
                                    <p className="font-semibold mt-1">{selectedContact.serviceType}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-muted text-xs uppercase tracking-wider mb-2">Status</p>
                                <select
                                    value={selectedContact.status || "NEW"}
                                    onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                                    className={`px-3 py-2 border font-semibold ${getStatusClass(selectedContact.status)}`}
                                >
                                    <option value="NEW">NEW</option>
                                    <option value="READ">READ</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-muted text-xs uppercase tracking-wider mb-2">Message</p>
                                <div className="bg-fog border border-mist p-4 leading-relaxed whitespace-pre-wrap">
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-mist px-6 py-4 flex justify-end gap-3">
                            <button type="button" onClick={() => setSelectedContact(null)} className="px-4 py-2 border border-mist font-semibold">
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteContact(selectedContact.id)}
                                className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700"
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
