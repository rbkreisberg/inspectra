/*global define */
define([
	 'jquery'
	,'underscore'
	,'model/graph'
	,'vis/inspectra'
], function ($, _, graphModel, inspectra) {
    'use strict';

	var insp;
	var loadSuccess = false;

	var Application = {
		initialize : function(callback) {
			// var graphInput = {
			// 			nodes: [ 
			// 			{ id:'0', x: 10, y:10},
			// 			{ id:'1', x: 12, y:20},
			// 			{ id:'2', x: 11, y:15},
			// 			{ id:'3', x: 35, y:12},
			// 			{ id:'4', x: 37, y:18}
			// 			],
			// 			edges: [
			// 			{ id: '0-1', source: '0', target : '1', color: '#00FF00'},
			// 			{ id: '2-1', source: '2', target : '1', color: '#00FF00'},
			// 			{ id: '3-4', source: '3', target : '4', color: '#FF0000'},
			// 			{ id: '1-4', source: '1', target : '4', color: '#FF0000'},
			// 			{ id: '0-3', source: '0', target : '3', color: '#FF0000'}
			// 			]
			// };
			var graph;

			$.getJSON('data/test3.json', {
				format: "json"
			})
			.done(function(data){
				graph = graphModel(data);
				insp = inspectra('#main_graph').populate(graph);
				loadSuccess = true;
			})
			.fail(function() {
				loadSuccess = false;
			})
			.always(function() {
				callback();
			})
			$('#opacity-slider').empty().slider({
				min: 0,
				max: 1,
				value: 0.5,
				range: 'min',
				orientation: 'horizontal',
				step: 0.05,
				slide: function(evt, ui) {
					var val = Math.round(ui.value*100)/100;
					$('#opacity').val(val);
				},
				stop: function(evt, ui) {
					var val = Math.round(ui.value*100)/100;
					$('#opacity').val(val);
					insp.vis.drawingProperties({edgeAlpha: val}).draw();
				}
			});
			$( "#opacity" ).val( $( "#opacity-slider" ).slider( "value" ) );
		},
		start : function() {
			if (!loadSuccess) { return; }
			insp.draw();
		}
	};
	return Application;
});