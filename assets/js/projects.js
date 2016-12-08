class ProjectsListRender extends React.Component{

	constructor(props){
		super(props);
		console.log("initial ");
		this.state = { projects: projectsList }		
		this.updateProjectsList = this.updateProjectsList.bind(this);
	};   

	componentWillMount(){
    console.log("This was componentWillMount");
    io.socket.get('/project/socket/join', function (resData) {
      console.log("resData = " + resData);
    });

    var self = this;
    io.socket.on('newProject', function(newProject) { 
      self.updateProjectsList(newProject);	
    });
	};

	updateProjectsList(newProject){		
		var projects = this.state.projects.slice(0);
		projects.push(newProject);
		this.setState({projects:projects});	
		 document.getElementById('newProjectID').value = "";	
	};
	

    render(){
		return(		
		<ProjectComponent myApp={this.state.projects} />				
		);
	};
}

class ProjectComponent extends React.Component{
	render(){
		
		return(
			<ol>		
				{this.props.myApp.map((projects,index) => {					
				return(	
					<li key={index}><a href="">{projects.projectName}</a></li>	
				);
			})}
			</ol>				
		);
	}
}

ReactDOM.render(<ProjectsListRender />, document.getElementById('projectListDivId'));