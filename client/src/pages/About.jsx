import { useState, useEffect } from "react";
import { ChevronDown, Target, Eye, BookOpen, Pen, Users } from "lucide-react";

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const startValue = 0;
    const endValue = parseInt(end);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const currentCount = Math.round(
          (progress / duration) * (endValue - startValue)
        );
        setCount(currentCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatCard = ({ title, value, suffix = "+" }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <h3 className="text-gray-500 text-sm uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">
      <Counter end={value} suffix={suffix} />
    </p>
  </div>
);

const AccordionItem = ({ title, content, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-4">
      <button
        className={`w-full text-left px-6 py-4 text-lg font-semibold flex justify-between items-center transition-all duration-200 ${
          isOpen ? "bg-blue-50" : "bg-white hover:bg-gray-50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 py-4 bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

const About = () => {
  const accordionData = [
    {
      title: "Our Writing Philosophy",
      content:
        "At The Writing Corner, we believe in the power of authentic storytelling. Our articles are crafted with meticulous attention to detail, backed by thorough research, and written with a genuine passion for sharing knowledge. We strive to create content that not only informs but also engages and inspires our readers, fostering meaningful conversations within our community.",
      icon: Pen,
    },
    {
      title: "Editorial Standards",
      content:
        "Quality is at the heart of everything we publish. Our editorial process involves rigorous fact-checking, multiple rounds of editing, and careful attention to narrative structure. We follow AP style guidelines while maintaining our unique voice. Every piece goes through our experienced editorial team to ensure it meets our high standards for accuracy, clarity, and engagement.",
      icon: BookOpen,
    },
    {
      title: "Community Engagement",
      content:
        "Our blog is more than just articles—it's a thriving community of readers, writers, and thinkers. We actively encourage discussion through comments, host monthly writing challenges, and feature guest posts from our community members. We believe in creating a space where ideas can be shared freely and respectfully, fostering growth and learning for all.",
      icon: Users,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="w-11/12 max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-blue-600">The Writing Corner</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A community-driven blog dedicated to sharing thoughtful insights,
            compelling stories, and engaging discussions about the world around
            us.
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Published Articles" value="500" />
          <StatCard title="Active Readers" value="10000" />
          <StatCard title="Contributors" value="50" />
          <StatCard title="Categories" value="12" />
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create a vibrant space for thoughtful dialogue and knowledge
              sharing, where diverse perspectives meet quality writing to
              inspire and inform our readers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become the premier destination for readers seeking insightful,
              well-crafted content that sparks curiosity and fosters meaningful
              conversations.
            </p>
          </div>
        </section>

        {/* Content Pillars Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">
            What We Stand For
          </h2>
          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                icon={item.icon}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
