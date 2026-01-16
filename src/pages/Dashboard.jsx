import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInvoices } from "../service/invoiceService";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { formatDate } from "../util/formatInvoiceData";
import {
  Plus,
  Search,
  FileText,
  Calendar,
  Trash2,
  Eye,
  IndianRupee,
  Edit,
} from "lucide-react";
import { initialInvoiceData } from "../constants";
import { useAuth } from "@clerk/clerk-react";
import { deleteInvoice } from "../service/invoiceService";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = await getToken();
        const res = await getAllInvoices(baseURL, token);
        setInvoices(res.data);
      } catch (error) {
        toast.error("Error fetching invoices");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [baseURL]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.templateId || "template1");
    setInvoiceTitle(invoice.title || "New Invoice");
    navigate("/preview");
  };

  const handleCreateNew = () => {
    setInvoiceTitle("New Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(initialInvoiceData);
    navigate("/generate");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;
    try {
      const token = await getToken();
      const res = await deleteInvoice(baseURL, id, token);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Invoice deleted successfully");

        setInvoices((prevInvoices) =>
          prevInvoices.filter((inv) => inv.id !== id)
        );
      } else {
        toast.error("Failed to delete invoice");
      }
    } catch (error) {
      toast.error("Failed to delete invoice");
    }
  };


  const handleEdit = (invoice) => {
    // Merge invoice data with initial structure to ensure all fields exist
    const mergedInvoice = {
      ...initialInvoiceData,
      ...invoice,
      billing: { ...initialInvoiceData.billing, ...invoice.billing },
      shipping: { ...initialInvoiceData.shipping, ...invoice.shipping },
      invoice: { ...initialInvoiceData.invoice, ...invoice.invoice },
      account: { ...initialInvoiceData.account, ...invoice.account },
      company: { ...initialInvoiceData.company, ...invoice.company },
      items: invoice.items || initialInvoiceData.items,
    };
    setInvoiceData(mergedInvoice);
    setInvoiceTitle(invoice.title || "New Invoice");
    setSelectedTemplate(invoice.templateId || "template1");
    navigate("/generate");
  };

  // Helper: Calculate total amount from items array
  const calculateTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((acc, item) => acc + item.qty * item.amount, 0);
  };

  // Filter invoices based on search
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoice?.number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header Section ===== */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your invoices and track payments
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search invoices..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ===== Stats Summary (Optional) ===== */}
        {!loading && (
          <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-200 min-w-37.5">
              <p className="text-blue-100 text-xs font-medium uppercase">
                Total Invoices
              </p>
              <p className="text-2xl font-bold">{invoices.length}</p>
            </div>
            {/* Add more stats cards here if needed */}
          </div>
        )}

        {/* ===== Content Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* 1. Create New Invoice Card */}
          <div
            onClick={handleCreateNew}
            className="group relative flex flex-col items-center justify-center min-h-80 bg-white border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              Create New Invoice
            </h3>
            <p className="text-sm text-gray-400 mt-2 text-center px-4">
              Start from scratch or use a template
            </p>
          </div>

          {/* Loading Skeletons */}
          {loading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-80 shadow-sm animate-pulse p-4 flex flex-col gap-3"
              >
                <div className="h-40 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}

          {/* 2. Existing Invoice Cards */}
          {!loading &&
            filteredInvoices.map((inv, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Thumbnail Section */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {inv.thumbnailUrl ? (
                    <img
                      src={inv.thumbnailUrl}
                      alt={inv.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FileText className="w-12 h-12" />
                    </div>
                  )}

                  {/* Overlay Actions (Visible on Hover) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => handleViewClick(inv)}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(inv)}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
                      title="Edit"
                    >
                      {/* <Eye size={18} /> */}
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-lg"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className="font-bold text-gray-800 text-lg truncate pr-2"
                        title={inv.title}
                      >
                        {inv.title || "Untitled Invoice"}
                      </h3>
                      <p className="text-xs text-blue-500 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md mt-1">
                        {inv.invoice?.number || "#DRAFT"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{formatDate(inv.createdAt)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700 font-semibold">
                        <IndianRupee className="w-4 h-4 text-green-600 mr-1" />
                        <span>
                          {calculateTotal(inv.items).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State (Search result) */}
        {!loading && filteredInvoices.length === 0 && invoices.length > 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No invoices found
            </h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
