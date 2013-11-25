
//
// Define the 'app' module.
//
angular.module('app', ['flowChart', ])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {

	//
	// Code for the delete key.
	//
	var deleteKeyCode = 46;

	//
	// Selects the next node id.
	//
	var nextNodeID = 10;

	//
	// Setup the data-model for the chart.
	//
	var chartDataModel = {

		nodes: [
			{
				name: "Example Node 1",
				id: 0,
				x: 0,
				y: 0,
				inputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
				outputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
			},

			{
				name: "Example Node 2",
				id: 1,
				x: 400,
				y: 200,
				inputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
				outputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
			},

		],

		connections: [
			{
				source: {
					nodeID: 0,
					connectorIndex: 1,
				},

				dest: {
					nodeID: 1,
					connectorIndex: 2,
				},
			},


		]
	};

	//
	// Event handler for key-up on the flowchart.
	//
	$scope.keyUp = function (evt) {

		if (evt.keyCode === deleteKeyCode) {
			//
			// Delete key.
			//
			$scope.chartViewModel.deleteSelected();
		}
	};

	//
	// Add a new node to the chart.
	//
	$scope.addNewNode = function () {

		var nodeName = prompt("Enter a node name:", "New node");
		if (!nodeName) {
			return;
		}

		//
		// Template for a new node.
		//
		var newNodeDataModel = {
			name: nodeName,
			id: nextNodeID++,
			x: 0,
			y: 0,
			inputConnectors: [ 
				{
                    name: "X"
                },
                {
                    name: "Y"
                },
                {
                    name: "Z"
                }			
			],
			outputConnectors: [ 
				{
                    name: "1"
                },
                {
                    name: "2"
                },
                {
                    name: "3"
                }			
			],
		};

		// 
		// Update the data model.
		//
		$scope.chartViewModel.data.nodes.push(newNodeDataModel);

		// 
		// Update the view model.
		//
		$scope.chartViewModel.nodes.push(new flowchart.NodeViewModel(newNodeDataModel));		
	};

	//
	// Add an input connector to selected nodes.
	//
	$scope.addNewInputConnector = function () {
		var connectorName = prompt("Enter a connector name:", "New connector");
		if (!connectorName) {
			return;
		}

		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			var connectorDataModel = {
				name: connectorName,
			};

			var connectorViewModel = new flowchart.InputConnectorViewModel(connectorDataModel, node.inputConnectors.length, node);

			// Add to node's data model.
			node.data.inputConnectors.push(connectorDataModel);

			// Add to node's view model.
			node.inputConnectors.push(connectorViewModel);
		}
	};

	//
	// Add an output connector to selected nodes.
	//
	$scope.addNewOutputConnector = function () {
		var connectorName = prompt("Enter a connector name:", "New connector");
		if (!connectorName) {
			return;
		}

		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			var connectorDataModel = {
				name: connectorName,
			};

			var connectorViewModel = new flowchart.OutputConnectorViewModel(connectorDataModel, node.outputConnectors.length, node);

			// Add to node's data model.
			node.data.outputConnectors.push(connectorDataModel);

			// Add to node's view model.
			node.outputConnectors.push(connectorViewModel);
		}
	}


	//
	// Create the view-model for the chart and attach to the scope.
	//
	$scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
})
;
