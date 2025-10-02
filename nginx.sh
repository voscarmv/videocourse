#!/bin/bash

sudo apt update
sudo apt install nginx -y

cat << EOF > /etc/nginx/sites-available/vite
server {
    listen 80;
    server_name cursia.duckdns.org;  # replace with your domain

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/vite /etc/nginx/sites-enabled/
sudo nginx -t   # test config
sudo systemctl reload nginx

sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d cursia.duckdns.org

cat << EOF > /etc/nginx/sites-available/cursia.lat
server {
    listen 80;
    server_name cursia.lat www.cursia.lat;

    location / {
        proxy_pass http://127.0.0.1:5173;   # or your app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/cursia.lat /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx -d cursia.lat -d www.cursia.lat

# Edit cursia.lat to look like this
#server {
#    server_name cursia.lat www.cursia.lat;
#
#    location / {
#        proxy_pass http://127.0.0.1:5173;
#        proxy_http_version 1.1;
#        proxy_set_header Upgrade $http_upgrade;
#        proxy_set_header Connection 'upgrade';
#        proxy_set_header Host $host;
#        proxy_set_header X-Real-IP $remote_addr;
#        proxy_cache_bypass $http_upgrade;
#    }
#
#    listen 443 ssl; # managed by Certbot
#    ssl_certificate /etc/letsencrypt/live/cursia.lat/fullchain.pem; # managed by Certbot
#    ssl_certificate_key /etc/letsencrypt/live/cursia.lat/privkey.pem; # managed by Certbot
#    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
#
#
#}
#server {
#
#    listen 80;
#    server_name cursia.lat www.cursia.lat;
#    # return 404; # managed by Certbot
#    return 301 https://$host$request_uri;
#}
#
# namecheap dns records:
# CNAME Record  @ cursia.duckdns.org. Automatic
# CNAME Record  www cursia.duckdns.org. Automatic
