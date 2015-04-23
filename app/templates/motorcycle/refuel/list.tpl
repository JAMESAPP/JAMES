<h1>Refuels</h1>
<a href="#motorcycle/refuel/new" class="btn btn-success"><i class="glyphicon glyphicon-plus glyphicon-white"></i> New</a>
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
            <caption><strong><em>Refuel's Status in this Cycle</em></strong></caption>
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


<!-- <h1>Refuel</h1> -->
<!-- <a href="#motorcycle/refuel/new" class="btn btn&#45;success"><i class="icon&#45;plus icon&#45;white"></i> New</a> -->
<!-- <a href="#" class="btn btn&#45;warning"><i class="icon&#45;refresh icon&#45;white"></i> Sync</a> -->
<!-- <br /> -->
<!-- <br /> -->
<!-- <table class="table table&#45;striped table&#45;bordered table&#45;hover"> -->
<!--     <caption> -->
<!-- 	    <strong><em>Motorcycle's Refuel</em></strong> -->
<!-- 	</caption> -->
<!-- 	<thead> -->
<!-- 	    <tr> -->
<!-- 			<th>KM</th> -->
<!--             <th>Delete</th> -->
<!-- 		</tr> -->
<!-- 	</thead> -->
<!-- 	<tbody id="tbodyItem"></tbody> -->
<!-- </table> -->
