import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Upload, CheckCircle, Loader2, X, Image, AlertTriangle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useGeolocation } from '../hooks/useUtils';
import { GlassCard, Badge, SectionHeader } from '../components/ui/Components';
import * as api from '../services/api';

const aiResults = {
  pothole: { type: 'pothole', label: 'Pothole', confidence: 94, severity: 'high', priority: 1 },
  illegal_parking: { type: 'illegal_parking', label: 'Illegal Parking', confidence: 88, severity: 'medium', priority: 3 },
  signal_jump: { type: 'signal_jump', label: 'Signal Jumping', confidence: 91, severity: 'high', priority: 2 },
  waterlogging: { type: 'waterlogging', label: 'Waterlogging', confidence: 96, severity: 'high', priority: 1 },
  broken_road: { type: 'broken_road', label: 'Broken Road', confidence: 92, severity: 'high', priority: 2 },
  wrong_side: { type: 'wrong_side', label: 'Wrong-Side Driving', confidence: 85, severity: 'medium', priority: 4 },
  footpath: { type: 'footpath', label: 'Footpath Obstruction', confidence: 89, severity: 'medium', priority: 3 },
  speeding: { type: 'speeding', label: 'Overspeeding', confidence: 78, severity: 'high', priority: 2 },
  garbage: { type: 'garbage', label: 'Garbage on Road', confidence: 93, severity: 'low', priority: 5 },
  streetlight: { type: 'streetlight', label: 'Streetlight Failure', confidence: 95, severity: 'medium', priority: 4 },
  dangerous_driving: { type: 'dangerous_driving', label: 'Dangerous Driving', confidence: 82, severity: 'high', priority: 2 },
  pedestrian_block: { type: 'pedestrian_block', label: 'Blocking Pedestrian Crossing', confidence: 87, severity: 'medium', priority: 3 },
};

export default function Report() {
  const { addReport } = useApp();
  const { location: geoLocation, loading: geoLoading, getLocation } = useGeolocation();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1=form, 2=scanning, 3=result, 4=success
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [violationTypes, setViolationTypes] = useState([]);

  // Fetch violation types from API
  useEffect(() => {
    api.getViolationTypes().then(setViolationTypes).catch(console.error);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setStep(2);
    // Simulate AI analysis
    setTimeout(() => {
      const result = selectedType ? aiResults[selectedType] : aiResults.pothole;
      setAiResult(result);
      setStep(3);
    }, 2500);
  };

  const handleConfirm = async () => {
    const loc = geoLocation || { lat: 12.8714 + (Math.random() - 0.5) * 0.03, lng: 74.8431 + (Math.random() - 0.5) * 0.03 };
    const typeInfo = violationTypes.find(v => v.id === (aiResult?.type || selectedType)) || violationTypes[0] || { label: 'Unknown', icon: '📋' };

    try {
      const report = await addReport({
        type: aiResult?.type || selectedType || 'pothole',
        typeLabel: typeInfo.label,
        icon: typeInfo.icon,
        location: {
          name: 'Reported Location',
          lat: loc.lat,
          lng: loc.lng,
        },
        description,
        severity: aiResult?.severity || 'medium',
        aiConfidence: aiResult?.confidence || 80,
        priorityScore: aiResult ? (100 - aiResult.priority * 10) : 60,
        imageFile,
      });

      setReportId(report.id);
      setStep(4);
    } catch (err) {
      console.error('Failed to submit report:', err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType(null);
    setDescription('');
    setImagePreview(null);
    setImageFile(null);
    setAiResult(null);
    setReportId(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="Report an Issue"
          subtitle="Upload a photo. AI identifies the problem. GPS locates it. Authorities are notified."
          badge="📸 Citizen Report"
        />

        <AnimatePresence mode="wait">
          {/* ─── Step 1: Form ─── */}
          {step === 1 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Issue Type */}
              <div className="glass p-5">
                <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">Select Issue Type</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {violationTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-xl text-center transition-all duration-200 ${
                        selectedType === type.id
                          ? 'bg-[#06B6D4]/15 border-[#06B6D4]/30 border ring-1 ring-[#06B6D4]/20'
                          : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className="text-[10px] text-[#CBD5E1] leading-tight">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload */}
              <div className="glass p-5">
                <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">Upload Photo/Video</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      onClick={() => { setImagePreview(null); setImageFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 rounded-xl border-2 border-dashed border-white/10 hover:border-[#06B6D4]/30 flex flex-col items-center justify-center gap-3 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#06B6D4]/10 flex items-center justify-center group-hover:bg-[#06B6D4]/15 transition-colors">
                      <Camera size={24} className="text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#CBD5E1] font-medium">Tap to take photo or upload</p>
                      <p className="text-xs text-[#64748B]">JPG, PNG, MP4 — Max 10MB</p>
                    </div>
                  </button>
                )}
              </div>

              {/* Location */}
              <div className="glass p-5">
                <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">Location</label>
                <button
                  onClick={getLocation}
                  className="btn-secondary w-full justify-center"
                  disabled={geoLoading}
                >
                  {geoLoading ? (
                    <><Loader2 size={16} className="animate-spin" /> Detecting Location...</>
                  ) : geoLocation ? (
                    <><MapPin size={16} className="text-emerald-400" /> Location Captured ({geoLocation.lat.toFixed(4)}, {geoLocation.lng.toFixed(4)})</>
                  ) : (
                    <><MapPin size={16} /> Use My Current Location</>
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="glass p-5">
                <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue you observed..."
                  className="input min-h-[100px] resize-none"
                />
              </div>

              {/* Privacy */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                <Shield size={18} className="text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Your privacy is protected. Faces and number plates are automatically blurred in uploaded images. Location data is used only for mapping. Reports can be anonymous.
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!selectedType}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Upload size={18} /> Submit Report for AI Analysis
              </button>
            </motion.div>
          )}

          {/* ─── Step 2: AI Scanning ─── */}
          {step === 2 && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Spinning ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-t-[#06B6D4] border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-[#8B5CF6] border-b-transparent border-l-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
                <div className="absolute inset-4 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    🤖
                  </motion.div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                AI Analyzing...
              </h3>
              <p className="text-sm text-[#94A3B8] mb-6">Computer vision is processing your report</p>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden max-w-xs mx-auto">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.3, ease: 'easeInOut' }}
                />
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Detecting objects', 'Classifying issue', 'Estimating severity', 'Generating report'].map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.5 }}
                    className="text-xs text-[#64748B]"
                  >
                    {i > 0 && '→ '}{s}
                  </motion.span>
                ))}
              </div>

              <p className="text-[10px] text-[#475569] mt-4">AI DEMONSTRATION MODE</p>
            </motion.div>
          )}

          {/* ─── Step 3: AI Result ─── */}
          {step === 3 && aiResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              <div className="glass p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle size={32} className="text-emerald-400" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>AI Detection Complete</h3>
                <p className="text-sm text-[#94A3B8] mb-6">Our AI has analyzed your submission</p>

                {/* Detection Card */}
                <div className="glass-sm p-5 text-left max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{violationTypes.find(v => v.id === aiResult.type)?.icon || '🔍'}</span>
                      <div>
                        <div className="text-xs text-[#94A3B8]">AI DETECTED</div>
                        <div className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{aiResult.label}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <div className="text-xs text-[#94A3B8] mb-1">Confidence</div>
                      <div className="text-lg font-bold text-[#06B6D4]" style={{ fontFamily: 'Space Grotesk' }}>{aiResult.confidence}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <div className="text-xs text-[#94A3B8] mb-1">Severity</div>
                      <div className={`text-lg font-bold ${aiResult.severity === 'high' ? 'text-red-400' : aiResult.severity === 'medium' ? 'text-yellow-400' : 'text-emerald-400'}`} style={{ fontFamily: 'Space Grotesk' }}>
                        {aiResult.severity.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] text-center">
                      <div className="text-xs text-[#94A3B8] mb-1">Priority</div>
                      <div className="text-lg font-bold text-[#F59E0B]" style={{ fontFamily: 'Space Grotesk' }}>#{aiResult.priority}</div>
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-[#475569]">AI DEMONSTRATION MODE — Simulated detection</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                  Modify Report
                </button>
                <button onClick={handleConfirm} className="btn-primary flex-1 justify-center">
                  <CheckCircle size={16} /> Confirm & Submit
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 4: Success ─── */}
          {step === 4 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-emerald-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                Report Submitted!
              </h3>
              <p className="text-sm text-[#94A3B8] mb-6">
                Your report has been added to the city map and admin queue.
              </p>

              <div className="glass-sm p-4 max-w-xs mx-auto mb-6">
                <div className="text-xs text-[#94A3B8] mb-1">Report ID</div>
                <div className="text-lg font-bold text-[#06B6D4] font-mono">{reportId}</div>
                <div className="text-xs text-[#64748B] mt-1">Status: Pending Review</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={resetForm} className="btn-primary">
                  <Camera size={16} /> Submit Another
                </button>
                <a href="/map" className="btn-secondary justify-center">
                  <MapPin size={16} /> View on Map
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
