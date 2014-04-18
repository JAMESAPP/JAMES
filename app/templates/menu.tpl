<div class="navbar-inner">
	<div class="container-fluid">
		<a class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</a>
		<ul class="nav">
			<a href="#">
				<li>
					<img src="app/img/logo.png" id="yawecapp_logo" width="40px">
				</li>
			</a>
		</ul>
		<a class="brand" href="#about">YAWECAPP</a>
		<div class="nav-collapse collapse">
			<ul class="nav">
				<li class="dropdown">
					<a tabindex="-1" href="#" class="dropdown-toggle" data-toggle="dropdown">
						Main Features <b class="caret"></b>
					</a>
					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#featured">Featured</a></li> -->
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#error">Error</a></li> -->
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#generic">Generic</a></li> -->
						<!-- FIXME data-toggle="dropdown" is not working - why? -->
						<li class="dropdown"><a href="#featured">Featured</a></li>
						<li class="dropdown"><a href="#error">Error</a></li>
						<li class="dropdown"><a href="#about">About</a></li>
						<li class="dropdown"><a href="#generic">Generic</a></li>
					</ul>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Login Features <b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#login">Login</a></li> -->
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#logout">Logout</a></li> -->
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#isLogged">Is logged?</a></li> -->
						<!-- <li class="dropdown"><a data-toggle="dropdown" href="#hasPermission">Has Permission?</a></li> -->
						<li class="dropdown"><a href="#login">Login</a></li>
						<li class="dropdown"><a href="#logout">Logout</a></li>
						<li class="dropdown"><a href="#isLogged">Is logged?</a></li>
						<li class="dropdown"><a href="#hasPermission">Has Permission?</a></li>
					</ul>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Backbone Marionette <b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<!-- <li class="dropdown"><a href="#marionette/itemView">itemView</a></li> -->
						<!-- <li class="dropdown"><a href="#marionette/compositeView">compositeView</a></li> -->
						<!-- <li class="dropdown"><a href="#marionette/collectionView">collectionView</a></li> -->
						<!-- submenu -->
						<li class="dropdown-submenu">
							<a tabindex="-1" href="#">Views</a>
							<ul class="dropdown-menu">
								<li class="dropdown"><a href="#marionette/itemView">itemView</a></li>
								<li class="dropdown"><a href="#marionette/compositeView">compositeView</a></li>
								<li class="divider"></li>
								<li class="dropdown"><a href="#error">Layout & Regions</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Handlebars <b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li class="dropdown"><a href="#login">helper</a></li>
					</ul>
				</li>
				<li>
					<a href="#about">About</a>
				</li>
			</ul>
			<p class="pull-right">
				<a href="#security/doLogin" class="btn btn-success">Login</a>
				<a href="#security/doLogout" class="btn btn-danger">Logout</a>
			</p>
		</div><!--/.nav-collapse -->
	</div>
</div>
