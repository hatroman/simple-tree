/**
 * @class
 * @requires class-extend.js
 * @requires modifiable.js
 * @requires templates.js
 * @requires dataProvider.js
 */


var Tree = Class.extend([TreeDomHelpersMixin, ModifiableMixin], {

	/**
	 * @param root {jQuery} корневой элемент
	 * @param dataProvider {SimpleDataProvider} провайдер данных
	 * @param templates {Templates} объект с шаблонами
	 * @constructor
	 */
	init: function(root, dataProvider, templates){
		this.dataProvider = dataProvider;
		this.templates = templates;

		var _this = this;

		root.on('click', this.buildClass('expand'), function (e) {
			_this._onClick.call(_this, e, { treeNodeElem: _this.getTreeNode($(this)) });
		});

		root.on('change', this.buildClass('input'), function (e) {
			_this._onCheck.call(_this, e, {checkboxElem: $(this)});
		});

		// первичное представление дерева можно строить на сервере,
		// в данном случае строим прямо в браузере
		this._buildDescendantsHtml(root);
	},

	_onClick: function(e, data) {
		var _this = this;
		this._loadIfNeed(data.treeNodeElem, _this.findContainer(data.treeNodeElem), function() {
			_this._setLoaded(data.treeNodeElem);
			_this._setCheckedDescendants(data.treeNodeElem, _this.findCheckbox(data.treeNodeElem));
		});
		this.toggleMod(data.treeNodeElem, this.name, 'expand', 'opened', 'closed');
	},

	_onCheck: function(e, data) {
		this._setCheckedAncestors(data.checkboxElem);
		this._setCheckedDescendants(this.getTreeNode(data.checkboxElem), data.checkboxElem);
	},

	_setCheckedDescendants: function(treeNodeElem, checkbox) {
		var descendants = this.findDescendantCheckboxes(treeNodeElem);
		if (checkbox.attr('checked'))
			descendants.attr('checked', '');
		else
			descendants.removeAttr('checked')
	},

	_setCheckedAncestors: function(checkbox) {
		do {
			var needCheckParent = checkbox.attr('checked') == 'checked';

			this.findSiblingCheckboxes(checkbox).each(function(n, el) {
				needCheckParent = needCheckParent && el.checked;
			});

			//берем чекбокс из родителя
			checkbox = this.findParentCheckbox(checkbox);

			if (needCheckParent) checkbox.attr('checked', '');
			else checkbox.removeAttr('checked');

		} while(checkbox.length);
	},

	_loadIfNeed: function(domElem, containerElem, onLoad) {
		!this.hasMod(domElem, this.name, 'container', 'loaded') &&
			this._buildDescendantsHtml(containerElem, onLoad, function(errorMsg) { console.log(errorMsg); });
	},

	_setLoaded: function(domElem) {
		this.setMod(domElem, this.name, 'container', 'loaded')
	},

	_buildDescendantsHtml: function(container, success, error) {

		var _this = this;
		this.dataProvider.getNodes( container.data('nodes-id') )
			.done(function(dataNodes) {
				var frag = $('<div></div>');
				$(dataNodes).each(function(i, node) {
					var tmpl = _this.templates[node.nodesId ? 'container-node' : 'leaf-node'];
					try{ frag.append(tmpl($.extend({content: '', nodesId: ''}, node))); }
					catch(e) { console.log(node.content, e); }
				});
				container.html(frag.html());

				success && success();
			})
			.fail(function(msg) {
				container.html(_this.templates.error);
				error && error(msg);
			});

	}
});


