ERCL 

# To Run Project
- Apply migrations and change connection string in `appsettings.json` if necessary
- Run WebApi project using dotnet CLI or VS. If you are using a different address besides `https://localhost:5001` you must change the `API_BASE_URL` constant in `environment.ts` file inside Frontend/ClientApp
- In Frontend's ClientApp folder, run `ng serve -o` to test frontend from `http://localhost:4200`

The WebApi prject has CORS protocols enabled to receive connections from Angular app (or any other)