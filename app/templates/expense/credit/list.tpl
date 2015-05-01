<h1>Credits</h1>
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

<!-- <h1>Credit</h1> -->
<!-- <a href="#expense/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New Owner</a> -->
<!-- <a href="#expense/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New Credit</a> -->
<!-- <br /> -->
<!-- <br /> -->
<!-- <ul class="nav nav-tabs" role="tablist"> -->
<!--   <li class="active"><a href="#owners" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li> -->
<!--   <li><a href="#credits" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-usd"></span></a></li> -->
<!-- </ul> -->
<!-- <div class="tab-content"> -->
<!--   <div id="owners" class="tab-pane active"> -->
<!-- 		<h1>Owners</h1> -->
<!-- 		<table class="table table-striped table-bordered table-hover"> -->
<!--       <caption> -->
<!-- 				<strong><em>Owners</em></strong> -->
<!-- 			</caption> -->
<!-- 			<thead> -->
<!-- 				<tr> -->
<!-- 					<th>Date</th> -->
<!-- 					<th>Total</th> -->
<!-- 				</tr> -->
<!-- 			</thead> -->
<!-- 			<tbody id="tbodyItemOwner"></tbody> -->
<!-- 		</table> -->
<!--   </div> -->
<!--   <div id="credits" class="tab-pane"> -->
<!-- 		<select id="selectOwner" data-bind="value:category,events:['change']"> -->
<!-- 			<option>Choose an Owner</option> -->
<!-- 			<\!-- {?#each selectOwner}} -\-> -->
<!-- 			<\!-- <option value="{?value}}">{?label}}</option> -\-> -->
<!-- 			<\!-- {?/each}} -\-> -->
<!-- 		</select> -->
<!-- 		<table class="table table-striped table-bordered table-hover"> -->
<!--       <caption> -->
<!-- 				<strong><em>Credits</em></strong> -->
<!-- 			</caption> -->
<!-- 			<thead> -->
<!-- 				<tr> -->
<!-- 					<th>Date</th> -->
<!-- 					<th>Delete</th> -->
<!-- 				</tr> -->
<!-- 			</thead> -->
<!-- 			<tbody id="tbodyItem"></tbody> -->
<!-- 		</table> -->
<!--   </div> -->
<!-- </div>  -->
