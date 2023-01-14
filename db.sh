docker exec -it pos-mongo1 mongosh

rs.initiate({
	_id: "rs0",
	members: [
		{ _id: 0, host: "pos-mongo1:27017" },
		{ _id: 1, host: "pos-mongo2:27017" },
		{ _id: 2, host: "pos-mongo3:27017" },
	],
});

use api;

db.createCollection('users');

db.users.insertMany([
	{
		name: "rest",
		username: "rest",
		role: "admin",
		password: "U2FsdGVkX19OrHjFCoPR27eknjwTVGTuwZkrDtIUxwE="
	},
	{
		name: "nast",
		username: "nast",
		role: "kasir",
		password: "U2FsdGVkX19OrHjFCoPR27eknjwTVGTuwZkrDtIUxwE="
	}
]);