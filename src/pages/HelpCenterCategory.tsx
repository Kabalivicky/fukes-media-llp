
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryPage from '@/components/HelpCenter/CategoryPage';
import { useParams } from 'react-router-dom';

const HelpCenterCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Mock data for the "Imaging" category
  const imagingData = {
    title: "Imaging",
    description: "Camera requirements, image capture, color workflows and more",
    sections: [
      {
        title: "Cameras + Image Capture",
        expandable: true,
        links: [
          { title: "Cameras & Image Capture: Requirements and Best Practices", url: "#" },
          { title: "Dailies: Best Practices", url: "#" },
          { title: "HDR On-Set Monitoring: Considerations & Best Practices", url: "#" },
          { title: "On-set Digital Imaging and Data Management: Roles & Responsibilities", url: "#" },
          { title: "Non-Approved Cameras - Recommended Settings & Best Practices", url: "#" },
          { title: "Best Practices: Multicam Production at Fuke's Media", url: "#" }
        ]
      },
      {
        title: "Ident + Credits",
        expandable: true,
        links: [
          { title: "Overview of the Fuke's Media Idents", url: "#" },
          { title: "Fuke's Media Credit Incorporation Guidelines", url: "#" }
        ]
      },
      {
        title: "Image + Color Workflows",
        expandable: true,
        links: [
          { title: "Framing & Working Resolution Calculator: User Guide", url: "#" },
          { title: "Working Resolution: Considerations & Best Practices", url: "#" },
          { title: "Dolby Vision Metadata Overview", url: "#" },
          { title: "Remote Color Grading and Reviews", url: "#" },
          { title: "What is Color Management?", url: "#" },
          { title: "iPad Pro For Remote Color Review", url: "#" }
        ]
      }
    ]
  };
  
  // Mock data for "Sound" category
  const soundData = {
    title: "Sound",
    description: "Production sound recording, music and effects, mix and delivery",
    sections: [
      {
        title: "Production Sound Recording",
        expandable: true,
        links: [
          { title: "Live Action - Production Sound Best Practices", url: "#" },
          { title: "Animation FEATURES - Production Dialogue Recording Best Practices", url: "#" },
          { title: "Animation SERIES - Production Dialogue Recording Specifications", url: "#" }
        ]
      },
      {
        title: "Music & Effects",
        expandable: true,
        links: [
          { title: "M&E Creation Tutorial - Video Walkthrough", url: "#" },
          { title: "M&E Creation & Delivery Guidelines", url: "#" },
          { title: "M&E Creation and Delivery Guidelines for Nonfiction", url: "#" }
        ]
      },
      {
        title: "Mix & Delivery",
        expandable: true,
        links: [
          { title: "BWAV ADM Creation Guidelines", url: "#" },
          { title: "Fuke's Media Sound Mix Specifications & Best Practices v1.6", url: "#" },
          { title: "Fuke's Media Dolby Atmos Home Mix Deliverable Requirements v2.3", url: "#" },
          { title: "Asset Naming: Sound Mastering and Music Archival", url: "#" }
        ]
      }
    ]
  };
  
  // Mock data for "Delivery" category
  const deliveryData = {
    title: "Delivery",
    description: "Specifications, best practices, and delivery tools & procedures",
    sections: [
      {
        title: "Delivery Specifications",
        expandable: false,
        isPlus: true,
        subsections: [
          {
            title: "Branded Delivery Specifications",
            isPlus: true,
          },
          {
            title: "Non-Branded Delivery Specifications",
            isPlus: true,
          }
        ],
        links: [
          { title: "Near Field 2.0 Stereo Delivery Specifications and Guidelines for Titles Mixed Natively in 2.0", url: "#" },
          { title: "Non Graded Archival Master (NAM) Specifications", url: "#" },
          { title: "Situational VFX Delivery Specifications", url: "#" },
          { title: "Ad Creative Source Specification", url: "#" },
          { title: "Digital Cinema Package (DCP): Specifications & Requirements", url: "#" }
        ]
      },
      {
        title: "Delivery Best Practices",
        expandable: false,
        isPlus: true,
        subsections: [
          {
            title: "IMF Best Practices",
            isPlus: true,
          }
        ],
        links: [
          { title: "Digital Cinema Package (DCP): Best Practices", url: "#" },
          { title: "Non-Graded Archival Master (NAM): Best Practices", url: "#" },
          { title: "Picture Archival Assets: Folder Structure and File Naming Convention", url: "#" }
        ]
      },
      {
        title: "Fuke's Media Delivery Tools & Procedures",
        expandable: false,
        links: [
          { title: "Content Hub - Work In Progress + Archive Files", url: "#", isPlus: true },
          { title: "Starship - User Onboarding & Account Management", url: "#", isPlus: true },
          { title: "Backlog - Streaming Assets", url: "#", isPlus: true },
          { title: "Snowball", url: "#", isPlus: true },
          { title: "Iron Mountain - Physical Shipments", url: "#", isPlus: true },
          { title: "Studio Logistics: Standard Operating Procedures (SOPs)", url: "#" },
          { title: "Welcome to the Fuke's Media Aspera on Cloud Account", url: "#" }
        ]
      }
    ]
  };
  
  // Use categoryId to determine which data to display
  let categoryData;
  switch(categoryId) {
    case 'imaging':
      categoryData = imagingData;
      break;
    case 'sound':
      categoryData = soundData;
      break;
    case 'delivery':
      categoryData = deliveryData;
      break;
    default:
      categoryData = imagingData; // Default to imaging if no match
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero banner */}
      <section className="pt-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center">
            <div className="breadcrumbs text-sm mb-4">
              <span>Fuke's Media | Partner Help Center — {categoryData.title}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{categoryData.title}</h1>
        </div>
      </section>
      
      {/* Category content */}
      <section className="bg-background">
        <CategoryPage categoryData={categoryData} />
      </section>
      
      <Footer />
    </div>
  );
};

export default HelpCenterCategory;
