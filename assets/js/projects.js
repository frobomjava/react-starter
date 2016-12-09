class ProjectsListComponent extends React.Component{

	constructor(props){
		super(props);
		console.log("initial ");
		this.state = { 
			projects: projectsList ,
			userName: userName
		}		
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
		<ProjectComponent myProjects={this.state.projects} myUserName={this.state.userName}/>				
		);
	};
}

class ProjectComponent extends React.Component{
	render(){	
		return(			
			<ol>		
				{this.props.myProjects.map((projects,index) => {
				var userName = this.props.myUserName;				
				var projID = projects.id;				
				var url = "/" + userName + "/projects/in/" + projID;
				return(	
					<li key={index}><a href={url}>{projects.projectName}</a></li>	
				);
			})}
			</ol>				
		);
	}
}

ReactDOM.render(<ProjectsListComponent />, document.getElementById('projectListDivId'));