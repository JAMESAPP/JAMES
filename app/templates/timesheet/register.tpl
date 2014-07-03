<div id="divRegister" class="container">
    <h1>Timesheet</h1>
    <div class="row">
        <label for="inputDate">Date</label><br />
        <input type="text" id="inputDate" class="col-xs-1 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']" />
    </div>
    <div class="checkbox">
        <label>
            <input id="inputDiscountAllDay" type="checkbox" value=""> Discount all day!
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input id="inputOfficialShift" type="checkbox" value="">Official Shift? 
        </label>
    </div>
    <hr />
	<div id="divStartEndDay">
        <div class="row">
            <label>Start Time</label><br />
            <input type="text" id="inputStartTime" class="col-xs-1 timeMask" value="{{startTime}}" placeholder="hh:mm" data-bind="value:startTime,events:['keyup']"/>
        </div>
        <div class="row">
            <label for="inputStartTimeMachine">Machine Start Time</label><br />
            <select id="selectStartTimeMachine" data-bind="value:startTimeMachine,events:['change']">
                {{#each selectStartTimeMachine}}
                <option value="{{value}}">{{label}}</option>
                {{/each}}
            </select>
        </div>
        <div class="row">
            <label for="txtStartTimeMotive">Start Time Motive</label><br />
            <textarea type="text" id="txtStartTimeMotive" rows="10" class="input-xxlarge" placeholder="Motive to start early..." data-bind="value:startTimeMotive,events:['keyup']">{{startTimeMotive}}</textarea>
        </div>

        <div class="row">
            <label for="inputEndTime">End Time</label><br />
            <input type="text" id="inputEndTime" class="col-xs-1 timeMask" value="{{endTime}}" placeholder="hh:mm" data-bind="value:endTime,events:['keyup']" />
        </div>
        <div class="row">
            <label for="inputEndTimeMachine">Machine End Time</label><br />
            <select id="selectEndTimeMachine" data-bind="value:endTimeMachine,events:['change']">
	            {{#each selectEndTimeMachine}}
                <option value="{{value}}">{{label}}</option>
                {{/each}}
            </select>
        </div>
        <div class="row">
            <label for="txtEndTimeMotive">End Time Motive</label><br />
            <textarea type="text" id="txtEndTimeMotive" rows="10" class="input-xxlarge" placeholder="Motive to stay latter..." data-bind="value:endTimeMotive,events:['keyup']">{{endTimeMotive}}</textarea>
        </div>
	</div>
    <div class="row">
        <label for="inputLeavingEarly">Leaving Early</label><br />
    	<input type="text" id="inputLeavingEarly" class="input-small" value="{{leavingEarly}}" placeholder="00:00" data-bind="value:leavingEarly,events:['keyup']" disabled />
    </div>
    <!-- TODO remove it &#45; no sense! Use end time motive... -->
	<div id="divLeavingEarlyMotive">
        <div class="row">
            <label for="txtLeavingEarlyMotive">Leaving Early Motive</label><br />
            <textarea type="text" id="txtLeavingEarlyMotive" rows="10" class="input-xxlarge" placeholder="Motive to leaving early..." data-bind="value:leavingEarlyMotive,events:['keyup']">{{leavingEarlyMotive}}</textarea>
        </div>
    </div>
    <div class="row">
        <label for="txtObservation">Observation</label><br />
        <textarea type="text" id="txtObservation" rows="10" class="input-xxlarge" placeholder="Observation..." data-bind="value:observation,events:['keyup']">{{observation}}</textarea>
    </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#timesheets" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
