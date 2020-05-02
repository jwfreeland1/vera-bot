const fs = require('fs');

module.exports = {
	name: 'region',
    description: 'Set user\'s Region',
    args: true,
    usage: '<add/remove> <region>',
	execute(message, args) {

        const json = fs.readFileSync(process.cwd() + "/commands/roles.json");
        const array = fs.readFileSync(process.cwd() + "/commands/regions.txt").toString();
        let regionData = JSON.parse(json);
        let userRegion = args[1].toString().toUpperCase();

        console.log(regionData[userRegion]);

        // If user DMs the bot it will send an error message
        if (message.channel.type == 'dm')
        return message.author.send('Please use the #bot-commands channel to interact with me.');
        // Handle permission error for when owner or mod attempts to use command
        if (message.author.id === message.guild.ownerID)
        return message.author.send('I am terribly sorry about this, but I am unable to change the role of a server owner.');
        if (message.member.roles.cache.has('700052590632763443'))
        return message.author.send('I am terribly sorry about this, but I am unable to change the role of a mod.');
        // Check whether user is submitting an add or remove command then check against array to ensure it's valid
        if (args[0].toLowerCase() === 'add') {
            if (array.includes(userRegion)) {
                message.member.roles.add(regionData[userRegion]).catch(e => {
                    console.error('ERROR: Role ID does not exist');
                    message.author.send('**ERROR!** That is not a valid Region on this server');
                    return;
                });
            } else message.author.send('I have added you to the ' + userRegion + ' group.').catch(() => message.reply(' I have added you to the ' + userRegion + ' group.'));
        } else if (args[0].toLowerCase() === 'remove'){
            if (array.includes(userRegion)) {
                message.member.roles.remove(regionData[userRegion]).catch(e => {
                    console.error('ERROR: Role ID does not exist');
                    message.author.send('**ERROR!** That is not a valid Region on this server');
                    return;
                });
            } else message.author.send('I have removed you from the ' + userRegion + ' group.').catch(() => message.reply(' I have removed you from the ' + userRegion + ' group.'));
        }
    }
};