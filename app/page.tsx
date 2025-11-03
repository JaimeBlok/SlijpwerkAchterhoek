'use client'

import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import Link from 'next/link'
import styles from './page.module.css'
import { isDateAvailable, getAvailableTimes } from './availability'
import CustomCalendar from './components/CustomCalendar'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showCookieBanner, setShowCookieBanner] = useState(true)
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'location'>('pickup')
  const [items, setItems] = useState<{[key: string]: number}>({
    'keukenmessen': 0,
    'scharen': 0,
    'tuingereedschap': 0,
    'professioneel': 0
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  
  // Filter tijden op basis van beschikbaarheid configuratie
  const filterPassedTime = (time: Date) => {
    const currentHour = time.getHours()
    const availableTimes = getAvailableTimes(time)
    return availableTimes.includes(currentHour)
  }

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowCookieBanner(false)
  }

  // Check if user already made a choice
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent) {
      setShowCookieBanner(false)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const updateItemCount = (item: string, change: number) => {
    setItems(prev => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + change)
    }))
  }

  const getTotalItems = () => {
    return Object.values(items).reduce((sum, count) => sum + count, 0)
  }

  const calculateTotal = () => {
    const knivesPrice = items.keukenmessen * 5
    const deliveryPrice = deliveryMethod === 'location' ? 10 : 0
    return knivesPrice + deliveryPrice
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.email.includes('@') &&
           selectedDate !== null &&
           items.keukenmessen > 0
  }

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        {/* Announcement Banner */}
        <div className={styles.announcementBanner}>
          <p>Nieuwjaarsactie: 15% korting op uw eerste slijpbeurt tot eind januari!</p>
        </div>

        {/* Groot Gecentreerd Logo */}
        <div className={styles.logoContainer}>
          <img src="/1.png" alt="Slijpwerk Achterhoek" className={styles.logoImage} />
        </div>

        {/* Navigation Bar - Gecentreerd */}
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <nav className={styles.nav}>
              <button onClick={() => scrollToSection('home')}>HOME</button>
              <button onClick={() => scrollToSection('over')}>OVER ONS</button>
              <button onClick={() => scrollToSection('diensten')}>DIENSTEN</button>
              <button onClick={() => scrollToSection('afspraak')}>AFSPRAAK</button>
              <button onClick={() => scrollToSection('contact')}>CONTACT</button>
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
          <button onClick={() => scrollToSection('home')}>HOME</button>
          <button onClick={() => scrollToSection('over')}>OVER ONS</button>
          <button onClick={() => scrollToSection('diensten')}>DIENSTEN</button>
          <button onClick={() => scrollToSection('afspraak')}>AFSPRAAK</button>
          <button onClick={() => scrollToSection('contact')}>CONTACT</button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={`${styles.hero} relative overflow-hidden`}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Uw messen scherper dan ooit</h1>
            <button 
              className={styles.ctaButton}
              onClick={() => scrollToSection('afspraak')}
            >
              Afspraak maken
            </button>
          </div>
        </div>
      </section>

      {/* About Section - 2 Column Style */}
      <section id="over" className="py-20 relative overflow-hidden" style={{backgroundColor: '#FFFEF6'}}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
            {/* Image */}
            <div className="mx-auto relative">
              <img 
                className="rounded-xl shadow-lg w-full" 
                src="/Mooiedingenverdienenaandacht.jpg" 
                alt="Ambachtelijk slijpwerk"
              />
            </div>

            {/* Content */}
            <div className="mt-5 sm:mt-10 lg:mt-0 flex flex-col items-end">
              <div className="w-full max-w-xl space-y-6 sm:space-y-8">
                {/* Title */}
                <div className="space-y-2 md:space-y-4">
                  <p className="uppercase text-sm tracking-wider mb-2" style={{color: '#223723'}}>
                    Over ons
                  </p>
                  <h2 className="font-bold text-4xl lg:text-5xl xl:text-6xl" style={{color: '#223723'}}>
                    Mooie dingen verdienen aandacht
                  </h2>
                  <p className="leading-relaxed" style={{color: '#223723'}}>
                    Wij geloven dat scherpe messen niet alleen het koken verbeteren, maar ook respect tonen voor je gereedschap en ingrediënten. Met jarenlange passie voor het ambacht slijpen we elk mes met persoonlijke aandacht, zodat ze jarenlang meegaan.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-start">
                  <Link href="/over">
                    <button className={styles.ctaButtonSecondary}>
                      Meer over ons
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Blog Style */}
      <section id="diensten" className="py-12 relative overflow-hidden" style={{backgroundColor: '#17320B'}}>
        {/* Decorative knife - large dramatic element */}
        <img 
          src="/Mesillustratie.png" 
          alt="" 
          className="absolute top-1/2 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] xl:w-[700px] xl:h-[700px] opacity-25 filter invert pointer-events-none hidden md:block" 
          style={{transform: 'translateY(-50%) translateX(40%) rotate(40deg)'}}
          aria-hidden="true"
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-2 md:space-y-4">
              <p className="text-white/70 uppercase text-sm tracking-wider mb-2">
                Diensten
              </p>
              <h2 className="font-bold text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
                Keukenmessen die weer scherp snijden
              </h2>
              <p className="text-white/90 leading-relaxed">
                Wij specialiseren ons in keukenmessen. Van huishoudmessen tot chef's knives, wij slijpen alle soorten keukenmessen weer zo scherp als nieuw.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <img 
                src="/Diesnten.png" 
                alt="Keukenmessen" 
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
        
      </section>

      {/* Appointment Section - Simple */}
      <section id="afspraak" className="py-20 relative overflow-hidden" style={{backgroundColor: '#FFFEF6'}}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="font-bold text-4xl lg:text-5xl xl:text-6xl text-center mb-6" style={{color: '#223723'}}>
            {formSubmitted ? 'Bedankt voor je Afspraak!' : 'Maak een Afspraak'}
          </h2>
          {!formSubmitted && (
          <p className="text-center mb-12 max-w-2xl mx-auto leading-relaxed" style={{color: '#223723'}}>
            Klaar om uw gereedschap weer scherp te hebben? Vul het formulier in of bel ons direct. Wij helpen u graag verder!
          </p>
          )}
          
          {/* Appointment Form */}
          {!formSubmitted && (
          <form 
            className="max-w-4xl mx-auto px-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setIsLoading(true)
              await new Promise(resolve => setTimeout(resolve, 1500))
              setIsLoading(false)
              setFormSubmitted(true)
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Naam */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-800">Naam *</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500" 
                    placeholder="Uw naam" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-800">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500" 
                    placeholder="uw@email.nl" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>

                {/* Telefoon */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-800">Telefoon *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500" 
                    placeholder="06 12 34 56 78" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>

                {/* Aantal Keukenmessen */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">Aantal Keukenmessen *</label>
                  <div className="py-3 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between h-[46px]">
                    <span className="text-sm text-gray-800">Keukenmessen</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateItemCount('keukenmessen', -1)}
                        className="inline-flex flex-shrink-0 justify-center items-center size-7 rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={items.keukenmessen === 0}
                      >
                        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/>
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                        {items.keukenmessen}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateItemCount('keukenmessen', 1)}
                        className="inline-flex flex-shrink-0 justify-center items-center size-7 rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      >
                        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/>
                          <path d="M12 5v14"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Aflevermethode */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">Wij leveren uw messen op *</label>
                  <div className="py-2.5 px-3 bg-white border border-gray-300 rounded-lg flex items-center gap-2 h-[46px]">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex-1 flex items-center justify-between py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                        deliveryMethod === 'pickup'
                          ? 'bg-[#17320B] text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs">Langsbrengen</span>
                      <span className="font-semibold text-xs">€0,-</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('location')}
                      className={`flex-1 flex items-center justify-between py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                        deliveryMethod === 'location'
                          ? 'bg-[#17320B] text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs">Op locatie</span>
                      <span className="font-semibold text-xs">+€10,-</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Datum */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">Gewenste Datum *</label>
                  <CustomCalendar
                    selectedDate={selectedDate}
                    onChange={setSelectedDate}
                    minDate={addDays(new Date(), 1)}
                  />
                </div>

                {/* Tijd */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800">Gewenste Tijd *</label>
                  <select
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 h-[46px]"
                    value={selectedDate ? selectedDate.getHours() : 9}
                    onChange={(e) => {
                      const hour = parseInt(e.target.value)
                      if (selectedDate) {
                        const newDate = new Date(selectedDate)
                        newDate.setHours(hour, 0, 0, 0)
                        setSelectedDate(newDate)
                      } else {
                        const newDate = new Date()
                        newDate.setHours(hour, 0, 0, 0)
                        setSelectedDate(newDate)
                      }
                    }}
                    required
                  >
                    {selectedDate && getAvailableTimes(selectedDate).length > 0 ? (
                      getAvailableTimes(selectedDate).map((hour) => (
                        <option key={hour} value={hour}>
                          {String(hour).padStart(2, '0')}:00
                        </option>
                      ))
                    ) : (
                      Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => (
                        <option key={hour} value={hour}>
                          {String(hour).padStart(2, '0')}:00
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg mt-6">
                <div className="space-y-2">
                  {items.keukenmessen > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{items.keukenmessen}x Keukenmessen @ €5,- per stuk</span>
                      <span className="font-semibold text-gray-900">€{items.keukenmessen * 5},-</span>
                    </div>
                  )}
                  {deliveryMethod === 'location' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Op locatie service</span>
                      <span className="font-semibold text-gray-900">€10,-</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="text-sm text-gray-700 border-t border-gray-300 pt-2 mt-2">
                      <span className="font-medium">Datum & Tijd:</span> {formatDate(selectedDate)}
                    </div>
                  )}
                  {deliveryMethod && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Levermethode:</span> {deliveryMethod === 'pickup' ? 'U brengt de messen langs' : 'Messen slijpen op locatie'}
                    </div>
                  )}
                  {(items.keukenmessen > 0 || deliveryMethod === 'location') && (
                    <div className="border-t border-gray-400 pt-2 mt-2">
                      <div className="flex justify-between text-base font-bold text-gray-900">
                        <span>Totaal</span>
                        <span>€{calculateTotal()},-</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 italic">
                        Betaal bij het ontvangen van uw geslepen messen
                      </p>
                    </div>
                  )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                className={`${isFormValid() ? styles.submitButtonValid : styles.submitButton} mt-6 w-full max-w-md`}
                disabled={isLoading}
              >
                {isLoading ? 'Laden...' : 'Afspraak Maken'}
              </button>
            </div>
          </form>
          )}

          {/* Success Message */}
          {formSubmitted && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="bg-white border-l-4 border-primary-500 rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Afspraak bevestigd!
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Bedankt voor je vertrouwen in Slijpwerk Achterhoek. We sturen je binnenkort een bevestiging via e-mail met alle details van je afspraak.
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Check je inbox voor meer informatie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`${styles.footer} relative overflow-hidden`}>
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

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 end-0 z-50 sm:max-w-xl w-full mx-auto p-6">
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-5">
              <div className="grow">
                <h2 className="text-gray-500">
                  <span className="font-semibold text-gray-800">We gebruiken cookies</span> om onze website te analyseren en een soepele gebruikerservaring te creëren.
                </h2>
              </div>
              <div className="inline-flex gap-x-2">
                <div>
                  <button 
                    type="button" 
                    onClick={handleRejectCookies}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    Weigeren
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={handleAcceptCookies}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:bg-primary-600"
                  >
                    Accepteren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
