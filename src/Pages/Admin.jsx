import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Admin() {

    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState(null);



    // ================= FETCH CONTACTS =================

    const fetchContacts = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "http://localhost:8080/api/contact"
            );

            setContacts(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch contacts");

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        fetchContacts();

    }, []);




    // ================= EXPORT TO EXCEL =================

    const exportToExcel = () => {

        if (contacts.length === 0) {

            toast.error("No contacts available");

            return;

        }

        const excelData = contacts.map((contact) => ({

            ID: contact.id,

            Name: contact.name,

            Email: contact.email,

            Phone: contact.phoneNumber,

            Service: contact.serviceType,

            Message: contact.message,

            Status: contact.status

        }));



        const worksheet =
            XLSX.utils.json_to_sheet(excelData);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Contacts"

        );



        const excelBuffer = XLSX.write(

            workbook,

            {

                bookType: "xlsx",

                type: "array"

            }

        );



        const file = new Blob(

            [excelBuffer],

            {

                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

            }

        );



        saveAs(

            file,

            "PragyaShipping_Contacts.xlsx"

        );



        toast.success("Excel Downloaded Successfully");

    };
    // ================= UPDATE STATUS =================

    const updateStatus = async (id, status) => {

        try {

            await axios.patch(
                `http://localhost:8080/api/contact/${id}/status`,
                {
                    status: status
                }
            );

            setContacts((previousContacts) =>
                previousContacts.map((contact) =>
                    contact.id === id
                        ? {
                            ...contact,
                            status: status
                        }
                        : contact
                )
            );

            if (selectedContact?.id === id) {

                setSelectedContact({

                    ...selectedContact,

                    status: status

                });

            }

            toast.success("Status Updated Successfully");

        } catch (error) {

            console.error(error);

            toast.error("Failed to update status");

        }

    };



// ================= DELETE CONTACT =================

    const deleteContact = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmDelete) return;

        try {

            setDeletingId(id);

            await axios.delete(
                `http://localhost:8080/api/contact/${id}`
            );

            setContacts((previousContacts) =>
                previousContacts.filter(
                    (contact) => contact.id !== id
                )
            );

            if (selectedContact?.id === id) {

                setSelectedContact(null);

            }

            toast.success("Contact Deleted Successfully");

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete contact");

        } finally {

            setDeletingId(null);

        }

    };



// ================= SEARCH =================

    const filteredContacts = contacts.filter((contact) => {

        const searchText = search.toLowerCase();

        return (

            String(contact.name || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(contact.email || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(contact.phoneNumber || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(contact.serviceType || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(contact.message || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(contact.status || "")
                .toLowerCase()
                .includes(searchText)

        );

    });



// ================= STATUS COLORS =================

    const getStatusClass = (status) => {

        switch (status) {

            case "NEW":

                return "bg-blue-50 text-blue-700 border-blue-200";

            case "READ":

                return "bg-yellow-50 text-yellow-700 border-yellow-200";

            case "RESOLVED":

                return "bg-green-50 text-green-700 border-green-200";

            default:

                return "bg-gray-50 text-gray-700 border-gray-200";

        }

    };
    return (

        <div className="min-h-screen bg-gray-100">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-gray-200 px-6 py-4">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow">
                            🚚
                        </div>

                        <div>

                            <h1 className="text-xl font-bold text-gray-800">
                                Pragya Shipping
                            </h1>

                            <p className="text-sm text-gray-500">
                                Contact Management
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                        ← Dashboard
                    </button>

                </div>

            </header>



            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto p-6">

                {/* ================= TOP SECTION ================= */}

                <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

                    <div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Customer Contacts
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View, search and manage all customer inquiries.
                        </p>

                    </div>


                    <div className="bg-white shadow rounded-xl px-6 py-4">

                        <p className="text-sm text-gray-500">
                            Total Contacts
                        </p>

                        <h2 className="text-3xl font-bold text-emerald-600">

                            {contacts.length}

                        </h2>

                    </div>

                </div>



                {/* ================= SEARCH BAR ================= */}

                <div className="bg-white rounded-xl shadow p-4 mb-6">

                    <div className="flex flex-col md:flex-row gap-3">

                        <div className="relative flex-1">

                    <span className="absolute left-3 top-3">
                        🔍
                    </span>

                            <input
                                type="text"
                                placeholder="Search by Name, Email, Phone, Service..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-300 outline-none"
                            />

                        </div>



                        {/* Refresh */}

                        <button
                            onClick={() => {

                                fetchContacts();

                                toast.success("Contacts Refreshed");

                            }}
                            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            🔄 Refresh
                        </button>



                        {/* Export */}

                        <button
                            onClick={exportToExcel}
                            className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            📥 Export Excel
                        </button>

                    </div>

                </div>



                {/* ================= TABLE ================= */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <div className="px-6 py-4 border-b">

                        <h3 className="text-lg font-semibold">

                            Customer Messages

                        </h3>

                        <p className="text-sm text-gray-500">

                            Showing {filteredContacts.length} of {contacts.length} contacts

                        </p>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full"><tbody>

                        {
                            loading ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-16"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>

                                            <p className="mt-4 text-gray-500">
                                                Loading Contacts...
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            ) : filteredContacts.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-16"
                                    >

                                        <div className="text-6xl">
                                            📭
                                        </div>

                                        <h3 className="text-lg font-semibold mt-4">
                                            No Contacts Found
                                        </h3>

                                        <p className="text-gray-500 mt-2">
                                            Try another keyword.
                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                filteredContacts.map((contact) => (

                                    <tr
                                        key={contact.id}
                                        className="hover:bg-gray-50 border-b transition"
                                    >

                                        <td className="px-5 py-4 font-semibold text-gray-600">
                                            #{contact.id}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">

                                                    {contact.name?.charAt(0).toUpperCase()}

                                                </div>

                                                <div>

                                                    <p className="font-semibold">

                                                        {contact.name}

                                                    </p>

                                                    <p className="text-xs text-gray-500">

                                                        Customer

                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4 text-gray-600">

                                            {contact.email}

                                        </td>

                                        <td className="px-5 py-4">

                                            {contact.phoneNumber}

                                        </td>

                                        <td className="px-5 py-4">

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">

{contact.serviceType}

</span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <select

                                                value={contact.status || "NEW"}

                                                onChange={(e)=>

                                                    updateStatus(

                                                        contact.id,

                                                        e.target.value

                                                    )

                                                }

                                                className={`px-3 py-2 rounded-lg border text-sm font-medium ${getStatusClass(contact.status)}`}

                                            >

                                                <option value="NEW">

                                                    NEW

                                                </option>

                                                <option value="READ">

                                                    READ

                                                </option>

                                                <option value="RESOLVED">

                                                    RESOLVED

                                                </option>

                                            </select>

                                        </td>

                                        <td className="px-5 py-4 max-w-[260px]">

                                            <p className="truncate text-gray-600">

                                                {contact.message}

                                            </p>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex justify-center gap-2">

                                                <button

                                                    onClick={()=>

                                                        setSelectedContact(contact)

                                                    }

                                                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs"

                                                >

                                                    👁 View

                                                </button>

                                                <button

                                                    onClick={()=>

                                                        deleteContact(contact.id)

                                                    }

                                                    disabled={deletingId===contact.id}

                                                    className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs disabled:opacity-50"

                                                >

                                                    {

                                                        deletingId===contact.id

                                                            ?

                                                            "Deleting..."

                                                            :

                                                            "🗑 Delete"

                                                    }

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                        </tbody>

                        </table>

                    </div>

                </div>{/* ================= VIEW CONTACT MODAL ================= */}

                {
                    selectedContact && (

                        <div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedContact(null)}
                        >

                            <div
                                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
                                onClick={(e)=>e.stopPropagation()}
                            >

                                {/* Header */}

                                <div className="bg-emerald-600 px-6 py-5 flex justify-between items-center">

                                    <div>

                                        <h2 className="text-white text-xl font-bold">
                                            Customer Details
                                        </h2>

                                        <p className="text-emerald-100 text-sm mt-1">
                                            Contact #{selectedContact.id}
                                        </p>

                                    </div>

                                    <button

                                        onClick={()=>setSelectedContact(null)}

                                        className="text-white text-2xl hover:rotate-90 transition"

                                    >

                                        ✕

                                    </button>

                                </div>



                                {/* Body */}

                                <div className="p-6 space-y-5">

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Customer Name
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {selectedContact.name}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Email
                                            </p>

                                            <p className="font-semibold">
                                                {selectedContact.email}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Phone
                                            </p>

                                            <p className="font-semibold">
                                                {selectedContact.phoneNumber}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Service
                                            </p>

                                            <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">

{selectedContact.serviceType}

</span>

                                        </div>

                                    </div>



                                    <div>

                                        <p className="text-gray-500 text-sm mb-2">
                                            Status
                                        </p>

                                        <select

                                            value={selectedContact.status || "NEW"}

                                            onChange={(e)=>

                                                updateStatus(

                                                    selectedContact.id,

                                                    e.target.value

                                                )

                                            }

                                            className={`px-4 py-2 rounded-lg border ${getStatusClass(selectedContact.status)}`}

                                        >

                                            <option value="NEW">NEW</option>

                                            <option value="READ">READ</option>

                                            <option value="RESOLVED">RESOLVED</option>

                                        </select>

                                    </div>



                                    <div>

                                        <p className="text-gray-500 text-sm mb-2">
                                            Customer Message
                                        </p>

                                        <div className="bg-gray-50 border rounded-xl p-4">

                                            <p className="leading-7 whitespace-pre-wrap text-gray-700">

                                                {selectedContact.message}

                                            </p>

                                        </div>

                                    </div>

                                </div>



                                {/* Footer */}

                                <div className="border-t px-6 py-4 flex justify-end gap-3">

                                    <button

                                        onClick={()=>setSelectedContact(null)}

                                        className="px-5 py-2 rounded-lg border hover:bg-gray-100"

                                    >

                                        Close

                                    </button>

                                    <button

                                        onClick={()=>deleteContact(selectedContact.id)}

                                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"

                                    >

                                        🗑 Delete

                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }
            </main>

                {/* ================= FOOTER ================= */}

                <footer className="text-center py-6 text-gray-500 text-sm">

                    Pragya Shipping Admin Panel © 2026

                </footer>

        </div>

);

}

export default Admin;