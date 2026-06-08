import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">

      {/* Hero */}
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="badge-green mb-6 inline-flex">✦ Smart Medicine Comparator</span>

          <h1 className="font-heading text-4xl sm:text-5xl text-gray-900 leading-tight mb-5 animate-slide-up">
            Find Affordable<br />
            <span className="text-brand-500">Generic Alternatives</span><br />
            Instantly
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8 animate-slide-up delay-100" style={{ opacity: 0 }}>
            Compare branded prescriptions with FDA-approved bio-equivalent generics. Same ingredients, same safety — lower price.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up delay-200" style={{ opacity: 0 }}>
            <Link to="/login" className="btn-primary w-full sm:w-auto !px-8">Sign In</Link>
            <Link to="/register" className="btn-outline w-full sm:w-auto !px-8">Create Free Account</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: 'Smart Search', desc: 'Search any medicine by brand or generic name via live openFDA API' },
            { icon: '🛡️', title: 'FDA Verified', desc: 'Every result sourced from official FDA approved labeling data' },
            { icon: '💰', title: 'Save up to 80%', desc: 'Discover identical generic alternatives at a fraction of the cost' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
