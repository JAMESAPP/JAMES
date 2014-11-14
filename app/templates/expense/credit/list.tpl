<h1>Credit</h1>
<a href="#expense/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New Owner</a>
<a href="#expense/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New Credit</a>
<br />
<br />
<ul class="nav nav-tabs" role="tablist">
  <li class="active"><a href="#owners" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li>
  <li><a href="#credits" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-usd"></span></a></li>
</ul>
<div class="tab-content">
  <div id="owners" class="tab-pane active">
		<h1>Owners</h1>
		<table class="table table-striped table-bordered table-hover">
      <caption>
				<strong><em>Owners</em></strong>
			</caption>
			<thead>
				<tr>
					<th>Date</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody id="tbodyItemOwner"></tbody>
		</table>
  </div>
  <div id="credits" class="tab-pane">
		<select id="selectOwner" data-bind="value:category,events:['change']">
			<option>Choose an Owner</option>
			<!-- {?#each selectOwner}} -->
			<!-- <option value="{?value}}">{?label}}</option> -->
			<!-- {?/each}} -->
		</select>
		<table class="table table-striped table-bordered table-hover">
      <caption>
				<strong><em>Credits</em></strong>
			</caption>
			<thead>
				<tr>
					<th>Date</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody id="tbodyItem"></tbody>
		</table>
  </div>
</div> 
