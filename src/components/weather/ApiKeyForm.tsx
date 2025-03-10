
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApiKey, saveApiKey } from "@/utils/storage";
import { toast } from "sonner";

interface ApiKeyFormProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeyForm = ({ onApiKeySet }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeySet(savedApiKey);
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      onApiKeySet(apiKey.trim());
      toast.success("API key saved successfully!");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">OpenWeatherMap API Key</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full"
        />
        <div className="flex items-center justify-between">
          <a
            href="https://home.openweathermap.org/api_keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Get an API key
          </a>
          <Button type="submit">Save Key</Button>
        </div>
      </form>
    </div>
  );
};

export default ApiKeyForm;
