import { cn } from "@/lib/utils";

interface BMIScaleProps {
  bmi: number;
}

export const BMIScale = ({ bmi }: BMIScaleProps) => {
  const getPosition = (bmi: number) => {
    // Clamp BMI between 15 and 35 for visualization
    const clampedBMI = Math.max(15, Math.min(35, bmi));
    return ((clampedBMI - 15) / 20) * 100;
  };

  return (
    <div className="space-y-2">
      <div className="h-2 bg-muted rounded-full relative">
        <div
          className="absolute w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/4 transition-all duration-500"
          style={{ left: `${getPosition(bmi)}%` }}
        />
        <div className="absolute w-full h-full">
          <div className="absolute h-full w-[30%] bg-[#E5DEFF] rounded-l-full" />
          <div className="absolute h-full w-[20%] left-[30%] bg-[#F1F0FB]" />
          <div className="absolute h-full w-[25%] left-[50%] bg-[#FEC6A1]" />
          <div className="absolute h-full w-[25%] left-[75%] bg-[#F97316] rounded-r-full" />
        </div>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
};