<h1>Expenses</h1>
<a href="#expense/new" class="btn btn-success"><i class="glyphicon glyphicon-plus glyphicon-white"></i> New</a>
<a href="#expense/budget" class="btn btn-info"><i class="glyphicon glyphicon-eye-open glyphicon-white"></i> Budget</a>
<a id="btnDeleteAll" href="#" class="btn btn-danger delete"><i class="glyphicon glyphicon-refresh glyphicon-white"></i> Del All</a>
<br />
<br />
<ul class="nav nav-tabs" role="tablist">
    <li id="tabStatus" class="active"><a href="#status" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li>
    <li id="tabCalendar"><a href="#calendarTab" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-calendar"></span></a></li>
</ul>
<div class="tab-content">
    <div id="status" class="tab-pane active">
        <table class="table table-bordered table-hover">
            <caption><strong><em>Expenses's Status in this Cycle</em></strong></caption>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>#</th>
            	</tr>
          </thead>
          <tbody id="tbodyItem">
            <tr class="not-taken-yet">
                <td>Not taken yet</td>
                <td>{{notTakenYet}}</td>
            </tr>
            <tr class="taken">
                <td>Taken</td>
                <td>{{taken}}</td>
            </tr>
            <tr class="missed">
                <td>Missed</td>
                <td>{{missed}}</td>
            </tr>
            <tr class="void">
                <td>Void</td>
                <td>{{void}}</td>
            </tr>
            <tr class="is-menstruating">
                <td>Is Menstruating</td>
                <td>{{isMenstruating}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div id="calendarTab" class="tab-pane">
        <br />
        <div id="calendar"></div>
    </div>
</div>
<!-- <a id="btnDeleteAll" href="#" class="btn btn&#45;warning delete"><i class="glyphicon glyphicon&#45;refresh glyphicon&#45;white"></i> Del All</a> -->
<!-- <br /> -->
<!-- <br /> -->
<!-- <ul class="nav nav&#45;tabs" role="tablist"> -->
<!--   <li class="active"><a href="#budget" role="tab" data&#45;toggle="tab"><span class="glyphicon glyphicon&#45;stats"></span></a></li> -->
<!--   <li><a href="#expenses" role="tab" data&#45;toggle="tab"><span class="glyphicon glyphicon&#45;usd"></span></a></li> -->
<!-- </ul> -->
<!-- <div class="tab&#45;content"> -->
<!--   <div id="budget" class="tab&#45;pane active"> -->
<!-- 	<h1>Budget</h1> -->
<!-- 	<div id="divPainel01" class="row"> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Total Planned <br /> -->
<!-- 		<span class="label label&#45;info">{{totalPlanned}}</span> -->
<!-- 	  </div> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Total Expended <br /> -->
<!-- 		<span class="label label&#45;{{status}}">R$ {{totalExpended}}</span> -->
<!-- 	  </div> -->
<!-- 	</div>  -->
<!-- 	<div id="divPainel02" class="row"> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Balance <br /> -->
<!-- 		<span class="label label&#45;{{status}}">R$ {{balance}}</span> -->
<!-- 	  </div> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Status <br /> -->
<!-- 		<span class="label label&#45;{{status}}">{{status}}</span> -->
<!-- 	  </div> -->
<!-- 	</div> -->
<!--   </div> -->
<!--   <div id="expenses" class="tab&#45;pane"> -->
<!-- 	<table class="table table&#45;striped table&#45;bordered table&#45;hover"> -->
<!--       <caption> -->
<!-- 	    <strong><em>Expenses</em></strong> -->
<!-- 	  </caption> -->
<!-- 	  <thead> -->
<!-- 	    <tr> -->
<!-- 		  <th>Expense</th> -->
<!--           <th>Delete</th> -->
<!-- 		</tr> -->
<!-- 	  </thead> -->
<!-- 	  <tbody id="tbodyItem"></tbody> -->
<!-- 	</table> -->
<!--   </div> -->
<!-- </div>  -->
