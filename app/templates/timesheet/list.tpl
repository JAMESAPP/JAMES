
<h1>Contraceptives</h1>
<a href="#contraceptive/new" class="btn btn-success"><i class="glyphicon glyphicon-plus glyphicon-white"></i> New</a>
<!-- <a href="#" class="btn btn&#45;warning"><i class="glyphicon glyphicon&#45;trash glyphicon&#45;white"></i> Del All</a> -->
<a href="#" class="btn btn-danger"><i class="glyphicon glyphicon-trash glyphicon-white"></i> Del All</a>
<br />
<br />
<ul class="nav nav-tabs" role="tablist">
    <li id="tabStatus" class="active"><a href="#status" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li>
    <li id="tabCalendar"><a href="#calendarTab" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-calendar"></span></a></li>
</ul>
<div class="tab-content">
    <div id="tabStatus" class="tab-pane active">
      <div id="painel" class="tab-pane active">
    	<h1>Timesheets</h1>
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
		    Total Extra Time / Rule 30<br />
    		<span class="label label-info">{{totalExtraTime}}</span> / <span class="label label-info">{{totalExtraTimeRule30}}</span>
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
      </div>

  <div id="messages">
	<span id="spanMessages">
	</span>
    </div>
    <div id="calendarTab" class="tab-pane">
        <br />
        <div id="calendar"></div>
    </div>
</div>



<!-- <div class="row"> -->
<!--   <div class="col&#45;xs&#45;6"> -->
<!-- 	    <a href="#timesheet/new" class="btn btn&#45;success btn&#45;xm"><i class="icon&#45;plus icon&#45;white"></i> New</a> -->
<!--   </div> -->
<!--   <div class="col&#45;xs&#45;6"> -->
<!-- <!&#45;&#45; FIXME use another class than warnig to delete all or us another class than warning to sync (maybe blue? &#45;&#45;> -->
<!--     <a id="btnDeleteAll" href="#" class="btn btn&#45;warning delete btn&#45;xm"><i class="icon&#45;refresh icon&#45;white"></i> Del All</a> -->
<!--     <!&#45;&#45;	<select id="selectMonth" data&#45;bind="value:category,events:['change']"> &#45;&#45;> -->
<!-- 	  {{#each selectMonth}} -->
<!-- <!&#45;&#45;      <option value="{{value}}">{{label}}</option> &#45;&#45;> -->
<!-- 	  {{/each}} -->
<!--       <!&#45;&#45;	</select> &#45;&#45;> -->
<!--   </div> -->
<!-- </div> -->
<!-- <br /> -->
<!-- <ul class="nav nav&#45;tabs" role="tablist"> -->
<!--   <li class="active"><a href="#painel" role="tab" data&#45;toggle="tab"><span class="glyphicon glyphicon&#45;stats"></span></a></li> -->
<!--   <li><a href="#timesheets" role="tab" data&#45;toggle="tab"><span class="glyphicon glyphicon&#45;time"></span></a></li> -->
<!-- </ul> -->
<!-- <div class="tab&#45;content"> -->
<!--   <div id="painel" class="tab&#45;pane active"> -->
<!-- 	<h1>Timesheets</h1> -->
<!-- 	<div id="divPainel01" class="row"> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Days Late to Work <br /> -->
<!-- 		<span class="label label&#45;{{status}}">{{totalDaysLateToWork}}</span> -->
<!-- 	  </div> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Time After Start <br /> -->
<!-- 		<span class="label label&#45;{{status}}">{{totalMinutesLaterAfterStart}}</span> -->
<!-- 	  </div> -->
<!-- 	</div>  -->
<!-- 	<div id="divPainel02" class="row"> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Total Extra Time / Rule 30<br /> -->
<!-- 		<span class="label label&#45;info">{{totalExtraTime}}</span> / <span class="label label&#45;info">{{totalExtraTimeRule30}}</span> -->
<!-- 	  </div> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Leaving Early <br /> -->
<!-- 		<span class="label label&#45;default">{{totalLeavingEarly}}</span> -->
<!-- 	  </div> -->
<!-- 	</div>  -->
<!-- 	<div id="divPainel03" class="row"> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Balance <br /> -->
<!-- 		<span class="label label&#45;primary">{{balance}}</span> -->
<!-- 	  </div> -->
<!-- 	  <div class="col&#45;xs&#45;6"> -->
<!-- 		Status <br /> -->
<!-- 		<span class="label label&#45;{{status}}">{{status}}</span> -->
<!-- 	  </div> -->
<!-- 	</div> -->
<!--   </div> -->
<!--  -->
<!--   <div id="messages"> -->
<!-- 	<span id="spanMessages"> -->
<!-- 	</span> -->
<!--   </div> -->
<!--  -->
<!--   <div id="timesheets" class="tab&#45;pane"> -->
<!-- 	<table class="table table&#45;striped table&#45;bordered table&#45;hover"> -->
<!--       <caption> -->
<!-- 		<strong><em>Timesheets</em></strong> -->
<!-- 	  </caption> -->
<!-- 	  <thead> -->
<!-- 		<tr> -->
<!-- 		  <th>Date</th> -->
<!-- 		  <!&#45;&#45; <th>Edit</th> &#45;&#45;> -->
<!-- 		  <th>Delete</th> -->
<!-- 		  <!&#45;&#45; <th>Time Start</th> &#45;&#45;> -->
<!--           <!&#45;&#45; <th>Time End</th> &#45;&#45;> -->
<!-- 		</tr> -->
<!-- 	  </thead> -->
<!-- 	  <tbody id="tbodyItem"></tbody> -->
<!-- 	</table> -->
<!--   </div> -->
<!-- </div> -->
