export interface Redes {
  label: string;
  url: string;
  icon: string;
  color: string
}

export const REDES_MOCK: Redes[] =[
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/bunnacafeec/',
    icon: '/images/icons/instagram.svg',
    color: '#E4405F'
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/BunnaCafeEspecialidad',
    icon: '/images/icons/facebook.svg',
    color: '#1877F2'
  },
  {
    label: 'Pinterest',
    url: 'https://www.pinterest.com/bunnacoffeem/',
    icon: '/images/icons/pinterest.svg',
    color: '#E60023'
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@bunnacoffeemp',
    icon: '/images/icons/tiktok.svg',
    color: '#69C9D0'
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/@bunnaCoffe',
    icon: '/images/icons/youtube.svg',
    color: '#FF0000'
  },
  {
    label: 'WhatsApp',
    url: 'https://wa.link/tu_codigo',
    icon: '/images/icons/whatsapp.svg',
    color: '#25D366'
  }
]
