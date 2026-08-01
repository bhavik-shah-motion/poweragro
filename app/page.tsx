export default function Home() {
  const services = [
    {
      title: "Modern Farming",
      description:
        "Empowering farmers with innovative techniques, sustainable practices, and precision agriculture.",
      icon: "🌱",
    },
    {
      title: "Agri Solutions",
      description:
        "Complete agricultural consulting, irrigation planning, crop nutrition, and farm optimization.",
      icon: "🚜",
    },
    {
      title: "Organic Growth",
      description:
        "Helping communities produce healthier crops with eco-friendly and sustainable farming methods.",
      icon: "🌾",
    },
  ];

  const stats = [
    { value: "500+", label: "Farmers Served" },
    { value: "120+", label: "Projects Completed" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100">
      {/* Background */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-green-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-3xl" />

      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-black text-green-700">
          Power<span className="text-black">Agro</span>
        </h1>

        <div className="hidden gap-8 font-medium text-gray-700 md:flex">
          <a href="#about" className="hover:text-green-700">
            About
          </a>
          <a href="#services" className="hover:text-green-700">
            Services
          </a>
          <a href="#contact" className="hover:text-green-700">
            Contact
          </a>
        </div>

        <button className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-24 text-center">
        <div className="rounded-full bg-green-100 px-5 py-2 font-medium text-green-700">
          🌿 Sustainable Agriculture • Better Future
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight text-gray-900 md:text-7xl">
          Growing Tomorrow with
          <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Smart Agriculture
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
          Power Agro delivers innovative farming solutions, sustainable crop
          management, and agricultural technologies that help farmers maximize
          productivity while protecting nature.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-green-700 px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-green-800">
            Explore Services
          </button>

          <button className="rounded-full border border-green-700 px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50">
            Learn More
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-8 pb-24 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur"
          >
            <h2 className="text-4xl font-bold text-green-700">{stat.value}</h2>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-8 py-20">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            What We Do
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Agriculture Built for the Future
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur transition hover:-translate-y-3"
            >
              <div className="mb-6 text-5xl">{service.icon}</div>

              <h3 className="text-2xl font-bold">{service.title}</h3>

              <p className="mt-4 leading-7 text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-8 py-20"
      >
        <div className="rounded-[40px] bg-gradient-to-r from-green-700 to-emerald-600 p-16 text-white">
          <h2 className="text-4xl font-bold">
            Cultivating Innovation, Harvesting Success
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-green-100">
            We combine agricultural expertise with modern technology to improve
            crop yield, conserve natural resources, and build a sustainable
            future for farmers across the country.
          </p>

          <button className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-green-700 transition hover:scale-105">
            Discover More
          </button>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-8 py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Let's Grow Together 🌱
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Whether you're an individual farmer, agribusiness, or agricultural
          organization, Power Agro is here to help you achieve sustainable
          growth.
        </p>

        <button className="mt-10 rounded-full bg-green-700 px-10 py-4 font-semibold text-white transition hover:bg-green-800">
          Contact Us
        </button>
      </section>

      <footer className="border-t border-green-200 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} Power Agro. Growing a Sustainable Future.
      </footer>
    </main>
  );
}