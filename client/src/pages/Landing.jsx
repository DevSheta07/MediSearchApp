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
            {
              icon: (
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: 'Smart Search',
              desc: 'Search any medicine by brand or generic name via live openFDA API'
            },
            {
              icon: (
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'FDA Verified',
              desc: 'Every result sourced from official FDA approved labeling data'
            },
            {
              icon: (
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Save up to 80%',
              desc: 'Discover identical generic alternatives at a fraction of the cost'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center mb-4">
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
