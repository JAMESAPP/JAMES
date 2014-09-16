<div>
    <h1>Timesheets</h1>
</div>
<div class="row">
  <div class="col-xs-6">
	<a href="#timesheet/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New</a>
	<a id="btnSync" href="#" class="btn btn-warning"><i class="icon-refresh icon-white"></i> Sync</a>
  </div>
  <div class="col-xs-6">
	<select id="selectMonth" data-bind="value:category,events:['change']">
	  {{#each selectMonth}}
	  <option value="{{value}}">{{label}}</option>
	  {{/each}}
	</select>
  </div>
</div>
<br />
<br />
<div id="divPainel01" class="row">
  <div class="col-xs-6">
	Days Late to Work <br />
	<span class="label label-{{status}}">{{totalDaysLateToWork}}</span>
  </div>
  <div class="col-xs-6">
	Time After Start <br />
	<span class="label label-{{status}}">{{totalMinutesLaterAfterStart}}</span>
  </div>
</div> 
<div id="divPainel02" class="row">
  <div class="col-xs-6">
	Total Extra Time <br />
	<span class="label label-info">{{totalExtraTime}}</span>
  </div>
  <div class="col-xs-6">
	Leaving Early <br />
	<span class="label label-default">{{totalLeavingEarly}}</span>
  </div>
</div> 
<div id="divPainel03" class="row">
  <div class="col-xs-6">
	Balance <br />
	<span class="label label-primary">{{balance}}</span>
  </div>
  <div class="col-xs-6">
	Status <br />
	<span class="label label-{{status}}">{{status}}</span>
  </div>
</div> 
<table class="table table-striped table-bordered table-hover">
    <caption>
	    <strong><em>Timesheets</em></strong>
	</caption>
	<thead>
	    <tr>
			<th>Date</th>
			<th>Edit</th>
			<th>Delete</th>
			<!-- <th>Time Start</th> -->
            <!-- <th>Time End</th> -->
            <!-- <th>Action</th> -->
		</tr>
	</thead>
	<tbody id="tbodyItem"></tbody>
</table>
