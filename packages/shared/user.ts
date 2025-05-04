export interface User {
    uid: string;
    name: string;
    email: string;
    role?: string;
    totalAverageWeightRatings: number,
    numberOfRents: number,
    recentlyActive: number
  }
  