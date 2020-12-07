import './general';

import createNavBar from './navbar.js';

/*
Still need to do:
  Form to add and delete users from the database
*/

class Users {
  constructor() {
    this.state = {
      username: "",
      config: []
    };
    

    document.querySelector('body > nav').innerHTML = createNavBar('users');
    this.$breweryTitleName = document.querySelector('#header');
    this.$homePageText = document.querySelector('.pagetext');
    this.$backgroundImage = document.querySelector('body').style;
    this.$logoImage = document.querySelector('#header');

    // instance variables that the app needs but are not part of the "state" of the application
    this.server = "http://localhost:5000/api"
    this.configUrl = this.server + "/appconfig";
    this.userUrl = this.server + "/appusers";

    // get initial app config
    this.fetchStates();
  };

  // makes an api call to /api/appconfig to get the app config information
  fetchStates() {
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
}

// add a window onload handler. 
// It should create an (unnamed) instance of the class for this page
window.onload = () => {new Users();}
