export interface PersonRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  office: string;
  age: number;
  startDate: string;
}


export interface Person {
  id: number;
  name: { first: string; last: string };
  email: string;
  phone: string;
  location: { city: string };
  dob: { age: number };
  registered: { date: string };
}