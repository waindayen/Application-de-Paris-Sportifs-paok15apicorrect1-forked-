import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const topMatches = [
    {
      league: "Champions League",
      match: "PSG vs Manchester City",
      time: "20:45",
      odds: { home: 2.40, draw: 3.40, away: 2.90 }
    },
    {
      league: "Premier League",
      match: "Arsenal vs Chelsea",
      time: "18:30",
      odds: { home: 2.10, draw: 3.30, away: 3.50 }
    }
  ];

  const liveMatches = [
    {
      league: "La Liga",
      match: "Real Madrid vs Barcelona",
      time: "65'",
      score: "2-1",
      odds: { home: 1.85, draw: 3.40, away: 4.20 }
    },
    {
      league: "Ligue 1",
      match: "Lyon vs Marseille",
      time: "32'",
      score: "0-0",
      odds: { home: 2.10, draw: 2.80, away: 3.50 }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Vivez le Sport Intensément
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Plus de 1000 événements sportifs disponibles chaque jour
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-lg transition-colors"
              >
                Commencer à Parier
              </Link>
              <Link
                to="/live"
                className="px-8 py-4 border-2 border-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-colors"
              >
                Paris en Direct
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Live Matches Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-red-500">●</span> En Direct
            </h2>
            <Link to="/live" className="text-blue-600 hover:text-blue-700">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-blue-600">{match.league}</span>
                  <span className="text-sm font-medium text-red-500">{match.time}</span>
                </div>
                <div className="text-lg font-semibold mb-4">{match.match}</div>
                <div className="text-xl font-bold text-center mb-4">{match.score}</div>
                <div className="grid grid-cols-3 gap-3">
                  <button className="py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded text-center">
                    <div className="text-sm text-gray-600">1</div>
                    <div className="font-bold text-blue-600">{match.odds.home}</div>
                  </button>
                  <button className="py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded text-center">
                    <div className="text-sm text-gray-600">X</div>
                    <div className="font-bold text-blue-600">{match.odds.draw}</div>
                  </button>
                  <button className="py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded text-center">
                    <div className="text-sm text-gray-600">2</div>
                    <div className="font-bold text-blue-600">{match.odds.away}</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matches Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Matchs à Venir</h2>
            <Link to="/matches" className="text-blue-600 hover:text-blue-700">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topMatches.map((match, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-blue-600">{match.league}</span>
                  <span className="text-sm text-gray-600">{match.time}</span>
                </div>
                <div className="text-lg font-semibold mb-4">{match.match}</div>
                <div className="grid grid-cols-3 gap-3">
                  <button className="py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center">
                    <div className="text-sm text-gray-600">1</div>
                    <div className="font-bold text-blue-600">{match.odds.home}</div>
                  </button>
                  <button className="py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center">
                    <div className="text-sm text-gray-600">X</div>
                    <div className="font-bold text-blue-600">{match.odds.draw}</div>
                  </button>
                  <button className="py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center">
                    <div className="text-sm text-gray-600">2</div>
                    <div className="font-bold text-blue-600">{match.odds.away}</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Statistiques du Jour</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">127,394€</div>
              <div className="text-sm text-gray-600">Gains distribués</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-gray-600">Parieurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">12.5</div>
              <div className="text-sm text-gray-600">Cote maximale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}