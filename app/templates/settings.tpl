<ul class="nav nav-tabs" role="tablist">
  <li class="active"><a href="#basic" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-wrench"></span></a></li>
  <li><a href="#dateTimePicker" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-calendar"></span></a></li>
  <li><a href="#timesheet" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-time"></span></a></li>
  <li><a href="#cloudAuth" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-cloud"></span></a></li>
</ul>
<div id="divRegister">
  <div class="tab-content">
	<div id="basic" class="tab-pane active">
      <h1>Settings</h1>
      <div class="form-group">
        <label for="inputEnvironment">Environment</label>
		<input type="text" id="inputEnvironment" class="col-xs-12" value="{{env}}" placeholder="[local|test|homolog|prod]" data-bind="value:env,events:['keyup']"/>
      </div>
      <div class="form-group">
        <label for="inputApp">App</label>
    	<input type="text" id="inputApp" class="col-xs-12" value="{{app}}" placeholder="james" data-bind="value:app,events:['keyup']"/>
      </div>
      <div class="form-group">
		<label for="inputBackend">Backend</label>
		<input type="text" id="inputBackend" class="col-xs-12" value="{{backend}}" placeholder="your backend URL." data-bind="value:backend,events:['keyup']"/>
      </div>
      <br />
      <div id="form-group">
        <div class="checkbox">
          <label>
            <input id="inputDiscountAllDay" type="checkbox" value="" data-bind="checked:isProtected" /> is protected?
	      </label>
        </div>
      </div>
	</div>

	<div id="dateTimePicker" class="tab-pane">
	  <h2>DateTimePicker Configuration</h2>
	  <!-- <div class="form-group"> -->
		TODO implement custom binding
	  <!-- </div> -->
	</div>

	<div id="timesheet" class="tab-pane">
	  <h2>Timesheet</h2>
	  <div class="form-group">
	    <label for="inputId">ID</label>
	    <input type="text" id="inputId" class="col-xs-12" placeholder="1" data-bind="objectHandler:timesheet,events:['keyup']" data-property="id" />
	  </div>
	  <div class="form-group">
	    <label for="inputStartTime">Start Time</label>
	    <input type="text" id="inputStartTime" class="col-xs-12" placeholder="08:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="startTime" />
	  </div>
	  <div class="form-group">
	    <label for="inputEndTime">End Time</label>
	    <input type="text" id="inputEndTime" class="col-xs-12" placeholder="14:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="endTime" />
	  </div>
	  <div class="form-group">
	    <label for="inputWorkload">Workload</label>
	    <input type="text" id="inputWorkload" class="col-xs-12" placeholder="06:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="workload" />
	  </div>
	  <div class="form-group">
	    <label for="inputTimesheetBackendURL">Timesheet Backend URL</label>
	    <input type="text" id="inputTimesheetBackendURL" class="col-xs-12" placeholder="TIMESHEET BACKEND URL" data-bind="objectHandler:timesheet,events:['keyup']" data-property="timesheetBackendURL" />
	  </div>
	</div>

	<div id="cloudAuth" class="tab-pane">
	  <h2>Cloud Auth</h2>
	  <div class="form-group">
	    <label for="inputCloudAuthEmail">E-mail</label>
	    <input type="text" id="inputCloudAuthEmail" class="col-xs-12" placeholder="<YOUR_EMAIL_HERE>@<SOME_DOMAIN>" data-bind="objectHandler:cloudAuth,events:['keyup']" data-property="email" />
	  </div>
	  <div class="form-group">
	    <label for="inputCloudAuthPassword">Password</label>
	    <input type="password" id="inputCloudAuthPassword" class="col-xs-12" placeholder="<YOUR_PASSWORD_HERE>" data-bind="objectHandler:cloudAuth,events:['keyup']" data-property="password" />
	  </div>
	  <br />
	  <div class="form-group">
		<a href="#" id="btnHideShowPassword" class="btn btn-warning"><i class="glyphicon glyphicon-eye-close"></i> Passwd</a>
	  </div>
	</div>
  </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-ok"></i> Send</a>
<a href="#" id="btnDeleteSettings" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</a>
<a href="#" id="btnCleanLocalStorage" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i> Local</a>
