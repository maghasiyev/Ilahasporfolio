import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Send, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex flex-col justify-center bg-amber-50/20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-8 text-amber-900"
            >
              Let's <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 italic font-serif font-light lowercase">chat</span>
            </motion.h1>
            <p className="text-xl text-slate-500 max-w-sm leading-relaxed">
              We're ready when you are. Tell us about your vision and let's make it a reality.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group cursor-pointer w-fit">
              <div className="w-16 h-16 rounded-3xl bg-amber-500 text-black flex items-center justify-center group-hover:bg-orange-500 transition-all shadow-xl shadow-amber-100 group-hover:shadow-orange-100 group-hover:-rotate-6">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-amber-500 mb-2">Direct Mail</p>
                <p className="font-bold text-xl text-amber-900">hello@auracreative.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <button key={idx} className="w-14 h-14 rounded-2xl border border-amber-100 bg-white text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm hover:shadow-amber-200">
                  <Icon className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-16 rounded-[4rem] border border-amber-50 shadow-2xl shadow-amber-100 relative overflow-hidden"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-24">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-24 h-24 bg-amber-500 text-black rounded-full flex items-center justify-center mb-10 shadow-xl shadow-amber-200"
              >
                <Send className="w-10 h-10" />
              </motion.div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-4 text-amber-900">Wave Sent!</h2>
              <p className="text-slate-400 font-medium">We'll catch the same frequency shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-12 text-xs font-black uppercase tracking-[0.3em] text-amber-600 border-b-2 border-amber-600 pb-2 hover:opacity-50 transition-all"
              >
                Dispatch Final Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-amber-500 ml-1">Identity</label>
                  <input 
                    {...register('name', { required: true })}
                    className="w-full bg-amber-50/50 border-none ring-1 ring-amber-50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-6 py-5 transition-all text-sm font-bold text-amber-900 placeholder:text-amber-200"
                    placeholder="E.g. David Carson"
                  />
                  {errors.name && <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider pl-1">Required</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-amber-500 ml-1">Frequency (Email)</label>
                  <input 
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full bg-amber-50/50 border-none ring-1 ring-amber-50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-6 py-5 transition-all text-sm font-bold text-amber-900 placeholder:text-amber-200"
                    placeholder="david@design.com"
                  />
                  {errors.email && <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider pl-1">Invalid Email</p>}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-amber-500 ml-1">Project Frequency</label>
                <input 
                  {...register('subject', { required: true })}
                  className="w-full bg-amber-50/50 border-none ring-1 ring-amber-50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-6 py-5 transition-all text-sm font-bold text-amber-900 placeholder:text-amber-200"
                  placeholder="Branding, Motion, Illustration..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-amber-500 ml-1">The Message</label>
                <textarea 
                  {...register('message', { required: true })}
                  rows={5}
                  className="w-full bg-amber-50/50 border-none ring-1 ring-amber-50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-6 py-5 transition-all text-sm font-bold text-amber-900 placeholder:text-amber-200 resize-none"
                  placeholder="What's the big dream?"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-black rounded-2xl py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-amber-600 transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-amber-100"
              >
                {isSubmitting ? "Broadcasting..." : "Launch Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
