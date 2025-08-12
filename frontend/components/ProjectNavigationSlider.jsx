'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, MapPin, Building, Target } from 'lucide-react';

// Sample project data - you can replace this with your actual testimonials data
const projects = [
  {
    id: 1,
    title: "P5 Qusahwira Production Facilities Upgrade (ON PLOT)",
    location: "Abu Dhabi",
    year: "2025",
    category: "Oil & Gas",
    description: "Surface facilities expansion at Qusahwira Central Degassing Station",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    fullDescription: "As part of ADNOC Onshore's South East AiP5 development, the SE AiP5 (On-Plot) – Qusahwira Project aims to expand the surface facilities at Qusahwira Central Degassing Station (CDS) by 2027 to handle increased crude output from the Qusahwira and Mender fields. The expansion will boost Qusahwira CDS capacity to 103 MBOPD (sustainable) and 113 MBOPD (technical), supporting ADNOC's broader production goals in the South East region.",
    scope: "As part of this development, our scope includes carrying out excavation and underground detection surveys in the designated project area using appropriate, efficient, and cost-effective survey methods to meet the technical and operational requirements of the project.",
    objectives: [
      "Expand surface facilities at Qusahwira CDS",
      "Increase capacity to 103 MBOPD sustainable",
      "Support ADNOC's broader production goals",
      "Complete underground detection surveys"
    ]
  },
  {
    id: 2,
    title: "Offshore Platform Development",
    location: "Dubai",
    year: "2024",
    category: "Marine",
    description: "Advanced offshore drilling platform construction",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    fullDescription: "A comprehensive offshore platform development project focusing on advanced drilling technologies and sustainable marine operations. This project represents a significant milestone in offshore energy infrastructure development.",
    scope: "Our scope encompasses platform design, construction oversight, and environmental compliance monitoring throughout the development phase.",
    objectives: [
      "Develop advanced offshore drilling capabilities",
      "Implement sustainable marine operations",
      "Ensure environmental compliance",
      "Deliver cutting-edge infrastructure"
    ]
  },
  {
    id: 3,
    title: "Renewable Energy Integration",
    location: "Qatar",
    year: "2024",
    category: "Energy",
    description: "Solar and wind power integration project",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
    fullDescription: "Strategic renewable energy integration project combining solar and wind power solutions to reduce carbon footprint and enhance energy security in the Gulf region.",
    scope: "Implementation of hybrid renewable energy systems with grid integration and energy storage solutions.",
    objectives: [
      "Integrate solar and wind power systems",
      "Reduce carbon footprint by 40%",
      "Enhance energy security",
      "Implement smart grid technology"
    ]
  }
];

export default function ProjectNavigationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackToSlider = () => {
    setSelectedProject(null);
  };

  // Project Detail Page Component
  const ProjectDetailPage = ({ project }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={handleBackToSlider}
            className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-slate-800">Project Overview</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {project.fullDescription}
              </p>
              
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-semibold text-slate-800 mb-3">Our Scope</h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.scope}
                </p>
              </div>
            </div>

            {/* Project Objectives */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-slate-800">Key Objectives</h2>
              </div>
              <div className="grid gap-4">
                {project.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-slate-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Location</span>
                  <span className="font-semibold text-slate-800">{project.location}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Year</span>
                  <span className="font-semibold text-slate-800">{project.year}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Category</span>
                  <span className="font-semibold text-slate-800">{project.category}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-600">Status</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If a project is selected, show the detail page
  if (selectedProject) {
    return <ProjectDetailPage project={selectedProject} />;
  }

  // Main slider component
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-4 overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(252,211,77,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.05),transparent_50%)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-300/40 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-amber-200/60 rounded-full animate-bounce" />
      <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-yellow-200/50 rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-amber-300/40 rounded-full animate-bounce" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-6 
                         bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600
                         bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Discover our most innovative and impactful projects that shape the future
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, idx) => (
                <div key={project.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <div 
                      className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl 
                                  border border-yellow-200/50 hover:border-amber-300/70
                                  transition-all duration-500 hover:shadow-amber-200/40 hover:-translate-y-2
                                  cursor-pointer group"
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 bg-amber-400/90 backdrop-blur-sm text-white px-4 py-2 
                                        rounded-full text-sm font-medium shadow-lg">
                          {project.category}
                        </div>
                        
                        {/* Click Indicator */}
                        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-3 py-1 
                                        rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view details
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-8 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm">
                        <h3 className="font-bold text-2xl mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-yellow-200/80">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Year: {project.year}</span>
                          </div>
                          <div className="flex items-center gap-2 text-yellow-200/80">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Location: {project.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full 
                                          transform -translate-x-full group-hover:translate-x-0 transition-transform
                                          duration-1000 ease-out" />
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-300/10 to-amber-400/10 blur-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20
                       group bg-white/80 backdrop-blur-sm hover:bg-amber-400/90 text-slate-700 hover:text-white
                       p-3 rounded-full border border-yellow-200/60 hover:border-amber-400/80 transition-all duration-300 
                       hover:shadow-xl hover:shadow-amber-300/25"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20
                       group bg-white/80 backdrop-blur-sm hover:bg-amber-400/90 text-slate-700 hover:text-white
                       p-3 rounded-full border border-yellow-200/60 hover:border-amber-400/80 transition-all duration-300 
                       hover:shadow-xl hover:shadow-amber-300/25"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-amber-400 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}