<div id="divRegister" class="container">
    <h1>Configurations</h1>
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
    TODO implement custom binding
    <!-- <div class="row"> -->
        <!-- <label for="inputId">ID</label> -->
        <!-- <input type="text" id="inputId" class="col&#45;xs&#45;12" value="{{timesheet.id}}" placeholder="1" data&#45;bind="value:timesheet.id,events:['keyup']" /> -->
    <!-- </div> -->
    <!-- <div class="row"> -->
    <!--     <label for="inputStartTime">Start Time</label> -->
    <!--     <input type="text" id="inputStartTime" class="col&#45;xs&#45;12" value="{{timesheet.startTime}}" placeholder="08:00" data&#45;bind="value:timesheet.startTime,events:['keyup']" /> -->
    <!-- </div> -->
    <!-- <div class="row"> -->
    <!--     <label for="inputEndTime">End Time</label> -->
    <!--     <input type="text" id="inputEndTime" class="col&#45;xs&#45;12" value="{{timesheet.endTime}}" placeholder="14:00" data&#45;bind="value:timesheet.endTime,events:['keyup']" /> -->
    <!-- </div> -->
    <!-- <div class="row"> -->
    <!--     <label for="inputWorkload">Workload</label> -->
    <!--     <input type="text" id="inputWorkload" class="col&#45;xs&#45;12" value="{{timesheet.workload}}" placeholder="06:00" data&#45;bind="value:timesheet.workload,events:['keyup']" /> -->
    <!-- </div> -->
    <h2>Cloud Auth</h2>
    TODO implement custom binding
    <!-- <div class="row"> -->
        <!-- <label for="inputCloudAuthEmail">E&#45;mail</label> -->
        <!-- <input type="text" id="inputCloudAuthEmail" class="col&#45;xs&#45;12" value="{{cloudAuth.email}}" placeholder="<YOUR_EMAIL_HERE>@<SOME_DOMAIN>" data&#45;bind="value:cloudAuth.email,events:['keyup']" /> -->
    <!-- </div> -->
    <!-- <div class="row"> -->
        <!-- <label for="inputCloudAuthPassword">E&#45;mail</label> -->
        <!-- <input type="text" id="inputCloudAuthPassword" class="col&#45;xs&#45;12" value="{{cloudAuth.password}}" placeholder="<YOUR_PASSWORD_HERE>" data&#45;bind="value:cloudAuth.password,events:['keyup']" /> -->
    <!-- </div> -->

    <!-- <label for="inputFood">Food</label> -->
    <!-- <select id="selectFood" data&#45;bind="value:food,events:['change']"> -->
    <!--     {{#each selectFood}} -->
    <!--     <option value="{{value}}">{{label}}</option> -->
    <!--     {{/each}} -->
    <!-- </select> -->
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>