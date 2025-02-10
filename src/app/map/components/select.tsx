import { useState } from "react";


type Platform = {
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

export default function PlatformSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Select a platform");

  const platforms = [
    { value: "codepen", label: "CodePen", icon: "fab fa-codepen", color: "black" },
    { value: "dribbble", label: "Dribbble", icon: "fab fa-dribbble", color: "#ea4c89" },
    { value: "behance", label: "Behance", icon: "fab fa-behance", color: "#0057ff" },
    { value: "hackerrank", label: "HackerRank", icon: "fab fa-hackerrank", color: "#32c766" },
    { value: "stackoverflow", label: "StackOverflow", icon: "fab fa-stack-overflow", color: "#f48024" },
    { value: "freecodecamp", label: "FreeCodeCamp", icon: "fab fa-free-code-camp", color: "#006400" },
  ];

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform.label);
    setIsOpen(false);
  };

  return (


      <div className="relative w-72">
   
        <div
          className="mt-20 p-3 bg-white rounded-lg shadow-md flex justify-between items-center cursor-pointer border border-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-700">{selectedPlatform}</span>
          <div className="text-gray-400">
            <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
          </div>
        </div>

        {/* Options Dropdown */}
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-md border border-gray-200">
            {platforms.map((platform, index) => (
              <div
                key={platform.value}
                className={`relative p-3 flex items-center bg-[${platform.color}] space-x-2 cursor-pointer group`}
                onClick={() => handlePlatformSelect(platform)}
              >
                {/* Platform Icon */}
                <i
                  className={`${platform.icon} text-${platform.color}  transition-transform duration-300 group-hover:animate-${
                    index % 2 === 0 ? "moveup" : "movedown"
                  }`}
                ></i>
                {/* Platform Label */}
                <span className={`text-gray-700 group-hover:text-white  transition-colors duration-300`}>
                  {platform.label}
                </span>
                {/* Hover Background */}
               
              </div>
            ))}
          </div>
        )}
      </div>
  );
}