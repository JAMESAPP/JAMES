<div id="divRegister" class="container">
    <h1>Settings</h1>
    <div class="row">
        <label for="inputEnvironment">Environment</label>
        <input type="text" id="inputEnvironment" class="col-xs-12" value="{{env}}" placeholder="[local|test|homolog|prod]" data-bind="value:env,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="inputApp">App</label>
        <input type="text" id="inputApp" class="col-xs-12" value="{{app}}" placeholder="james" data-bind="value:app,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="inputBackend">Backend</label>
        <input type="text" id="inputBackend" class="col-xs-12" value="{{backend}}" placeholder="your backend URL." data-bind="value:backend,events:['keyup']"/>
    </div>
    <div id="row">
        <div class="col-xs-12">
            <div class="checkbox">
                <label>
                    <input id="inputDiscountAllDay" type="checkbox" value="" data-bind="checked:isProtected" /> is protected?
                </label>
            </div>
        </div>
    </div>
    <h2>DateTimePicker Configuration</h2>
    <div class="row">
        TODO implement custom binding
    </div>
    <h2>Timesheet</h2>
    <div class="row">
        <label for="inputId">ID</label>
        <input type="text" id="inputId" class="col-xs-12" placeholder="1" data-bind="objectHandler:timesheet,events:['keyup']" data-property="id" />
    </div>
    <div class="row">
        <label for="inputStartTime">Start Time</label>
        <input type="text" id="inputStartTime" class="col-xs-12" placeholder="08:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="startTime" />
    </div>
    <div class="row">
        <label for="inputEndTime">End Time</label>
        <input type="text" id="inputEndTime" class="col-xs-12" placeholder="14:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="endTime" />
    </div>
    <div class="row">
        <label for="inputWorkload">Workload</label>
        <input type="text" id="inputWorkload" class="col-xs-12" placeholder="06:00" data-bind="objectHandler:timesheet,events:['keyup']" data-property="workload" />
    </div>
    <h2>Cloud Auth</h2>
    <div class="row">
        <label for="inputCloudAuthEmail">E-mail</label>
        <input type="text" id="inputCloudAuthEmail" class="col-xs-12" placeholder="<YOUR_EMAIL_HERE>@<SOME_DOMAIN>" data-bind="objectHandler:cloudAuth,events:['keyup']" data-property="email" />
    </div>
    <div class="row">
        <label for="inputCloudAuthPassword">Password</label>
        <input type="password" id="inputCloudAuthPassword" class="col-xs-12" placeholder="<YOUR_PASSWORD_HERE>" data-bind="objectHandler:cloudAuth,events:['keyup']" data-property="password" />
    </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-ok"></i> Send</a>
<a href="#" id="btnHideShowPassword" class="btn btn-warning"><i class="glyphicon glyphicon-warning-sign"></i> Show Password</a>
