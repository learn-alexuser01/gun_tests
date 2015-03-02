var log = function() { window.console.log.apply(window.console, arguments); };

var log2 = function(txt) { return log(txt); };

localStorage.clear();

//var gun = window.Gun('http://stage.sl.pt:1337/');
var gun = window.Gun();

var forKV = function(o, cb) {
	for (var k in o) {
		if (!o.hasOwnProperty(k)) { continue; }
		cb(k, o[k]);
	}
};

var rndId = function() {
	return 'rnd' + ~~( Math.random() * 1000000 );
};



var c;

var drawGraph = function() {
	if (c) {
		document.body.removeChild(c);
	}

	var nodes = [];
	var edges = [];

	//gun.__.keys;

	forKV(gun.__.graph, function(id, n) {
		nodes.push({ // NODE
			id: id,
			label: id.substring(0, 6),
			//label: id,
			backgroundColor: '#FCC'
		});

		forKV(n, function(k2, val) {
			var id2 = rndId();

			if (typeof val === 'object') {
				if (k2 === '_') { return; }

				return edges.push({ // EDGE BETWEEN NODES
					from: id,
					to:   val['#'],
					label: k2,
					lineWidth: 2,
					lineColor: '#F0F'
				});
			}

			nodes.push({ // SIMPLE PROPERTY (String|Number|Boolean)
				id: id2,
				label: '' + val,
				backgroundColor: '#CCC'
			});

			edges.push({ // EDGE BETWEEN NODE AND PROPERTY
				from: id,
				to:   id2,
				label: k2,
				lineWidth: 2,
				lineColor: '#000',
				fontStyle: 'bold'
			});
		});
	});

	forKV(gun.__.keys, function(index, o) {
		nodes.push({ // INDEX NODE
			id: index,
			label: index,
			backgroundColor: '#CFC'
		});

		edges.push({ // EDGE BETWEEN INDEX NODE AND REGULAR NODE
			from: index,
			to:   o._['#']
		});
	});

	c = graph({
		nodes: nodes,
		edges: edges,
		layout: {
			// rankdir: 'TB',
			// nodesep: 50,
			// edgesep: 10,
			// ranksep: 50,
			marginx: 10,
			marginy: 10,

			nodes: {
				fontFamily:      'sans-serif',
				fontHeight:      14,
				fontStyle:       '', // '' | 'bold' | 'italic' | 'bold italic'
				padding:         6,
				labelColor:      '#000',
				backgroundColor: '#EEE'
			},

			edges: {
				fontFamily: 'sans-serif',
				fontHeight: 12,
				fontStyle:  'bold', // '' | 'bold' | 'italic' | 'bold italic'
				padding:    1,
				lineWidth:  1,
				lineColor:  '#777',
				labelColor: '#000'
			}
		}
	});

	document.body.appendChild(c);
};

setInterval(drawGraph, 2000);
