import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

async function getAchievements() {
  return await client.fetch(`*[_type == "achievement"] | order(year desc)`);
}

export default async function Achievements() {
  const achievements = await getAchievements();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Milestones of Excellence
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Celebrating years of trusted partnership and top-tier performance as Ratlam's leading electronics retailer.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {achievements.map((item, index) => (
            <div 
              key={item._id} 
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 p-6 
              ${index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'} 
              hover:shadow-2xl transition-all duration-500`}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity">
                {item.image && (
                  <img 
                    src={urlFor(item.image).url()} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {item.brand} • {item.year}
                </span>
                <h3 className="text-xl font-black mt-2 text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}