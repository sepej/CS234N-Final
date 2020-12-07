import './general';

import createNavBar from './navbar.js';

import toastr from 'toastr';
import '../../node_modules/toastr/toastr.less';

/*
Still need to do:
  Allow user to upload logo and background images.
  Allow user to change the measurment field in the database.
  Implement validation for all fields
*/

class Settings {
  constructor() {
    this.state = {
      username: "",
      config: []
    };
    
    this.$form = document.querySelector('#settingsForm');
    this.$submitButton = document.querySelector('#submit');
    document.querySelector('body > nav').innerHTML = createNavBar('settings');
    this.$breweryTitleName = document.querySelector('#header');
    this.$homePageText = document.querySelector('.pagetext');
    this.$backgroundImage = document.querySelector('body').style;
    this.$logoImage = document.querySelector('#header');

    // instance variables that the app needs but are not part of the "state" of the application
    this.server = "http://localhost:5000/api"
    this.configUrl = this.server + "/appconfig";
    this.userUrl = this.server + "/appusers";

    

    this.bindAllMethods();
    // get initial app config
    this.fetchConfig();
    this.$submitButton.onclick = this.onSubmitForm;
  };

  bindAllMethods() {
    this.fetchConfig = this.fetchConfig.bind(this);
    this.loadConfiguration = this.loadConfiguration.bind(this);
    this.loadCurrentFormValues = this.loadCurrentFormValues.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(event) {
    event.preventDefault();
    // updating
    fetch(`${this.configUrl}/1`, {
      method: 'PUT',
      body: JSON.stringify({
        breweryId: 1,
        defaultUnits: 'metric',
        breweryLogo: 'logo.jpg',
        homePageBackgroundImage: 'background.jpg',
        breweryName: document.querySelector('input[name="breweryname"]').value,
        homePageText: document.querySelector('textarea[name="hometext"]').value,
        color2: document.querySelector('input[name="color2"]').value,
        color3: document.querySelector('input[name="color3"]').value,
        color1: document.querySelector('input[name="color1"]').value,
        colorBlack: document.querySelector('input[name="colorblack"]').value,
        colorWhite: 'ffffff',
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // doesn't return a body just a status code of 204 
      if (response.status == 204)
      {
        this.fetchConfig();
        toastr.success("Updated");
      }
  })}

  // makes an api call to /api/appconfig to get the app config information
  fetchConfig() {
    fetch(`${this.configUrl}/1`)
    .then(response => response.json())
    .then(data => { 
      if (data.length == 0) {
        alert("Can't load config.");
      }
      else {
        this.state.config = data;
        console.log(this.state.config);
        this.loadConfiguration();
        this.loadCurrentFormValues();
      }
    })
    .catch(error => {
      console.log(error);
      alert('There was a problem getting app configuration!'); 
    });
  }

  loadConfiguration() {
    this.$breweryTitleName.innerHTML = `<h1>${this.state.config.breweryName}</h1>`;
    this.$breweryTitleName.style.color = `#${this.state.config.color3}`;
    this.$backgroundImage.backgroundImage = `url('../src/assets/images/${this.state.config.homePageBackgroundImage}')`;
    this.$logoImage.backgroundImage = `url('../src/assets/images/${this.state.config.breweryLogo}')`;
    document.querySelector('.navbar-inverse').style.background = `#${this.state.config.color2}`;
    document.querySelector('#navbar').style.background = `#${this.state.config.color2}`;
    document.querySelector('.maincontainer').style.background = `#${this.state.config.color1}`;
    document.querySelector('.maincontainer').style.color = `#${this.state.config.colorBlack}`;
  }

  loadCurrentFormValues() {
    document.querySelector('input[name="breweryname"]').value = `${this.state.config.breweryName}`;
    document.querySelector('textarea[name="hometext"]').value = `${this.state.config.homePageText}`;
    document.querySelector('input[name="color2"]').value = `${this.state.config.color2}`;
    document.querySelector('input[name="color3"]').value = `${this.state.config.color3}`;
    document.querySelector('input[name="color1"]').value = `${this.state.config.color1}`;
    document.querySelector('input[name="colorblack"]').value = `${this.state.config.colorBlack}`;
  }
}

// add a window onload handler. 
// It should create an (unnamed) instance of the class for this page
window.onload = () => {new Settings();}
