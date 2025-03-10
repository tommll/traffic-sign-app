
import { Card, CardContent } from "@/components/ui/card";

// This will be replaced with real data later
const DUMMY_SIGNS = [
  { id: "1", name: "Stop", imageUrl: "/placeholder.svg" },
  { id: "2", name: "Yield", imageUrl: "/placeholder.svg" },
  { id: "3", name: "Speed Limit", imageUrl: "/placeholder.svg" },
  { id: "4", name: "No Entry", imageUrl: "/placeholder.svg" },
  { id: "5", name: "One Way", imageUrl: "/placeholder.svg" },
  { id: "6", name: "No Parking", imageUrl: "/placeholder.svg" },
];

interface SignGridProps {
  onSignSelect: (signId: string) => void;
}

const SignGrid = ({ onSignSelect }: SignGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {DUMMY_SIGNS.map((sign) => (
        <Card 
          key={sign.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSignSelect(sign.id)}
        >
          <CardContent className="p-3 flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center">
              <img 
                src={sign.imageUrl} 
                alt={sign.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="mt-2 text-center font-medium">{sign.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SignGrid;
