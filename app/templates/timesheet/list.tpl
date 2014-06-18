<div>
    <h1>Timesheets</h1>
    <ul class="breadcrumb">
        <li class="active">Timesheets<span class="divider">/</span></li>
    </ul>
</div>
<div class="row">
  <div class="span9">
	<a href="#timesheet/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New</a>
	<a href="#" class="btn btn-warning"><i class="icon-refresh icon-white"></i> Sync</a>
  </div>
  <div class="span2">
	<!-- <label for="inputMonth">Month</label> -->
	<select id="selectMonth" data-bind="value:category,events:['change']">
	  {{#each selectMonth}}
	  <option value="{{value}}">{{label}}</option>
	  {{/each}}
	</select>
  </div>
</div>
<br />
<br />
<div id="divPainel" class="row">
  <div class="span2">
	Total Days Late to Work <br />
	{{totalLater}}
  </div>
  <div class="span2">
	Total Minutes After Start <br />
	{{totalMinutesLaterAfterStart}}
  </div>
  <div class="span2">
	Total Extra Time
  </div>
  <div class="span2">
	Total Leaving Early
  </div>
  <div class="span2">
	Balance
  </div>
  <div class="span1">
	Status
	<!-- until 8 days late to work and less than 45 minutes total minutes after: good -->
	<!-- else: bad -->
  </div>
</div> 
<table class="table table-striped table-bordered table-hover">
    <caption>
	    <strong><em>Timesheets</em></strong>
	</caption>
	<thead>
	    <tr>
		    <th>ID</th>
			<th>Date</th>
			<th>Time Start</th>
            <th>Time End</th>
            <th>Leaving Early</th>
		</tr>
	</thead>
	<tbody id="tbodyItem"></tbody>
</table>
