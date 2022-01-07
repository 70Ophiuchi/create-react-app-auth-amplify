import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);


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
        ff.APIKEY_ID.value = data.APIKEY_ID
        ff.templateName.value = data.templateName
        ff.QueryRange.value = data.QueryRange
        ff.campaignID.value = data.campaignID
        ff.XApiKey.value = data.API_KEY
        
        let r = ''
        async function hash(string) {
          const utf8 = new TextEncoder().encode(string);
          const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
          return hashHex;
        }
        hash(data.campaignID).then((hex) => ff.firstChild.innerText = "Verification Code [ " + hex + " ]: ");

      })
      .catch(error => {
        alert("Request Failed: " + error)
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
    console.log(json)
    const response = await fetch("https://gf40yyred9.execute-api.eu-central-1.amazonaws.com/default/SES_SEND_EMAIL", {
      method: "POST",
      headers: {"Content-Type": "application/json", "x-api-key": json['XApiKey']},
      body: JSON.stringify(json),
    })
      .then(response => {
        return response.json()
      }).then(function (data){
        console.log(data)
        alert(JSON.stringify(data))
      })
      .catch(error => {
        alert("Request Failed: " + error)
      })
    // window.location.href = window.location.href;
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
			'https://ses-templates-eu.s3.amazonaws.com',
			{
				method: 'POST',
				body: {"file": formData, "key": this.state.selectedFile.name}
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
        <h4>
          RULES FOR NAMING HTML FILE: TemplateName-SubjectPart-TextPart
        </h4>
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

          <label for="finalCheck">Verification Code: </label>
          <input type="text" name="finalCheck" placeholder="Enter Verification Code"/> <br /><br />

          <label for="APIKEY_ID">APIKEY_ID:</label>
          <input type="text" name="APIKEY_ID" placeholder="APIKEY_ID"/> <br /><br />

          <label for="templateName">Template Name:</label>
          <input type="text" name="templateName" placeholder="templateName"/> <br /><br />

          <label for="QueryRange">Query Range:</label>
          <input type="number" name="QueryRange" placeholder="QueryRange"/> <br /><br />

          <label for="campaignID">Campaign ID:</label>
          <input type="text" name="campaignID" placeholder="campaignID"/> <br /><br />

          <label for="XApiKey">X-Api-Key:</label>
          <input type="text" name="XApiKey" placeholder="X-Api-Key"/> <br /><br />

          <button type="submit">Submit</button>
        </form>

      </div>   
    );
  }
}

export default withAuthenticator(App);


