"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

import { getBlogs } from "@/services/api";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getBlogs().then(data => {
      if (data) setPosts(data);
    });
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-surface-0">
      <Section className="pb-12">
        <Container>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-8 uppercase tracking-wider"
            >
              Insights & Engineering
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-6 font-display"
            >
              The <span className="text-gradient">WebNest</span> Blog.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-600 max-w-2xl leading-relaxed mb-12"
            >
              Deep dives into modern web development, UI/UX design trends, technical SEO strategies, and agency life.
            </motion.p>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {posts.map((post: any, index: number) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden bg-gray-100 block">
                   <div className="absolute inset-0 bg-ink-900/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                   <img 
                     src={post.coverImage || post.image || "/blog/placeholder.png"} 
                     alt={post.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%]"
                   />
                </Link>
                <div className="p-8 flex flex-col flex-1">
                   <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">{post.category || "Insight"}</span>
                   </div>
                   <Link href={`/blog/${post.slug}`}>
                     <h2 className="text-2xl font-bold font-display text-ink-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                       {post.title}
                     </h2>
                   </Link>
                   <p className="text-ink-600 mb-6 line-clamp-3 leading-relaxed">
                     {post.excerpt}
                   </p>
                   
                   <div className="mt-auto pt-6 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm font-medium text-ink-500">
                         <span className="flex items-center gap-1.5">
                           <User className="w-4 h-4" /> {typeof post.author === "object" ? post.author.name : post.author || "WebNest Team"}
                         </span>
                         <span className="flex items-center gap-1.5">
                           <Calendar className="w-4 h-4" /> {post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "")}
                         </span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-brand-600 hover:text-brand-700 font-bold text-sm flex items-center gap-1 group/btn">
                         Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                   </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
