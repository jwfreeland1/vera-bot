const fs = require('fs');

module.exports = {
	name: 'region',
    description: 'Set user\'s Region',
    args: true,
    usage: '<add/remove> <region>',
	execute(message, args) {

        const array = fs.readFileSync(process.cwd() + "\\commands\\roles.txt").toString();
        const region = args[1].toString().toUpperCase();
        let role = message.guild.roles.cache.find(role => role.name === region);


        // If user DMs the bot it will send an error message
        if (message.channel.type == 'dm')
        return message.author.send('Please use the #bot-commands channel to interact with me.');
        // Handle permission error for permission error when owner attempts name change
        if (message.author.id === message.guild.ownerID)
        return message.author.send('I am terribly sorry about this, but I am unable to change the nickname of a server owner.');
        // Check whether user is submitting an add or remove command then check against array to ensure it's valid
        if (args[0].toLowerCase() === 'add') {
            if (array.includes(region)) {
                message.member.roles.add(role);
                message.author.send('I have added you to the ' + region + ' group.');
            } else return message.author.send('**ERROR!** That is not a valid Region');
        }
        else if (args[0] === 'remove'){
            if (array.includes(region)) { array.
                message.member.roles.remove(role);
                message.author.send('I have removed you from the ' + region + ' group.');
            } else return message.author.send('**ERROR!** That is not a valid Region');
        }
    }
};