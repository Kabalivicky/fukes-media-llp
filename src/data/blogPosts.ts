export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'bp-1',
    slug: 'vfx-breakdown-invisible-effects',
    title: 'VFX Breakdown: The Art of Invisible Effects in Indian Cinema',
    excerpt: 'How modern Indian films use invisible VFX to enhance storytelling without the audience ever noticing — from sky replacements to crowd duplication.',
    content: `Visual effects aren't always about giant explosions or alien invasions. In fact, the most effective VFX work is the kind audiences never notice. This article breaks down how Indian cinema leverages "invisible effects" — subtle enhancements that serve the story.\n\nFrom wire removal in action sequences to digital set extensions that transform a studio floor into a period-accurate palace, invisible VFX is the backbone of modern Indian filmmaking.\n\n## Sky Replacements\nOne of the most common invisible effects is sky replacement. Shooting schedules rarely align with ideal weather, so replacing a flat grey sky with a dramatic sunset can completely change a scene's mood.\n\n## Crowd Duplication\nBollywood's signature crowd scenes often use a combination of practical extras and digital duplication. With careful matchmoving and compositing, 200 extras can become 2,000.\n\n## Digital Cleanup\nEvery frame that reaches the screen has been digitally cleaned — removing boom mics, crew reflections, safety wires, and modern elements from period pieces.`,
    category: 'VFX',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop',
    author: 'Vikram A.',
    authorRole: 'Compositing Lead',
    date: '2026-03-18',
    readTime: '7 min read',
    featured: true,
    tags: ['VFX', 'Compositing', 'Indian Cinema', 'Invisible Effects'],
  },
  {
    id: 'bp-2',
    slug: 'ai-rotoscopy-pipeline-2026',
    title: 'How AI Is Transforming Rotoscopy Pipelines in 2026',
    excerpt: 'AI-assisted roto tools are cutting turnaround times by 60%. Here\'s how studios are integrating them without sacrificing edge quality.',
    content: `Rotoscopy has always been one of the most labor-intensive tasks in post-production. But 2026 marks a turning point — AI-powered tools are now production-ready and delivering results that meet broadcast standards.\n\n## The Current State\nTools like Runway's latest roto models and custom in-house solutions are being adopted by mid-tier studios across India. The key innovation: these tools handle the initial mask generation, leaving artists to refine edges and handle complex areas like hair and motion blur.\n\n## Quality vs Speed\nThe critical question isn't whether AI can do roto — it's whether it can do it well enough. Our testing shows AI handles 70-80% of frames acceptably, with human artists refining the remainder. This cuts delivery time by roughly 60% without compromising final quality.\n\n## Integration Challenges\nThe biggest hurdle isn't the technology — it's pipeline integration. Studios need version control systems that track both AI-generated and human-refined masks, with clear handoff protocols between automated and manual stages.`,
    category: 'AI & Technology',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    author: 'Harshith',
    authorRole: 'Technical Supervisor',
    date: '2026-03-15',
    readTime: '6 min read',
    featured: true,
    tags: ['AI', 'Rotoscopy', 'Pipeline', 'Automation'],
  },
  {
    id: 'bp-3',
    slug: 'behind-the-scenes-matte-painting',
    title: 'Behind the Scenes: Creating Photorealistic Matte Paintings for OTT',
    excerpt: 'A step-by-step walkthrough of our matte painting process for a recent OTT series — from reference gathering to final composite.',
    content: `Matte painting for OTT content demands a different approach than theatrical releases. The viewing context is intimate — phones, tablets, laptops — which means detail holds up under closer scrutiny even at lower resolutions.\n\n## Reference is Everything\nBefore a single pixel is painted, we spend 2-3 days gathering reference material. For period pieces, this means architectural surveys, historical photographs, and even visiting locations to understand light behavior.\n\n## The Layered Approach\nOur matte paintings are never flat images. They're constructed in layers — foreground elements, mid-ground architecture, background sky, atmospheric haze — each on separate passes so they can be adjusted independently in compositing.\n\n## Lighting Integration\nThe most common failure in matte painting is lighting mismatch. We match the plate's lighting by analyzing shadow angles, color temperature, and ambient occlusion before painting begins.`,
    category: 'VFX',
    coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&h=500&fit=crop',
    author: 'Vignesh',
    authorRole: 'Creative Lead',
    date: '2026-03-12',
    readTime: '8 min read',
    featured: true,
    tags: ['Matte Painting', 'OTT', 'Behind the Scenes', 'Compositing'],
  },
  {
    id: 'bp-4',
    slug: 'why-cheap-vfx-costs-more',
    title: 'Why Cheap VFX Always Costs More: A Producer\'s Guide',
    excerpt: 'The hidden costs of underbidding VFX work — from revision spirals to missed deadlines. What every Indian producer should know.',
    content: `Every producer wants to save money. That's rational. But choosing the cheapest VFX vendor is often the most expensive decision you'll make on a production.\n\n## The Revision Spiral\nCheap vendors cut corners on pipeline infrastructure. Without proper version control, asset management, and review systems, revisions multiply. What should be 2 rounds becomes 8. Each round costs time, and time is money.\n\n## The Hidden Costs\n- Re-shooting plates because the VFX vendor couldn't work with the original footage\n- Hiring a second vendor to fix the first vendor's work\n- Delayed release dates costing marketing spend\n- Quality issues that damage the film's reception\n\n## What to Look For\nInstead of comparing per-shot rates, compare pipeline maturity. Ask vendors about their version control, review workflow, and delivery compliance track record.`,
    category: 'Industry',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
    author: 'Arjun',
    authorRole: 'Production & Strategy',
    date: '2026-03-10',
    readTime: '5 min read',
    featured: false,
    tags: ['Industry', 'Production', 'Budget', 'Producers'],
  },
  {
    id: 'bp-5',
    slug: 'matchmove-fundamentals-cg-integration',
    title: 'Matchmove Fundamentals: Getting CG Elements to Sit in Live Action',
    excerpt: 'A technical deep-dive into camera solving, lens distortion, and the subtle art of making CG objects feel physically present.',
    content: `Matchmoving — or camera tracking — is the invisible bridge between live-action footage and CG elements. When it's done right, audiences never question whether that building, creature, or vehicle was really there.\n\n## Camera Solving Basics\nThe core task: reconstruct the real camera's position, rotation, and lens characteristics for every frame. Modern solvers use feature tracking points in the footage to reverse-engineer this data.\n\n## Lens Distortion\nEvery lens distorts reality slightly. Wide-angle lenses bend straight lines; telephoto lenses compress depth. If your CG render doesn't match the plate's distortion profile, elements will appear to "float."\n\n## Ground Contact\nThe single most important detail in CG integration is ground contact. Shadows, contact shadows, and subtle reflections where an object meets a surface sell the illusion more than any amount of shader detail.`,
    category: 'VFX',
    coverImage: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=500&fit=crop',
    author: 'Harshith',
    authorRole: 'Technical Supervisor',
    date: '2026-03-08',
    readTime: '9 min read',
    featured: false,
    tags: ['Matchmove', 'CG Integration', 'Technical', 'Tutorial'],
  },
  {
    id: 'bp-6',
    slug: 'ott-vfx-standards-india-2026',
    title: 'OTT VFX Standards in India: What Platforms Actually Expect in 2026',
    excerpt: 'Netflix, Amazon, and JioCinema have different technical requirements. Here\'s a comprehensive breakdown of delivery specs.',
    content: `As India's OTT market matures, platform-specific VFX standards are becoming more rigorous. Understanding these requirements before production begins saves enormous headaches in post.\n\n## Resolution & Format\nMost platforms now require 4K delivery minimum, with HDR grading. VFX plates must be delivered in EXR format with specific color space requirements — typically ACES or DaVinci Wide Gamut.\n\n## Quality Benchmarks\nPlatforms are increasingly using automated QC tools that flag compression artifacts, matte edges, and tracking drift. Work that passed TV broadcast standards five years ago may fail OTT QC today.\n\n## Turnaround Expectations\nOTT series operate on compressed timelines. A typical 8-episode season might allocate 12-16 weeks for VFX, compared to 6-9 months for theatrical features. Pipeline efficiency isn't optional — it's survival.`,
    category: 'Industry',
    coverImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=500&fit=crop',
    author: 'Arjun',
    authorRole: 'Production & Strategy',
    date: '2026-03-05',
    readTime: '6 min read',
    featured: false,
    tags: ['OTT', 'Standards', 'Netflix', 'Industry'],
  },
  {
    id: 'bp-7',
    slug: 'previs-saves-production-budget',
    title: 'How Previsualization Saves 30% of Your Production Budget',
    excerpt: 'Shot planning through previs eliminates on-set confusion and post-production surprises. Real numbers from real productions.',
    content: `Previsualization is often seen as an "extra" cost. In reality, it's insurance against the most expensive problems in production: wasted shoot days, unusable footage, and VFX shots that don't cut together.\n\n## The Math\nA single wasted shoot day on an Indian feature costs ₹15-30 lakhs. A comprehensive previs package for a VFX-heavy sequence costs ₹3-5 lakhs. If previs prevents even one wasted day, it's paid for itself.\n\n## What Good Previs Covers\n- Camera angles and movement paths\n- VFX element placement and scale\n- Timing for action choreography\n- Lighting requirements for CG integration\n\n## The Director's Tool\nPrevis isn't just for VFX supervisors. It's a communication tool that aligns the director's vision with what's technically achievable, before money is spent on set.`,
    category: 'Post-Production',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop',
    author: 'Sai Prasad',
    authorRole: 'Operations',
    date: '2026-03-02',
    readTime: '5 min read',
    featured: false,
    tags: ['Previs', 'Budget', 'Production Planning', 'Cost Saving'],
  },
  {
    id: 'bp-8',
    slug: 'color-science-vfx-compositing',
    title: 'Color Science for VFX Compositors: ACES, OCIO, and Getting It Right',
    excerpt: 'A practical guide to color management in VFX pipelines — why your composites look wrong and how to fix them.',
    content: `Color management is the most overlooked aspect of VFX compositing, and it's responsible for more failed shots than any other technical issue.\n\n## Why Colors Go Wrong\nWhen you composite a CG render over a live-action plate without proper color management, you're mixing color spaces. The render might be in linear sRGB while the plate is in log. The result: CG elements that look "pasted on."\n\n## ACES Pipeline\nACES (Academy Color Encoding System) provides a standardized color pipeline. All inputs are converted to a common color space (ACEScg), all work happens in that space, and outputs are transformed to the delivery format.\n\n## Practical Tips\n- Always work in linear color space for compositing\n- Match your CG render's color space to your compositing software\n- Use OCIO configs for consistent color across applications\n- Test your composite on calibrated monitors, not laptop screens`,
    category: 'Post-Production',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop',
    author: 'Vikram A.',
    authorRole: 'Compositing Lead',
    date: '2026-02-28',
    readTime: '7 min read',
    featured: false,
    tags: ['Color Science', 'ACES', 'Compositing', 'Technical'],
  },
  {
    id: 'bp-9',
    slug: 'virtual-production-india-reality-check',
    title: 'Virtual Production in India: Hype vs Reality in 2026',
    excerpt: 'LED volumes and real-time rendering are everywhere in trade shows. But how practical are they for Indian productions right now?',
    content: `Virtual production — shooting with LED walls displaying real-time CG environments — has been Hollywood's darling since The Mandalorian. But in India, the reality is more nuanced.\n\n## The Promise\nVirtual production eliminates location shoots, reduces travel costs, and provides in-camera VFX that directors can see in real time. For a country where location logistics are complex, this sounds transformative.\n\n## The Reality\nLED volume setups in India currently cost ₹15-25 lakhs per day. The technology requires specialized operators, careful color calibration, and content that's been prepared weeks in advance. It's not a plug-and-play solution.\n\n## Where It Makes Sense\n- High-end advertising where the daily rate is justified\n- Sci-fi/fantasy content with extensive environment work\n- Productions shooting in locations that are unsafe or inaccessible\n\n## Where It Doesn't (Yet)\n- Most feature films with moderate VFX requirements\n- Content that needs authentic location feeling\n- Productions without pre-production time for VP content creation`,
    category: 'AI & Technology',
    coverImage: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&h=500&fit=crop',
    author: 'Vignesh',
    authorRole: 'Creative Lead',
    date: '2026-02-25',
    readTime: '8 min read',
    featured: false,
    tags: ['Virtual Production', 'LED Volume', 'Innovation', 'India'],
  },
  {
    id: 'bp-10',
    slug: 'revision-management-vfx-studios',
    title: '80% of VFX Revisions Happen Before Shot Planning: Here\'s Proof',
    excerpt: 'Data from 150+ projects shows that revision overruns are a planning problem, not an execution problem.',
    content: `We analyzed data from over 150 VFX projects across Indian studios and found a pattern that should change how every producer approaches post-production.\n\n## The Data\n- Projects with detailed shot breakdowns before production: average 2.3 revision rounds\n- Projects without shot breakdowns: average 6.8 revision rounds\n- The cost difference: 3x higher post-production spend on unplanned projects\n\n## Why Planning Prevents Revisions\nMost revisions aren't about quality — they're about miscommunication. "That's not what I envisioned" is the most expensive sentence in post-production. Shot breakdowns, previs, and reference boards eliminate ambiguity.\n\n## The Fix\n1. Shot breakdown before production starts\n2. Reference boards for every VFX sequence\n3. Director-approved previs before plate shooting\n4. Written revision limits in contracts\n5. Structured review cycles with clear feedback protocols`,
    category: 'Industry',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    author: 'Arjun',
    authorRole: 'Production & Strategy',
    date: '2026-02-20',
    readTime: '6 min read',
    featured: false,
    tags: ['Revisions', 'Project Management', 'Data', 'Planning'],
  },
  {
    id: 'bp-11',
    slug: 'building-vfx-career-india-2026',
    title: 'Building a VFX Career in India: What Actually Matters in 2026',
    excerpt: 'Forget certificates. Here\'s what hiring managers at Indian VFX studios actually look for — and how to build a portfolio that gets callbacks.',
    content: `The Indian VFX industry employs over 100,000 professionals, but finding skilled artists remains one of the biggest challenges for studios. Here's what the gap looks like from the hiring side.\n\n## What We Look For\n1. **Problem-solving ability** over software proficiency\n2. **Attention to detail** demonstrated through portfolio work\n3. **Pipeline awareness** — understanding how your work fits into the larger process\n4. **Communication skills** — can you articulate why you made creative decisions?\n\n## Portfolio Tips\n- Show breakdowns, not just final renders\n- Include before/after comparisons\n- Demonstrate range across different types of work\n- Quality over quantity — 5 excellent pieces beat 20 mediocre ones\n\n## The Career Path\nJunior Artist → Artist → Senior Artist → Lead → Supervisor → Head of Department. Each step requires not just better technical skills, but better communication, mentoring, and pipeline management abilities.`,
    category: 'Industry',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    author: 'Sai Prasad',
    authorRole: 'Operations',
    date: '2026-02-15',
    readTime: '7 min read',
    featured: false,
    tags: ['Career', 'Hiring', 'Portfolio', 'India'],
  },
  {
    id: 'bp-12',
    slug: 'real-time-rendering-compositing-future',
    title: 'Real-Time Rendering Meets Compositing: The Future is Now',
    excerpt: 'Unreal Engine 5 and Blender\'s EEVEE are blurring the line between offline rendering and real-time. What this means for compositors.',
    content: `The traditional VFX pipeline — model, texture, light, render overnight, composite next day — is being disrupted by real-time rendering engines that produce near-final quality at interactive speeds.\n\n## The Shift\nUnreal Engine 5's Lumen and Nanite technologies deliver global illumination and geometric detail that rivals offline renderers. For compositors, this means:\n- Faster iteration cycles\n- Interactive lighting adjustments\n- Real-time look development\n\n## Blender's EEVEE Next\nBlender's real-time renderer is becoming production-viable for certain shot types. Mid-tier studios are using it for previz that's close enough to final that directors approve shots earlier in the process.\n\n## Impact on Compositing\nAs renders become faster, compositing workflows shift from "fix it in post" to "validate in real-time." Compositors need to understand real-time rendering to stay relevant.`,
    category: 'AI & Technology',
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=500&fit=crop',
    author: 'Harshith',
    authorRole: 'Technical Supervisor',
    date: '2026-02-10',
    readTime: '6 min read',
    featured: false,
    tags: ['Real-Time', 'Unreal Engine', 'Blender', 'Compositing'],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find(p => p.slug === slug);

export const getRelatedPosts = (post: BlogPost, count = 3): BlogPost[] =>
  blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, count);

export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter(p => p.featured);

export const categories = ['All', 'VFX', 'AI & Technology', 'Industry', 'Post-Production'];
