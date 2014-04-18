define([
		'marionette'
		, 'text!../../../templates/marionette/collectionView.tpl'
], function (Marionette, Template){
    var CollectionView = Marionette.CollectionView.extend({
				template: Template,
				tagName: 'div',
				className: 'box'
    });

    return CollectionView;
});
