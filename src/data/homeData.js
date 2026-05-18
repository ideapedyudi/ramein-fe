import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'
import banner3 from '../assets/banner3.png'
import banner4 from '../assets/banner4.png'

import eventtest from '../assets/eventtest.png'

export const navMenus = [
  { label: 'Beranda', to: '/home' },
  { label: 'Jelajah', to: '/jelajah' },
  { label: 'Untuk Kamu', to: '/untuk-kamu' },
  { label: 'Buat Event', to: '/buat-event' },
]

export const heroSlides = [
  {
    id: 'hero-1',
    image: banner1,
  },
  {
    id: 'hero-2',
    image: banner2,
  },
  {
    id: 'hero-3',
    image: banner3,
  },
  {
    id: 'hero-4',
    image: banner4,
  },
]

export const trendingEvents = [
  {
    id: 'trend-1',
    title: 'Java Jazz Festival 2026',
    date: '15 Mei 2026',
    price: 'Rp750.000',
    organizer: 'Java Festival Production',
    organizerInitial: 'J',
    image: eventtest
  },
  {
    id: 'trend-2',
    title: 'Mobile Legends Championship',
    date: '20 Mei 2026',
    price: 'Rp150.000',
    organizer: 'Moonton Indonesia',
    organizerInitial: 'M',
    image:eventtest
  },
  {
    id: 'trend-3',
    title: 'UI/UX Design Workshop',
    date: '25 Mei 2026',
    price: 'Gratis',
    organizer: 'Design Community ID',
    organizerInitial: 'D',
    image:eventtest
  },
  {
    id: 'trend-4',
    title: 'Soundrenaline Festival',
    date: '1 Jun 2026',
    price: 'Rp500.000',
    organizer: 'Soundrenaline Indonesia',
    organizerInitial: 'S',
    image:eventtest
  },
]

export const categories = [
  { id: 'cat-1', name: 'Konser', icon: 'music', from: '#ff1f8f', to: '#f9427f' },
  { id: 'cat-2', name: 'Seminar', icon: 'seminar', from: '#2384ff', to: '#2ab5ff' },
  { id: 'cat-3', name: 'Esports', icon: 'esports', from: '#ff8a00', to: '#ffb000' },
  { id: 'cat-4', name: 'Teknologi', icon: 'technology', from: '#6153f9', to: '#9747ff' },
  { id: 'cat-5', name: 'Edukasi', icon: 'education', from: '#0cc96b', to: '#02af73' },
  { id: 'cat-6', name: 'Bisnis', icon: 'business', from: '#36485f', to: '#1f2e48' },
  { id: 'cat-7', name: 'Kreatif', icon: 'creative', from: '#ffbf00', to: '#ff8a00' },
  { id: 'cat-8', name: 'Olahraga', icon: 'sport', from: '#ff295a', to: '#ff2a9a' },
  { id: 'cat-9', name: 'Kesehatan', icon: 'health', from: '#1ac7c2', to: '#14b2d6' },
  { id: 'cat-10', name: 'Lifestyle', icon: 'lifestyle', from: '#ffb200', to: '#ff9f00' },
  { id: 'cat-11', name: 'Investasi', icon: 'investment', from: '#03b15f', to: '#009f57' },
  { id: 'cat-12', name: 'Spiritual', icon: 'spiritual', from: '#8f42ff', to: '#7a2dff' },
]

export const recommendedEvents = [
  {
    id: 'rec-1',
    title: 'Tech Startup Summit 2026',
    date: '10 Jun 2026',
    price: 'Rp2.500.000',
    organizer: 'Startup Indonesia',
    organizerInitial: 'S',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'rec-2',
    title: 'Jakarta Street Food Festival',
    date: '15 Jun 2026',
    price: 'Rp50.000',
    organizer: 'Food Festival ID',
    organizerInitial: 'F',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'rec-3',
    title: 'VALORANT Champions Tour',
    date: '22 Jun 2026',
    price: 'Rp200.000',
    organizer: 'Riot Games Indonesia',
    organizerInitial: 'R',
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80',
  },
]

export const regions = [
  {
    id: 'region-1',
    name: 'SUMATERA',
    count: '250+ Events',
    image:
      'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-2',
    name: 'JABODETABEK',
    count: '450+ Events',
    image:
      'https://images.unsplash.com/photo-1573980958277-4e6f52f7b1f8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-3',
    name: 'JAWA BARAT',
    count: '280+ Events',
    image:
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-4',
    name: 'DIY-JATENG',
    count: '220+ Events',
    image:
      'https://images.unsplash.com/photo-1496588152823-e54aa8e0f4f3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-5',
    name: 'JAWA TIMUR',
    count: '310+ Events',
    image:
      'https://images.unsplash.com/photo-1598401471359-7f52b2e7d1c8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-6',
    name: 'KALIMANTAN',
    count: '140+ Events',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-7',
    name: 'SULAWESI',
    count: '180+ Events',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'region-8',
    name: 'INDONESIA TIMUR',
    count: '120+ Events',
    image:
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1000&q=80',
  },
]
