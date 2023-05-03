
# Vercel Postgres (Nextjs)

Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions and your frontend framework.


## Use cases
The following are just a few use cases for Vercel Postgres:

- **Manage complex, transactional data:** Ideal for storing financial transactions, inventory records, or other critical data, Postgres ensures high consistency and concurrency, making it well-suited for applications that require reliable, real-time data management

- **Rich data types and extensibility:** Choose Postgres for handling diverse data formats or custom data types, such as JSON, arrays, or user-generated content


## QuickStart

In this quickstart, you'll learn how to do the following:

- Create [Next.js](https://nextjs.org/) project with `pnpm create next-app@latest`

- install postgres `pnpm i @vercel/postgres`
- `npm i -g vercel@latest`
- Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- deploy project on vercel using `vercel` command.
- Create an Postgres database called `pets_postgres_db` that's connected to one of your projects
- After creating database , we need to link this db to local enviroment. Type `vercel link` on terminal. 
- Then pull all enviroment variables from vercel to local directory by typing this command `vercel env pull .env.development.local`.
- create a new folder `pets` inside `app/api/`.
- create `route.ts` inside the app direc
- paste following script inside route.ts

```
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
```
Now create table `pets` and access table using api
[http://localhost:3000/api/pets](http://localhost:3000/api/pets) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/pets/route.ts`.
- You can use `postman` for testing api. 

I have created mine and deployed [Here](https://next-app-with-postgres.vercel.app/api/pets)