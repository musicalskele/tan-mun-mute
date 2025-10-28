PlayerEvents.chat((event) => {

	if (event.message.startsWith("/"))
		return;

	const words = event.message.toLowerCase().match(/[a-z]+/g) ?? [];
	if (words.length === 0)
		return;

	let index = 0;
	let speed = 0.5;

	loopOverTime(() => {
		if (index === words.length)
			return -1;

		const current = words[index];
		const sound = getSoundIdFromKey(current);

		index++;
		if (sound === '') {
			speed = Math.min(0.5, speed * 1.13);
			return speed * 0.6 * SECOND;
		}

		
		
		const pitch = (Math.random() * 0.4 + 0.8).toFixed(2);
		Utils.server.runCommandSilent(`execute at @a run playsound ${sound} voice @a ~ ~ ~ 1 ${pitch}`);
		Utils.server.runCommandSilent(`advancement grant ${event.player.name} only rosadatapack:wtf_was_that`);
		
		speed *= 0.96;
		return speed * SECOND;
	});
});

function loopOverTime(ctx) {
	const time = ctx();
	if (time < 0)
		return;
	Utils.server.schedule(time, () => {
		loopOverTime(ctx);
	});
}

function getSoundIdFromKey(key) {
	switch (key) {
		case 'meow': case 'mnya': case 'mnyaa': case 'nyaa': case 'nya':
			return 'entity.cat.ambient';
		case 'mrow': case 'mreow':
			return 'entity.cat.purreow';
		case 'purr':
			return 'entity.cat.purr';
		case 'bark': case 'woof':
			return 'entity.wolf.ambient';
		case 'whine': case 'whimper':
			return 'entity.wolf.whine';
		case 'baa':
			return 'entity.sheep.ambient';
		case 'moo':
			return 'entity.cow.ambient';
		default:
			return '';
	}
}
