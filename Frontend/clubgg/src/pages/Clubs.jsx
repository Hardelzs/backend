import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('clubs');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setClubs(parsed);
      else setClubs([]);
    } catch (err) {
      console.warn('Failed to parse clubs from localStorage', err);
      setClubs([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Clubs</h2>
          <Link to="/login" className="text-indigo-600 hover:underline text-sm">Back to Login</Link>
        </div>

        {clubs.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center text-gray-600">No clubs found in localStorage.</div>
        ) : (
          clubs.map((club) => (
            <div key={club.club_id} className="mb-4 bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{club.club_name}</h3>
                  <div className="text-sm text-gray-500">ID: {club.club_id}</div>
                </div>
                <div className="text-sm text-gray-600">{club.tables ? club.tables.length : 0} table(s)</div>
              </div>

              <div className="mt-3 grid gap-3">
                {Array.isArray(club.tables) && club.tables.length > 0 ? (
                  club.tables.map((table) => (
                    <div key={table.table_id} className="border border-gray-100 rounded p-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{table.table_name}</div>
                          <div className="text-sm text-gray-500">ID: {table.table_id}</div>
                        </div>
                        <div className="text-sm text-gray-600">Players: {Array.isArray(table.players) ? table.players.length : 0}</div>
                      </div>

                      {Array.isArray(table.players) && table.players.length > 0 && (
                        <div className="mt-3 grid gap-2">
                          {table.players.map((p) => (
                            <div key={p.player_id} className="flex items-center justify-between bg-white p-2 rounded">
                              <div>
                                <div className="font-medium">{p.player_name}</div>
                                <div className="text-xs text-gray-500">ID: {p.player_id}</div>
                              </div>
                              <div className="text-sm text-gray-600">
                                {p.status} • {p.chip_count}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No tables available.</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
