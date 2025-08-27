import React, {useState} from 'react';
import stamps from "../data/stamps.json";
import Card from "../components/Card";

const Archive = () => {
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");

    // Get unique countries from stamps data
    const uniqueCountries = [...new Set(stamps.flatMap(stamp => stamp.countries))];

    const filtered = stamps.filter(stamp => {
        return (
            (country ? stamp.countries.includes(country) : true) &&
            (year ? stamp.year === parseInt(year) : true)
        );
    });

    return (
        <div className="flex-center">
            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <select onChange={e => setCountry(e.target.value)} value={country}>
                    <option value="">All Countries</option>
                    {uniqueCountries.map(countryName => (
                        <option key={countryName} value={countryName}>
                            {countryName}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(stamp => (
                    <Card key={stamp.id} stamp={stamp} />
                ))}
            </div>
        </div>
    );
};

export default Archive;