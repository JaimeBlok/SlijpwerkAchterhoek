# Slijpwerk Achterhoek

Een moderne, minimalistisch ontworpen website voor Slijpwerk Achterhoek - professionele slijpservice in de Achterhoek.

## Design

Clean en minimalistisch design met:
- Lichte, witte achtergrond
- Veel whitespace
- Moderne typografie
- Subtiele hover effecten
- Volledig responsive

## Structuur

### Secties
1. **Header** - Fixed navigatie met logo en menu items
2. **Hero** - Grote hero image met overlay en CTA
3. **Over Ons** - Two-column layout met beeld en tekst
4. **Diensten** - Grid met verschillende services
5. **Afspraak** - Formulier om afspraken te maken
6. **Footer** - Donkere footer met locaties en contactinfo

## Installatie

```bash
npm install
npm run dev
```

De website draait op [http://localhost:3100](http://localhost:3100)

## Aanpassingen

### Logo
- Plaats je logo als `/public/1.png`
- Aanbevolen hoogte: 80-100px

### Hero Image
- Gebruik `/public/2.png` als hero achtergrond
- Aanbevolen: 1920x800px landscape foto

### Content
- Pas teksten aan in `app/page.tsx`
- Wijzig kleuren in `app/page.module.css`

### Kleuren
Huidige kleurenschema:
- Primary: `#1a4d2e` (donkergroen)
- Text: `#1e1e1e` (bijna zwart)
- Background: `#ffffff` (wit)
- Light: `#fafafa` (licht grijs)
- Footer: `#1a1a1a` (donkergrijs)

## Deployment

Voor productie:
```bash
npm run build
npm start
```

Deploy naar Vercel, Netlify of eigen server.

## Contact

Slijpwerk Achterhoek
- Tel: 06 - 12 34 56 78
- Email: info@slijpwerkachterhoek.nl

---

**Minimalistisch. Modern. Professioneel.**
