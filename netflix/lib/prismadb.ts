import { PrismaClient } from "@prisma/client";


// here we do some trick because next hot way loading because of this when code update this code run and create two man intencess so we save the instaces in a globle file
const client = global.prismadb || new PrismaClient;

if(process.env.NODE_ENV === "production") global.prismadb = client;

export default client