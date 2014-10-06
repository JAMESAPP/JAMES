<h1>Oil Exchange</h1>
<div id="divRegister" class="">
    <div class="row">
        <div class="col-xs-6">
            <label for="inputDate">Date</label><br />
            <input type="text" id="inputDate" class="col-xs-12 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
        </div>
        <div class="col-xs-6">
            <label for="inputKM">KM</label><br />
            <input type="text" id="inputKM" class="col-xs-12" value="{{KM}}" placeholder="KM of motor" data-bind="value:KM,events:['keyup']" />
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <label for="inputAmount">Amount</label><br />
            <input type="text" id="inputAmount" class="col-xs-12" value="{{amount}}" placeholder="gas (liter)" data-bind="value:amount,events:['keyup']" />
        </div>
        <div class="col-xs-6">
            <label for="inputPrice">Price</label><br />
            <input type="text" id="inputPrice" class="col-xs-12" value="{{price}}" placeholder="per liter" data-bind="value:price,events:['keyup']" />
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <label for="inputGasStation">Gas Station</label><br />
            <input type="text" id="inputGasStation" class="col-xs-12" value="{{gasStation}}" placeholder="Auto Posto Compreto Rua Aparecida" data-bind="value:gasStation,events:['keyup']" />
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <label for="inputObservation">Observation</label>
            <textarea type="text" id="txtObservation" rows="10" class="col-xs-12" placeholder="Something unusual?" data-bind="value:observation,events:['keyup']">{{observation}}</textarea>
        </div>
    </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#motorcycle/oils" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
