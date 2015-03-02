

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
	layout: { // https://github.com/cpettitt/dagre/wiki#configuring-the-layout
		rankdir: 'TB',
		nodesep: 50,
		edgesep: 10,
		ranksep: 50,
		marginx: 10,
		marginy: 10
	}
});
```
