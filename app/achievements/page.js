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
        <h1 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Milestones of Excellence
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {achievements.map((item, index) => (
            <div 
              key={item._id} 
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg transition-all duration-500 
              ${index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              {/* Image Container - Takes 70% of the card height */}
              <div className="flex-grow relative overflow-hidden bg-slate-100">
                {item.image && (
                  <img 
                    src={urlFor(item.image)} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-2" 
                  />
                )}
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Text Container - Bottom 30% */}
              <div className="p-6 bg-white border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  {item.brand} • {item.year}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
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