import { client } from '../../sanity/lib/client';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MapPin, Phone, Mail, Store } from 'lucide-react';

export default async function ContactUs() {
  const store = await client.fetch(`*[_type == "storeSettings"][0]`);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Contact Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h1 className="text-4xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Store className="text-blue-600" size={40} /> Get in Touch
              </h1>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><MapPin /></div>
                  <div>
                    <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider">Visit Us</h3>
                    <p className="text-lg font-semibold text-slate-800">{store?.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600"><Phone /></div>
                  <p className="text-lg font-semibold text-slate-800">{store?.phone}</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><Mail /></div>
                  <p className="text-lg font-semibold text-slate-800">{store?.email}</p>
                </div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[ {name: 'Facebook', icon: <FaFacebook />, color: 'text-blue-600', url: store?.facebook},
                 {name: 'Instagram', icon: <FaInstagram />, color: 'text-pink-600', url: store?.instagram},
                 {name: 'YouTube', icon: <FaYoutube />, color: 'text-red-600', url: store?.youtube} ].map((s) => (
                <a key={s.name} href={s.url} target="_blank" className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-lg transition-all">
                  <div className={s.color}>{s.icon}</div>
                  <span className="text-xs font-bold text-slate-600">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Map CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-blue-500/30">
            <div>
              <h2 className="text-3xl font-black mb-4">Find us on Maps</h2>
              <p className="opacity-90">Visit our store for exclusive deals and experience the latest technology.</p>
            </div>
            <a href={store?.mapLink} target="_blank" className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black text-center hover:scale-105 transition-transform">
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}