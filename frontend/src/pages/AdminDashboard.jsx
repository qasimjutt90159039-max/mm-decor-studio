import React, { useState, useEffect } from 'react';
import {
  LogOut,
  FolderPlus,
  Image,
  Layers,
  Inbox,
  Trash2,
  Edit,
  Plus,
  Search,
  CheckCircle,
  Eye,
  Phone,
  Mail,
  RefreshCw,
  ExternalLink,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getPortfolio,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getServices,
  createService,
  updateService,
  deleteService,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../services/api';

export const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'portfolio' | 'gallery' | 'services'

  // Notification / Alert
  const [feedback, setFeedback] = useState(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [searchInquiry, setSearchInquiry] = useState('');
  const [filterInterest, setFilterInterest] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Portfolio State
  const [portfolio, setPortfolio] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [portfolioModal, setPortfolioModal] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Interior',
    description: '',
    images: '',
    location: '',
    date: '',
  });

  // Gallery State
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    image: '',
    title: '',
    category: 'Interior',
    description: '',
  });

  // Services State
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'Interior',
    description: '',
    image: '',
    active: true,
  });

  // Fetch initial data based on active tab
  useEffect(() => {
    if (activeTab === 'inquiries') fetchInquiriesList();
    if (activeTab === 'portfolio') fetchPortfolioList();
    if (activeTab === 'gallery') fetchGalleryList();
    if (activeTab === 'services') fetchServicesList();
  }, [activeTab]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  // --- INQUIRIES HANDLERS ---
  const fetchInquiriesList = async () => {
    try {
      setLoadingInquiries(true);
      const params = {};
      if (searchInquiry.trim()) params.search = searchInquiry.trim();
      if (filterInterest !== 'All') params.interestedIn = filterInterest;
      if (filterStatus !== 'All') params.status = filterStatus;

      const res = await getInquiries(params);
      setInquiries(res.data?.data || []);
    } catch (err) {
      showFeedback('error', 'Failed to retrieve inquiries.');
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      showFeedback('success', `Inquiry status updated to ${newStatus}`);
      fetchInquiriesList();
    } catch (err) {
      showFeedback('error', 'Failed to update inquiry status.');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await deleteInquiry(id);
      showFeedback('success', 'Inquiry record removed.');
      fetchInquiriesList();
    } catch (err) {
      showFeedback('error', 'Failed to remove inquiry.');
    }
  };

  // --- PORTFOLIO HANDLERS ---
  const fetchPortfolioList = async () => {
    try {
      setLoadingPortfolio(true);
      const res = await getPortfolio();
      setPortfolio(res.data?.data || []);
    } catch (err) {
      showFeedback('error', 'Failed to load portfolio items.');
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const openPortfolioCreate = () => {
    setEditingPortfolioId(null);
    setPortfolioForm({
      title: '',
      category: 'Interior',
      description: '',
      images: '',
      location: '',
      date: '',
    });
    setPortfolioModal(true);
  };

  const openPortfolioEdit = (item) => {
    setEditingPortfolioId(item._id);
    setPortfolioForm({
      title: item.title,
      category: item.category,
      description: item.description,
      images: Array.isArray(item.images) ? item.images.join(', ') : '',
      location: item.location || '',
      date: item.date || '',
    });
    setPortfolioModal(true);
  };

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (!portfolioForm.title.trim() || !portfolioForm.description.trim() || !portfolioForm.images.trim()) {
      showFeedback('error', 'Title, description, and at least one image URL are required.');
      return;
    }

    const imageArray = portfolioForm.images
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      title: portfolioForm.title.trim(),
      category: portfolioForm.category,
      description: portfolioForm.description.trim(),
      images: imageArray,
      location: portfolioForm.location.trim(),
      date: portfolioForm.date.trim(),
    };

    try {
      if (editingPortfolioId) {
        await updatePortfolioItem(editingPortfolioId, payload);
        showFeedback('success', 'Portfolio project updated successfully.');
      } else {
        await createPortfolioItem(payload);
        showFeedback('success', 'New portfolio project published.');
      }
      setPortfolioModal(false);
      fetchPortfolioList();
    } catch (err) {
      showFeedback('error', err.response?.data?.message || 'Error saving portfolio item.');
    }
  };

  const handleDeletePortfolio = async (id) => {
    if (!window.confirm('Delete this portfolio project permanently?')) return;
    try {
      await deletePortfolioItem(id);
      showFeedback('success', 'Portfolio project deleted.');
      fetchPortfolioList();
    } catch (err) {
      showFeedback('error', 'Failed to delete portfolio project.');
    }
  };

  // --- GALLERY HANDLERS ---
  const fetchGalleryList = async () => {
    try {
      setLoadingGallery(true);
      const res = await getGallery();
      setGallery(res.data?.data || []);
    } catch (err) {
      showFeedback('error', 'Failed to retrieve gallery photos.');
    } finally {
      setLoadingGallery(false);
    }
  };

  const openGalleryCreate = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      image: '',
      title: '',
      category: 'Interior',
      description: '',
    });
    setGalleryModal(true);
  };

  const openGalleryEdit = (item) => {
    setEditingGalleryId(item._id);
    setGalleryForm({
      image: item.image,
      title: item.title,
      category: item.category,
      description: item.description || '',
    });
    setGalleryModal(true);
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.image.trim() || !galleryForm.title.trim()) {
      showFeedback('error', 'Both Image URL and Title are required.');
      return;
    }

    const payload = {
      image: galleryForm.image.trim(),
      title: galleryForm.title.trim(),
      category: galleryForm.category,
      description: galleryForm.description.trim(),
    };

    try {
      if (editingGalleryId) {
        await updateGalleryItem(editingGalleryId, payload);
        showFeedback('success', 'Gallery item updated.');
      } else {
        await createGalleryItem(payload);
        showFeedback('success', 'Gallery photo added.');
      }
      setGalleryModal(false);
      fetchGalleryList();
    } catch (err) {
      showFeedback('error', err.response?.data?.message || 'Error saving gallery item.');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await deleteGalleryItem(id);
      showFeedback('success', 'Gallery item deleted.');
      fetchGalleryList();
    } catch (err) {
      showFeedback('error', 'Failed to delete gallery item.');
    }
  };

  // --- SERVICES HANDLERS ---
  const fetchServicesList = async () => {
    try {
      setLoadingServices(true);
      const res = await getServices(true);
      setServices(res.data?.data || []);
    } catch (err) {
      showFeedback('error', 'Failed to load services.');
    } finally {
      setLoadingServices(false);
    }
  };

  const openServiceCreate = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: '',
      category: 'Interior',
      description: '',
      image: '',
      active: true,
    });
    setServiceModal(true);
  };

  const openServiceEdit = (svc) => {
    setEditingServiceId(svc._id);
    setServiceForm({
      name: svc.name,
      category: svc.category,
      description: svc.description,
      image: svc.image || '',
      active: svc.active,
    });
    setServiceModal(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.description.trim()) {
      showFeedback('error', 'Service name and description are required.');
      return;
    }

    try {
      if (editingServiceId) {
        await updateService(editingServiceId, serviceForm);
        showFeedback('success', 'Service updated successfully.');
      } else {
        await createService(serviceForm);
        showFeedback('success', 'New service added.');
      }
      setServiceModal(false);
      fetchServicesList();
    } catch (err) {
      showFeedback('error', err.response?.data?.message || 'Error saving service.');
    }
  };

  const toggleServiceActive = async (svc) => {
    try {
      await updateService(svc._id, { active: !svc.active });
      showFeedback('success', `Service marked as ${!svc.active ? 'active' : 'inactive'}`);
      fetchServicesList();
    } catch (err) {
      showFeedback('error', 'Failed to toggle service state.');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    try {
      await deleteService(id);
      showFeedback('success', 'Service deleted.');
      fetchServicesList();
    } catch (err) {
      showFeedback('error', 'Failed to delete service.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0207] text-[#E9DFD2] pt-28 pb-20">
      {/* Top Admin Header Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8 border-b border-[#241018] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] mb-1">
            <Sparkles size={13} />
            <span>MM Decor Studio Portal</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase tracking-wide">
            Studio Management
          </h1>
          <p className="text-xs text-[#8C817A]">
            Logged in as: <span className="text-[#E9DFD2] font-semibold">{admin?.username}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 border border-[#241018] hover:border-[#C9AB81] hover:text-[#C9AB81] text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-4">
          <div
            className={`p-4 rounded-xs text-xs font-medium border flex items-center justify-between animate-fadeIn ${
              feedback.type === 'success'
                ? 'bg-[#192b1b] border-[#386b3d] text-[#a5f3ad]'
                : 'bg-[#2b0f14] border-[#7d2432] text-[#fca5a5]'
            }`}
          >
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        <div className="flex flex-wrap gap-2 border-b border-[#241018] pb-4">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
              activeTab === 'inquiries'
                ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81]'
                : 'bg-[#120309] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/40'
            }`}
          >
            <Inbox size={14} />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
              activeTab === 'portfolio'
                ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81]'
                : 'bg-[#120309] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/40'
            }`}
          >
            <FolderPlus size={14} />
            <span>Portfolio Archive ({portfolio.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
              activeTab === 'gallery'
                ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81]'
                : 'bg-[#120309] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/40'
            }`}
          >
            <Image size={14} />
            <span>Visual Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
              activeTab === 'services'
                ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81]'
                : 'bg-[#120309] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/40'
            }`}
          >
            <Layers size={14} />
            <span>Studio Services ({services.length})</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {/* --- INQUIRIES TAB --- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="p-4 bg-[#120309] border border-[#241018] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C817A]" />
                <input
                  type="text"
                  value={searchInquiry}
                  onChange={(e) => setSearchInquiry(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchInquiriesList()}
                  placeholder="Search by client name, phone, or subject..."
                  className="w-full pl-9 pr-4 py-2 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                  className="px-3 py-2 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none"
                >
                  <option value="All">All Interests</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Event Planning">Event Planning</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="contacted">Contacted</option>
                </select>

                <button
                  onClick={fetchInquiriesList}
                  className="px-4 py-2 bg-[#241018] hover:bg-[#C9AB81] hover:text-[#120309] text-xs uppercase tracking-widest text-[#E9DFD2] transition-colors border border-[#C9AB81]/30"
                >
                  Filter
                </button>
              </div>
            </div>

            {/* Inquiries Table / Cards */}
            {loadingInquiries ? (
              <div className="py-16 text-center text-[#8C817A] text-xs uppercase tracking-widest">
                Loading inquiries from database...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#120309] border border-[#241018] text-[#8C817A] text-xs">
                No inquiries matching the current criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className={`p-6 bg-[#120309] border transition-all ${
                      inq.status === 'new'
                        ? 'border-[#C9AB81]/60 shadow-lg shadow-[#C9AB81]/5'
                        : 'border-[#241018]'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-editorial text-2xl text-[#F7F3EE]">
                            {inq.name}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-xs font-semibold ${
                              inq.status === 'new'
                                ? 'bg-[#C9AB81] text-[#120309]'
                                : inq.status === 'contacted'
                                ? 'bg-[#27522d] text-[#b3f2bd]'
                                : 'bg-[#241018] text-[#8C817A]'
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-[#C9AB81]">
                            {inq.interestedIn}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C817A]">
                          <span className="flex items-center gap-1 text-[#E9DFD2]">
                            <Phone size={12} className="text-[#C9AB81]" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">
                              {inq.phone}
                            </a>
                          </span>
                          {inq.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={12} className="text-[#C9AB81]" />
                              <a href={`mailto:${inq.email}`} className="hover:underline">
                                {inq.email}
                              </a>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {inq.status === 'new' && (
                          <button
                            onClick={() => handleStatusChange(inq._id, 'read')}
                            className="px-3 py-1.5 bg-[#241018] hover:bg-[#C9AB81] hover:text-[#120309] text-[10px] uppercase tracking-widest transition-colors border border-[#C9AB81]/20"
                          >
                            Mark Read
                          </button>
                        )}
                        {inq.status !== 'contacted' && (
                          <button
                            onClick={() => handleStatusChange(inq._id, 'contacted')}
                            className="px-3 py-1.5 bg-[#192b1b] hover:bg-[#27522d] text-[#b3f2bd] text-[10px] uppercase tracking-widest transition-colors border border-[#3e7845]"
                          >
                            Mark Contacted
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-[#8C817A] hover:text-red-400 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#241018] space-y-2">
                      <p className="text-xs font-semibold text-[#E9DFD2]">
                        Subject: {inq.subject}
                      </p>
                      <p className="text-xs text-[#8C817A] leading-relaxed whitespace-pre-line">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PORTFOLIO TAB --- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                Studio Projects Archive
              </h2>
              <button
                onClick={openPortfolioCreate}
                className="px-5 py-2.5 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>

            {loadingPortfolio ? (
              <div className="py-16 text-center text-[#8C817A] text-xs uppercase tracking-widest">
                Loading projects...
              </div>
            ) : portfolio.length === 0 ? (
              <div className="p-12 text-center bg-[#120309] border border-[#241018] space-y-4">
                <p className="font-editorial text-2xl text-[#F7F3EE]">
                  No portfolio projects have been added yet.
                </p>
                <p className="text-xs text-[#8C817A]">
                  Click "Add Project" above to publish your first real studio project.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#120309] border border-[#241018] overflow-hidden flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#120309] bg-[#C9AB81] px-2 py-0.5 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-editorial text-xl text-[#F7F3EE] truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#8C817A] line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#241018]">
                        <span className="text-[10px] text-[#8C817A]">
                          {item.images?.length || 0} photos
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openPortfolioEdit(item)}
                            className="text-xs text-[#C9AB81] hover:underline flex items-center gap-1"
                          >
                            <Edit size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item._id)}
                            className="text-xs text-red-400 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                Visual Magazine Gallery
              </h2>
              <button
                onClick={openGalleryCreate}
                className="px-5 py-2.5 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Upload Image</span>
              </button>
            </div>

            {loadingGallery ? (
              <div className="py-16 text-center text-[#8C817A] text-xs uppercase tracking-widest">
                Loading gallery...
              </div>
            ) : gallery.length === 0 ? (
              <div className="p-12 text-center bg-[#120309] border border-[#241018] space-y-4">
                <p className="font-editorial text-2xl text-[#F7F3EE]">
                  No gallery images have been added yet.
                </p>
                <p className="text-xs text-[#8C817A]">
                  Click "Upload Image" to add high-resolution editorial photos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#120309] border border-[#241018] overflow-hidden group relative"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] uppercase tracking-widest text-[#C9AB81]">
                        {item.category}
                      </p>
                      <h5 className="font-editorial text-base text-[#F7F3EE] truncate">
                        {item.title}
                      </h5>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#241018]">
                        <button
                          onClick={() => openGalleryEdit(item)}
                          className="text-[10px] text-[#C9AB81] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item._id)}
                          className="text-[10px] text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- SERVICES TAB --- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                Studio Creative Disciplines
              </h2>
              <button
                onClick={openServiceCreate}
                className="px-5 py-2.5 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Add Discipline</span>
              </button>
            </div>

            {loadingServices ? (
              <div className="py-16 text-center text-[#8C817A] text-xs uppercase tracking-widest">
                Loading services...
              </div>
            ) : services.length === 0 ? (
              <div className="p-12 text-center bg-[#120309] border border-[#241018]">
                No services registered.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((svc) => (
                  <div
                    key={svc._id}
                    className="p-6 bg-[#120309] border border-[#241018] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#C9AB81]">
                          {svc.category}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${
                            svc.active ? 'bg-[#1a2e1d] text-[#b3f2bd]' : 'bg-[#241018] text-[#8C817A]'
                          }`}
                        >
                          {svc.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <h4 className="font-editorial text-xl text-[#F7F3EE]">
                        {svc.name}
                      </h4>
                      <p className="text-xs text-[#8C817A] leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#241018] flex items-center justify-between">
                      <button
                        onClick={() => toggleServiceActive(svc)}
                        className="text-xs text-[#E9DFD2] hover:text-[#C9AB81]"
                      >
                        {svc.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openServiceEdit(svc)}
                          className="text-xs text-[#C9AB81] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(svc._id)}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- PORTFOLIO MODAL --- */}
      {portfolioModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0105]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#120309] border border-[#241018] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#241018]">
              <h3 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                {editingPortfolioId ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button onClick={() => setPortfolioModal(false)}>
                <X size={20} className="text-[#8C817A] hover:text-[#E9DFD2]" />
              </button>
            </div>

            <form onSubmit={handlePortfolioSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="e.g. Minimalist Villa Living & Lounge"
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                    Category *
                  </label>
                  <select
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Events">Events</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Styling">Styling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={portfolioForm.location}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, location: e.target.value })}
                    placeholder="e.g. Gulberg, Lahore"
                    className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Date / Timeline (Optional)
                </label>
                <input
                  type="text"
                  value={portfolioForm.date}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, date: e.target.value })}
                  placeholder="e.g. Autumn 2026"
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Image URLs * (Comma separated)
                </label>
                <textarea
                  rows={3}
                  value={portfolioForm.images}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..., https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
                <p className="text-[10px] text-[#8C817A] mt-1">
                  Enter full image URLs separated by commas. The first URL serves as the primary cover.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Project Description *
                </label>
                <textarea
                  rows={4}
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  placeholder="Articulate the spatial intent, materials used, lighting configuration, and atmosphere..."
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPortfolioModal(false)}
                  className="px-5 py-2.5 border border-[#241018] text-xs uppercase tracking-widest hover:border-[#C9AB81]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9AB81] text-[#120309] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F3EE]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- GALLERY MODAL --- */}
      {galleryModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0105]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#120309] border border-[#241018] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#241018]">
              <h3 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                {editingGalleryId ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
              </h3>
              <button onClick={() => setGalleryModal(false)}>
                <X size={20} className="text-[#8C817A] hover:text-[#E9DFD2]" />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Title / Caption *
                </label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Sculptural Travertine & Ambient Sconce"
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Category *
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                >
                  <option value="Interior">Interior</option>
                  <option value="Events">Events</option>
                  <option value="Moodboard">Moodboard</option>
                  <option value="Details">Details</option>
                  <option value="Atmosphere">Atmosphere</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  placeholder="Additional context or notes..."
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModal(false)}
                  className="px-5 py-2.5 border border-[#241018] text-xs uppercase tracking-widest hover:border-[#C9AB81]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9AB81] text-[#120309] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F3EE]"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SERVICE MODAL --- */}
      {serviceModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0105]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#120309] border border-[#241018] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#241018]">
              <h3 className="font-editorial text-2xl text-[#F7F3EE] uppercase">
                {editingServiceId ? 'Edit Discipline' : 'Add Studio Discipline'}
              </h3>
              <button onClick={() => setServiceModal(false)}>
                <X size={20} className="text-[#8C817A] hover:text-[#E9DFD2]" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Discipline Name *
                </label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="e.g. Acoustic & Lighting Curation"
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Category *
                </label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                >
                  <option value="Interior">Interior</option>
                  <option value="Events">Events</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Styling">Styling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Scope of creative discipline..."
                  className="w-full px-4 py-2.5 bg-[#18060f] border border-[#241018] text-xs text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81]"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModal(false)}
                  className="px-5 py-2.5 border border-[#241018] text-xs uppercase tracking-widest hover:border-[#C9AB81]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9AB81] text-[#120309] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F3EE]"
                >
                  Save Discipline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
