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
<div id="divPainel">TODO PAINEL</div> 
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
