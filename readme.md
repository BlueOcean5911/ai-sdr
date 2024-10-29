# AI SDR APP Frontend

## prerequisite

- node: v20.18.0 (LTS)

### install nodejs

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl gnupg
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Check node version

node -v

## Command

- without docker

```bash
git clone git@github.com:passsion-pioneers/aivio-frontend.git
cd aivio-frontend
npm i
npm run build
```

Step 2: Configure Nginx

```bash
sudo apt update
sudo apt install nginx
cd /etc/nginx/sites-available
sudo nano app.aivio.io
```

```bash
server {
    listen 80;
    server_name 52.0.21.110 app.aivio.io;  # Replace with your actual domain name

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/app.aivio.io /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Step 3: Run Your Next.js Application

```bash
sudo npm install -g pm2
pm2 start npm --name "aivio-frontend" -- start
```

```bash
pm2 startup systemd
pm2 save
```

- Certbot

```bash
sudo snap install --classic certbot
sudo certbot --nginx -d app.aivio.io
```

- Test
