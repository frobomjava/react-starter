class CreateFile extends React.Component{

	constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  	}

  	handleClick(){
  		
  	}

	render(){
		return(
			<button onClick={this.handleClick}>+</button>
			);
	}
}

ReactDOM.render(<CreateFile />, document.getElementById('createButtonID'));