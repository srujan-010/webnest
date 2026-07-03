"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Container, Section } from "../ui/Section";
import { useState, useEffect } from "react";
import { team as defaultTeam } from "@/lib/fallbackData";
import { getTeam } from "@/services/api";

export function TeamSection() {
  const [team, setTeam] = useState<any[]>(defaultTeam);

  useEffect(() => {
    getTeam().then(data => {
      if (data && data.length > 0) setTeam(data);
    });
  }, []);

  return (
    <Section background="alternate" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4"
            >
              The minds behind <br />
              <span className="text-brand-600">the magic.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-ink-600"
            >
              A collective of senior engineers, designers, and strategists dedicated to pushing the boundaries of the web.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
                {/* Decorative border circle */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${member.color} blur-[2px] opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500`} />
                {/* Colored Initial Monogram */}
                <div className={`absolute inset-1 rounded-full bg-gradient-to-tr ${member.color} z-10 flex items-center justify-center overflow-hidden`}>
                   <span className="text-5xl font-display font-black text-white/90 drop-shadow-md">
                     {member.name.split(' ').map(n => n[0]).join('')}
                   </span>
                </div>
                
                {/* Social Links Reveal */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink-900/40 rounded-full backdrop-blur-sm">
                  {member.linkedIn && (
                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink-900 hover:text-brand-600 hover:scale-110 transition-all">
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink-900 hover:text-brand-600 hover:scale-110 transition-all">
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink-900 hover:text-brand-600 hover:scale-110 transition-all">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-ink-900 mb-1 font-display">{member.name}</h3>
              <p className="text-brand-600 font-medium mb-4">{member.role}</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-surface-0 border border-gray-200 rounded-full text-xs font-medium text-ink-600">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
