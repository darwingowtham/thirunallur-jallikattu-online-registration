import React, { useState } from 'react';
import { User, Shield, CreditCard, CheckCircle, ChevronRight, ChevronLeft, Upload, FileText, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { LANG } from '../js/lang';
import templeImg from '../assets/temple/amman_temple.jpeg';

// Helper for translation access
const getT = (lang) => LANG[lang].booking;

const InputField = ({ label, name, type = "text", required = true, value, onChange, lang }) => (
    <div className="mb-4 group">
        <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide transition-colors group-focus-within:text-thiru-gold", lang === 'ta' && 'font-tamil')}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-thiru-gold focus:ring-1 focus:ring-thiru-gold outline-none transition-all placeholder-zinc-800"
        />
    </div>
);

const FileUpload = ({ label, lang, accept, onChange }) => {
    const fileInputRef = React.useRef(null);
    const [fileName, setFileName] = React.useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onChange) onChange(file);
        }
    };

    return (
        <div className="mb-4">
            <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide", lang === 'ta' && 'font-tamil')}>
                {label}
            </label>
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 rounded-lg p-6 hover:border-thiru-gold/50 transition-colors cursor-pointer bg-black/30 group relative overflow-hidden"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={accept}
                    onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center text-zinc-500 group-hover:text-thiru-gold transition-colors">
                    {fileName ? (
                        <>
                            <CheckCircle size={24} className="mb-2 text-green-500" />
                            <span className="text-xs uppercase text-white font-bold truncate max-w-full px-2">{fileName}</span>
                            <span className="text-[10px] uppercase text-zinc-500 mt-1">Click to change</span>
                        </>
                    ) : (
                        <>
                            <Upload size={24} className="mb-2" />
                            <span className="text-xs uppercase">Click to Upload</span>
                            {accept && <span className="text-[10px] uppercase text-zinc-600 mt-1">({accept.replace('image/', '').replace('application/', '').replace('.', '').toUpperCase()})</span>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Registration({ lang }) {
    const t = getT(lang);
    const { user, login } = useAuth();
    const [regType, setRegType] = useState(null); // 'bull' | 'tamer' | null
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [ticketId, setTicketId] = useState(null);

    // Consolidated Form Data
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', aadhar: '', district: '', village: '', address: '',
        doorNo: '', taluk: '', pincode: '',
        assistName: '', assistMobile: '',
        bullName: '', bullAge: '', breed: 'Pulikulam', height: '', marks: '',
        bullColor: '', bullDentition: '', bullNative: 'yes', hornLength: '', icd: '',
        vetName: '', medicalCertNo: '', vaccineFMD: '',

        tamerAge: '', weight: '', bloodGroup: '',
        hostingDistrict: '', jallikattuLocation: '', submittingLocation: '',
        emergencyName: '', emergencyMobile: '',
        ownerAadharFile: null, bullMedicalFile: null, bullPhotoFile: null,

        photo: null, aadharCard: null, medicalCert: null,
        pledgeAccepted: false
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (name, file) => setFormData(prev => ({ ...prev, [name]: file }));

    // Pre-fill user data when user logs in
    React.useEffect(() => {
        if (user && formData.name === '' && formData.email === '') {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = () => {
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            const prefix = regType === 'bull' ? 'BULL' : 'TMR';
            const newId = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

            // Save to LocalStorage for Tracking
            const newRegistration = {
                id: newId,
                name: formData.name,
                mobile: formData.phone,
                type: regType,
                status: 'Submitted', // Default status
                timestamp: Date.now(),
                // Store minimal details for display
                district: formData.district,
                village: formData.village
            };

            const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
            localStorage.setItem('registrations', JSON.stringify([...existingRegistrations, newRegistration]));

            setTicketId(newId);
            setLoading(false);
            setStep(5); // Success Step
        }, 2000);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // Initial Selection Screen
    if (!regType) {
        return (
            <div
                className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-fixed bg-cover relative"
                style={{ backgroundImage: `url("${templeImg}")` }}
            >
                <div className="absolute inset-0 bg-thiru-black/90 backdrop-blur-sm" />
                <div className="relative z-10 w-full max-w-4xl text-center">
                    <h2 className={clsx("text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-thiru-gold to-thiru-red mb-12", lang === 'ta' && 'font-tamil')}>
                        {t.selectType}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setRegType('bull'); setStep(1); }}
                            className="bg-black/40 hover:bg-black/60 border border-zinc-800 hover:border-thiru-gold p-8 rounded-2xl backdrop-blur-md transition-all group"
                        >
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-thiru-gold/20 transition-colors">
                                <Shield className="w-10 h-10 text-zinc-400 group-hover:text-thiru-gold" />
                            </div>
                            <h3 className={clsx("text-2xl font-bold text-white mb-2", lang === 'ta' && 'font-tamil')}>{t.bullOwner}</h3>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setRegType('tamer'); setStep(1); }}
                            className="bg-black/40 hover:bg-black/60 border border-zinc-800 hover:border-thiru-red p-8 rounded-2xl backdrop-blur-md transition-all group"
                        >
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-thiru-red/20 transition-colors">
                                <User className="w-10 h-10 text-zinc-400 group-hover:text-thiru-red" />
                            </div>
                            <h3 className={clsx("text-2xl font-bold text-white mb-2", lang === 'ta' && 'font-tamil')}>{t.bullTamer}</h3>
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center bg-fixed bg-cover relative"
            style={{ backgroundImage: `url("${templeImg}")` }}
        >
            <div className="absolute inset-0 bg-thiru-black/90 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-2xl">
                <button
                    onClick={() => { setRegType(null); setStep(1); }}
                    className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-thiru-gold transition-colors"
                >
                    <ChevronLeft size={20} /> <span className={clsx(lang === 'ta' && 'font-tamil')}>{t.selectType}</span>
                </button>

                <div className="bg-zinc-950/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
                    {/* Progress Bar */}
                    <div className="h-1 bg-zinc-900 w-full grid grid-cols-4">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={clsx("h-full transition-colors duration-500", step >= s ? (regType === 'bull' ? "bg-yellow-600" : "bg-red-700") : "bg-transparent")} />
                        ))}
                    </div>

                    <div className="p-8">
                        <AnimatePresence mode='wait'>
                            {/* STEP 1: PERSONAL DETAILS (Common) */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className={clsx("text-xl font-bold text-thiru-gold mb-6 border-b border-zinc-800 pb-2", lang === 'ta' && 'font-tamil')}>
                                        {t.step1}
                                    </h3>

                                    {/* Google Login Prompt if not logged in */}
                                    {!user ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                                                <User className="w-10 h-10 text-zinc-400" />
                                            </div>
                                            <h4 className={clsx("text-2xl font-bold text-white mb-4", lang === 'ta' && 'font-tamil')}>
                                                {lang === 'ta' ? 'பதிவு செய்ய உள்நுழையவும்' : 'Login to Register'}
                                            </h4>
                                            <p className="text-zinc-400 mb-8 max-w-md">
                                                {lang === 'ta'
                                                    ? 'காளை அல்லது மாடுபிடி வீரர் பதிவு செய்ய உங்கள் கூகுள் கணக்கை பயன்படுத்தி உள்நுழைய வேண்டும்.'
                                                    : 'To register a bull or as a tamer, you need to log in with your Google account first.'}
                                            </p>

                                            <div className="bg-white p-2 rounded-lg">
                                                <GoogleLogin
                                                    onSuccess={(credentialResponse) => {
                                                        const decoded = jwtDecode(credentialResponse.credential);
                                                        login(decoded);
                                                    }}
                                                    onError={() => {
                                                        console.log('Login Failed');
                                                    }}
                                                    theme="outline"
                                                    size="large"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.name} name="name" value={formData.name} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} lang={lang} />
                                            </div>
                                            <InputField label={t.fields.email} name="email" type="email" required={false} value={formData.email} onChange={handleChange} lang={lang} />
                                            <InputField label={t.fields.aadhar} name="aadhar" value={formData.aadhar} onChange={handleChange} lang={lang} />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.district} name="district" value={formData.district} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.village} name="village" value={formData.village} onChange={handleChange} lang={lang} />
                                            </div>
                                            <InputField label={t.fields.address} name="address" value={formData.address} onChange={handleChange} lang={lang} />
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <InputField label={t.fields.doorNo} name="doorNo" value={formData.doorNo} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.taluk} name="taluk" value={formData.taluk} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.pincode} name="pincode" value={formData.pincode} onChange={handleChange} lang={lang} />
                                            </div>

                                            {regType === 'bull' && (
                                                <div className="mt-6 pt-6 border-t border-zinc-800">
                                                    <h4 className={clsx("text-lg font-bold text-zinc-300 mb-4", lang === 'ta' && 'font-tamil')}>
                                                        {lang === 'ta' ? 'உதவியாளர் விவரங்கள்' : 'Assistant Details'}
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <InputField label={t.fields.assistName} name="assistName" value={formData.assistName} onChange={handleChange} lang={lang} />
                                                        <InputField label={t.fields.assistMobile} name="assistMobile" type="tel" value={formData.assistMobile} onChange={handleChange} lang={lang} />
                                                    </div>
                                                </div>
                                            )}

                                            <button onClick={nextStep} className={clsx("w-full mt-6 bg-zinc-100 hover:bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all", lang === 'ta' && 'font-tamil')}>
                                                {LANG[lang].booking.next || "Next"} <ChevronRight size={18} />
                                            </button>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 2: SPECIFIC DETAILS */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className={clsx("text-xl font-bold text-thiru-gold mb-6 border-b border-zinc-800 pb-2", lang === 'ta' && 'font-tamil')}>
                                        {t.step2}
                                    </h3>

                                    {regType === 'bull' ? (
                                        <>
                                            {/* Breed Selection */}
                                            <div className="mb-6">
                                                <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide", lang === 'ta' && 'font-tamil')}>
                                                    {t.fields.breed} <span className="text-red-500">*</span>
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {['Pulikulam', 'Kangayam', 'Umblachery', 'Others'].map((b) => (
                                                        <label key={b} className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-zinc-700 cursor-pointer hover:border-thiru-gold transition-colors">
                                                            <input
                                                                type="radio"
                                                                name="breed"
                                                                value={b}
                                                                checked={formData.breed === b}
                                                                onChange={handleChange}
                                                                className="text-thiru-gold focus:ring-thiru-gold bg-zinc-900 border-zinc-600"
                                                            />
                                                            <span className="text-white text-sm">{b}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.bullAge} name="bullAge" type="number" value={formData.bullAge} onChange={handleChange} lang={lang} />
                                                {/* Native Status Radio */}
                                                <div className="mb-4">
                                                    <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide", lang === 'ta' && 'font-tamil')}>
                                                        {t.fields.bullNative} <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex space-x-6">
                                                        <label className="flex items-center space-x-2 cursor-pointer">
                                                            <input type="radio" name="bullNative" value="yes" checked={formData.bullNative === 'yes'} onChange={handleChange} className="text-thiru-gold focus:ring-thiru-gold" />
                                                            <span className={clsx("text-white", lang === 'ta' && 'font-tamil')}>{t.fields.yes}</span>
                                                        </label>
                                                        <label className="flex items-center space-x-2 cursor-pointer">
                                                            <input type="radio" name="bullNative" value="no" checked={formData.bullNative === 'no'} onChange={handleChange} className="text-thiru-gold focus:ring-thiru-gold" />
                                                            <span className={clsx("text-white", lang === 'ta' && 'font-tamil')}>{t.fields.no}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.hornLength} name="hornLength" type="number" value={formData.hornLength} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.icd} name="icd" type="number" value={formData.icd} onChange={handleChange} lang={lang} />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.height} name="height" type="number" value={formData.height} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.bullColor} name="bullColor" value={formData.bullColor} onChange={handleChange} lang={lang} />
                                            </div>

                                            <InputField label={t.fields.marks} name="marks" value={formData.marks} onChange={handleChange} lang={lang} />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.vetName} name="vetName" value={formData.vetName} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.medicalCertNo} name="medicalCertNo" value={formData.medicalCertNo} onChange={handleChange} lang={lang} />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.vaccineFMD} name="vaccineFMD" value={formData.vaccineFMD} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.bullDentition} name="bullDentition" value={formData.bullDentition} onChange={handleChange} lang={lang} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-700 mb-6">
                                                <h4 className={clsx("text-lg font-bold text-thiru-gold mb-4", lang === 'ta' && 'font-tamil')}>
                                                    {t.fields.tamerFormTitle}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Hosting Details - Dummy Data for now */}
                                                    <div className="mb-4">
                                                        <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide", lang === 'ta' && 'font-tamil')}>
                                                            {t.fields.hostingDistrict} <span className="text-red-500">*</span>
                                                        </label>
                                                        <select name="hostingDistrict" value={formData.hostingDistrict} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-thiru-gold outline-none">
                                                            <option value="">Select</option>
                                                            <option value="pudukkottai">Pudukkottai</option>
                                                            <option value="madurai">Madurai</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className={clsx("block text-zinc-400 text-sm mb-2 uppercase tracking-wide", lang === 'ta' && 'font-tamil')}>
                                                            {t.fields.jallikattuLocation} <span className="text-red-500">*</span>
                                                        </label>
                                                        <select name="jallikattuLocation" value={formData.jallikattuLocation} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-thiru-gold outline-none">
                                                            <option value="">Select</option>
                                                            <option value="thirunallur">Thirunallur</option>
                                                            <option value="avaniapuram">Avaniapuram</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.tamerAge} name="tamerAge" type="number" value={formData.tamerAge} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.weight} name="weight" type="number" value={formData.weight} onChange={handleChange} lang={lang} />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label={t.fields.height} name="height" type="number" value={formData.height} onChange={handleChange} lang={lang} />
                                                <InputField label={t.fields.bloodGroup} name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} lang={lang} />
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-zinc-800">
                                                <h4 className={clsx("text-lg font-bold text-zinc-300 mb-4", lang === 'ta' && 'font-tamil')}>
                                                    {lang === 'ta' ? 'அவசர தொடர்பு' : 'Emergency Contact'}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <InputField label={t.fields.emergencyName} name="emergencyName" value={formData.emergencyName} onChange={handleChange} lang={lang} />
                                                    <InputField label={t.fields.emergencyMobile} name="emergencyMobile" type="tel" value={formData.emergencyMobile} onChange={handleChange} lang={lang} />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={prevStep} className="w-1/3 border border-zinc-700 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                                            {LANG[lang].booking.back || "Back"}
                                        </button>
                                        <button onClick={nextStep} className="w-2/3 bg-zinc-100 hover:bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                                            {LANG[lang].booking.next || "Next"} <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: DOCUMENTS */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className={clsx("text-xl font-bold text-thiru-gold mb-6 border-b border-zinc-800 pb-2", lang === 'ta' && 'font-tamil')}>
                                        {t.step3}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        {regType === 'bull' ? (
                                            <>
                                                <div className="col-span-2 md:col-span-1">
                                                    <FileUpload
                                                        label={t.fields.ownerAadharFile}
                                                        lang={lang}
                                                        accept=".pdf"
                                                        onChange={(file) => handleFileChange('ownerAadharFile', file)}
                                                    />
                                                </div>
                                                <div className="col-span-2 md:col-span-1">
                                                    <FileUpload
                                                        label={t.fields.bullMedicalFile}
                                                        lang={lang}
                                                        accept=".pdf"
                                                        onChange={(file) => handleFileChange('bullMedicalFile', file)}
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <FileUpload
                                                        label={t.fields.bullPhotoFile}
                                                        lang={lang}
                                                        accept=".jpg,.jpeg"
                                                        onChange={(file) => handleFileChange('bullPhotoFile', file)}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <FileUpload
                                                    label={t.fields.photo}
                                                    lang={lang}
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(file) => handleFileChange('photo', file)}
                                                />
                                                <FileUpload
                                                    label={t.fields.aadharCard}
                                                    lang={lang}
                                                    accept=".pdf,.jpg,.jpeg"
                                                    onChange={(file) => handleFileChange('aadharCard', file)}
                                                />
                                                <FileUpload
                                                    label={t.fields.medicalCert}
                                                    lang={lang}
                                                    accept=".pdf,.jpg,.jpeg"
                                                    onChange={(file) => handleFileChange('medicalCert', file)}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={prevStep} className="w-1/3 border border-zinc-700 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                                            {LANG[lang].booking.back || "Back"}
                                        </button>
                                        <button onClick={nextStep} className="w-2/3 bg-zinc-100 hover:bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                                            {LANG[lang].booking.next || "Next"} <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}


                            {/* STEP 4: PAYMENT */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="text-center"
                                >
                                    <h3 className={clsx("text-xl font-bold text-thiru-gold mb-6 border-b border-zinc-800 pb-2", lang === 'ta' && 'font-tamil')}>
                                        {t.step4}
                                    </h3>
                                    <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl mb-8 border border-zinc-800 shadow-inner">
                                        <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">Registration Fee</p>
                                        <p className="text-5xl font-black text-white mb-2">₹{regType === 'bull' ? '500' : '200'}</p>
                                        <p className="text-zinc-600 text-xs">Includes Insurance & Medical Checkup</p>
                                    </div>

                                    {/* Pledge Section */}
                                    {/* Pledge / Declaration Section */}
                                    {regType === 'bull' ? (
                                        <div className="mb-8 text-left bg-zinc-900/50 p-6 rounded-xl border border-zinc-700">
                                            <h4 className={clsx("font-bold text-thiru-gold mb-3", lang === 'ta' && 'font-tamil')}>{t.fields.pledge}</h4>
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.pledgeAccepted}
                                                        onChange={(e) => setFormData({ ...formData, pledgeAccepted: e.target.checked })}
                                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-500 bg-zinc-800 transition-all checked:border-green-500 checked:bg-green-500 hover:border-thiru-gold"
                                                    />
                                                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <CheckCircle size={14} fill="currentColor" className="text-white" />
                                                    </div>
                                                </div>
                                                <p className={clsx("text-sm text-zinc-300 leading-relaxed group-hover:text-white transition-colors select-none", lang === 'ta' && 'font-tamil')}>
                                                    {t.fields.pledgeText}
                                                </p>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="mb-8 text-left bg-blue-900/20 p-6 rounded-xl border border-blue-800/50">
                                            <h4 className={clsx("font-bold text-blue-400 mb-3 text-lg border-b border-blue-800/50 pb-2", lang === 'ta' && 'font-tamil')}>
                                                {t.fields.declarationTitle}
                                            </h4>
                                            <ul className={clsx("text-sm text-zinc-300 space-y-2 list-disc pl-5", lang === 'ta' && 'font-tamil')}>
                                                <li>{t.fields.declarationRule1}</li>
                                                <li>{t.fields.declarationRule2}</li>
                                                <li>{t.fields.declarationRule3}</li>
                                            </ul>
                                            <label className="flex items-start gap-3 cursor-pointer group mt-6 pt-4 border-t border-blue-800/30">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.pledgeAccepted}
                                                        onChange={(e) => setFormData({ ...formData, pledgeAccepted: e.target.checked })}
                                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-500 bg-zinc-800 transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400"
                                                    />
                                                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <CheckCircle size={14} fill="currentColor" className="text-white" />
                                                    </div>
                                                </div>
                                                <p className={clsx("text-sm text-zinc-400 group-hover:text-white transition-colors select-none", lang === 'ta' && 'font-tamil')}>
                                                    I have read and agree to the above declaration.
                                                </p>
                                            </label>
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="w-1/3 border border-zinc-700 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading || (regType === 'bull' && !formData.pledgeAccepted)}
                                            className={clsx("w-2/3 bg-green-600 hover:bg-green-500 py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed", lang === 'ta' && 'font-tamil')}
                                        >
                                            {loading ? (LANG[lang].booking.processing || "Processing...") : (LANG[lang].booking.payBtn || "Pay Now")}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5: SUCCESS & TOKEN */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                        <CheckCircle className="text-green-500 w-8 h-8" />
                                    </div>
                                    <h3 className={clsx("text-2xl font-bold text-white mb-2", lang === 'ta' && 'font-tamil')}>{t.success}</h3>
                                    <p className="text-zinc-400 text-sm mb-6">Please save this token for entry.</p>

                                    {/* ID CARD TOKEN DESIGN */}
                                    <div className="bg-white text-black rounded-xl w-full max-w-sm mx-auto shadow-2xl transform transition-transform hover:scale-[1.02] duration-300 relative border border-zinc-200 mt-12">

                                        {/* Temple Watermark (Background) */}
                                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
                                            <img
                                                src={templeImg}
                                                alt="Watermark"
                                                className="w-full h-full object-cover opacity-[0.08] grayscale"
                                            />
                                        </div>

                                        {/* Header with Logo */}
                                        <div className={clsx("p-4 py-8 rounded-t-xl text-center text-white relative z-10 overflow-visible", regType === 'bull' ? "bg-gradient-to-r from-yellow-700 to-yellow-900" : "bg-gradient-to-r from-red-700 to-red-900")}>
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                                            {/* Official Logo (Round & Inside Box) */}
                                            <div className="relative w-24 h-24 mx-auto mb-3 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={templeImg}
                                                    alt="Official Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="relative z-10 mt-2">
                                                <h4 className={clsx("font-bold text-xl leading-tight uppercase tracking-wider text-shadow-md", lang === 'ta' && 'font-tamil')}>
                                                    {regType === 'bull' ? (lang === 'ta' ? 'ஜல்லிக்கட்டு காளை டோக்கன்' : 'JALLIKATTU BULL TOKEN') : (lang === 'ta' ? 'மாடுபிடி வீரர் டோக்கன்' : 'TAMER TOKEN')}
                                                </h4>
                                                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mt-1 text-white/90">Thirunallur • 2025</p>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-5 flex flex-col gap-4 relative z-10">

                                            {/* Top Row: Photo & QR */}
                                            {/* Grid: Photo & QR */}
                                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                {/* Left: Photo Area */}
                                                <div className="w-full aspect-[3/4] bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center text-zinc-400">
                                                    <User size={32} strokeWidth={1} />
                                                    <span className="text-[9px] uppercase mt-2 text-center font-bold tracking-wide">Photo<br />Affix Here</span>
                                                </div>

                                                {/* Right: QR & ID */}
                                                {/* Right: QR & ID */}
                                                <div className="flex flex-col justify-between items-center text-center h-full py-1">
                                                    <div className="w-full">
                                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 text-center">Token Number</p>
                                                        <div className="flex justify-center">
                                                            <p className="text-lg font-mono font-bold text-black border-2 border-black/10 bg-zinc-50 px-2 rounded">{ticketId}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white p-1 border border-zinc-200 rounded-lg shadow-sm">
                                                        <img
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId || 'THIRUNALLUR'}`}
                                                            alt="QR Code"
                                                            className="w-20 h-20"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Details Table */}
                                            <div className="border-t border-b border-zinc-200/60 py-3 space-y-2 text-left text-xs sm:text-sm bg-white/40 backdrop-blur-sm rounded px-1 sm:px-2">
                                                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                    <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.nameShort}</span>
                                                    <span className="font-bold col-span-2 truncate">{formData.name}</span>
                                                </div>
                                                {regType === 'bull' ? (
                                                    <>
                                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                            <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.bullShort}</span>
                                                            <span className="font-bold col-span-2 truncate">{formData.bullName || '-'}</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                            <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.breedShort}</span>
                                                            <span className="font-semibold col-span-2 truncate">{formData.breed || '-'}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                            <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.tamerAge}</span>
                                                            <span className="font-semibold col-span-2">{formData.tamerAge} Yrs</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                            <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.weightShort}</span>
                                                            <span className="font-semibold col-span-2">{formData.weight} KG</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                            <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.bloodShort}</span>
                                                            <div className="col-span-2"><span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold shadow-sm">{formData.bloodGroup || 'O+'}</span></div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                                    <span className="text-zinc-600 text-[10px] sm:text-xs uppercase font-bold tracking-wider col-span-1">{t.fields.place}</span>
                                                    <span className="font-semibold col-span-2 truncate text-[10px] sm:text-xs">{formData.village}, {formData.district}</span>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex justify-between items-end pt-1">
                                                <div className="text-[8px] text-zinc-600 text-left leading-tight w-2/3 font-semibold">
                                                    * Valid only with original Aadhar.<br />
                                                    * Report 2 hours before event.<br />
                                                    * Follow safety guidelines.
                                                </div>
                                                <div className="text-center">
                                                    {/* Mock Signature */}
                                                    <div className="h-6 w-16 mb-1 border-b border-zinc-400">
                                                        <Activity className="text-blue-900 w-full h-full opacity-60" />
                                                    </div>
                                                    <p className="text-[8px] font-bold uppercase text-zinc-600">Chairman</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4 justify-center">
                                        <button
                                            onClick={() => window.print()}
                                            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2"
                                        >
                                            <Upload className="rotate-180 w-4 h-4" /> Save / Print
                                        </button>
                                        <button
                                            onClick={() => { setRegType(null); setStep(1); setFormData({}); }}
                                            className="text-zinc-400 hover:text-white underline text-sm transition-colors py-2"
                                        >
                                            New Registration
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
