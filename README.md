# Tanstack Stack + Tanstack Query + ClerkJS

## To run the app:

- copy the `.env.example` -> `.env`
- provide Clerk credentials and API url values
  - API url can be whatever API, currently the app is set up to expect:
    - `GET /todos` - returns `{ data: [ { id: number, title: string } ] }`
    - `GET /todos/$todoId` - returns `{ id: number, title: string, description: string }`
- install dependencies (`npm install` or whatever package manager you're using)
- run the dev app -> `npm run dev`