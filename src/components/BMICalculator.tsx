import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BMIScale } from "./BMIScale";
import { toast } from "sonner";

export const BMICalculator = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      toast.error("Please enter valid height and weight values");
      return;
    }

    let bmiValue: number;
    if (unit === "metric") {
      // Height in cm, weight in kg
      bmiValue = w / Math.pow(h / 100, 2);
    } else {
      // Height in inches, weight in lbs
      bmiValue = (w / Math.pow(h, 2)) * 703;
    }

    setBmi(Math.round(bmiValue * 10) / 10);
    toast.success("BMI calculated successfully!");
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">BMI Calculator</h2>
        <p className="text-muted-foreground">
          Calculate your Body Mass Index (BMI)
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant={unit === "metric" ? "default" : "outline"}
          onClick={() => setUnit("metric")}
        >
          Metric
        </Button>
        <Button
          variant={unit === "imperial" ? "default" : "outline"}
          onClick={() => setUnit("imperial")}
        >
          Imperial
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">
            Height ({unit === "metric" ? "cm" : "inches"})
          </Label>
          <Input
            id="height"
            type="number"
            placeholder={unit === "metric" ? "175" : "69"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder={unit === "metric" ? "70" : "154"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={calculateBMI}>
          Calculate BMI
        </Button>
      </div>

      {bmi !== null && (
        <div className="space-y-4 slide-up">
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-primary">{bmi}</p>
            <p className="text-lg font-medium">{getBMICategory(bmi)}</p>
          </div>
          <BMIScale bmi={bmi} />
        </div>
      )}
    </Card>
  );
};