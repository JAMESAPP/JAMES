<div id="divRegister" class="container">
    <h1>Timesheet</h1>
    <div class="row">
        <div class="col-xs-6">
            <label for="inputDate">Date</label><br />
            <input type="text" id="inputDate" class="col-xs-12 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']" />
        </div>
        <div class="col-xs-6">
            <label for="inputLeavingEarly">Leaving Early</label><br />
        	<input type="text" id="inputLeavingEarly" class="col-xs-12" value="{{leavingEarly}}" placeholder="00:00" data-bind="value:leavingEarly,events:['keyup']" disabled />
        </div>
    </div>
    <div id="row">
        <div class="col-xs-6">
            <div class="checkbox">
                <label>
                    <input id="inputDiscountAllDay" type="checkbox" value=""> Discount all day!
                </label>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="checkbox">
                <label>
                    <input id="inputOfficialShift" type="checkbox" value="">Official Shift? 
                </label>
            </div>
        </div>
    </div>
    <hr />
	<div id="divStartEndDay">
        <h2>Check-in</h2>
        <div class="row">
            <label>Time</label><br />
            <input type="text" id="inputStartTime" class="col-xs-3 timeMask" value="{{startTime}}" placeholder="hh:mm" data-bind="value:startTime,events:['keyup']"/>
        </div>
        <div class="row">
            <label for="inputStartTimeMachine">Machine</label><br />
            <select id="selectStartTimeMachine" data-bind="value:startTimeMachine,events:['change']">
                {{#each selectStartTimeMachine}}
                <option value="{{value}}">{{label}}</option>
                {{/each}}
            </select>
        </div>
        <div class="row">
            <label for="txtStartTimeMotive">Motive</label><br />
            <textarea type="text" id="txtStartTimeMotive" rows="10" class="col-xs-12" placeholder="Motive to start early..." data-bind="value:startTimeMotive,events:['keyup']">{{startTimeMotive}}</textarea>
        </div>

        <h2>Check-out</h2>
        <div class="row">
            <label for="inputEndTime">Time</label><br />
            <input type="text" id="inputEndTime" class="col-xs-3 timeMask" value="{{endTime}}" placeholder="hh:mm" data-bind="value:endTime,events:['keyup']" />
        </div>
        <div class="row">
            <label for="inputEndTimeMachine">Machine</label><br />
            <select id="selectEndTimeMachine" data-bind="value:endTimeMachine,events:['change']">
	            {{#each selectEndTimeMachine}}
                <option value="{{value}}">{{label}}</option>
                {{/each}}
            </select>
        </div>
        <div class="row">
            <label for="txtEndTimeMotive">Motive</label><br />
            <textarea type="text" id="txtEndTimeMotive" rows="10" class="col-xs-12" placeholder="Motive to stay latter..." data-bind="value:endTimeMotive,events:['keyup']">{{endTimeMotive}}</textarea>
        </div>
	</div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#timesheets" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
