const fs = require('fs');

module.exports = {
	name: 'timezone',
	description: '**ADDING A TIMEZONE**\nTo add a timezone to your username use the following command: ```css\n!v timezone <timezone>```. Replace **<timezone>** with a timezone abbreviation.\n\nYou can find a list of valid timezones here: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations \n\n**REMOVING A TIMEZONE**\nYou can remove the timezone using !v timezone reset',
	args: true,
	usage: '<add> <timezone> or <remove>',
	execute(message, args) {

		const array = fs.readFileSync(process.cwd() + "\\commands\\timezones.txt").toString();
		const timezone = args[1].toString().toUpperCase();
		const newUser = (message.author.username + " (" + timezone + ")");
		
		// If user DMs the bot it will send an error message
		if (message.channel.type == 'dm')
		return message.author.send('Please use the #bot-commands channel to interact with me.');
		// Handle permission error for permission error when owner attempts name change
		if (message.author.id === message.guild.ownerID)
		return message.author.send('I am terribly sorry about this, but I am unable to change the nickname of a server owner.');
		// Reset username back to their default Discord name, notify the user and then delete the user's command message
		if (args[0] === 'add'){
			if (array.includes(timezone)) {
				message.member.setNickname(newUser);
				message.author.send('I have added the timezone: ' + timezone);
			} else return message.author.send('That is not a valid timezone. Please refer to the following link for a valid list: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations');
		}
		else if (args[0] === 'remove') {
			message.member.setNickname(message.author.username);
			message.author.send('I have reset your name.');
			return;
		}
	}
};