## Step-by-Step Guide: Deploying Next.js, Node.js (Express.js + TypeScript), and PostgreSQL on Namecheap VPS

# We'll go through VPS setup, server configuration, deploying the backend (Node.js + PostgreSQL), and deploying the frontend (Next.js).

# 1️⃣ Choose and Set Up Namecheap VPS

1. Purchase VPS Hosting

- Go to Namecheap VPS Hosting: https://www.namecheap.com/hosting/vps/
- Choose Pulsar VPS (cheaper) or Quasar VPS (better performance).
- Select Ubuntu 22.04 as the operating system.
- Complete the purchase and access your VPS dashboard.

# 2️⃣ Connect to Your VPS via SSH

1. Get Your VPS IP & Credentials

- After setting up the VPS, go to Namecheap Dashboard → Manage VPS.
- Find the IP Address, Username, and Password.

2. Connect Using SSH

- On your local machine, open a terminal and run:

sh

- ssh root@your-vps-ip

Example:

- ssh root@192.168.1.100
  If prompted, type yes and enter your VPS password.

# 3️⃣ Update and Install Necessary Packages

- Run the following commands:
  sh
  apt update && apt upgrade -y
- Install necessary tools:
  sh
  apt install curl nano unzip git ufw -y

# 4️⃣ Install and Configure PostgreSQL

1. Install PostgreSQL
   sh
   apt install postgresql postgresql-contrib -y
2. Start and Enable PostgreSQL
   sh
   systemctl start postgresql
   systemctl enable postgresql
3. Create a Database and User

- Log in to PostgreSQL:
  sh
  sudo -u postgres psql
- Run the following SQL commands to create a database, user, and password:
  sh
  CREATE DATABASE mydatabase;
  CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
  GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
  \q

# 5️⃣ Install Node.js and PM2

1. Install Node.js (Latest LTS Version)
   sh
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs

- Check the version:
  sh
  node -v
  npm -v

2. Install PM2 for Process Management
   sh
   npm install -g pm2

# 6️⃣ Deploy the Node.js (Express.js + TypeScript) Backend

1. Clone The Backend Repository

- Navigate to the server’s web directory:
  sh
  cd /var/www/
  git clone https://github.com/CreativeCriateur/CRIATEUR_API_V1.git backend
  cd backend

2. Install Dependencies
   sh
   npm install

3. Configure Environment Variables

- Create a .env file:
  sh
  nano .env

- Add all necessary keys and values:
  env:

  PORT=4000
  NODE_ENV=development
  PGHOST=127.0.0.1
  PGUSERNAME=postgres
  PGPASSWORD=password1
  PGDATABASE=criateurs_db_1
  PGPORT=5432
  DATABASE_LOGGING=true
  DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydatabase
  JWT_SECRET=your-secret-key

- Save and exit (CTRL + X, then Y, then ENTER).

4. Build and Start the Server
   sh
   npm run build
   pm2 start dist/server.js --name backend
   pm2 save

- Ensure it’s running:
  sh
  pm2 list

# 7️⃣ Deploy the Next.js Frontend

1. Clone The Frontend Repository
   sh
   cd /var/www/
   git clone https://github.com/your-username/your-frontend-repo.git frontend
   cd frontend

2. Install Dependencies
   sh
   npm install

3. Configure Environment Variables

- Create a .env file:
  sh
  nano .env
- Add:
  env:

  NEXT_PUBLIC_API_URL=http://your-vps-ip:4000

- Save and exit (CTRL + X, then Y, then ENTER).

4. Build and Start the App
   sh
   npm run build
   pm2 start npm --name frontend -- start
   pm2 save

# 8️⃣ Set Up NGINX as a Reverse Proxy

1. Install NGINX
   sh
   apt install nginx -y

2. Configure NGINX

- Open NGINX config:
  sh
  nano /etc/nginx/sites-available/default

- Replace the contents with:
  nginx
  server {
  listen 80;
  server_name yourdomain.com;

      location /api/ {
          proxy_pass http://localhost:4000/;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }

      location / {
          proxy_pass http://localhost:3000/;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }

  }

- Save and exit.

3. Restart NGINX
   sh
   systemctl restart nginx

# 9️⃣ Secure the Server with SSL (Let's Encrypt)

1. Install Certbot
   sh
   apt install certbot python3-certbot-nginx -y

2. Generate SSL Certificate
   sh
   certbot --nginx -d yourdomain.com -d www.yourdomain.com

- Follow the instructions and choose option 2 (redirect HTTP to HTTPS).

3. Renew SSL Automatically
   sh
   certbot renew --dry-run

# 🔟 Final Steps

- Enable Firewall
  sh
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw enable

- Check Services
  sh
  pm2 list
  systemctl status nginx
  systemctl status postgresql

Your App is Live

Frontend: https://yourdomain.com
Backend: https://yourdomain.com/api

# 🚀 Summary

Task Command
Connect to VPS - ssh root@your-vps-ip
Install PostgreSQL - apt install postgresql -y
Create Database - sudo -u postgres psql
Install Node.js - apt install nodejs -y
Run Backend - pm2 start dist/index.js --name backend
Run Frontend - pm2 start npm --name frontend -- start
Setup Reverse Proxy - nano /etc/nginx/sites-available/default
Install SSL - certbot --nginx -d yourdomain.com

# Now your Next.js + Node.js + PostgreSQL app is running on Namecheap VPS with NGINX reverse proxy and HTTPS! 🎉

- Yes, in this setup, the frontend (Next.js) will be accessible at https://yourdomain.com, while the backend (Node.js/Express.js) will be available at https://yourdomain.com/api.

# How This Works:

- The NGINX reverse proxy routes traffic:
  Requests to / go to the Next.js frontend.
  Requests to /api/ go to the Node.js backend.
- This keeps everything under one domain (yourdomain.com), making it easier to manage.
