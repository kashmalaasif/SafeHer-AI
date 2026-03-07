# 📚 Evidence Log

Sources, licenses, and attributions for SafeHer AI.

---

## Statistics & Data Sources

### Violence Against Women Statistics

| Claim | Source | License |
|-------|--------|---------|
| "1 in 3 women globally experience violence" | WHO, 2021 | Public Data |
| "Only 40% of women who experience violence seek help" | UN Women, 2020 | Public Data |
| "Less than 10% of women report to police" | UN Women Global Database | Public Data |

**References:**
- World Health Organization (2021). "Violence Against Women Prevalence Estimates"
  - URL: https://www.who.int/publications/i/item/9789240022256
  
- UN Women (2020). "Facts and figures: Ending violence against women"
  - URL: https://www.unwomen.org/en/what-we-do/ending-violence-against-women/facts-and-figures

---

## AI Models & Datasets

### toxic-bert Model

| Item | Details |
|------|---------|
| **Model Name** | unitary/toxic-bert |
| **Source** | Hugging Face Hub |
| **License** | Apache 2.0 |
| **URL** | https://huggingface.co/unitary/toxic-bert |
| **Training Data** | Jigsaw Toxic Comment Dataset |
| **Use in Project** | Harassment/toxicity detection |

**Citation:**
```
@misc{toxic-bert,
  author = {Unitary},
  title = {Toxic BERT},
  year = {2020},
  publisher = {Hugging Face},
  url = {https://huggingface.co/unitary/toxic-bert}
}
```

---

## Libraries & Frameworks

### Frontend Dependencies

| Library | Version | License | URL |
|---------|---------|---------|-----|
| React | 18.2.0 | MIT | https://reactjs.org/ |
| React DOM | 18.2.0 | MIT | https://reactjs.org/ |
| Axios | 1.6.5 | MIT | https://axios-http.com/ |
| React Scripts | 5.0.1 | MIT | https://create-react-app.dev/ |

### Backend Dependencies

| Library | Version | License | URL |
|---------|---------|---------|-----|
| FastAPI | 0.109.0 | MIT | https://fastapi.tiangolo.com/ |
| Uvicorn | 0.27.0 | BSD-3 | https://www.uvicorn.org/ |
| Pydantic | 2.5.3 | MIT | https://docs.pydantic.dev/ |
| Transformers | 4.37.0 | Apache 2.0 | https://huggingface.co/transformers/ |
| PyTorch | 2.1.2 | BSD | https://pytorch.org/ |
| Twilio | 8.10.0 | MIT | https://www.twilio.com/docs/python |

---

## APIs & Services

### Twilio (SMS Alerts)

| Item | Details |
|------|---------|
| **Service** | Twilio Programmable SMS |
| **Usage** | Sending emergency SMS alerts |
| **Terms** | https://www.twilio.com/legal/tos |
| **Free Tier** | Trial account with $15 credit |

### Google Maps (Location)

| Item | Details |
|------|---------|
| **Service** | Google Maps URL Scheme |
| **Usage** | Generating location links in alerts |
| **Terms** | https://www.google.com/intl/en/policies/terms/ |
| **Cost** | Free (URL scheme, not API) |

### Vercel (Hosting)

| Item | Details |
|------|---------|
| **Service** | Vercel Serverless Platform |
| **Usage** | Hosting frontend and API |
| **Terms** | https://vercel.com/legal/terms |
| **Cost** | Free tier |

---

## Icons & Visual Assets

### Emoji Icons

| Usage | Source | License |
|-------|--------|---------|
| UI Icons (🛡️🚨📱etc.) | Unicode Standard | Public Domain |

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Purple | #667eea | Headers, buttons |
| Secondary Purple | #764ba2 | Gradients |
| Danger Red | #ff6b6b | Panic button |
| Success Green | #44aa44 | Safe status |
| Warning Orange | #ff9800 | Alerts |

**Note:** All colors chosen for WCAG AA contrast compliance.

---

## Web APIs Used

### Browser APIs

| API | Purpose | Specification |
|-----|---------|---------------|
| Geolocation API | Get user location | W3C Geolocation |
| DeviceMotion API | Shake/fall detection | W3C DeviceOrientation |
| Notifications API | Browser notifications | WHATWG Notifications |

**References:**
- Geolocation: https://www.w3.org/TR/geolocation/
- DeviceMotion: https://www.w3.org/TR/orientation-event/
- Notifications: https://notifications.spec.whatwg.org/

---

## Compliance & Accessibility

### WCAG 2.1 Guidelines Followed

| Guideline | Implementation |
|-----------|----------------|
| Color Contrast | AA compliant (4.5:1 ratio) |
| Keyboard Navigation | All buttons focusable |
| Screen Reader | Semantic HTML, ARIA labels |
| Motion | Respects prefers-reduced-motion |

### Privacy Considerations

| Data | Handling |
|------|----------|
| Location | Only accessed when needed, not stored |
| Messages | Analyzed locally/in-memory only |
| Alerts | Logged temporarily, no database |

---

## License Compatibility Matrix

| Dependency | License | Compatible with MIT? |
|------------|---------|---------------------|
| React | MIT | ✅ Yes |
| FastAPI | MIT | ✅ Yes |
| Transformers | Apache 2.0 | ✅ Yes |
| PyTorch | BSD | ✅ Yes |
| toxic-bert | Apache 2.0 | ✅ Yes |
| Twilio SDK | MIT | ✅ Yes |

**Conclusion:** All dependencies are compatible with MIT license.

---

## Third-Party Code

No third-party code snippets were copied directly. All code is original, written specifically for this project, using the above libraries and frameworks as dependencies.

---

## Acknowledgments

- **Hugging Face** for hosting open-source AI models
- **Twilio** for reliable messaging infrastructure
- **Vercel** for free hosting platform
- **UN Women** for comprehensive violence statistics
- **WHO** for global health data
- **Open Source Community** for the amazing tools and libraries
