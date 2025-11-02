// Beschikbaarheid Configuratie
// Pas dit bestand aan om jouw beschikbaarheid in te stellen

export interface AvailabilityConfig {
  // Dagen van de week (0 = zondag, 1 = maandag, etc.)
  closedDays: number[]
  
  // Openingstijden per dag
  openingHours: {
    [key: number]: { start: number; end: number }
  }
  
  // Specifieke geblokkeerde datums (formaat: 'YYYY-MM-DD')
  blockedDates: string[]
  
  // Vakantie periodes
  holidays: Array<{ start: string; end: string; reason?: string }>
}

export const availabilityConfig: AvailabilityConfig = {
  // Zondag is gesloten
  closedDays: [0],
  
  // Openingstijden
  openingHours: {
    1: { start: 9, end: 17 },  // Maandag
    2: { start: 9, end: 17 },  // Dinsdag
    3: { start: 9, end: 17 },  // Woensdag
    4: { start: 9, end: 17 },  // Donderdag
    5: { start: 9, end: 17 },  // Vrijdag
    6: { start: 9, end: 13 },  // Zaterdag (kortere dag)
  },
  
  // Specifieke geblokkeerde datums
  // Voeg hier datums toe die je wilt blokkeren
  blockedDates: [
    // Voorbeeld: '2025-12-25', // Kerst
    // Voorbeeld: '2025-01-01', // Nieuwjaar
  ],
  
  // Vakantieperiodes
  holidays: [
    // Voorbeeld:
    // { start: '2025-07-15', end: '2025-07-29', reason: 'Zomervakantie' },
  ],
}

// Helper functie om te checken of een datum beschikbaar is
export const isDateAvailable = (date: Date): boolean => {
  const day = date.getDay()
  
  // Check of de dag gesloten is
  if (availabilityConfig.closedDays.includes(day)) {
    return false
  }
  
  // Check specifieke geblokkeerde datums
  const dateString = date.toISOString().split('T')[0]
  if (availabilityConfig.blockedDates.includes(dateString)) {
    return false
  }
  
  // Check vakantieperiodes
  for (const holiday of availabilityConfig.holidays) {
    const startDate = new Date(holiday.start)
    const endDate = new Date(holiday.end)
    if (date >= startDate && date <= endDate) {
      return false
    }
  }
  
  return true
}

// Helper functie voor beschikbare tijden
export const getAvailableTimes = (date: Date): number[] => {
  const day = date.getDay()
  const hours = availabilityConfig.openingHours[day]
  
  if (!hours) return []
  
  const times: number[] = []
  for (let hour = hours.start; hour < hours.end; hour++) {
    times.push(hour)
  }
  
  return times
}

