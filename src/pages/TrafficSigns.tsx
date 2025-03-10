
import { useState } from "react";
import { Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignGrid from "@/components/traffic/SignGrid";
import SignDetail from "@/components/traffic/SignDetail";
import ImageUpload from "@/components/traffic/ImageUpload";
import { toast } from "sonner";

const TrafficSigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
      // Search functionality will be implemented later
    }
  };

  const handleSignSelect = (signId: string) => {
    setSelectedSign(signId);
  };

  const handleUploadToggle = () => {
    setIsUploadOpen(!isUploadOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Traffic Signs Database</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Search form */}
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search signs by name..."
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>

        {/* Upload button */}
        <div className="w-full md:w-1/3">
          <Button 
            onClick={handleUploadToggle} 
            className="w-full"
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" />
            Identify by Image
          </Button>
        </div>
      </div>

      {/* Upload area */}
      {isUploadOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Traffic Sign Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload />
          </CardContent>
        </Card>
      )}

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signs grid (2/3 width on desktop) */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <SignGrid onSignSelect={handleSignSelect} />
            </CardContent>
          </Card>
        </div>

        {/* Sign details (1/3 width on desktop) */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sign Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSign ? (
                <SignDetail signId={selectedSign} />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Select a sign to view details
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficSigns;
