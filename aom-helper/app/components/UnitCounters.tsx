"use client";
import { useState } from "react";

interface UnitCounter {
  unit: string;
  counters: string[];
}

const unitCounters: { [key: string]: UnitCounter[] } = {
  Greek: [
    {
      unit: "Hoplites, Spearmen, Ulfsarks, Hersir",
      counters: ["Toxotes", "Hypaspists"],
    },
    {
      unit: "Hypaspists, Axemen, Throwing Axemen",
      counters: ["Toxotes", "Hippikons"],
    },
    {
      unit: "Toxotes, Slingers, Chariot Archers",
      counters: ["Hippikons", "Peltasts"],
    },
    {
      unit: "Hippikons, Raiding Cavalry, Jarls, Camels, War Elephants",
      counters: ["Hoplites", "Prodromos"],
    },
    { unit: "Huskarls", counters: ["Hypaspists", "Hoplites"] },
    { unit: "Prodromos", counters: ["Hoplites", "Toxotes"] },
    { unit: "Peltasts", counters: ["Hippikons", "Hoplites"] },
    { unit: "Myth units", counters: ["Heroes"] },
    { unit: "Heroes", counters: ["Human units"] },
  ],
  Egyptian: [
    {
      unit: "Hoplites, Spearmen, Ulfsarks",
      counters: ["Axemen", "Chariot Archers"],
    },
    {
      unit: "Axemen, Hypaspists, Throwing Axemen",
      counters: ["Slingers", "Chariot Archers", "War Elephants"],
    },
    {
      unit: "Toxotes, Chariot Archers",
      counters: ["Slingers", "Camels", "War Elephants"],
    },
    {
      unit: "Hippikons, Raiding Cavalry, Jarls, War Elephants",
      counters: ["Spearmen", "Camels"],
    },
    { unit: "Huskarls", counters: ["Axemen", "War Elephants"] },
    { unit: "Prodromos, Camels", counters: ["Spearmen"] },
    {
      unit: "Peltasts, Slingers",
      counters: ["Spearmen", "Camels", "War Elephants"],
    },
    { unit: "Myth units", counters: ["Priests", "Pharaoh"] },
    { unit: "Heroes", counters: ["Human units"] },
  ],
  Norse: [
    { unit: "Hoplites, Spearmen, Ulfsarks", counters: ["Throwing Axemen"] },
    { unit: "Huskarls, Hersir", counters: ["Throwing Axemen", "Ulfsarks"] },
    { unit: "Axemen, Hypaspists", counters: ["Raiding Cavalry", "Jarls"] },
    { unit: "Throwing Axemen", counters: ["Raiding Cavalry", "Jarls"] },
    {
      unit: "Toxotes, Chariot Archers, Peltasts, Slingers",
      counters: ["Raiding Cavalry", "Huskarls", "Jarls"],
    },
    { unit: "Hippikons, Raiding Cavalry", counters: ["Ulfsarks", "Jarls"] },
    { unit: "Jarls, War Elephants", counters: ["Ulfsarks"] },
    { unit: "Prodromos, Camels", counters: ["Ulfsarks", "Throwing Axemen"] },
    { unit: "Myth units", counters: ["Hersir", "Jarls"] },
    { unit: "Heroes", counters: ["Human units"] },
  ],
};

export default function UnitCounters() {
  const [selectedCivilization, setSelectedCivilization] = useState<
    string | null
  >(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const handleCounter = () => {
    if (selectedCivilization && selectedUnit) {
      const unitCounter = unitCounters[selectedCivilization].find(
        (uc) => uc.unit.toLowerCase() === selectedUnit.toLowerCase()
      );
      if (unitCounter) {
        setResults(unitCounter.counters);
      } else {
        setResults([]);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-primary">Unit Counters</h1>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {Object.keys(unitCounters).map((civilization) => (
          <button
            key={civilization}
            onClick={() => {
              setSelectedCivilization(civilization);
              setSelectedUnit(null);
              setResults([]);
            }}
            className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
              selectedCivilization === civilization
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {civilization}
          </button>
        ))}
      </div>
      {selectedCivilization && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          {unitCounters[selectedCivilization].map((unitCounter) => (
            <button
              key={unitCounter.unit}
              onClick={() => setSelectedUnit(unitCounter.unit)}
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                selectedUnit === unitCounter.unit
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {unitCounter.unit}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={handleCounter}
        className="p-2 bg-blue-500 text-white rounded shadow-md transition-transform transform hover:scale-105"
      >
        Counter
      </button>
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Counters:
          </h2>
          <ul className="list-disc list-inside text-white">
            {results.map((counter, index) => (
              <li key={index}>{counter}</li>
            ))}
          </ul>
        </div>
      )}
      {results.length === 0 && selectedUnit && (
        <p className="text-white mt-6">
          No counters found for "{selectedUnit}".
        </p>
      )}
    </div>
  );
}
