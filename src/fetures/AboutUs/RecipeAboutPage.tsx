import React, { useState } from "react";
import {
  Heart,
  Users,
  Award,
  BookOpen,
  ChefHat,
  Star,
  Coffee,
  Globe,
  Target,
  Lightbulb,
  Camera,
  Clock,
  TrendingUp,
  Play,
} from "lucide-react";
import CountUp from "react-countup";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialty: string;
}

interface Stat {
  icon: React.ElementType;
  number: number;
  label: string;
  description: string;
}

const RecipeAboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("story");

  const stats: Stat[] = [
    {
      icon: BookOpen,
      number: 2500,
      label: "Recipes",
      description: "Carefully tested and curated",
    },
    {
      icon: Users,
      number: 50000,
      label: "Community",
      description: "Food lovers worldwide",
    },
    {
      icon: Award,
      number: 15,
      label: "Awards",
      description: "Culinary recognitions",
    },
    {
      icon: Globe,
      number: 120,
      label: "Countries",
      description: "Global recipe collection",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Johnson",
      role: "Head Chef & Founder",
      image: "/api/placeholder/300/300",
      bio: "Culinary Institute graduate with 15+ years of experience in international cuisine.",
      specialty: "French & Mediterranean",
    },
    {
      name: "Mike Chen",
      role: "Recipe Developer",
      image: "/api/placeholder/300/300",
      bio: "Expert in Asian fusion cuisine and molecular gastronomy techniques.",
      specialty: "Asian Fusion",
    },
    {
      name: "Emma Rodriguez",
      role: "Nutritionist",
      image: "/api/placeholder/300/300",
      bio: "Registered dietitian specializing in healthy and sustainable cooking.",
      specialty: "Healthy Living",
    },
    {
      name: "David Kim",
      role: "Food Photographer",
      image: "/api/placeholder/300/300",
      bio: "Award-winning food photographer making every dish look irresistible.",
      specialty: "Food Styling",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description:
        "We believe cooking is an act of love that brings people together around the table.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Constantly exploring new techniques, ingredients, and flavor combinations.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Building a supportive community where everyone can learn and share their culinary journey.",
    },
    {
      icon: Target,
      title: "Quality & Authenticity",
      description:
        "Every recipe is thoroughly tested to ensure the best results in your kitchen.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description:
        "Started as a small food blog sharing family recipes from our grandmother's cookbook.",
    },
    {
      year: "2019",
      title: "Growing Community",
      description:
        "Reached 10,000 subscribers and launched our first cooking video series.",
    },
    {
      year: "2021",
      title: "Award Recognition",
      description:
        'Won "Best Food Blog" award and published our first cookbook.',
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "Launched international recipe collections and multilingual platform.",
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description:
        "Opened our test kitchen and started advanced cooking workshops.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute top-10 right-10 opacity-20">
          <ChefHat size={150} className="animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-20">
          <Coffee size={100} className="animate-bounce" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-6">
            <Heart size={20} className="mr-2 text-pink-300" />
            <span className="text-sm text-gray-500 font-medium">
              Made with Love
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-yellow-300">Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto mb-10">
            From a small family kitchen to a global community of food lovers,
            we're passionate about sharing the joy of cooking with the world.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 flex items-center space-x-2">
              <Play size={20} />
              <span>Watch Our Story</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Join Our Community
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={32} className="text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2}
                    separator=","
                    suffix="+"
                  />
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              {[
                { id: "story", label: "Our Story", icon: BookOpen },
                { id: "mission", label: "Mission & Values", icon: Target },
                { id: "team", label: "Meet the Team", icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === "story" && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    How It All Started
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    It all began in 2018 when our founder Sarah discovered her
                    grandmother's handwritten recipe collection in an old wooden
                    box. Each recipe told a story, carried memories, and brought
                    families together.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    What started as a simple blog to preserve these family
                    treasures has grown into a global community of passionate
                    home cooks, professional chefs, and food enthusiasts from
                    over 120 countries.
                  </p>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Today, we're not just sharing recipes – we're preserving
                    culinary traditions, fostering creativity, and helping
                    people create their own delicious memories, one meal at a
                    time.
                  </p>

                  {/* Timeline */}
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                          {milestone.year.slice(-2)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white text-center">
                    <Camera size={60} className="mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">
                      Behind the Scenes
                    </h3>
                    <p className="mb-6">
                      Get an exclusive look at our test kitchen where all the
                      magic happens!
                    </p>
                    <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                      Take a Virtual Tour
                    </button>
                  </div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-300 rounded-full opacity-60"></div>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Our Mission & Values
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We're on a mission to make cooking accessible, enjoyable,
                    and meaningful for everyone, while preserving culinary
                    traditions and fostering innovation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <value.icon size={28} className="text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mission Statement */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center">
                  <TrendingUp size={60} className="mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-6">
                    Our Vision for the Future
                  </h3>
                  <p className="text-xl text-orange-100 max-w-4xl mx-auto mb-8">
                    To become the world's most trusted and inspiring culinary
                    platform, where every cook feels empowered to explore,
                    create, and share their passion for food while building
                    lasting connections with others.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                      Sustainability
                    </span>
                    <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                      Accessibility
                    </span>
                    <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                      Innovation
                    </span>
                    <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                      Community
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Meet Our Culinary Experts
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Behind every great recipe is a passionate team of culinary
                    professionals, nutritionists, and food enthusiasts working
                    to bring you the best content.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
                    >
                      <div className="relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-medium">
                            {member.specialty}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-orange-600 font-semibold mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                        <div className="flex justify-center mt-4 space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Join Team CTA */}
                <div className="mt-16 text-center">
                  <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 text-white">
                    <Users size={60} className="mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">
                      Want to Join Our Team?
                    </h3>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                      We're always looking for talented individuals who share
                      our passion for food and community.
                    </p>
                    <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105">
                      View Open Positions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Clock size={60} className="mx-auto mb-6 text-orange-400" />
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of home cooks who have transformed their kitchens
            into places of joy, creativity, and connection.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
              Explore Recipes
            </button>
            <button className="border-2 border-gray-600 hover:border-orange-400 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105">
              Subscribe Newsletter
            </button>
            <button className="border-2 border-gray-600 hover:border-orange-400 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105">
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeAboutPage;
