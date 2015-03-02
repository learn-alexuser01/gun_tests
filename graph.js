function graph(o) {
	// https://github.com/cpettitt/dagre/wiki#using-dagre

	var g = new dagre.graphlib.Graph();

	g.setGraph({});

	// Default to assigning a new object as a label for each new edge.
	g.setDefaultEdgeLabel(function() { return {label:'x'}; });
	//g.setDefaultNodeLabel(function() { return {label:'xc'}; });

	var nodeFont = 'sans-serif';
	var nodeFontHeight = 14;
	var nodePadding = 6;
	var nodeLabelColor = '#000';
	var nodeBackgroundColor = '#EEE';

	var edgeFont = 'sans-serif';
	var edgeFontHeight = 12;
	var edgePadding = 2;
	var edgeLineColor = '#777';
	var edgeLineWidth = 1;
	var edgeLabelColor = '#000';

	// https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
	var canvasEl = document.createElement('canvas');

	var ctx = canvasEl.getContext('2d');

	ctx.font = nodeFontHeight + 'px sans-serif';

	var merge = function(to, from) {
		for (var k in from) {
			if (!(k in to)) {
				to[k] = from[k];
			}
		}
		return to;
	};

	var clone = function(o) {
		return JSON.parse( JSON.stringify(o) );
	};

	var box = function(txt, opts) {
		var o = {
			label:  txt,
			width:  ctx.measureText(txt).width + nodePadding*2,
			height: nodeFontHeight + nodePadding*2
		};
		return merge(o, opts);
	};

	o.nodes.forEach(function(n) {
		var o = clone(n); delete o.id; delete o.label;
		g.setNode(n.id, box(n.label), o);
	});

	o.edges.forEach(function(e) {
		var o = clone(e); delete o.from; delete o.to;
		g.setEdge(e.from, e.to, o);
	});

	dagre.layout(g, {}); // https://github.com/cpettitt/dagre/wiki#configuring-the-layout

	var dims = g.graph();
	canvasEl.setAttribute('width',  Math.ceil(dims.width));
	canvasEl.setAttribute('height', Math.ceil(dims.height));

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	
	ctx.lineCap = 'round';
	ctx.lineJoint = 'round';

	var forKV = function(o, cb) {
		for (var k in o) {
			if (!o.hasOwnProperty(k)) { continue; }
			cb(k, o[k]);
		}
	};

	var r30 = Math.PI/6;

	var arrowEnd = function(last, prev, head) {
		var ang = Math.atan2(last.y-prev.y,last.x-prev.x);
		ctx.beginPath();
		ctx.moveTo(last.x-head*Math.cos(ang-r30),last.y-head*Math.sin(ang-r30));
		ctx.lineTo(last.x, last.y);
		ctx.lineTo(last.x-head*Math.cos(ang+r30),last.y-head*Math.sin(ang+r30));
		ctx.stroke();
	};

	var line = function(points) {
		ctx.beginPath();
		points.forEach(function(p, i) {
			ctx[ i === 0 ? 'moveTo' : 'lineTo' ](p.x, p.y);
		})
		ctx.stroke();
	};

	ctx.font = edgeFontHeight + 'px sans-serif';

	forKV(g._edgeLabels, function(k, v) {
		//console.log(k, v);

		ctx.lineWidth = v.lineWidth || edgeLineWidth;
		ctx.strokeStyle = v.lineColor || edgeLineColor;

		line(v.points);
		var l = v.points.length - 1;
		arrowEnd(v.points[l], v.points[--l], 8);
		if ('label' in v) {
			var p = v.points[1];
			var w = ctx.measureText(v.label).width;
			var h = edgeFontHeight;
			var ep = edgePadding;

			ctx.clearRect(p.x-w/2-ep, p.y-h/2-ep, w+ep*2, h+ep*2);

			ctx.fillStyle = v.labelColor || edgeLabelColor;
			ctx.fillText(v.label, p.x, p.y);
		}
	});

	ctx.font = nodeFontHeight + 'px sans-serif';

	forKV(g._nodes, function(k, v) {
		//console.log(k, v);
		ctx.fillStyle = v.backgroundColor || nodeBackgroundColor;
		ctx.fillRect(v.x-v.width/2, v.y-v.height/2, v.width, v.height);

		ctx.fillStyle = v.labelColor || nodeLabelColor;
		ctx.fillText(v.label, v.x, v.y);
	});

	return canvasEl;
};
