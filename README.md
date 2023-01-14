# mern-starter

# Cara install
1. cp /backend/env-example /backend/.env
2. docker compose build
3. docker compose up -d

# Initiate Replica Set Mongo DB
1. buka file db.sh
2. jalankan container salah satu db dengan command "docker exec -it pos-mongo1 mongosh" *mongosh bisa diganti mongod atau mongo tergantung client mana yang digunakan
3. lalu copas satu per satu

Gunakan Postman untuk mengetes apakah backend sudah berjalan atau belum
endpointnya = localhost:5000/api/v1/login
payloadnya :
username: "rest"
password: "123qweasd"

Jika bakend belum berjalan dengan normal, coba di build ulang
Jalankan :
docker compose down
lalu
docker compose up -d
