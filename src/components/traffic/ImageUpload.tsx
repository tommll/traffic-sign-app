
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleIdentifyImage = () => {
    if (!image) return;
    
    setIsUploading(true);
    // Simulate identification process
    setTimeout(() => {
      toast.success("Image processed successfully!");
      setIsUploading(false);
      // In a real app, this would send the image to an API for processing
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {!image ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop an image, or click to browse
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>Choose File</span>
            </Button>
          </label>
        </div>
      ) : (
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={image}
            alt="Uploaded"
            className="max-h-64 mx-auto object-contain rounded-md"
          />
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleIdentifyImage} 
              disabled={isUploading}
            >
              {isUploading ? "Processing..." : "Identify Sign"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
