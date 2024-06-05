export interface Car {
    id: number;
  
    name: string;
    make: string;
    variant: string;
    model: string;
    price: number;
    tcs: number;
  
    driven: number;
    fuelType: string;
    engine: string;
    transmission: string;
    type: string;
  
    interiorColor: string;
    exteriorColor: string;
    interiorType: string;
    power: string;
    engineType: string;
    torque: string;
    drivetrain: string;
    topSpeed: string;
    groundClearance: string;
    seatingCapacity: string;
  
    ownership: string;
    registrationDate: string; // mm/yyyy
    registrationRTO: string;
    insuranceTillDate: string; // mm/yyyy
    manufacturingDate: string; // mm/yyyy
    servicePackDuration: string;
    servicePackKm: string;
    extendedWarrantyYear: string; // mm/yyyy
  
    features: string; // json string
  
    previewImage: string;
    interiorImages: string[];
    exteriorImages: string[];
  
    status: "soldOut" | "booked" | "available";
    special?: 0 | 1;
    listed?: 0 | 1;
  }
  
  export type CarList = Array<Car>;
  