export default function createNavBar(activePage) {
  const active = `class='active'`;
  const navHtml = `
    <div class="container">
    <div id="header"><h1>Manifest Beer Co.</h1></div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li ${activePage == 'home'? active: ''}><a href="index.html">Home</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Brewery <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Ingredients</a></li>
              <li><a href="#">Containers</a></li>
              <li><a href="#">Schedule a brew</a></li>
              <li><a href="#">Brewing now</a></li>
              <li><a href="#">Manage Inventory</a></li>
              <li><a href="#">Suppliers</a></li>
            </ul>
          </li>
          <li><a href="#">Pub</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sales <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Accounts</a></li>
              <li><a href="#">Reservations</a></li>
            </ul>
          </li>
          <li ${activePage == 'settings'? active: ''}><a href="settings.html">Settings</a></li>
          <li ${activePage == 'users'? active: ''}><a href="users.html">Users</a></li>
        </ul>
        <form class="navbar-form navbar-right" role="search">
            <input type="text" class="form-control" placeholder="Username">
            <button type="submit" class="btn btn-default">Login</button>
        </form>
      </div>
    </div>`;
  return navHtml;
}