// можно использовать асинхронный дата-провайдер с ajax-запросами.
// этот просто для примера.
var SimpleDataProvider = function() {
	this.getNodes = function(id) {
		var d = $.Deferred();
		if (id && treeData[id] && treeData[id].length)
			d.resolve(treeData[id]);
		else
			d.reject('data is null');
		return d.promise();
	}
};


// это можно докачивать с сервера
var treeData = {
	root: [
		{ content: 'Россия', nodesId: 'russia' },
		{ content: 'СНГ (исключая Россию)' },
		{ content: 'Европа' },
		{ content: 'Азия' },
		{ content: 'Африка' },
		{ content: 'Северная Америка' },
		{ content: 'Южная Америка' },
		{ content: 'Австралия и Океания', nodesId: 'australia' }
	],
	russia: [
		{content: 'Центр'},
		{content: 'Северо-Запад'},
		{content: 'Поволжье'},
		{content: 'Юг'},
		{content: 'Сибирь'},
		{content: 'Дальний Восток'},
		{content: 'Северный Кавказ', nodesId: 'russia-caucasus'},
		{content: 'Урал', nodesId: 'russia-ural'}
	],
	'russia-ural': [
		{content: 'Екатеринбург и Свердловская область', nodesId: 'russia-ural-ekb'},
		{content: 'Курган и область'},
		{content: 'Тюмень и область'},
		{content: 'Ханты-Мансийский АО'},
		{content: 'Челябинск и область'},
		{content: ' Ямало-Ненецкий АО'}
	],
	'russia-ural-ekb': [
		{content: 'Екатеринбург'},
		{content: 'Каменск-Уральский'},
		{content: 'Нижний Тагил'},
		{content: 'Первоуральск'}
	],

	'russia-caucasus': [
		{content: 'Карачаево-Черкесская Республика'},
		{content: 'Республика Дагестан'},
		{content: 'Республика Ингушетия'},
		{content: 'Республика Кабардино-Балкария'},
		{content: 'Республика Северная Осетия-Алания'},
		{content: 'Ставропольский край', nodesId: 'russia-caucasus-stavropol'},
		{content: 'Чеченская Республика'}
	],
	'russia-caucasus-stavropol': [
		{content: 'Ессентуки'},
		{content: 'Кисловодск'},
		{content: 'Минеральные Воды'},
		{content: 'Невинномысск'},
		{content: 'Пятигорск'},
		{content: 'Ставрополь'}
	],
	australia: [
		{content: 'Австралия'},
		{content: 'Новая Зеландия'}
	]
};