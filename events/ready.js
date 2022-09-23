const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
		{ name: `L30 - RJRP`, type: ActivityType.Listening },
		{ name: `Rio de Janeiro Roleplay 1.0`, type: ActivityType.Playing },
		{ name: `${client.users.cache.size} Jogadores`, type: ActivityType.Watching },
		{ name: `Seu destino é aqui!`, type: ActivityType.Competing }
	];
	const status = [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	console.log(chalk.red(`Conectado em ${client.user.tag}!`))
});