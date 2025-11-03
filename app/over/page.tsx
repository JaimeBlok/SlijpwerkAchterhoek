'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'

export default function OverPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div>
      {/* Announcement Banner */}
      <div className={styles.announcementBanner}>
        <p>Nieuwjaarsactie: 15% korting op uw eerste slijpbeurt tot eind januari!</p>
      </div>

      {/* Logo Container */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/1.png" alt="Slijpwerk Achterhoek" className={styles.logoImage} />
        </Link>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <nav className={styles.nav}>
              <Link href="/"><button>HOME</button></Link>
              <Link href="/over"><button>OVER ONS</button></Link>
              <Link href="/#diensten"><button>DIENSTEN</button></Link>
              <Link href="/#afspraak"><button>AFSPRAAK</button></Link>
              <Link href="/#contact"><button>CONTACT</button></Link>
            </nav>

            <div className={styles.headerIcons}>
              <button className={styles.iconButton} title="Winkelwagen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={styles.iconButton}
                title="Account"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button 
                className={styles.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                title="Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link href="/"><button onClick={() => setMobileMenuOpen(false)}>HOME</button></Link>
          <Link href="/over"><button onClick={() => setMobileMenuOpen(false)}>OVER ONS</button></Link>
          <Link href="/#diensten"><button onClick={() => setMobileMenuOpen(false)}>DIENSTEN</button></Link>
          <Link href="/#afspraak"><button onClick={() => setMobileMenuOpen(false)}>AFSPRAAK</button></Link>
          <Link href="/#contact"><button onClick={() => setMobileMenuOpen(false)}>CONTACT</button></Link>
        </div>
      </header>

      {/* Het Verhaal Section */}
      <section id="verhaal" className="py-20" style={{backgroundColor: '#FFFEF6'}}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Title - shown on mobile */}
          <div className="mb-8 md:hidden">
            <div className="space-y-2">
              <p className="uppercase text-sm tracking-wider mb-2" style={{color: '#223723'}}>
                Over ons
              </p>
              <h2 className="font-bold text-4xl" style={{color: '#223723'}}>
                Het verhaal achter Slijpwerk Achterhoek
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
            {/* Image */}
            <div className="mx-auto">
              <img 
                className="rounded-xl shadow-lg w-full" 
                src="/Overonspagina.jpg" 
                alt="Ambachtelijk slijpwerk van Dov Ram"
              />
            </div>

            {/* Content */}
            <div className="mt-5 sm:mt-10 lg:mt-0">
              {/* Title - shown on desktop */}
              <div className="space-y-2 md:space-y-4 hidden md:block">
                <p className="uppercase text-sm tracking-wider mb-2" style={{color: '#223723'}}>
                  Over ons
                </p>
                <h2 className="font-bold text-4xl lg:text-5xl xl:text-6xl" style={{color: '#223723'}}>
                  Het verhaal achter Slijpwerk Achterhoek
                </h2>
              </div>
              <div className="space-y-6 mt-6">
                <p style={{color: '#223723', fontSize: '1.1rem', lineHeight: '1.8'}}>
                  Mijn naam is Dov Ram en Slijpwerk Achterhoek is mijn passieproject. Als eenmanszaak gespecialiseerd in het slijpen van keukenmessen, heb ik me volledig toegewijd aan het ambachtelijke vakmanschap dat scherpe messen vereist.
                </p>
                <p style={{color: '#223723', fontSize: '1.1rem', lineHeight: '1.8'}}>
                  Het begon allemaal met een simpele observatie: goede messen verliezen na verloop van tijd hun scherpte, maar verdienen het om te worden gerestaureerd. In plaats van steeds nieuwe messen te kopen, besloot ik te leren hoe ik deze werktuigen weer in hun volle glorie kon terugbrengen.
                </p>
                <p style={{color: '#223723', fontSize: '1.1rem', lineHeight: '1.8'}}>
                  Wat begon als een hobby groeide uit tot een liefde voor precisie, techniek en respect voor het gereedschap waar koks dagelijks mee werken. Elke mes die ik slijp, behandel ik met persoonlijke aandacht en vakkundigheid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Slijpen Section */}
      <section id="waarom" className="py-20" style={{backgroundColor: '#17320B'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-4xl lg:text-5xl mb-12 text-white">
            Waarom is slijpen belangrijk?
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Voedselveiligheid
              </h3>
              <p className="text-white/90 leading-relaxed" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                Een scherp mes is veiliger dan een bot mes. Scherpe messen vereisen minder druk en glijden soepel door ingrediënten, waardoor het risico op uitglijden en ongelukken wordt verminderd.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Betere smaak en textuur
              </h3>
              <p className="text-white/90 leading-relaxed" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                Scherpe messen snijden kruidencellen en vezels netjes doormidden, in plaats van ze te pletten. Dit behoudt de smaak en textuur van uw ingrediënten, wat resulteert in betere maaltijden.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Duurzaamheid
              </h3>
              <p className="text-white/90 leading-relaxed" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                Goede messen gaan jarenlang mee als ze goed worden onderhouden. Door regelmatig te slijpen, verlengt u de levensduur van uw investering en vermindert u verspilling.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Respect voor je gereedschap
              </h3>
              <p className="text-white/90 leading-relaxed" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                Goede messen zijn gemaakte kunstwerken van vakmensen. Door ze te onderhouden met respect en zorg, eert u het ambachtelijke werk dat erin is gestoken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{backgroundColor: '#FFFEF6'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-bold text-4xl lg:text-5xl mb-6" style={{color: '#223723'}}>
            Klaar om uw messen weer scherp te krijgen?
          </h2>
          <p className="text-xl mb-8" style={{color: '#223723'}}>
            Maak een afspraak en laat uw keukenmessen weer glimmen
          </p>
          <Link href="/#afspraak">
            <button className={styles.ctaButtonSecondary}>
              Maak een afspraak
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={styles.footer}>
        {/* Decorative knife - prominent element */}
        <img 
          src="/Mesillustratie.png" 
          alt="" 
          className="absolute top-1/2 left-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-25 filter invert pointer-events-none hidden md:block" 
          style={{transform: 'translateY(-50%) translateX(-40%) rotate(-70deg)'}}
          aria-hidden="true"
        />
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & About */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4" style={{height: '140px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end'}}>
                <img src="/Logogroen.png" alt="Slijpwerk Achterhoek" style={{width: 'auto', height: '180%', objectFit: 'contain', transform: 'translateY(20%)'}} />
              </div>
              <p className="text-center md:text-left" style={{color: '#FFFEF6'}}>
                Ambachtelijk slijpwerk voor uw keukenmessen in de Achterhoek.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#FFFEF6'}}>Contact</h3>
              <div className="space-y-2">
                <p style={{color: '#FFFEF6'}}>
                  <span className="font-semibold">Telefoon:</span> 06 - 12 34 56 78
                </p>
                <p style={{color: '#FFFEF6'}}>
                  <span className="font-semibold">Email:</span> info@slijpwerkachterhoek.nl
                </p>
                <p style={{color: '#FFFEF6'}}>
                  <span className="font-semibold">Adres:</span><br />
                  Achterhoek 123<br />
                  7000 AB Doetinchem
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#FFFEF6'}}>Openingstijden</h3>
              <div className="space-y-2" style={{color: '#FFFEF6'}}>
                <p><span className="font-semibold">Ma - Vr:</span> 09:00 - 17:00</p>
                <p><span className="font-semibold">Za:</span> 09:00 - 13:00</p>
                <p><span className="font-semibold">Zo:</span> Gesloten</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <p>© 2025 Slijpwerk Achterhoek. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

