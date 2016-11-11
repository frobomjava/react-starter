

class DtTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dtData:{
				names:{
					conditions : [""],
					actions : [""]
				},

				rules:[
					{
						conditions : [""],
						actions : [""]
					}			
				]					
			}
		}

		this.handler = this.handler.bind(this);		
	}; 

	handler(cellType,index,value,ruleIndex) {

    var dtDatas = this.state.dtData;

    switch (cellType)
    {
      case 'condition' : dtDatas.names.conditions[index] = value;
      break;

      case 'action' : dtDatas.names.actions[index] = value;
      break;

      case 'ruleCondition' : dtDatas.rules[ruleIndex].conditions[index] = value;
      break;

      case 'ruleAction' : dtDatas.rules[ruleIndex].actions[index] = value;
      break;
    }

    this.setState({dtData:dtDatas});
   	
		console.log(JSON.stringify(this.state.dtData));  
       
	}

	render(){
		return(
			<table>
				<Theader myRuleIndex={this.state.dtData.rules}/>
				<Condition myCondition={this.state.dtData.names.conditions} myConRule={this.state.dtData.rules} callbackParent={this.handler}/>
				<Action myAction={this.state.dtData.names.actions} myActionRule={this.state.dtData.rules} callbackParent={this.handler}/>
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
  constructor(props){
    super(props);
    this.conditionHandler = this.conditionHandler.bind(this);
  }
	render(){	
    return(			
			<tbody>
				{
					this.props.myCondition.map((conData, conIndex) => {
						return (					
							<tr key={conIndex}>
							 <th>{conIndex+1}</th>

                <Cell cellType="condition" index={conIndex} value={conData} callbackChild={this.conditionHandler}/>

                {
                  this.props.myConRule.map((ruleConData, ruleIndex) => {
								    return(                  
                      <Cell cellType="ruleCondition" index={conIndex} ruleIndex={ruleIndex} value={ruleConData.conditions[conIndex]} callbackChild={this.conditionHandler}/>									
								    );
							   })
                }
							</tr>
						);          			
       		})
				}
			</tbody>		
		);
	}

  conditionHandler(cellType,index,value,ruleIndex){    
    this.props.callbackParent(cellType,index,value,ruleIndex);
  } 
}

class Action extends React.Component{
  constructor(props){
    super(props);
    this.actionHandler = this.actionHandler.bind(this);
  }
	render(){
		return(
			<tbody>
				{
					this.props.myAction.map((actionData, actionIndex) => {
						return (
							<tr key={actionIndex}>
							<th>{actionIndex+1}</th>
              <Cell cellType="action" index={actionIndex} value={actionData} callbackChild={this.actionHandler}/>
						
							{
                this.props.myActionRule.map((ruleActionData, ruleIndex) => {
								  return(
                    <Cell cellType="ruleAction" index={actionIndex} ruleIndex={ruleIndex} value={ruleActionData.actions[actionIndex]} callbackChild={this.actionHandler}/>
									);
							 })
              }
							</tr>
						);          			
       		})
				}	
			</tbody>		
		);
	}

   actionHandler(cellType,index,value,ruleIndex){    
    this.props.callbackParent(cellType,index,value,ruleIndex);
  } 
}

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.cellHandler = this.cellHandler.bind(this);
  }
  render(){
    return(
      <td><input type="text" value={this.props.value} onChange={this.cellHandler}/></td>
      );
  }
  cellHandler(event){
    var cellType = this.props.cellType;
    var index = this.props.index;
    var value = event.target.value;
    var ruleIndex = this.props.ruleIndex;
    this.props.callbackChild(cellType,index,value,ruleIndex);
  }
  
}

ReactDOM.render(<DtTable />, document.getElementById('center'));