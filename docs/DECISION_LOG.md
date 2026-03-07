# 📝 Decision Log

Technical decisions and tradeoffs made during SafeHer AI development.

---

## Decision 1: Frontend Framework

**Date:** January 2025  
**Decision:** Use React over Vue/Angular  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| React | Large ecosystem, hooks, community | Learning curve |
| Vue | Easier syntax, smaller bundle | Smaller ecosystem |
| Angular | Full framework, TypeScript | Heavy, complex |

**Why React:**
- Largest community for quick troubleshooting
- Component-based fits our modular UI
- Easy access to device APIs (geolocation, sensors)
- Best deployment support on Vercel

**Tradeoff:** Slightly larger bundle size than Vue, but offset by better tooling.

---

## Decision 2: Backend Framework

**Date:** January 2025  
**Decision:** Use FastAPI over Flask/Django  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| FastAPI | Async, auto-docs, fast | Newer, less tutorials |
| Flask | Simple, flexible | No async, manual validation |
| Django | Full-featured, ORM | Heavy for API-only |

**Why FastAPI:**
- Automatic OpenAPI documentation at `/docs`
- Native async support for handling multiple alerts
- Pydantic validation prevents bad data
- Easy Vercel serverless deployment

**Tradeoff:** Fewer tutorials than Flask, but better performance.

---

## Decision 3: AI Model

**Date:** January 2025  
**Decision:** Use toxic-bert for harassment detection  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| toxic-bert | Pre-trained, accurate | Large model size |
| Custom model | Tailored to use case | Needs training data |
| Keyword matching | Simple, fast | Low accuracy |

**Why toxic-bert:**
- Pre-trained on toxicity data (no training needed)
- 90%+ accuracy on toxic content
- Open source (Apache 2.0)

**Tradeoff:** Model too large for serverless, so we use keyword detection on Vercel and full model locally.

---

## Decision 4: Serverless Deployment

**Date:** January 2025  
**Decision:** Use Vercel serverless over traditional server  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Vercel | Free, auto-scaling | Cold starts, size limits |
| AWS EC2 | Full control | Costs money, complex |
| Heroku | Easy deployment | Free tier removed |
| Railway | Good free tier | Requires credit card |

**Why Vercel:**
- Completely free (no credit card)
- GitHub integration
- Automatic HTTPS (required for sensors)
- Edge network (fast globally)

**Tradeoff:** Cold starts cause ~1s delay; ML model too large, so we simplified detection.

---

## Decision 5: Alert System

**Date:** January 2025  
**Decision:** Use Twilio for SMS + SMTP for email  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Twilio | Reliable, global | Costs after free tier |
| AWS SNS | Cheap at scale | Complex setup |
| Firebase | Free tier | Limited to push notifications |

**Why Twilio + SMTP:**
- Twilio: Most reliable SMS delivery
- SMTP: Free email via Gmail
- Fallback: Alerts logged if neither configured

**Tradeoff:** Twilio costs money at scale; mitigated by optional configuration.

---

## Decision 6: Sensor Detection

**Date:** January 2025  
**Decision:** Use DeviceMotion API over native app  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Web DeviceMotion | No app install, cross-platform | Requires HTTPS, iOS permission |
| React Native | Better sensor access | Requires app stores |
| PWA | Installable, offline | Limited sensor access |

**Why DeviceMotion API:**
- Works in browser (no app download)
- Sufficient for shake/fall detection
- HTTPS on Vercel satisfies requirement

**Tradeoff:** Requires HTTPS; doesn't work on localhost for testing.

---

## Decision 7: State Management

**Date:** January 2025  
**Decision:** Use React useState/useEffect over Redux  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| useState | Simple, built-in | Prop drilling |
| Redux | Centralized state | Boilerplate, overkill |
| Context API | No prop drilling | Re-render issues |

**Why useState:**
- App is simple enough
- No complex state sharing needed
- Faster development time

**Tradeoff:** Would need Redux if app grows significantly.

---

## Decision 8: Styling Approach

**Date:** January 2025  
**Decision:** Use plain CSS over CSS-in-JS  

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Plain CSS | Simple, no dependencies | Global namespace |
| Styled Components | Scoped, dynamic | Bundle size, learning |
| Tailwind | Utility classes | Verbose HTML |

**Why Plain CSS:**
- No additional dependencies
- Faster initial load
- Easier for hackathon timeline

**Tradeoff:** Manual class naming; acceptable for project size.

---

## Summary

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Frontend | React | Ecosystem & device APIs |
| Backend | FastAPI | Async + auto-docs |
| AI Model | toxic-bert | Pre-trained accuracy |
| Hosting | Vercel | Free + HTTPS |
| Alerts | Twilio/SMTP | Reliability |
| Sensors | DeviceMotion | No app install |
| State | useState | Simplicity |
| Styling | Plain CSS | No dependencies |
