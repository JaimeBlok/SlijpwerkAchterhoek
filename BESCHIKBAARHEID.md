# Beschikbaarheid Configuratie

## 📅 Hoe pas je je beschikbaarheid aan?

Alle beschikbaarheid wordt geconfigureerd in het bestand: **`app/availability.ts`**

## Configuratie Opties

### 1. Gesloten Dagen

```typescript
closedDays: [0]  // 0 = Zondag, 1 = Maandag, etc.
```

**Voorbeelden:**
- Zondag en maandag gesloten: `closedDays: [0, 1]`
- Alleen zondag gesloten: `closedDays: [0]`
- Weekend gesloten: `closedDays: [0, 6]`

### 2. Openingstijden per Dag

```typescript
openingHours: {
  1: { start: 9, end: 17 },  // Maandag 9:00 - 17:00
  2: { start: 9, end: 17 },  // Dinsdag 9:00 - 17:00
  // etc...
}
```

**Voorbeelden:**
- Lange donderdag: `4: { start: 9, end: 20 }`
- Vroege start: `2: { start: 7, end: 15 }`
- Lunch pauze: Implementeer dit met 2 slots of via custom logic

### 3. Specifieke Geblokkeerde Datums

Voeg specifieke datums toe die je wilt blokkeren:

```typescript
blockedDates: [
  '2025-12-25',  // Kerst
  '2025-12-26',  // 2e Kerstdag
  '2025-01-01',  // Nieuwjaar
]
```

**Format:** Altijd `'YYYY-MM-DD'`

### 4. Vakantieperiodes

Blokkeer hele periodes in één keer:

```typescript
holidays: [
  { 
    start: '2025-07-15', 
    end: '2025-07-29', 
    reason: 'Zomervakantie' 
  },
  { 
    start: '2025-12-20', 
    end: '2026-01-05', 
    reason: 'Kerstvakantie' 
  },
]
```

## Voorbeeld Configuraties

### Configuratie 1: Standaard Werkweek
```typescript
{
  closedDays: [0],  // Zondag gesloten
  openingHours: {
    1: { start: 9, end: 17 },
    2: { start: 9, end: 17 },
    3: { start: 9, end: 17 },
    4: { start: 9, end: 17 },
    5: { start: 9, end: 17 },
    6: { start: 9, end: 13 },  // Zaterdag korter
  },
  blockedDates: [],
  holidays: [],
}
```

### Configuratie 2: Lange Donderdag
```typescript
{
  closedDays: [0, 1],  // Zondag en Maandag gesloten
  openingHours: {
    2: { start: 9, end: 17 },
    3: { start: 9, end: 17 },
    4: { start: 9, end: 21 },  // Donderdag lang open
    5: { start: 9, end: 17 },
    6: { start: 10, end: 14 },
  },
  blockedDates: ['2025-12-25', '2025-12-26', '2025-01-01'],
  holidays: [
    { start: '2025-08-01', end: '2025-08-15', reason: 'Zomervakantie' }
  ],
}
```

### Configuratie 3: Alleen Doordeweeks
```typescript
{
  closedDays: [0, 6],  // Weekend gesloten
  openingHours: {
    1: { start: 8, end: 18 },
    2: { start: 8, end: 18 },
    3: { start: 8, end: 18 },
    4: { start: 8, end: 18 },
    5: { start: 8, end: 16 },  // Vrijdag korter
  },
  blockedDates: [],
  holidays: [],
}
```

## Hoe Werkt Het?

1. **Kalender Weergave:**
   - Gesloten dagen worden automatisch uitgegrijsd in de kalender
   - Geblokkeerde datums zijn niet selecteerbaar
   - Vakantieperiodes worden automatisch uitgefilterd

2. **Tijd Selectie:**
   - Alleen tijden binnen de openingstijden zijn selecteerbaar
   - Tijden worden per uur weergegeven (je kunt dit aanpassen in de code)
   - Past automatisch aan op basis van de geselecteerde dag

3. **Validatie:**
   - Klanten kunnen alleen toekomstige datums kiezen (vanaf morgen)
   - Automatische filtering op basis van je configuratie
   - Nederlandse datumnotatie

## Tips

- ✅ Update `availability.ts` voor permanente wijzigingen
- ✅ Voeg vakantiedatums ruim van tevoren toe
- ✅ Test de kalender na wijzigingen
- ✅ Denk aan feestdagen en speciale gelegenheden
- ✅ De wijzigingen worden direct actief na het opslaan

## Technische Details

- **Bestand:** `app/availability.ts`
- **Functions:** `isDateAvailable()` en `getAvailableTimes()`
- **Gebruikt door:** DatePicker component in het afspraak formulier
- **Format:** TypeScript configuratie object

---

**Hulp nodig?** Bekijk de commentaren in `app/availability.ts` voor meer voorbeelden!

