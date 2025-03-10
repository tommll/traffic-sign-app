
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getRecentCities } from "@/utils/storage";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
  isLoading: boolean;
}

const CitySearch = ({ onCitySelect, isLoading }: CitySearchProps) => {
  const [city, setCity] = useState<string>("");
  const [recentCities, setRecentCities] = useState<string[]>([]);

  useEffect(() => {
    setRecentCities(getRecentCities());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onCitySelect(city.trim());
      setCity("");
    }
  };

  const handleRecentCityClick = (city: string) => {
    onCitySelect(city);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="pl-10 w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>
      
      {recentCities.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {recentCities.map((recentCity) => (
              <Button
                key={recentCity}
                variant="outline"
                size="sm"
                onClick={() => handleRecentCityClick(recentCity)}
                className="text-sm"
              >
                {recentCity}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
