

# graph:


```javascript
// returns a canvas element
graph({

	nodes: [
		{id:'kspacey',   label:'Kevin Spacey'},
		{id:'swilliams', label:'Saul Williams'},
		{id:'bpitt',     label:'Brad Pitt', labelColor:'red', backgroundColor:'#DFD'},
		{id:'hford',     label:'Harrison Ford'},
		{id:'lwilson',   label:'Luke Wilson'},
		{id:'kbacon',    label:'Kevin Bacon'}
	],

	edges: [
		{from:'kspacey',   to:'swilliams', label:'a'},
		{from:'swilliams', to:'kbacon',    label:'b', lineColor:'orange', labelColor:'blue', lineWidth:5},
		{from:'bpitt',     to:'kbacon',    label:'c'},
		{from:'hford',     to:'lwilson',   label:'d'},
		{from:'lwilson',   to:'kbacon',    label:'e'}
	],

	// ALL UNITS ARE IN PIXELS! FONT SIZES TOO
	
	layout: { // https://github.com/cpettitt/dagre/wiki#configuring-the-layout

		rankdir: 'TB',
		nodesep: 50,
		edgesep: 10,
		ranksep: 50,
		marginx: 0,
		marginy: 0,

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
			fontStyle:  '', // '' | 'bold' | 'italic' | 'bold italic'
			padding:    1,
			lineWidth:  1,
			lineColor:  '#777',
			labelColor: '#000'
		}
	}
});
```
