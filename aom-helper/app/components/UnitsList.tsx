"use client";
import { useState, useEffect, useReducer } from "react";
import UnitCard from "./UnitCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or anonymous key");
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Unit {
  id: number;
  name: string;
  type: string;
  civilization: string;
  attack: number;
  armor: number;
  speed: number;
  cost_gold: number;
  cost_food: number;
  cost_wood: number;
  cost_favor: number;
  // Add other properties as needed
}

async function getUnits() {
  const { data: units, error } = await supabase.from("soc_units").select("*");
  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Failed to fetch units");
  }
  return units as Unit[];
}

type FilterState = {
  civilization: string | null;
  type: string | null;
};

type FilterAction =
  | { type: "SET_CIVILIZATION"; civilization: string | null }
  | { type: "SET_TYPE"; unitType: string | null };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_CIVILIZATION":
      return { ...state, civilization: action.civilization, type: null };
    case "SET_TYPE":
      return { ...state, type: action.unitType };
    default:
      return state;
  }
}

export default function UnitsList() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [filterState, dispatch] = useReducer(filterReducer, {
    civilization: null,
    type: null,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchUnits() {
      try {
        const units = await getUnits();
        setUnits(units);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    }
    fetchUnits();
  }, []);

  const filteredUnits = units.filter((unit) => {
    const matchesCivilization =
      filterState.civilization === null ||
      unit.civilization === filterState.civilization;
    const matchesType =
      filterState.type === null || unit.type === filterState.type;
    const matchesSearchQuery = unit.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCivilization && matchesType && matchesSearchQuery;
  });

  return (
    <div>
      <div className="filters mb-6">
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <button
            onClick={() =>
              dispatch({ type: "SET_CIVILIZATION", civilization: null })
            }
            className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
              filterState.civilization === null
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            All Civilizations
          </button>
          <button
            onClick={() =>
              dispatch({ type: "SET_CIVILIZATION", civilization: "Greek" })
            }
            className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
              filterState.civilization === "Greek"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Greek
          </button>
          <button
            onClick={() =>
              dispatch({ type: "SET_CIVILIZATION", civilization: "Norse" })
            }
            className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
              filterState.civilization === "Norse"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Norse
          </button>
          <button
            onClick={() =>
              dispatch({ type: "SET_CIVILIZATION", civilization: "Egyptian" })
            }
            className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
              filterState.civilization === "Egyptian"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Egyptian
          </button>
          <input
            type="text"
            placeholder="Search units..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded ml-auto w-64 text-black"
          />
        </div>
        {filterState.civilization && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => dispatch({ type: "SET_TYPE", unitType: null })}
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === null
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              All Units
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_TYPE", unitType: "Myth Unit" })
              }
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === "Myth Unit"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Myth Units
            </button>
            <button
              onClick={() => dispatch({ type: "SET_TYPE", unitType: "Siege" })}
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === "Siege"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Siege
            </button>
            <button
              onClick={() => dispatch({ type: "SET_TYPE", unitType: "Archer" })}
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === "Archer"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Archer
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_TYPE", unitType: "Infantry" })
              }
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === "Infantry"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Infantry
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_TYPE", unitType: "Cavalry" })
              }
              className={`p-2 border rounded shadow-md transition-transform transform hover:scale-105 ${
                filterState.type === "Cavalry"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Cavalry
            </button>
            {/* Add more buttons for other types as needed */}
          </div>
        )}
      </div>
      {filteredUnits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      ) : (
        <p className="text-white">No units found.</p>
      )}
    </div>
  );
}
