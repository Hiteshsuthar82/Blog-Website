import React from "react";
import { 
  Rocket, 
  Users, 
  Code, 
  Database, 
  Shield, 
  Terminal, 
  Globe, 
  Layers 
} from 'lucide-react';

function Home() {
  const sections = [
    {
      icon: <Rocket className="w-16 h-16 text-blue-500" />,
      title: "Accelerate Your Development",
      description: "Our comprehensive starter kit provides everything you need to launch your project quickly and efficiently. From pre-configured tools to best-practice templates, we've got you covered.",
      background: "bg-blue-50"
    },
    {
      icon: <Code className="w-16 h-16 text-green-500" />,
      title: "Modern Technology Stack",
      description: "Leverage cutting-edge technologies including React 18, TypeScript, Tailwind CSS, and state-of-the-art build tools. Our stack is designed for maximum performance and developer experience.",
      background: "bg-green-50"
    },
    {
      icon: <Database className="w-16 h-16 text-purple-500" />,
      title: "Scalable Architecture",
      description: "Built with enterprise-grade architecture principles. Modular design, clean separation of concerns, and robust state management make scaling your application seamless.",
      background: "bg-purple-50"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-red-500" />,
      title: "Enhanced Security",
      description: "Integrated security best practices, including input validation, secure routing, and protection against common web vulnerabilities."
    },
    {
      icon: <Terminal className="w-12 h-12 text-indigo-500" />,
      title: "Developer Tools",
      description: "Pre-configured ESLint, Prettier, and comprehensive debugging tools to maintain code quality and productivity."
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: "Global Performance",
      description: "Optimized for international markets with internationalization support, performance monitoring, and lazy loading capabilities."
    },
    {
      icon: <Layers className="w-12 h-12 text-orange-500" />,
      title: "Microservices Ready",
      description: "Designed with microservices architecture in mind, featuring easy integration with backend services and API management."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Unleash Your React Potential
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            A comprehensive, production-ready React starter kit that transforms your development workflow and accelerates project delivery.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Start Building
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Core Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg ${section.background} transform hover:scale-105 transition duration-300`}
              >
                <div className="flex justify-center mb-6">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">{section.title}</h2>
                <p className="text-center text-gray-700">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Comprehensive Feature Set
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Development?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of developers who have accelerated their project delivery with our React Starter Kit.
        </p>
        <button className="bg-white text-purple-700 px-10 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition">
          Get Started Now
        </button>
      </section>
    </div>
  
  );
}

export default Home;
