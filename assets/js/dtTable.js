class DtTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dtData:{
				names:{
					condition : ["condition1","condition2", "condition3"],
					action : ["action1","action2"]
				},

				rules:[
					{
						condition : ["con11","con21"," "],
						action : ["act11"," "]
					},
					{
						condition : ["con12","con22",""],
						action : ["act12"," "]
					}
				]					
			}
		}
	};
	render(){
		return(
			<table>
				<Theader myRuleIndex={this.state.dtData.rules}/>
				<Condition myCondition={this.state.dtData.names.condition} myConRule={this.state.dtData.rules}/>
				<Action myAction={this.state.dtData.names.action} myActionRule={this.state.dtData.rules}/>
			</table>
		);
	}
}

class Theader extends React.Component{
	render(){
		return(
			<thead>
				<tr>
					<th></th>
					<th></th>
					{this.props.myRuleIndex.map((rule,index) => {
						return(
							<th>{index+1}</th>
						);
					})}					
				</tr>
			</thead>
		);
	}
}

class Condition extends React.Component{	
	render(){		
		return(			
			<tbody>
				{
					this.props.myCondition.map((conData, conIndex) => {
						return (							
							<tr key={conIndex}>
							<th>{conIndex+1}</th>
							<td>{conData}</td>
							{this.props.myConRule.map((ruleConData, ruleIndex) => {
								return(
									<td>{ruleConData.condition[conIndex]}</td>
								);
							})}
							</tr>
						);          			
       				})
				}
			</tbody>		
		);
	}
}

class Action extends React.Component{
	render(){
		return(
			<tbody>
				{
					this.props.myAction.map((actionData, actionIndex) => {
						return (
							<tr key={actionIndex}>
							<th>{actionIndex+1}</th>
							<td>{actionData}</td>
							{this.props.myActionRule.map((ruleActionData, ruleIndex) => {
								return(
									<td>{ruleActionData.action[actionIndex]}</td>
								);
							})}
							</tr>
						);          			
       				})
				}	
			</tbody>		
		);
	}
}


ReactDOM.render(<DtTable />, document.getElementById('center'));