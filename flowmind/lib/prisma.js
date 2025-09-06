import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient

if(process.env.NODE_ENV != "production") {
    globalThis.prisma = db;
}

// globalThis.prisma : this global variable ensures that the prisma client instance  is reused across hot reloads duting development , without this , each time your application reloads 
//  , a new instance would be created , potentially leads to connection issues