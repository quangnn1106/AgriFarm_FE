// import { CultRecordRow } from "./cultivationPDFDocument";


// // Function to generate random date within a range
// const getRandomDateInRange = (start: Date, end: Date): Date => {
//   const startTime = start.getTime();
//   const endTime = end.getTime();
//   const randomTime = startTime + Math.random() * (endTime - startTime);
//   return new Date(randomTime);
// };

// // Function to generate random string
// const getRandomString = (length: number): string => {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

// // Function to generate random number within a range
// const getRandomNumberInRange = (min: number, max: number): number => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// // Seed data
// const seedData: CultRecordRow[] = [];

// // Number of records to generate
// const numberOfRecords = 10;

// // Date range for season start and end
// const seasonStartDate = new Date('2023-01-01');
// const seasonEndDate = new Date('2023-12-31');

// // Date range for harvest date
// const harvestStartDate = new Date('2023-05-01');
// const harvestEndDate = new Date('2023-10-31');

// // Generate data for each record
// for (let i = 0; i < numberOfRecords; i++) {
//   const id = String(i + 1);
//   const season = {
//     name: `Season ${i + 1}`,
//     start: getRandomDateInRange(seasonStartDate, seasonEndDate),
//     end: getRandomDateInRange(seasonStartDate, seasonEndDate),
//   };
//   const productName = `Product ${i + 1}`;
//   const output = getRandomNumberInRange(100, 1000);
//   const unit = 'kg';
//   const location = `Location ${i + 1}`;
//   const harvestDate = getRandomDateInRange(harvestStartDate, harvestEndDate);
  
//   seedData.push({ id, season, productName, output, unit, location, harvestDate });
// }

// export default seedData;