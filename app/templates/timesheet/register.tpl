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
          <input id="inputOfficialShift" type="checkbox" data-bind="checked:officialShift" />Official Shift? 
        </label>
      </div>
    </div>
  </div>
  <div id="divStartEndDay" class="tab-content">
    <ul class="nav nav-tabs" role="tablist">
      <li class="active"><a href="#checkin" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-play"> Chekin</span></a></li>
      <li><a href="#checkout" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stop"> Checkout</span></a></li>
    </ul>
    <div id="checkin" class="tab-pane active">
      <div class="form-group">
        <label>Checkin Time</label><br />
        <input type="text" id="inputStartTime" class="col-xs-4 timeMask" value="{{startTime}}" placeholder="hh:mm" data-bind="value:startTime,events:['keyup']"/><br />
      </div>
      <div class="form-group">
        <label for="selectStartTimeMachine">Checkin Machine</label><br />
        <select id="selectStartTimeMachine" data-bind="value:startTimeMachine,events:['change']">
          {{#each selectStartTimeMachine}}
          <option value="{{value}}">{{label}}</option>
          {{/each}}
        </select>
      </div>
      <div class="form-group">
        <label for="txtStartTimeMotive">Chekin Motive</label><br />
        <textarea type="text" id="txtStartTimeMotive" rows="5" class="col-xs-12" placeholder="Motive to start early..." data-bind="value:startTimeMotive,events:['keyup']">{{startTimeMotive}}</textarea>
      </div>
    </div>
    <div id="checkout" class="tab-pane">
      <div class="form-group">
        <label for="inputEndTime">Chekout Time</label><br />
        <input type="text" id="inputEndTime" class="col-xs-4 timeMask" value="{{endTime}}" placeholder="hh:mm" data-bind="value:endTime,events:['keyup']" /><br />
      </div>
      <div class="form-group">
        <label for="selectEndTimeMachine">Chekout Machine</label><br />
        <select id="selectEndTimeMachine" data-bind="value:endTimeMachine,events:['change']">
	      {{#each selectEndTimeMachine}}
          <option value="{{value}}">{{label}}</option>
          {{/each}}
        </select>
      </div>
      <div class="form-group">
        <label for="txtEndTimeMotive">Chekout Motive</label><br />
        <textarea type="text" id="txtEndTimeMotive" rows="5" class="col-xs-12" placeholder="Motive to stay latter..." data-bind="value:endTimeMotive,events:['keyup']">{{endTimeMotive}}</textarea>
      </div>
    </div>
  </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#timesheets" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
