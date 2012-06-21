var ModifiableMixin = {
	toggleMod:  function (elem, blockName, modName, modVal1, modVal2) {
		elem.toggleClass([blockName, modName, modVal1].join('_'));
		elem.toggleClass([blockName, modName, modVal2].join('_'));
	},

	hasMod: function (elem, blockName, modName, modVal) {
		return elem.hasClass([blockName, modName, modVal].join('_'));
	},

	setMod: function (elem, blockName, modName, modVal) {
		elem.addClass([blockName, modName, modVal].join('_'));
	}
};

var TreeDomHelpersMixin = {
	name: 'treeNode',

	buildClass: function(elemName) {
		return '.' + this.name + '__' + elemName;
	},

	findCheckbox: function(elem) {
		return this.getTreeNode(elem).children().children( this.buildClass('input') );
	},

	findDescendantCheckboxes: function(elem) {
		return this.getTreeNode(elem).find( this.buildClass('input'));
	},

	findContainer: function(elem){
		return this.getTreeNode(elem).children( this.buildClass('container') );
	},

	findParentCheckbox: function(elem) {
		var parentContainer =  elem.closest( this.buildClass('container') );
		return this.findCheckbox( parentContainer );
	},

	findSiblingCheckboxes: function(elem) {
		return this.findCheckbox( this.getTreeNode(elem).siblings('.' + this.name) );
	},

	getTreeNode: function(elem) {
		return elem.hasClass(this.name) ? elem: elem.closest('.' + this.name);
	}
};