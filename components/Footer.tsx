const footerLinks = ["Collection", "Brands", "Showroom", "Contact"];

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <p className="text-sm font-medium tracking-tight">Expo Home</p>
            <p className="mt-2 text-xs text-neutral-400">
              Tbilisi, Georgia
            </p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs tracking-wide text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 md:mt-16 text-xs text-neutral-300">
          &copy; {new Date().getFullYear()} Expo Home
        </p>
      </div>
    </footer>
  );
}
