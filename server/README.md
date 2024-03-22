## setup:

### backend
1. with docker 
- prerequisite you will need docker installed in your system 
```bash
cd server 
docker compose up 
```
- This will run a postgres Db and the backend for you locally 

2. without docker 

- prerequisite you will need a local postgres Db or cloud postgres db  uri
- change the example.env file to .env but keep the example file dont delete it give all the required variable there
 
 #### Install dependencies
 ```bash
 cd server 
 npm install 
```

 #### migrate prisma schema to you db 
```bash
npx prisma migrate dev --name "you can give it whateven name you want"
```
#### start the server 
```bash
npm run dev 
```
This will first converts your typescript file to javascript then run you server
#### you have successfully setuped the backend not lets go to the frontend
