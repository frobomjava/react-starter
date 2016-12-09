class FilesListComponent extends React.Component {
	constructor(props){
		super(props);
		console.log("initial ");
		this.state = { 
			files: filesList ,
			userName: userName,
			projectId: projectId
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
	};

	updateFilesList(newFile){		
		var files = this.state.files.slice(0);
		files.push(newFile);
		this.setState({files:files});
	};
	

    render(){
		return(		
		<FileComponent myFiles={this.state.files} myUserName={this.state.userName} myProjectId={this.state.projectId}/>				
		);
	};
}

class FileComponent extends React.Component{
	render(){	
		return(			
			<ol>		
				{this.props.myFiles.map((files,index) => {
				var userName = this.props.myUserName;				
				var projID = this.props.myProjectId;
				var fileName = files.fileName;			
				var url = "/" + userName + "/projects/in/" + projID + "/files/get/" + fileName;
				return(	
					<li key={index}><a href={url}>{files.fileName}</a></li>	
				);
			})}
			</ol>				
		);
	}
}

ReactDOM.render(<FilesListComponent />, document.getElementById('newProjectCreateDivID'));