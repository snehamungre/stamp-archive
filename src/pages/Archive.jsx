import React, { useState } from 'react';
import stamps from "../data/stamps.json";
import Card from "../components/Card";

const Archive = () => {
    const [yearRange, setYearRange] = useState({ min: "", max: "" });
    const [selectedCountries, setSelectedCountries] = useState([]);

    // Get unique countries from stamps data
    const uniqueCountries = [...new Set(stamps.flatMap(stamp => stamp.countries))].sort();

    const toggleCountry = (country) => {
        setSelectedCountries((prev) =>
            prev.includes(country)
                ? prev.filter((c) => c !== country)
                : [...prev, country]
        );
    };

    const filtered = stamps.filter((stamp) => {
        const inCountry =
            selectedCountries.length > 0
                ? stamp.countries.some((c) => selectedCountries.includes(c))
                : true;

        const inYearRange =
            (yearRange.min ? stamp.year >= parseInt(yearRange.min) : true) &&
            (yearRange.max ? stamp.year <= parseInt(yearRange.max) : true);

        return inCountry && inYearRange;
    });

    return (
        <div className="nav-offset max-w-7xl mx-auto px-4">
            <div className="flex gap-10">
                {/* Sidebar Filters */}
                <div className="w-64 flex flex-col gap-6">
                    {/* Year Range */}
                    <div>
                        <label className="block font-semibold mb-2">Year Range</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={yearRange.min}
                                onChange={(e) =>
                                    setYearRange({ ...yearRange, min: e.target.value })
                                }
                                className="w-1/2 border px-2 py-1 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={yearRange.max}
                                onChange={(e) =>
                                    setYearRange({ ...yearRange, max: e.target.value })
                                }
                                className="w-1/2 border px-2 py-1 rounded"
                            />
                        </div>
                    </div>

                    {/* Country Checkboxes */}
                    <div>
                        <label className="block font-semibold mb-2">Countries</label>
                        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-2">
                            {uniqueCountries.map((countryName) => (
                                <label key={countryName} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCountries.includes(countryName)}
                                        onChange={() => toggleCountry(countryName)}
                                    />
                                    <span>{countryName}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filtered.map((stamp) => (
                            <Card key={stamp.id} stamp={stamp} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archive;