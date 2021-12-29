import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
	state = {

    selectedFile: null
    };
    
    onFileChange = event => {
    
    this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    onFileUpload = () => {
    
    const formData = new FormData();
    
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    
    console.log(this.state.selectedFile);
    
    fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
    };
    
    fileData = () => {
    
    if (this.state.selectedFile) {
      
      return (
      <div>
        <h2>File Details:</h2>
        
  <p>File Name: {this.state.selectedFile.name}</p>
  
        
  <p>File Type: {this.state.selectedFile.type}</p>
  
        
  <p>
        Last Modified:{" "}
        {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
  
      </div>
      );
    } else {
      return (
      <div>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
      );
    }
    };
  
  render() {
    return (
      <div className="App">
        <AmplifySignOut />

        <h1>
            File Upload
        </h1>
        <h3>
            TEMPLATE HTML FILE
        </h3>
        <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>
            Upload!
            </button>
        </div>
        {this.fileData()}

      </div>      
    );
  }
}

export default withAuthenticator(App);

