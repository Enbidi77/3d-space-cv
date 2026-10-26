'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Sparkles, Box, Briefcase, Search } from 'lucide-react';
import { skillsData, skillCategoriesData, SkillCategory } from '@space/portfolio-content';
import { GlassPanel, Badge, Tabs } from '@space/ui';

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const tabItems = [
    { id: 'all', label: 'All Constellations', badge: skillsData.length },
    ...skillCategoriesData.map((cat) => ({
      id: cat.id,
      label: cat.name,
      badge: skillsData.filter((s) => s.category === cat.id).length,
    })),
  ];

  const filteredSkills = React.useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Galaxy View</span>
        </Link>
        <Badge variant="indigo" size="sm">
          Sector: Technology Constellations
        </Badge>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Interactive Matrix
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Expertise
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
          Structured into 7 clear constellations. Grounded strictly in production enterprise implementations and microservices architectures.
        </p>
      </div>

      {/* Controls: Category Tabs & Search Bar */}
      <div className="flex flex-col gap-4 mb-8">
        <Tabs
          items={tabItems}
          activeId={selectedCategory}
          onChange={setSelectedCategory}
        />

        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            suppressHydrationWarning
            placeholder="Search technologies, frameworks, databases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          const categoryInfo = skillCategoriesData.find((c) => c.id === skill.category);

          return (
            <GlassPanel
              key={skill.id}
              variant="default"
              blur="md"
              className="p-5 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: categoryInfo?.constellationColor || '#818cf8' }}
                    />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {categoryInfo?.name}
                    </span>
                  </div>
                  {skill.featured && (
                    <Badge variant="cyan" size="sm">
                      Core Stack
                    </Badge>
                  )}
                </div>

                <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {skill.name}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Related Project Connections */}
              {skill.relatedProjectIds.length > 0 && (
                <div className="pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Box className="w-3 h-3 text-cyan-400" />
                  <span>Used in:</span>
                  <div className="flex flex-wrap gap-1">
                    {skill.relatedProjectIds.map((projId) => (
                      <Link
                        key={projId}
                        href="/projects"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        {projId}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}

