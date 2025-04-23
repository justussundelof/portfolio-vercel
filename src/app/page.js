"use client";

import { useEffect, useState } from "react";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const GITHUB_USERNAME = "your-github-username";

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-pink-100 via-white to-blue-100 min-h-screen font-sans">
      {user && (
        <div className="flex items-center mb-10 bg-white/70 p-4 rounded-xl shadow-md">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-20 h-20 rounded-full mr-6 border-4 border-pink-300"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-pink-700">
              {user.name}
            </h1>
            <p className="text-blue-500 text-sm">a.k.a @{user.login}</p>
            <p className="text-gray-600 italic mt-1">
              Coding my way out of existential dread ✨
            </p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        🔧 My Code Lab
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 h-16 overflow-hidden">
              {project.description || "No description, just vibes ✌️"}
            </p>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Peek the code ➡️
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
