import { Card, CardContent } from "@/components/ui/card";

// This will be replaced with real data later
const DUMMY_SIGN_DETAILS = {
  "1": {
    name: "Stop",
    imageUrl: "/placeholder.svg",
    description: "A stop sign indicates that a vehicle must come to a complete halt and not proceed until it is safe to do so.",
    category: "Regulatory",
    shape: "Octagon",
    color: "Red/White"
  },
  "2": {
    name: "Yield",
    imageUrl: "/placeholder.svg",
    description: "A yield sign indicates that drivers must slow down and yield the right-of-way to traffic in the intersection.",
    category: "Regulatory",
    shape: "Triangle",
    color: "Red/White"
  },
  // Others would be filled out in a real implementation
};

interface SignDetailProps {
  signId: string;
}

const SignDetail = ({ signId }: SignDetailProps) => {
  // This would use real data in a production application
  const signDetails = DUMMY_SIGN_DETAILS[signId as keyof typeof DUMMY_SIGN_DETAILS];

  if (!signDetails) {
    return <p>Sign details not found.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="w-40 h-40 flex items-center justify-center">
          <img 
            src={signDetails.imageUrl} 
            alt={signDetails.name} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-center">{signDetails.name}</h3>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm font-medium">Category:</p>
          <p className="text-sm">{signDetails.category}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm font-medium">Shape:</p>
          <p className="text-sm">{signDetails.shape}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm font-medium">Color:</p>
          <p className="text-sm">{signDetails.color}</p>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium">Description:</p>
        <p className="text-sm mt-1">{signDetails.description}</p>
      </div>
    </div>
  );
};

export default SignDetail;
