const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getStats = async () => {
  try {
    const res = await fetch(`${API_URL}/stats`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
};

export const getTestimonials = async () => {
  try {
    const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getHeroes = async () => {
  try {
    const res = await fetch(`${API_URL}/hero`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getShowcaseSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/hero-showcase-settings`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getShowcaseItems = async () => {
  try {
    const res = await fetch(`${API_URL}/hero-showcase-items`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getTechStack = async () => {
  try {
    const res = await fetch(`${API_URL}/techstack`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getTeam = async () => {
  try {
    const res = await fetch(`${API_URL}/team`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getBlogs = async () => {
  try {
    const res = await fetch(`${API_URL}/blog`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getFAQs = async () => {
  try {
    const res = await fetch(`${API_URL}/faq`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getProcessSteps = async () => {
  try {
    const res = await fetch(`${API_URL}/process`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getNavigation = async () => {
  try {
    const res = await fetch(`${API_URL}/navigation`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export const getFooterContent = async () => {
  try {
    const res = await fetch(`${API_URL}/footer`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export const getWhyUsReasons = async () => {
  try {
    const res = await fetch(`${API_URL}/why-us`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

export const getSiteSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
};

export const getAboutPage = async () => {
  try {
    const res = await fetch(`${API_URL}/about-page`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
};

export const getAboutPageDraft = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/about-page/draft`, { 
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
};
