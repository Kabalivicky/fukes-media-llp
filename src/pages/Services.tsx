import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Check, Scissors, Camera, Layers, Mountain, Eye, Cpu,
  FileText, Shield, Clock, Crosshair, Palette, Film, Tv, Wand2,
  MonitorPlay, Sparkles, Video, Music, Mic, PenTool, Clapperboard,
  SunMedium, Globe, Cloud, Server, Box, Megaphone, Share2, Instagram,
  Smartphone, Target, Bookmark, LayoutGrid, Type, Crown, Brush, Aperture,
  Radio, ChevronDown, Wrench, Timer, Package, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  gradient: string;
  software: string[];
  turnaround: string;
  deliverables: string[];
  useCases: string[];
  teamSize: string;
}

const serviceCategories: { category: string; description: string; services: ServiceDetail[] }[] = [
  {
    category: "CGI & VFX",
    description: "Full-spectrum visual effects production across every discipline",
    services: [
      {
        id: "roto", title: "Rotoscopy & Paint", description: "Precise isolation. Edge integrity. Hair-level detail. Frame-accurate work for compositing pipelines.",
        icon: Scissors, gradient: "from-primary to-secondary",
        features: ["Frame-accurate isolation", "Edge refinement & cleanup", "Hair & fine detail work", "Paint & wire removal", "Roto-prep for compositing", "Batch pipeline delivery"],
        software: ["Silhouette", "Nuke", "After Effects", "Mocha Pro", "DaVinci Resolve"],
        turnaround: "3–10 days per sequence",
        deliverables: ["Alpha mattes (EXR/PNG)", "Clean plates", "Paint-fixed frames", "QC reports"],
        useCases: ["Feature films", "Web series", "Ad films", "Music videos"],
        teamSize: "2–6 artists per project"
      },
      {
        id: "matchmove", title: "Matchmove & Body Tracking", description: "Camera reconstruction, 3D tracking, CG integration. Survey-accurate solves for seamless VFX.",
        icon: Camera, gradient: "from-secondary to-accent",
        features: ["Camera solve & reconstruction", "3D object tracking", "Body & face tracking", "Survey data integration", "Lens distortion solve", "CG element alignment"],
        software: ["3DEqualizer", "PFTrack", "SynthEyes", "Nuke", "Maya"],
        turnaround: "2–7 days per shot",
        deliverables: ["Camera FBX/Alembic", "Tracking locators", "Undistort plates", "Solve reports"],
        useCases: ["CG creature integration", "Set extensions", "Virtual production prep", "Product placement"],
        teamSize: "1–3 artists per project"
      },
      {
        id: "compositing", title: "3D Compositing", description: "Physically accurate integration. Light matching. Depth realism. Final pixel-perfect delivery.",
        icon: Layers, gradient: "from-accent to-primary",
        features: ["Multi-pass rendering integration", "Light & shadow matching", "Depth & atmospheric effects", "Color consistency", "CG-live action blending", "Final pixel delivery"],
        software: ["Nuke", "Fusion", "After Effects", "Flame", "Natron"],
        turnaround: "3–14 days per sequence",
        deliverables: ["Final composites (EXR/DPX)", "Breakdown reels", "QC frames", "Version history"],
        useCases: ["Hero VFX shots", "Invisible VFX", "Beauty & cleanup", "Environment integration"],
        teamSize: "2–8 artists per project"
      },
      {
        id: "matte", title: "Matte Painting", description: "Production-scale environments and set extensions. Full CG worlds and 2.5D projections.",
        icon: Mountain, gradient: "from-primary to-accent",
        features: ["Full CG environments", "Set extensions", "2.5D camera projections", "Sky replacements", "Period & world building", "Camera-ready asset delivery"],
        software: ["Photoshop", "Nuke", "Maya", "Unreal Engine", "ZBrush"],
        turnaround: "5–15 days per environment",
        deliverables: ["Layered PSD/EXR files", "Projection setups", "Camera-ready plates", "Asset documentation"],
        useCases: ["Period drama backgrounds", "Sci-fi worlds", "City extensions", "Fantasy landscapes"],
        teamSize: "1–4 artists per project"
      },
      {
        id: "previs", title: "Previsualization", description: "Shot planning to reduce on-set confusion and post chaos. Visual storyboarding in 3D.",
        icon: Eye, gradient: "from-secondary to-primary",
        features: ["Shot planning & design", "Camera blocking", "Action choreography viz", "VFX shot breakdown", "Director communication tool", "Budget forecasting aid"],
        software: ["Maya", "Unreal Engine", "Blender", "MotionBuilder", "ShotGrid"],
        turnaround: "1–3 weeks per sequence",
        deliverables: ["Animatic videos", "Camera layout files", "Shot breakdowns", "Budget estimates"],
        useCases: ["Action sequences", "VFX-heavy scenes", "Stunt choreography", "Ad film planning"],
        teamSize: "2–5 artists per project"
      },
      {
        id: "greenscreen", title: "Green Screen & Keying", description: "Clean extraction, spill suppression, seamless composites. Multi-layer keying pipelines.",
        icon: MonitorPlay, gradient: "from-accent to-secondary",
        features: ["Chroma keying", "Spill suppression", "Edge blending", "Virtual backgrounds", "Live-action integration", "Multi-layer composites"],
        software: ["Nuke", "Keylight", "Primatte", "After Effects", "DaVinci Resolve"],
        turnaround: "1–5 days per sequence",
        deliverables: ["Clean keys (EXR)", "Despill mattes", "Composited plates", "Behind-the-scenes"],
        useCases: ["Interview setups", "Virtual sets", "Product shoots", "News broadcasts"],
        teamSize: "1–3 artists per project"
      },
      {
        id: "fx", title: "FX & Simulations", description: "Particle systems, fluid dynamics, destruction, fire, smoke, and environmental FX at production scale.",
        icon: Sparkles, gradient: "from-primary to-secondary",
        features: ["Particle effects", "Fluid simulations", "Destruction & debris", "Fire, smoke & explosions", "Cloth & hair dynamics", "Environmental FX"],
        software: ["Houdini", "Maya", "RealFlow", "EmberGen", "Phoenix FD"],
        turnaround: "1–4 weeks per sequence",
        deliverables: ["Rendered FX passes (EXR)", "Simulation caches", "Breakdown videos", "Technical documentation"],
        useCases: ["Explosions & destruction", "Weather effects", "Magic & fantasy", "Sci-fi environments"],
        teamSize: "2–6 artists per project"
      },
      {
        id: "3d-modeling", title: "3D Modeling & Texturing", description: "High-fidelity asset creation for film, commercial, and game-ready pipelines.",
        icon: Box, gradient: "from-secondary to-accent",
        features: ["Character modeling", "Hard-surface modeling", "UV unwrapping", "PBR texturing", "Look development", "Asset optimization"],
        software: ["Maya", "ZBrush", "Substance Painter", "Mari", "Blender"],
        turnaround: "1–4 weeks per asset",
        deliverables: ["Production-ready models (FBX/OBJ)", "Texture maps (4K–8K)", "Turntable renders", "Asset sheets"],
        useCases: ["Character creation", "Vehicle & prop modeling", "Environment assets", "Product visualization"],
        teamSize: "1–4 artists per asset"
      },
    ],
  },
  {
    category: "Creative Services",
    description: "End-to-end creative direction from concept to final delivery",
    services: [
      {
        id: "concept-art", title: "Concept Art & Design", description: "Visual development that sets the creative foundation for entire productions.",
        icon: PenTool, gradient: "from-primary to-accent",
        features: ["Character design", "Environment concepts", "Prop & vehicle design", "Mood boards", "Style frames", "Visual development"],
        software: ["Photoshop", "Procreate", "Blender", "ZBrush", "Figma"],
        turnaround: "3–10 days per batch",
        deliverables: ["High-res concept sheets", "Mood boards", "Style guides", "Turnaround views"],
        useCases: ["Film pre-production", "Game development", "Ad campaigns", "Brand world-building"],
        teamSize: "1–3 artists per project"
      },
      {
        id: "storyboarding", title: "Storyboarding", description: "Frame-by-frame narrative planning for directors, producers, and creative teams.",
        icon: Clapperboard, gradient: "from-secondary to-primary",
        features: ["Shot-by-shot breakdown", "Action sequences", "Animatics", "Camera angle planning", "Narrative flow design", "Revision rounds"],
        software: ["Storyboarder", "Photoshop", "Procreate", "Toon Boom", "After Effects"],
        turnaround: "3–7 days per sequence",
        deliverables: ["Storyboard panels (PDF/PNG)", "Animatic videos", "Shot lists", "Director notes"],
        useCases: ["Film scenes", "Ad scripts", "Music video concepts", "Animation episodes"],
        teamSize: "1–2 artists per project"
      },
      {
        id: "motion-graphics", title: "Motion Graphics & Titles", description: "Broadcast-quality motion design, title sequences, lower thirds, and infographics.",
        icon: Wand2, gradient: "from-accent to-secondary",
        features: ["Title sequences", "Lower thirds & supers", "Logo animations", "Infographic animations", "Broadcast packages", "Social media motion"],
        software: ["After Effects", "Cinema 4D", "Blender", "Houdini", "DaVinci Resolve"],
        turnaround: "3–10 days per package",
        deliverables: ["Motion graphics files (MOV/MP4)", "Template files (AE Project)", "Style guides", "Source files"],
        useCases: ["Film titles", "News graphics", "Corporate presentations", "YouTube intros"],
        teamSize: "1–3 artists per project"
      },
      {
        id: "art-direction", title: "Art Direction", description: "Expert creative guidance to unify your project's visual language across all departments.",
        icon: Palette, gradient: "from-primary to-secondary",
        features: ["Visual style guides", "Color palette direction", "Typography systems", "Brand alignment", "Cross-department coherence", "Creative supervision"],
        software: ["Figma", "Photoshop", "Illustrator", "Keynote", "Miro"],
        turnaround: "Ongoing / per-project",
        deliverables: ["Style guide documents", "Color & type specs", "Reference boards", "Creative briefs"],
        useCases: ["Film look development", "Brand campaigns", "Multi-platform content", "Event branding"],
        teamSize: "1–2 leads per project"
      },
    ],
  },
  {
    category: "Editing & Post-Production",
    description: "From raw footage to polished final cut — every frame counts",
    services: [
      {
        id: "film-editing", title: "Film & TV Editing", description: "Narrative editing, pacing, and story structure for long-form content across all platforms.",
        icon: Film, gradient: "from-secondary to-accent",
        features: ["Narrative editing", "Assembly to fine cut", "Multi-cam editing", "Dialogue editing", "Scene pacing", "Director's cut assembly"],
        software: ["Premiere Pro", "DaVinci Resolve", "Avid Media Composer", "Final Cut Pro"],
        turnaround: "1–6 weeks per project",
        deliverables: ["Final cut (ProRes/H.264)", "EDL/XML timelines", "Offline/Online masters", "Version archive"],
        useCases: ["Feature films", "Web series", "Documentaries", "TV episodes"],
        teamSize: "1–3 editors per project"
      },
      {
        id: "reel-editing", title: "Showreel & Promo Editing", description: "High-impact reels, trailers, teasers, and promotional edits that grab attention.",
        icon: Video, gradient: "from-primary to-secondary",
        features: ["Showreel compilation", "Trailer editing", "Teaser cuts", "Social media edits", "Behind-the-scenes", "Highlight reels"],
        software: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro"],
        turnaround: "2–7 days per reel",
        deliverables: ["Final reel (MP4/MOV)", "Platform-specific versions", "Thumbnail frames", "Music-licensed edit"],
        useCases: ["Artist portfolios", "Studio reels", "Film trailers", "Corporate highlights"],
        teamSize: "1–2 editors per project"
      },
      {
        id: "sound-design", title: "Sound Design & Mixing", description: "Audio post-production, SFX design, dialogue cleanup, foley, and final mix.",
        icon: Music, gradient: "from-accent to-primary",
        features: ["Sound effects design", "Foley integration", "Dialogue cleanup", "Ambient soundscapes", "Stereo & surround mixing", "Audio mastering"],
        software: ["Pro Tools", "Logic Pro", "Audition", "iZotope RX", "Nuendo"],
        turnaround: "3–14 days per project",
        deliverables: ["Final mix (WAV/AIFF)", "Stems & splits", "M&E tracks", "QC reports"],
        useCases: ["Film audio post", "Ad film sound", "Podcast production", "Game audio"],
        teamSize: "1–3 sound artists per project"
      },
      {
        id: "voiceover", title: "Voiceover & Dubbing", description: "Professional VO recording, multi-language dubbing, lip-sync, and ADR sessions.",
        icon: Mic, gradient: "from-secondary to-primary",
        features: ["Voice talent sourcing", "Studio recording", "Multi-language dubbing", "Lip-sync matching", "ADR sessions", "Audio direction"],
        software: ["Pro Tools", "Audition", "Source-Connect", "iZotope RX", "Logic Pro"],
        turnaround: "2–10 days per language",
        deliverables: ["VO recordings (WAV)", "Dubbed audio tracks", "Sync verification", "Talent credits"],
        useCases: ["Documentary narration", "Ad film VO", "E-learning", "Multi-language releases"],
        teamSize: "1–2 engineers + talent"
      },
    ],
  },
  {
    category: "Digital Intermediate (DI)",
    description: "Color science, mastering, and deliverable compliance",
    services: [
      {
        id: "color-grading", title: "Color Grading", description: "Scene-to-scene color consistency, cinematic look creation, HDR grading, and LUT management.",
        icon: SunMedium, gradient: "from-primary to-accent",
        features: ["Primary correction", "Secondary grading", "Scene matching", "Look creation (LUTs)", "Skin tone management", "HDR grading"],
        software: ["DaVinci Resolve", "Baselight", "Lustre", "Nucoda", "Scratch"],
        turnaround: "3–14 days per project",
        deliverables: ["Graded masters (DPX/EXR)", "Custom LUTs", "CDL values", "Before/after comparisons"],
        useCases: ["Feature film grading", "Ad film looks", "Music video color", "Corporate video"],
        teamSize: "1–2 colorists per project"
      },
      {
        id: "conforming", title: "Conforming & Online", description: "Timeline conforming, online finishing, title safe, QC, and versioning.",
        icon: Tv, gradient: "from-secondary to-primary",
        features: ["EDL/XML conforming", "Online editing", "Title safe & framing", "QC & compliance", "Versioning", "Format conversion"],
        software: ["DaVinci Resolve", "Flame", "Avid", "Nuke Studio", "Cortex"],
        turnaround: "2–7 days per project",
        deliverables: ["Conformed timeline", "Online master", "QC reports", "Version files"],
        useCases: ["Broadcast delivery", "Theatrical finishing", "Streaming platform prep", "Archive creation"],
        teamSize: "1–2 online editors"
      },
      {
        id: "mastering", title: "Mastering & Deliverables", description: "DCPs, IMFs, broadcast masters, streaming specs, HDR/SDR, and archival masters.",
        icon: Shield, gradient: "from-accent to-secondary",
        features: ["DCP creation", "IMF packaging", "Broadcast masters", "Streaming deliverables", "HDR/SDR versions", "Archival masters"],
        software: ["DaVinci Resolve", "EasyDCP", "Colorfront", "Cortex", "ACES pipeline"],
        turnaround: "1–5 days per deliverable set",
        deliverables: ["DCP packages", "IMF packages", "Broadcast masters (ProRes/DNxHR)", "Streaming files (H.264/H.265)"],
        useCases: ["Theatrical release", "Festival submissions", "OTT delivery", "Broadcast airing"],
        teamSize: "1–2 mastering engineers"
      },
    ],
  },
  {
    category: "Tech Innovation",
    description: "Next-generation production technology and pipeline solutions",
    services: [
      {
        id: "ai", title: "AI-Enhanced Workflow", description: "Controlled AI usage integrated into production pipelines for speed and efficiency.",
        icon: Cpu, gradient: "from-accent to-secondary",
        features: ["AI-assisted rotoscopy", "Automated QC checks", "Smart batch processing", "Pipeline automation", "Version control systems", "Asset tracking integration"],
        software: ["Runway ML", "Topaz AI", "Custom Python/ML", "ShotGrid", "ftrack"],
        turnaround: "Consultation-based",
        deliverables: ["Pipeline integration docs", "Custom tool scripts", "Workflow reports", "ROI analysis"],
        useCases: ["Studio pipeline optimization", "Batch processing", "QC automation", "Asset management"],
        teamSize: "1–3 pipeline TDs"
      },
      {
        id: "virtual-production", title: "Virtual Production", description: "LED walls, real-time rendering, in-camera VFX, and virtual scouting workflows.",
        icon: Globe, gradient: "from-primary to-secondary",
        features: ["LED volume setup", "Real-time rendering", "In-camera VFX", "Unreal Engine integration", "Virtual scouting", "Techvis & stage planning"],
        software: ["Unreal Engine", "Disguise", "Brompton", "Mo-Sys", "Ncam"],
        turnaround: "2–8 weeks per production",
        deliverables: ["Virtual environments", "Stage layout plans", "In-camera VFX footage", "Technical documentation"],
        useCases: ["Film production", "Ad shoots", "Broadcast sets", "Music videos"],
        teamSize: "4–12 crew per production"
      },
      {
        id: "cloud-pipeline", title: "Cloud Pipeline & Infra", description: "Scalable cloud rendering, secure storage, and remote collaboration infrastructure.",
        icon: Cloud, gradient: "from-secondary to-accent",
        features: ["Cloud rendering farms", "Remote artist setup", "Secure file transfer", "Collaborative review tools", "Scalable infrastructure", "Pipeline consulting"],
        software: ["AWS/GCP", "Deadline", "ShotGrid", "Perforce", "Aspera"],
        turnaround: "Setup: 1–2 weeks",
        deliverables: ["Infrastructure setup", "Access credentials", "Pipeline documentation", "Training materials"],
        useCases: ["Remote teams", "Multi-site studios", "Burst rendering", "Global collaboration"],
        teamSize: "1–3 pipeline engineers"
      },
      {
        id: "pipeline-dev", title: "Pipeline Development", description: "Custom tools, automation scripts, Shotgrid integration, and studio pipeline design.",
        icon: Server, gradient: "from-accent to-primary",
        features: ["Custom tool development", "Shotgrid integration", "Automation scripts", "Render management", "Asset management", "Studio pipeline design"],
        software: ["Python", "PyQt/PySide", "ShotGrid API", "USD", "OpenEXR"],
        turnaround: "2–8 weeks per tool",
        deliverables: ["Custom tools", "API integrations", "Documentation", "Training & support"],
        useCases: ["Studio setup", "Workflow automation", "Asset tracking", "Render farm management"],
        teamSize: "1–4 pipeline TDs"
      },
    ],
  },
  {
    category: "Branding & Identity",
    description: "Build a visual identity that commands recognition and trust",
    services: [
      {
        id: "brand-strategy", title: "Brand Strategy & Identity", description: "Core brand positioning, voice, visual identity systems, and competitive analysis.",
        icon: Crown, gradient: "from-primary to-secondary",
        features: ["Brand positioning", "Mission & vision crafting", "Brand voice guidelines", "Visual identity system", "Brand book creation", "Competitive analysis"],
        software: ["Figma", "Illustrator", "Photoshop", "Miro", "Notion"],
        turnaround: "2–4 weeks per brand",
        deliverables: ["Brand strategy document", "Brand book (PDF)", "Presentation deck", "Competitor audit"],
        useCases: ["New brand launch", "Rebrand", "Sub-brand creation", "Startup branding"],
        teamSize: "2–4 strategists & designers"
      },
      {
        id: "logo-design", title: "Logo & Mark Design", description: "Distinctive logos, wordmarks, monograms, and brand marks that stand out.",
        icon: Brush, gradient: "from-secondary to-accent",
        features: ["Logo design & variations", "Wordmark & monogram", "Icon & symbol design", "Color palette definition", "Typography selection", "Usage guidelines"],
        software: ["Illustrator", "Figma", "Photoshop", "After Effects"],
        turnaround: "1–3 weeks per logo",
        deliverables: ["Logo files (SVG/AI/PNG)", "Color variations", "Usage guidelines", "Favicon & app icons"],
        useCases: ["Company logos", "Product marks", "Event branding", "Channel branding"],
        teamSize: "1–2 designers per project"
      },
      {
        id: "brand-collateral", title: "Brand Collateral", description: "Business cards, letterheads, presentations, merchandise, and print-ready assets.",
        icon: LayoutGrid, gradient: "from-accent to-primary",
        features: ["Business card design", "Letterhead & stationery", "Presentation templates", "Brand merchandise", "Packaging design", "Print-ready assets"],
        software: ["Illustrator", "InDesign", "Figma", "Photoshop", "Canva"],
        turnaround: "1–2 weeks per set",
        deliverables: ["Print-ready files (PDF/AI)", "Editable templates", "Mockup presentations", "Production specs"],
        useCases: ["Corporate identity kits", "Event materials", "Product packaging", "Investor decks"],
        teamSize: "1–3 designers per project"
      },
      {
        id: "brand-guidelines", title: "Brand Guidelines & Toolkit", description: "Comprehensive style guides for consistent brand application across all touchpoints.",
        icon: Type, gradient: "from-primary to-accent",
        features: ["Style guide document", "Color & typography specs", "Do's and don'ts", "Asset library", "Template systems", "Multi-platform adaptation"],
        software: ["Figma", "InDesign", "Illustrator", "Notion", "Google Slides"],
        turnaround: "2–3 weeks per guide",
        deliverables: ["Brand guidelines (PDF)", "Digital asset library", "Template pack", "Training deck"],
        useCases: ["Brand consistency", "Team onboarding", "Agency handoff", "Franchise expansion"],
        teamSize: "1–2 designers per project"
      },
    ],
  },
  {
    category: "Promotions & Advertising",
    description: "High-impact promotional content that drives engagement and conversions",
    services: [
      {
        id: "ad-films", title: "Ad Films & Commercials", description: "Concept-to-delivery ad production for TV, digital, cinema, and OTT platforms.",
        icon: Megaphone, gradient: "from-secondary to-primary",
        features: ["TV commercials", "Digital ad films", "Product demos", "Explainer videos", "Testimonial videos", "Cinema ads"],
        software: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D", "Nuke"],
        turnaround: "1–4 weeks per ad",
        deliverables: ["Final ad film (broadcast spec)", "Social media cuts", "Behind-the-scenes", "Usage reports"],
        useCases: ["Product launch", "Brand awareness", "Festival ads", "Corporate promos"],
        teamSize: "3–10 crew per production"
      },
      {
        id: "campaign-creative", title: "Campaign Creatives", description: "Visual assets for ad campaigns across digital, print, OOH, and email channels.",
        icon: Target, gradient: "from-accent to-secondary",
        features: ["Banner ad design", "Display creatives", "Email templates", "Landing page design", "Print ads", "OOH & billboard design"],
        software: ["Photoshop", "Illustrator", "Figma", "After Effects", "Google Web Designer"],
        turnaround: "3–10 days per campaign",
        deliverables: ["Ad creatives (all sizes)", "HTML5 banners", "Print-ready files", "Platform-specific assets"],
        useCases: ["Digital campaigns", "Social media ads", "Print advertising", "Outdoor advertising"],
        teamSize: "2–5 designers per campaign"
      },
      {
        id: "event-promo", title: "Event & Launch Promos", description: "Teasers, countdowns, launch videos, event coverage, and post-event recaps.",
        icon: Radio, gradient: "from-primary to-accent",
        features: ["Launch teaser videos", "Countdown animations", "Event highlight reels", "Invitation videos", "Live event graphics", "Post-event recaps"],
        software: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop"],
        turnaround: "3–10 days per deliverable",
        deliverables: ["Teaser videos (MP4/MOV)", "Event recap films", "Social media cuts", "Invitation graphics"],
        useCases: ["Product launches", "Film premieres", "Corporate events", "Award ceremonies"],
        teamSize: "2–6 crew per event"
      },
      {
        id: "brand-films", title: "Brand Films & Documentaries", description: "Long-form storytelling that builds brand equity, trust, and emotional connection.",
        icon: Aperture, gradient: "from-secondary to-accent",
        features: ["Brand story films", "Corporate documentaries", "Founder stories", "Behind-the-scenes", "Culture films", "CSR & impact videos"],
        software: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Pro Tools"],
        turnaround: "2–8 weeks per film",
        deliverables: ["Final film (ProRes/H.264)", "Trailer & teaser cuts", "BTS footage", "Social media clips"],
        useCases: ["Brand storytelling", "Corporate communication", "Investor updates", "HR & recruitment"],
        teamSize: "3–8 crew per production"
      },
    ],
  },
  {
    category: "Digital & Social Media",
    description: "Content creation and strategy for every digital platform",
    services: [
      {
        id: "social-content", title: "Social Media Content", description: "Scroll-stopping content for Instagram, YouTube, LinkedIn, TikTok, and more.",
        icon: Instagram, gradient: "from-primary to-secondary",
        features: ["Instagram Reels & Stories", "YouTube Shorts", "LinkedIn video content", "Twitter/X visual posts", "TikTok content", "Platform-specific formats"],
        software: ["Premiere Pro", "After Effects", "CapCut", "Canva", "Photoshop"],
        turnaround: "2–5 days per batch",
        deliverables: ["Platform-optimized videos", "Carousel graphics", "Story templates", "Caption copy"],
        useCases: ["Brand social presence", "Product showcases", "Thought leadership", "Community engagement"],
        teamSize: "1–3 creators per account"
      },
      {
        id: "social-strategy", title: "Content Strategy & Calendar", description: "Data-driven content planning, scheduling, performance tracking, and optimization.",
        icon: Share2, gradient: "from-secondary to-accent",
        features: ["Content calendar planning", "Platform strategy", "Hashtag research", "Posting schedules", "Engagement tactics", "Analytics & reporting"],
        software: ["Notion", "Hootsuite", "Later", "Google Analytics", "Meta Business Suite"],
        turnaround: "Ongoing monthly retainer",
        deliverables: ["Monthly content calendar", "Strategy document", "Analytics reports", "Performance reviews"],
        useCases: ["Brand building", "Lead generation", "Community growth", "Product awareness"],
        teamSize: "1–2 strategists per account"
      },
      {
        id: "reel-production", title: "Reel & Short-Form Production", description: "High-quality short-form video production optimized for virality and engagement.",
        icon: Smartphone, gradient: "from-accent to-primary",
        features: ["Trending reel formats", "Product showcases", "Tutorial & how-to reels", "Transition edits", "Music-synced edits", "Batch reel production"],
        software: ["Premiere Pro", "CapCut", "After Effects", "InShot", "Canva"],
        turnaround: "1–3 days per reel",
        deliverables: ["Final reels (MP4)", "Vertical & square versions", "Thumbnail options", "Hashtag suggestions"],
        useCases: ["Instagram Reels", "YouTube Shorts", "TikTok content", "LinkedIn video"],
        teamSize: "1–2 editors per batch"
      },
      {
        id: "thumbnail-design", title: "Thumbnails & Graphics", description: "Click-worthy thumbnails, carousels, infographics, and social media graphics.",
        icon: Bookmark, gradient: "from-primary to-accent",
        features: ["YouTube thumbnails", "Carousel posts", "Infographics", "Quote cards", "Story templates", "Highlight covers"],
        software: ["Photoshop", "Canva", "Figma", "Illustrator"],
        turnaround: "1–3 days per batch",
        deliverables: ["Thumbnail files (PNG/JPG)", "Template files", "Brand-consistent graphics", "A/B test variations"],
        useCases: ["YouTube channels", "Instagram accounts", "Blog headers", "Newsletter graphics"],
        teamSize: "1 designer per batch"
      },
    ],
  },
];

const processSteps = [
  { step: "01", title: "Script & Shot Breakdown", description: "We break cost per shot, not per vague assumption. Every frame is accounted for before a single pixel is touched.", icon: FileText },
  { step: "02", title: "Pipeline Mapping", description: "Department allocation, version control, asset flow clarity. No guesswork. Every artist knows exactly what they're working on.", icon: Crosshair },
  { step: "03", title: "Milestone Delivery", description: "Fixed review cycles. Structured revisions. Predictable handoffs. You always know where your project stands.", icon: Clock },
  { step: "04", title: "Final Integration", description: "Color pipeline integrity, render verification, delivery compliance. Every pixel checked before it leaves our studio.", icon: Shield },
];

const ServiceCard = ({ service, index, autoExpand }: { service: ServiceDetail; index: number; autoExpand?: boolean }) => {
  const [expanded, setExpanded] = useState(autoExpand || false);

  return (
    <motion.div
      key={service.id}
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden h-full flex flex-col">
        <div className={`h-1 w-full bg-gradient-to-r ${service.gradient}`} />
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg font-display">{service.title}</CardTitle>
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{service.description}</p>
        </CardHeader>

        <CardContent className="flex-1 pt-0 space-y-4">
          {/* Features */}
          <div className="space-y-1.5">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Check className="h-3.5 w-3.5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-3 pt-2 border-t border-border/30"
              >
                {/* Software */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Wrench className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-xs font-semibold text-foreground">Software & Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {service.software.map((sw, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-muted/80">
                        {sw}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Turnaround */}
                <div className="flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Turnaround:</span>
                  <span className="text-xs text-muted-foreground">{service.turnaround}</span>
                </div>

                {/* Team Size */}
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-foreground">Team:</span>
                  <span className="text-xs text-muted-foreground">{service.teamSize}</span>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Package className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-semibold text-foreground">Deliverables</span>
                  </div>
                  <div className="space-y-1">
                    {service.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-[10px] text-accent mt-0.5">▸</span>
                        <span className="text-xs text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Target className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-xs font-semibold text-foreground">Common Use Cases</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {service.useCases.map((uc, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-2 py-0.5 rounded-full border-border/50">
                        {uc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Details Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : 'Full Details'}
            <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </CardContent>

        <CardFooter className="pt-0">
          <Button asChild className="w-full rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 group/btn text-sm">
            <Link to="/pricing">Get Estimate <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Services = () => {
  const location = useLocation();
  const totalServices = serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0);
  const targetId = location.hash?.replace('#', '');

  useEffect(() => {
    if (targetId) {
      const timeout = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [targetId]);

  const structuredData = {
    "@context": "https://schema.org", "@type": "Service", "serviceType": "VFX & Post-Production Services",
    "provider": { "@type": "Organization", "name": "Fuke's Media LLP", "url": "https://fukesmedia.com" },
    "areaServed": "India",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet title="VFX & Post-Production Services | Fuke's Media LLP" description="Rotoscopy, matchmove, compositing, matte painting, editing, color grading, sound design, AI workflows, virtual production & more. Full-service VFX studio." keywords="VFX services India, rotoscopy, matchmove, compositing, matte painting, editing, color grading, sound design, AI VFX, virtual production" structuredData={structuredData} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-muted border-border/50 text-foreground rounded-full">
              <Crosshair className="w-4 h-4 mr-2 text-primary" />Full-Service Studio — {totalServices} Services
            </Badge>
          </motion.div>
          <motion.h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.1]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Every <span className="gradient-text">Department</span> You Need
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            From VFX and editing to color grading, sound design, and virtual production — structured pipeline execution across every discipline.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'Services', value: `${totalServices}+` },
              { label: 'Categories', value: `${serviceCategories.length}` },
              { label: 'Software Tools', value: '50+' },
              { label: 'In-House', value: '100%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat, catIndex) => (
        <SectionWrapper key={cat.category} id={cat.category.toLowerCase().replace(/\s+/g, '-')} variant={catIndex % 2 === 0 ? 'default' : 'gradient'} withDivider>
          <SectionHeading
            title={cat.category}
            subtitle={cat.description}
            badge={`${cat.services.length} Services`}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cat.services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} autoExpand={service.id === targetId} />
            ))}
          </div>
        </SectionWrapper>
      ))}

      {/* Process */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Process" subtitle="This is how we eliminate production chaos" badge="Your Differentiator" />
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 bottom-0 left-8 md:left-[calc(4rem-1px)] w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
          {processSteps.map((phase, index) => (
            <motion.div key={phase.step} className="flex mb-12 last:mb-0" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
              <div className="mr-8 relative">
                <motion.div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg relative z-10" whileHover={{ scale: 1.1 }}>
                  {phase.step}
                </motion.div>
              </div>
              <Card className="flex-1 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 flex items-center">
                    <phase.icon className="w-5 h-5 mr-2 text-primary" />{phase.title}
                  </h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="font-display text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Ready for a <span className="gradient-text">Real Breakdown</span>?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Get per-shot costing, pipeline mapping, and a production timeline — not a vague PDF.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-lg px-8 border-0 shadow-lg">
              <Link to="/contact">Request Project Breakdown <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/pricing">Shot-Level Calculator</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
