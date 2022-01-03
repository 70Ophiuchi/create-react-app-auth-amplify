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

    handleSubmit = async (event) => {
      event.preventDefault()
    
      const formdata = new FormData(event.target)
    
      const json = {}
      formdata.forEach(function(value, prop){
        json[prop] = value
      })
    
      const formBody = Object.keys(json).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&')
    
      const response = await fetch("https://qqrpo8v6n6.execute-api.eu-central-1.amazonaws.com/default/SES_TEST_EMAIL", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

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

        <form onSubmit='{this.handleSubmit}' method="POST" target='blank'>

            <label for="TemplateName">Template Name:</label>
            <input type="text" name="TemplateName" placeholder="Template Name"/> <br /><br />

            <label for="queryRange">Query Range:</label>
            <input type="number" name="queryRange" placeholder="Query Range"/> <br /><br />

            <label for="campaignID">Campaign ID:</label>
            <input type="text" name="campaignID" placeholder="Campaign ID"/> <br /><br />

            <button type="submit">Submit</button>
        </form>

      </div>   
    );
  }
}

export default withAuthenticator(App);


