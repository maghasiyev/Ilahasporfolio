export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Graphic Design' | 'Illustrations' | 'Sketches';
  imageUrl: string;
  youtubeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
}

export interface SiteSettings {
  aboutText: string;
  resumeUrl: string;
  youtubeVideoId: string;
  contactEmail: string;
}
