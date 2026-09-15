import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin, ExternalLink, Sparkles, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { submitInquiry } from '../services/api';

export const Contact = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Interior Design',
    subject: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const interestedInParam = searchParams.get('interestedIn');

    if (subjectParam || interestedInParam) {
      setFormData((prev) => ({
        ...prev,
        subject: subjectParam || prev.subject,
        interestedIn:
          ['Interior Design', 'Event Planning', 'General Inquiry'].includes(interestedInParam)
            ? interestedInParam
            : prev.interestedIn,
      }));
    }
  }, [searchParams]);

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Contact phone number is required';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number (minimum 7 digits)';
    }

    if (formData.email.trim()) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please provide a valid email format';
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please specify the subject of your inquiry';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details for your inquiry';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await submitInquiry(formData);
      if (res.data?.success) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          interestedIn: 'Interior Design',
          subject: '',
          message: '',
        });
        setValidationErrors({});
      } else {
        setStatus('error');
        setErrorMessage(res.data?.message || 'Failed to submit your inquiry.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message ||
          'A server connection error occurred. Please try again or call the studio directly.'
      );
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Ichra Bazar, Ichhra Lahore, 54000, Pakistan'
  )}`;

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-28 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-14 border-b border-[#241018]">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Connect With MM Decor Studio</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#F7F3EE] uppercase leading-none">
            Contact Studio
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Ichra Bazar, Lahore · Direct Consultation & Inquiries
          </p>
          <p className="text-sm sm:text-base text-[#8C817A] max-w-2xl leading-relaxed pt-2">
            Submit your spatial or celebratory inquiry below, call the studio directly, or explore our physical coordinates in Lahore.
          </p>
        </div>
      </section>

      {/* Main Grid: Details Left, Form Right */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Exact Business Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#18060f] border border-[#241018] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C9AB81] block mb-1">
                  Business Entity
                </span>
                <h2 className="font-editorial text-2xl text-[#F7F3EE]">
                  MM Decor Studio Interior Designer & Event Planner Lahore
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#8C817A] mt-1">
                  Category: Interior Designer
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#241018]">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#241018] text-[#C9AB81] border border-[#C9AB81]/20 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C817A] block">
                      Telephone Direct
                    </span>
                    <a
                      href="tel:+923180130117"
                      className="font-editorial text-xl text-[#F7F3EE] hover:text-[#C9AB81] transition-colors"
                    >
                      +92 318 0130117
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#241018] text-[#C9AB81] border border-[#C9AB81]/20 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C817A] block">
                      Studio Address
                    </span>
                    <p className="text-sm text-[#E9DFD2] leading-relaxed">
                      Ichra Bazar, Ichhra Lahore, 54000, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-[#241018] space-y-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#241018] hover:bg-[#C9AB81] hover:text-[#120309] text-[#E9DFD2] text-xs uppercase tracking-widest border border-[#C9AB81]/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <MapPin size={14} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://www.facebook.com/share/1CGzeig7td/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#120309] hover:border-[#C9AB81] text-[#E9DFD2] hover:text-[#C9AB81] text-xs uppercase tracking-widest border border-[#241018] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Connect on Facebook</span>
                  <ExternalLink size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Note regarding studio authenticity */}
            <div className="p-6 border border-[#241018] bg-[#120309]/50 text-xs text-[#8C817A] leading-relaxed">
              MM Decor Studio is registered with verified business credentials in Ichhra Lahore. All communications submitted through this form are logged securely into our studio registry.
            </div>
          </div>

          {/* Right Column: Premium Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#18060f] border border-[#241018]">
              <div className="mb-8 space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
                  Inquiry Registry
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
                  Start A Conversation
                </h2>
                <p className="text-xs text-[#8C817A] leading-relaxed">
                  Provide your project or consultation details below.
                </p>
              </div>

              {/* Status alerts */}
              {status === 'success' && (
                <div className="mb-8 p-6 bg-[#1a2e1d] border border-[#3e7845] text-[#b3f2bd] space-y-2 rounded-xs animate-fadeIn">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <CheckCircle2 size={18} />
                    <span>Inquiry Transmitted Successfully</span>
                  </div>
                  <p className="text-xs text-[#a2d8ab] leading-relaxed">
                    Thank you. Your message has been recorded in the MM Decor Studio inquiry registry. We will review your requirements and reach out via phone.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-8 p-6 bg-[#2a1016] border border-[#852a39] text-[#fca5a5] space-y-2 rounded-xs animate-fadeIn">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <AlertCircle size={18} />
                    <span>Submission Failed</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                    Full Name <span className="text-[#C9AB81]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationErrors.name) setValidationErrors({ ...validationErrors, name: null });
                    }}
                    placeholder="e.g. Ayesha Malik"
                    className={`w-full px-4 py-3 bg-[#120309] border text-sm text-[#F7F3EE] placeholder-[#8C817A]/50 focus:outline-none transition-colors ${
                      validationErrors.name ? 'border-red-500 focus:border-red-400' : 'border-[#241018] focus:border-[#C9AB81]'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-400 mt-1">{validationErrors.name}</p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                      Phone Number <span className="text-[#C9AB81]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: null });
                      }}
                      placeholder="+92 300 1234567"
                      className={`w-full px-4 py-3 bg-[#120309] border text-sm text-[#F7F3EE] placeholder-[#8C817A]/50 focus:outline-none transition-colors ${
                        validationErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-[#241018] focus:border-[#C9AB81]'
                      }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-xs text-red-400 mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                      Email Address <span className="text-[#8C817A] text-[10px]">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationErrors.email) setValidationErrors({ ...validationErrors, email: null });
                      }}
                      placeholder="client@example.com"
                      className={`w-full px-4 py-3 bg-[#120309] border text-sm text-[#F7F3EE] placeholder-[#8C817A]/50 focus:outline-none transition-colors ${
                        validationErrors.email ? 'border-red-500 focus:border-red-400' : 'border-[#241018] focus:border-[#C9AB81]'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-xs text-red-400 mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Interested In Selector */}
                <div>
                  <label htmlFor="interestedIn" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                    Area of Interest <span className="text-[#C9AB81]">*</span>
                  </label>
                  <select
                    id="interestedIn"
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    className="w-full px-4 py-3 bg-[#120309] border border-[#241018] text-sm text-[#F7F3EE] focus:outline-none focus:border-[#C9AB81] transition-colors"
                  >
                    <option value="Interior Design">Interior Design</option>
                    <option value="Event Planning">Event Planning</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                    Inquiry Subject <span className="text-[#C9AB81]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (validationErrors.subject) setValidationErrors({ ...validationErrors, subject: null });
                    }}
                    placeholder="e.g. Living Room Spatial Redesign / Reception Atmosphere"
                    className={`w-full px-4 py-3 bg-[#120309] border text-sm text-[#F7F3EE] placeholder-[#8C817A]/50 focus:outline-none transition-colors ${
                      validationErrors.subject ? 'border-red-500 focus:border-red-400' : 'border-[#241018] focus:border-[#C9AB81]'
                    }`}
                  />
                  {validationErrors.subject && (
                    <p className="text-xs text-red-400 mt-1">{validationErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#E9DFD2] mb-2">
                    Inquiry Message / Spatial Requirements <span className="text-[#C9AB81]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationErrors.message) setValidationErrors({ ...validationErrors, message: null });
                    }}
                    placeholder="Describe your spatial scope, celebratory theme, or any aesthetic preferences..."
                    className={`w-full px-4 py-3 bg-[#120309] border text-sm text-[#F7F3EE] placeholder-[#8C817A]/50 focus:outline-none transition-colors ${
                      validationErrors.message ? 'border-red-500 focus:border-red-400' : 'border-[#241018] focus:border-[#C9AB81]'
                    }`}
                  />
                  {validationErrors.message && (
                    <p className="text-xs text-red-400 mt-1">{validationErrors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C9AB81]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Transmitting to Studio Registry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Inquiry</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
