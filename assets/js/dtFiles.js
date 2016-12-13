class FilesListComponent extends React.Component {
	constructor(props){
		super(props);
		console.log("initial ");
		this.state = { 
			files: filesList ,
			userName: userName,
			projectName: projectName
		}		
		this.updateFilesList = this.updateFilesList.bind(this);
	};   

	componentWillMount(){
    console.log("----This was Files componentWillMount-------");
    io.socket.get('/file/socket/join', function (resData) {
      console.log("file resData = " + resData);
    });

    var self = this;
    io.socket.on('newFile', function(newFile) { 
      self.updateFilesList(newFile);	
    });

     io.socket.on('jsonFile', function(jsonFile) { 
     /* self.updateFilesList(jsonFile);	*/
     console.log("---JSON File--- " + jsonFile);
    });

	};

	updateFilesList(newFile){		
		var files = this.state.files.slice(0);
		files.push(newFile);
		this.setState({files:files});
	};
	

    render(){
		return(		
		<FileComponent myFiles={this.state.files} myUserName={this.state.userName} myProjectName={this.state.projectName}/>				
		);
	};
}

class FileComponent extends React.Component{
	constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  	}
	render(){	
		return(			
			<ol>		
				{this.props.myFiles.map((files,index) => {
				var userName = this.props.myUserName;				
				var projectName = this.props.myProjectName;
				var fileName = files.fileName;			
				var url = "/" + userName + "/projects/in/" + projectName + "/files/get/" + fileName;
			
				return(	
					<li key={index}><a href='#' onClick={this.onClick}>{files.fileName}</a></li>	
				);
			})}
			</ol>		
		);
	}

	onClick(userName,projectName,fileName){	

		var url = "/" + userName + "/projects/in/" + projectName + "/files/get/" + fileName;

		io.socket.get({url},function (resData) {
			console.log("---resData--- " + resData);
		});

		/*if(document.getElementById("centerID")){
		    alert("Element exists");
		} else {
		    alert("Element does not exist");
		    var url = "/" + userName + "/projects/in/" + projectName + "/files/get/" + fileName;
		io.socket.get({url},function (resData) {
			//console.log("JSON resData = " + JSON.stringify(resData));
			 React.createElement("div", {},
		        React.createElement("input", {type: "text", value: "Hello" })
		      )
	  	});
		      //React.createElement("div", {})
		}*/

		
	}
}

ReactDOM.render(<FilesListComponent />, document.getElementById('newProjectCreateDivID'));