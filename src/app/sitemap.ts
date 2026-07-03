import { MetadataRoute } from 'next';
import { getProjects, getBlogs } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Core pages
  const routes = [
    '',
    '/about',
    '/portfolio',
    '/services',
    '/technologies',
    '/process',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const [projects, blogs] = await Promise.all([
      getProjects(),
      getBlogs(),
    ]);

    const projectRoutes = (projects || []).map((project: any) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const blogRoutes = (blogs || []).map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
  } catch (e) {
    return routes;
  }
}
