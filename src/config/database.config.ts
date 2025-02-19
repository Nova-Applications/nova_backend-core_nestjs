import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT,
    apiKey: process.env.COSMOS_API_KEY,
    dbId: process.env.COSMOS_DB_ID,
    dbUser: process.env.COSMOS_DB_USER,
    dbFacility: process.env.COSMOS_DB_FACILITY,
    dbAmenity: process.env.COSMOS_DB_AMENITY,
    dbCourt: process.env.COSMOS_DB_COURT,
    dbBusinessHour: process.env.COSMOS_DB_BUSINESSHOUR,
    dbSalesReport: process.env.COSMOS_DB_SALESREPORT,
  },
}));
