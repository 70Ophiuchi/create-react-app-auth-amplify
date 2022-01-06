import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

var r = ''

class App extends Component {  
  
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
        return response.json()
      }).then(function (data){
        var ff = document.getElementById("finalForm")
        ff.setAttribute("APIKEY_ID", data.APIKEY_ID)
        ff.setAttribute("templateName", data.templateName)
        ff.setAttribute("QueryRange", data.QueryRange)
        ff.setAttribute("campaignID", data.campaignID)
        ff.setAttribute("X-Api-Key", data.API_KEY)

        async function hash(string) {
          const utf8 = new TextEncoder().encode(string);
          const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
          return hashHex;
        }
        hash(data.campaignID).then((hex) => r = hex); 
      })
      .catch(error => {
        console.log(error)
      })
    document.getElementById('submitForm').className = "hidden"
    document.getElementById('finalForm').className = ""
    }

  handleSubmit_finalForm = async (event) => {
    event.preventDefault()
  
    const formdata = new FormData(event.target)
  
    const json = {}
    formdata.forEach(function(value, prop){
      json[prop] = value
    })
  
    const response = await fetch("https://qqrpo8v6n6.execute-api.eu-central-1.amazonaws.com/default/SES_TEST_EMAIL", {
      method: "POST",
      headers: {"Content-Type": "application/json", "X-Api-Key": json['X-Api-Key']},
      body: json,
    })
      .then(response => {
        return response.json()
      }).then(function (data){
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    window.location.href = window.location.href;
    }
	
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

        <form onSubmit={this.handleSubmit} method="POST" id='submitForm'>

            <label for="TemplateName">Template Name:</label>
            <input type="text" name="TemplateName" placeholder="Template Name"/> <br /><br />

            <label for="queryRange">Query Range:</label>
            <input type="number" name="queryRange" placeholder="Query Range"/> <br /><br />

            <label for="campaignID">Campaign ID:</label>
            <input type="text" name="campaignID" placeholder="Campaign ID"/> <br /><br />

            <button type="submit">Submit</button>
        </form>

        <form onSubmit={this.handleSubmit_finalForm} method="POST" id='finalForm' className='hidden'>

          <label for="finalCheck">Verification Code: {r}</label>
          <input type="text" name="finalCheck" placeholder="Enter Verification Code"/> <br /><br />

          <label className='hidden' for="APIKEY_ID">Template Name:</label>
          <input className='hidden' type="text" name="APIKEY_ID" placeholder="APIKEY_ID"/> <br /><br />

          <label className='hidden' for="templateName">Template Name:</label>
          <input className='hidden' type="text" name="templateName" placeholder="templateName"/> <br /><br />

          <label className='hidden' for="QueryRange">Query Range:</label>
          <input className='hidden' type="number" name="QueryRange" placeholder="QueryRange"/> <br /><br />

          <label className='hidden' for="campaignID">Campaign ID:</label>
          <input className='hidden' type="text" name="campaignID" placeholder="campaignID"/> <br /><br />

          <label className='hidden' for="X-Api-Key">Campaign ID:</label>
          <input className='hidden' type="text" name="X-Api-Key" placeholder="X-Api-Key"/> <br /><br />

          <button type="submit">Submit</button>
        </form>

      </div>   
    );
  }
}

export default withAuthenticator(App);


