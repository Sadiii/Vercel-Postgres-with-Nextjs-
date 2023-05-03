import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
 
export async function POST() {
  const client = await db.connect();
  try {
    await client.sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
    const names = ['Fiona', 'Lucy'];
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error:any) {
    return NextResponse.json({message:error.message}, {status:500});
  }
}

export async function GET() {
    const client = await db.connect();
    const pets = await client.sql`SELECT * FROM Pets;`;
    return NextResponse.json(pets, {status:200})
  }