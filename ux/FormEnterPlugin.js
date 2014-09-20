/**
 * Author: Rodrigo Krummenauer do Nascimento
 * Site  : www.rkn.com.br
 * Email : rodrigoknascimento@gmail.com
 * 
 * Version: 1.0
 * License: GPLv3
 **/

/**
 * USAGE MODE OF Ext.ux.FormEnterPlugin (ptype: 'formenter')
 *
 *	var simple = Ext.create('Ext.form.Panel', {
 *		title: 'Simple Form',
 *		width: 350,
 *		plugins: [{
 *			ptype: 'formenter'
 *		}],
 *		fieldDefaults: {
 *			msgTarget: 'side',
 *			labelWidth: 75
 *		},
 *		defaultType: 'textfield',
 *		defaults: {
 *			anchor: '100%'
 *		},
 *		items: [{
 *			fieldLabel: 'First Name',
 *			name: 'first',
 *			allowBlank:false
 *		},{
 *			xtype: 'hidden',
 *			fieldLabel: 'Last Name',
 *			name: 'last'
 *		},{
 *			fieldLabel: 'Company',
 *			disabled: true,
 *			name: 'company'
 *		}, {
 *			fieldLabel: 'Email',
 *			name: 'email',
 *			vtype:'email'
 *		}, {
			xtype: 'datefield',
			fieldLabel: 'Birth Date',
			name: 'dob',
			format: 'm/d/Y',
			submitFormat: 'Y-m-d',
			altFormats: 'mdY|m d Y'
		}, {
 *			xtype: 'timefield',
 *			fieldLabel: 'Time',
 *			name: 'time',
 *			minValue: '8:00am',
 *			maxValue: '6:00pm'
 *		}],
 *		buttons: [{
 *			text: 'Save'
 *		},{
 *			text: 'Cancel'
 *		}]
 *	});
 *
 *	simple.render(document.body);
 * 
 **/

Ext.define('Ext.ux.FormEnterPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias : 'plugin.formenter',
	
	init: function (form)
	{
		this.form = form;
		this.form.on('render', this.onFormRender, this);
	},
	
	onFormRender: function()
	{
		this.form.getEl().on('keyup', this.onFormElKeyUp, this)
	},
	
	onFormElKeyUp: function(e, el)
	{
		if (e.getKey() === e.ENTER) {
			var me     = this,
				fields = me.form.getForm().getFields(),
				index  = fields.findIndex('name', el.getAttribute('name')),
				nField = null;
			
			me.onFieldLoseFocus(fields.getAt(index), e);
			
			do
			{
				nField = fields.getAt(e.hasModifier() ? --index : ++index);
			}
			while (!this.focusIf(nField, true, true) && index < fields.length && index >= 0)
		}
	},
	
	onFieldLoseFocus: function(field, e) 
	{
		e.keyCode = Ext.EventObject.TAB;

		field.fireEvent('specialkey', field, e);
	},
	
	focusIf: function(field, select, delay)
	{
		if(!(Ext.isEmpty(field) || field.isHidden() || field.isDisabled() || field.isXType('hiddenfield')))
			return field.focus(select, delay);
		
		return false;
	}
})