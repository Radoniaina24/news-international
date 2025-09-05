import { Article, Author } from '../types';
import { categories } from './categories';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    bio: 'Correspondante internationale avec 15 ans d\'expérience en journalisme politique',
    avatar: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=200',
    role: 'Correspondante Politique',
    articlesCount: 127,
    social: {
      twitter: '@mariedubois',
      linkedin: 'marie-dubois-journalist',
      email: 'marie.dubois@newsglobe.com'
    }
  },
  {
    id: '2',
    name: 'Jean Martin',
    bio: 'Expert en économie internationale et marchés financiers',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200',
    role: 'Analyste Économique',
    articlesCount: 89,
    social: {
      twitter: '@jeanmartin_eco',
      email: 'jean.martin@newsglobe.com'
    }
  },
  {
    id: '3',
    name: 'Sophie Chen',
    bio: 'Journaliste technologie et innovation, spécialiste IA',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    role: 'Journaliste Tech',
    articlesCount: 156,
    social: {
      twitter: '@sophiechen_tech',
      linkedin: 'sophie-chen-tech',
      email: 'sophie.chen@newsglobe.com'
    }
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Les négociations climatiques de la COP28 atteignent un tournant décisif',
    excerpt: 'Les délégations mondiales se rapprochent d\'un accord historique sur la transition énergétique...',
    content: '',
    category: categories[6],
    author: authors[0],
    publishedAt: new Date('2024-01-15'),
    readTime: 8,
    views: 12540,
    likes: 342,
    imageUrl: 'https://images.pexels.com/photos/9324300/pexels-photo-9324300.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['climat', 'COP28', 'énergie', 'international'],
    country: 'International',
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'L\'intelligence artificielle révolutionne le secteur de la santé',
    excerpt: 'Une nouvelle génération d\'outils IA promet de transformer le diagnostic médical...',
    content: '',
    category: categories[3],
    author: authors[2],
    publishedAt: new Date('2024-01-14'),
    readTime: 6,
    views: 8975,
    likes: 187,
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['IA', 'santé', 'innovation', 'médecine'],
    country: 'USA',
    featured: true,
    trending: false
  },
  {
    id: '3',
    title: 'Les marchés européens réagissent aux nouvelles mesures de la BCE',
    excerpt: 'La décision de maintenir les taux d\'intérêt influence les indices boursiers...',
    content: '',
    category: categories[1],
    author: authors[1],
    publishedAt: new Date('2024-01-13'),
    readTime: 5,
    views: 6543,
    likes: 98,
    imageUrl: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['BCE', 'économie', 'marchés', 'Europe'],
    country: 'Europe',
    featured: false,
    trending: true
  },
  {
    id: '4',
    title: 'Championnat du Monde de Football : Les qualifications s\'intensifient',
    excerpt: 'Les équipes nationales se battent pour décrocher leur billet vers la compétition...',
    content: '',
    category: categories[2],
    author: authors[0],
    publishedAt: new Date('2024-01-12'),
    readTime: 4,
    views: 15678,
    likes: 567,
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['football', 'coupe du monde', 'sport', 'qualifications'],
    country: 'International',
    featured: false,
    trending: true
  },
  {
    id: '5',
    title: 'L\'IA générative transforme l\'industrie créative mondiale',
    excerpt: 'Les outils d\'intelligence artificielle révolutionnent la création de contenu, du design graphique à la production musicale...',
    content: '',
    category: categories[3],
    author: authors[2],
    publishedAt: new Date('2024-01-16'),
    readTime: 7,
    views: 11234,
    likes: 289,
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['IA générative', 'créativité', 'design', 'innovation'],
    country: 'International',
    featured: false,
    trending: true
  },
  {
    id: '6',
    title: 'La cybersécurité face aux nouvelles menaces quantiques',
    excerpt: 'Les experts en sécurité se préparent à l\'ère post-quantique avec de nouveaux protocoles de chiffrement...',
    content: '',
    category: categories[3],
    author: authors[2],
    publishedAt: new Date('2024-01-11'),
    readTime: 6,
    views: 7892,
    likes: 156,
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['cybersécurité', 'quantique', 'chiffrement', 'sécurité'],
    country: 'International',
    featured: false,
    trending: false
  },
  {
    id: '7',
    title: 'Les startups françaises lèvent des fonds records en 2024',
    excerpt: 'L\'écosystème tech français bat tous les records avec plus de 8 milliards d\'euros levés au premier trimestre...',
    content: '',
    category: categories[3],
    author: authors[2],
    publishedAt: new Date('2024-01-10'),
    readTime: 5,
    views: 9456,
    likes: 203,
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['startups', 'financement', 'France', 'écosystème'],
    country: 'France',
    featured: false,
    trending: false
  }
];