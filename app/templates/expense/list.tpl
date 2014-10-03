<h1>Expenses</h1>
<a href="#expense/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New</a>
<a href="#expense/budget" class="btn btn-info"><i class="icon-eye-open icon-white"></i> Budget</a>
<br />
<br />
<ul class="nav nav-tabs" role="tablist">
  <li class="active"><a href="#budget" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li>
  <li><a href="#expenses" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-usd"></span></a></li>
</ul>
<div class="tab-content">
  <div id="budget" class="tab-pane active">
	<h1>Budget</h1>
	<div id="divPainel01" class="row">
	  <div class="col-xs-6">
		Total Planned <br />
		<span class="label label-info">{{totalPlanned}}</span>
	  </div>
	  <div class="col-xs-6">
		Total Expended <br />
		<span class="label label-{{status}}">R$ {{totalExpended}}</span>
	  </div>
	</div> 
	<div id="divPainel02" class="row">
	  <div class="col-xs-6">
		Balance <br />
		<span class="label label-{{status}}">R$ {{balance}}</span>
	  </div>
	  <div class="col-xs-6">
		Status <br />
		<span class="label label-{{status}}">{{status}}</span>
	  </div>
	</div>
  </div>
  <div id="expenses" class="tab-pane">
	<table class="table table-striped table-bordered table-hover">
      <caption>
	    <strong><em>Expenses</em></strong>
	  </caption>
	  <thead>
	    <tr>
		  <th>Expense</th>
          <th>Delete</th>
		</tr>
	  </thead>
	  <tbody id="tbodyItem"></tbody>
	</table>
  </div>
</div> 
