// Import new movie poster images
import abbaraImg from '@/assets/projects/abbara-new.jpg';
import acharyaImg from '@/assets/projects/acharya-new.jpg';
import adipurushImg from '@/assets/projects/adipurush-new.png';
import agathiyaaImg from '@/assets/projects/agathiyaa.jpg';
import annapooraniImg from '@/assets/projects/annapoorani.png';
import badMannersImg from '@/assets/projects/bad-manners.jpg';
import bhagavanthKesariImg from '@/assets/projects/bhagavanth-kesari.jpg';
import bheemaImg from '@/assets/projects/bheema-new.jpg';
import byTwoLoveImg from '@/assets/projects/by-two-love.jpg';
import by2loveImg from '@/assets/projects/by2love.jpg';
import chooMantarImg from '@/assets/projects/choo-mantar.jpg';
import cobraImg from '@/assets/projects/cobra-new.jpg';
import dilmaarImg from '@/assets/projects/dilmaar.jpg';
import ekVillainReturnsImg from '@/assets/projects/ek-villain-returns-new.jpg';
import headBushImg from '@/assets/projects/head-bush.jpg';
import indianImg from '@/assets/projects/indian-2-new.png';
import jailerImg from '@/assets/projects/jailer-new.jpg';
import jawanImg from '@/assets/projects/jawan-new.png';
import kalkiImg from '@/assets/projects/kalki.jpg';
import kalki2898AdImg from '@/assets/projects/kalki-2898-ad-new.png';
import kdImg from '@/assets/projects/kd.jpg';
import kgfChapter2Img from '@/assets/projects/kgf-chapter-2-new.jpg';
import kgf2Img from '@/assets/projects/kgf2.jpg';
import kickImg from '@/assets/projects/kick.png';
import kisiKaBhaiImg from '@/assets/projects/kisi-ka-bhai.jpg';
import kushiImg from '@/assets/projects/kushi.jpg';
import leoImg from '@/assets/projects/leo-new.jpg';
import leoAltImg from '@/assets/projects/leo-alt.jpg';
import mafiaImg from '@/assets/projects/mafia.png';
import martinImg from '@/assets/projects/martin.png';
import pushpaImg from '@/assets/projects/pushpa.jpg';
import salaarImg from '@/assets/projects/salaar.jpg';
import salaarAltImg from '@/assets/projects/salaar-alt.jpg';
import thalaiviImg from '@/assets/projects/thalaivi.png';
import uiImg from '@/assets/projects/ui.png';
import uiAltImg from '@/assets/projects/ui-alt.png';
import vikramImg from '@/assets/projects/vikram.jpg';

export interface Project {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: string;
  rating: number;
  description: string;
  director: string;
  cast: string[];
  status: 'completed' | 'in-production' | 'upcoming';
  budget: string;
  role: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Kalki 2898 AD',
    poster: kalki2898AdImg,
    genre: 'Sci-Fi Epic',
    year: '2024',
    rating: 9.1,
    description: 'A groundbreaking sci-fi epic featuring cutting-edge VFX and world-building on an unprecedented scale.',
    director: 'Nag Ashwin',
    cast: ['Prabhas', 'Deepika Padukone', 'Amitabh Bachchan', 'Kamal Haasan'],
    status: 'completed',
    budget: '₹600 Crores',
    role: 'Complete VFX & Post-Production'
  },
  {
    id: '2',
    title: 'Salaar',
    poster: salaarImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.9,
    description: 'High-octane action sequences with spectacular VFX choreography and dynamic cinematography.',
    director: 'Prashanth Neel',
    cast: ['Prabhas', 'Prithviraj Sukumaran', 'Shruti Haasan'],
    status: 'completed',
    budget: '₹150 Crores',
    role: 'Action VFX & Compositing'
  },
  {
    id: '3',
    title: 'Pushpa: The Rise',
    poster: pushpaImg,
    genre: 'Action Drama',
    year: '2021',
    rating: 8.7,
    description: 'Intense action drama with detailed character VFX and environmental storytelling.',
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil'],
    status: 'completed',
    budget: '₹175 Crores',
    role: 'Environment VFX & Color Grading'
  },
  {
    id: '4',
    title: 'KGF Chapter 2',
    poster: kgfChapter2Img,
    genre: 'Period Action',
    year: '2022',
    rating: 9.0,
    description: 'Epic period action with massive set extensions and explosive VFX sequences.',
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon', 'Srinidhi Shetty'],
    status: 'completed',
    budget: '₹100 Crores',
    role: 'Set Extensions & Explosion VFX'
  },
  {
    id: '5',
    title: 'Vikram',
    poster: vikramImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 8.8,
    description: 'Sophisticated action thriller with precise VFX integration and technical excellence.',
    director: 'Lokesh Kanagaraj',
    cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
    status: 'completed',
    budget: '₹120 Crores',
    role: 'Action Sequences & Digital Enhancement'
  },
  {
    id: '6',
    title: 'Leo',
    poster: leoImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.5,
    description: 'Stylistic action thriller with innovative VFX approaches and dynamic visual storytelling.',
    director: 'Lokesh Kanagaraj',
    cast: ['Vijay', 'Sanjay Dutt', 'Trisha', 'Arjun Sarja'],
    status: 'completed',
    budget: '₹200 Crores',
    role: 'Complete Post-Production Pipeline'
  },
  {
    id: '7',
    title: 'Jailer',
    poster: jailerImg,
    genre: 'Action Comedy',
    year: '2023',
    rating: 8.9,
    description: 'Blockbuster action comedy with seamless VFX integration and crowd-pleasing sequences.',
    director: 'Nelson Dilipkumar',
    cast: ['Rajinikanth', 'Mohanlal', 'Tamannaah', 'Shivarajkumar'],
    status: 'completed',
    budget: '₹180 Crores',
    role: 'Complete Post-Production & VFX'
  },
  {
    id: '8',
    title: 'Jawan',
    poster: jawanImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.6,
    description: 'High-concept action thriller with elaborate VFX sequences and visual spectacle.',
    director: 'Atlee',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
    status: 'completed',
    budget: '₹300 Crores',
    role: 'VFX Supervision & Digital Effects'
  },
  {
    id: '9',
    title: 'UI',
    poster: uiImg,
    genre: 'Thriller',
    year: '2024',
    rating: 8.2,
    description: 'Psychological thriller with innovative visual effects and atmospheric cinematography.',
    director: 'Upendra',
    cast: ['Upendra', 'Reeshma Nanaiah', 'Murali Sharma'],
    status: 'completed',
    budget: '₹25 Crores',
    role: 'Atmospheric VFX & Post-Production'
  },
  {
    id: '10',
    title: 'Indian 2',
    poster: indianImg,
    genre: 'Action Drama',
    year: '2024',
    rating: 7.8,
    description: 'Sequel to the classic vigilante action drama with modern VFX techniques.',
    director: 'Shankar',
    cast: ['Kamal Haasan', 'Siddharth', 'Rakul Preet Singh'],
    status: 'completed',
    budget: '₹250 Crores',
    role: 'Digital Makeup & Action VFX'
  },
  {
    id: '11',
    title: 'Acharya',
    poster: acharyaImg,
    genre: 'Action Drama',
    year: '2022',
    rating: 7.8,
    description: 'Powerful action film featuring extensive VFX sequences and cinematic excellence.',
    director: 'Koratala Siva',
    cast: ['Chiranjeevi', 'Ram Charan', 'Pooja Hegde'],
    status: 'completed',
    budget: '₹140 Crores',
    role: 'Visual Effects & Color Grading'
  },
  {
    id: '12',
    title: 'Adipurush',
    poster: adipurushImg,
    genre: 'Mythology Epic',
    year: '2023',
    rating: 6.5,
    description: 'Epic mythological tale brought to life with groundbreaking VFX and digital environments.',
    director: 'Om Raut',
    cast: ['Prabhas', 'Saif Ali Khan', 'Kriti Sanon'],
    status: 'completed',
    budget: '₹500 Crores',
    role: 'Digital Environment & Character VFX'
  },
  {
    id: '13',
    title: 'Bheema',
    poster: bheemaImg,
    genre: 'Action Drama',
    year: '2024',
    rating: 8.1,
    description: 'Intense action drama with powerful VFX storytelling and emotional depth.',
    director: 'Duniya Vijay',
    cast: ['Duniya Vijay', 'Priya Satish', 'Achyuth Kumar'],
    status: 'completed',
    budget: '₹35 Crores',
    role: 'Action Sequences & Post-Production'
  },
  {
    id: '14',
    title: 'Cobra',
    poster: cobraImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.9,
    description: 'Stylish action thriller with sophisticated VFX work and technical precision.',
    director: 'R. Ajay Gnanamuthu',
    cast: ['Vikram', 'Srinidhi Shetty', 'Irfan Pathan'],
    status: 'completed',
    budget: '₹85 Crores',
    role: 'Character VFX & Digital Enhancement'
  },
  {
    id: '15',
    title: 'Ek Villain Returns',
    poster: ekVillainReturnsImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.4,
    description: 'Sequel to the hit thriller with enhanced VFX and dynamic action sequences.',
    director: 'Mohit Suri',
    cast: ['John Abraham', 'Arjun Kapoor', 'Disha Patani', 'Tara Sutaria'],
    status: 'completed',
    budget: '₹75 Crores',
    role: 'Action VFX & Compositing'
  },
  {
    id: '16',
    title: 'Kisi Ka Bhai Kisi Ki Jaan',
    poster: kisiKaBhaiImg,
    genre: 'Action Drama',
    year: '2023',
    rating: 7.2,
    description: 'Mass entertainer with spectacular action VFX and family drama elements.',
    director: 'Farhad Samji',
    cast: ['Salman Khan', 'Pooja Hegde', 'Venkatesh'],
    status: 'completed',
    budget: '₹150 Crores',
    role: 'Mass Action VFX & Spectacle'
  },
  {
    id: '17',
    title: 'Bhagavanth Kesari',
    poster: bhagavanthKesariImg,
    genre: 'Action Drama',
    year: '2023',
    rating: 8.0,
    description: 'Action-packed drama with emotional depth and technical VFX excellence.',
    director: 'Anil Ravipudi',
    cast: ['Nandamuri Balakrishna', 'Kajal Aggarwal', 'Sreeleela'],
    status: 'completed',
    budget: '₹80 Crores',
    role: 'Action Choreography VFX'
  },
  {
    id: '18',
    title: 'Abbara',
    poster: abbaraImg,
    genre: 'Action Drama',
    year: '2023',
    rating: 8.2,
    description: 'Captivating action drama showcasing expertise in visual storytelling and post-production.',
    director: 'Pavan Sadineni',
    cast: ['Karthikeya', 'Ruhani Sharma', 'Harsha Vardhan'],
    status: 'completed',
    budget: '₹15 Crores',
    role: 'Complete Post-Production & VFX'
  },
  {
    id: '19',
    title: 'Kick',
    poster: kickImg,
    genre: 'Action Comedy',
    year: '2024',
    rating: 7.9,
    description: 'High-energy action comedy with innovative VFX and entertainment value.',
    director: 'Pawan Kalyan',
    cast: ['Pawan Kalyan', 'Ravi Teja', 'Sai Pallavi'],
    status: 'completed',
    budget: '₹65 Crores',
    role: 'Comedy Action VFX'
  },
  {
    id: '20',
    title: 'Martin',
    poster: martinImg,
    genre: 'Action Thriller',
    year: '2024',
    rating: 8.3,
    description: 'Intense action thriller with cutting-edge VFX and gripping narrative.',
    director: 'A. P. Arjun',
    cast: ['Dhruva Sarja', 'Vaibhavi Shandilya', 'Anveshi Jain'],
    status: 'completed',
    budget: '₹50 Crores',
    role: 'Thriller VFX & Post-Production'
  },
  {
    id: '21',
    title: 'Mafia',
    poster: mafiaImg,
    genre: 'Crime Thriller',
    year: '2024',
    rating: 8.1,
    description: 'Dark crime thriller with sophisticated VFX work and atmospheric visuals.',
    director: 'Karthick Naren',
    cast: ['Arun Vijay', 'Prasanna', 'Priya Bhavani Shankar'],
    status: 'completed',
    budget: '₹40 Crores',
    role: 'Crime Scene VFX & Enhancement'
  },
  {
    id: '22',
    title: 'KD - The Devil',
    poster: kdImg,
    genre: 'Period Action',
    year: '2024',
    rating: 8.4,
    description: 'Period action drama with elaborate set pieces and historical VFX recreation.',
    director: 'Prem',
    cast: ['Dhruva Sarja', 'V. Ravichandran', 'Ramesh Aravind'],
    status: 'completed',
    budget: '₹70 Crores',
    role: 'Period VFX & Set Extensions'
  },
  {
    id: '23',
    title: 'Kushi',
    poster: kushiImg,
    genre: 'Romantic Drama',
    year: '2023',
    rating: 7.8,
    description: 'Romantic drama with beautiful VFX enhancement and emotional storytelling.',
    director: 'Shiva Nirvana',
    cast: ['Vijay Deverakonda', 'Samantha Ruth Prabhu', 'Jayaram'],
    status: 'completed',
    budget: '₹90 Crores',
    role: 'Romantic Enhancement VFX'
  },
  {
    id: '24',
    title: 'Thalaivi',
    poster: thalaiviImg,
    genre: 'Biographical Drama',
    year: '2021',
    rating: 8.0,
    description: 'Biographical drama with period-accurate VFX and character transformations.',
    director: 'A. L. Vijay',
    cast: ['Kangana Ranaut', 'Arvind Swami', 'Nassar'],
    status: 'completed',
    budget: '₹100 Crores',
    role: 'Period Recreation & Digital Makeup'
  }
];