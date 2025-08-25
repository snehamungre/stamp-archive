import React, {useState} from 'react';
import stamps from "../data/stamps.json";

const Archive = () => {
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");

    const filtered = stamps.filter(stamp => {
        return (
            (country ? stamp.countries.includes(country) : true) &&
            (year ? stamp.year === parseInt(year) : true)
        );
    });

    return (
        <div className="p-5">
            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <select onChange={e => setCountry(e.target.value)} value={country}>
                    <option value="">All Countries</option>
                    <option value="UAE">UAE</option>
                    <option value="India">India</option>
                    <option value="Oman">Oman</option>
                    {/* populate dynamically */}
                </select>

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filtered.map(stamp => (
                    <div key={stamp.id} className="border rounded-lg shadow p-3">
                        <img src={stamp.img} alt={stamp.collection} className="w-full rounded" />
                        <h3 className="font-bold mt-2">{stamp.collection}</h3>
                        <p className="text-sm">{stamp.countries.join(", ")} — {stamp.year}</p>
                        <p className="text-xs mt-1">{stamp.info}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Archive;