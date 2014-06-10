<h1>Motorcycle</h1>

<div id="divRegister">
    <label for="inputDate">Date</label>
    <input type="text" id="inputDate" class="input-small dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>

    <label for="inputKM">KM</label>
    <input type="text" id="inputKM" class="input-small" value="{{KM}}" placeholder="KM of motor" data-bind="value:KM,events:['keyup']" />

    <label for="inputAmount">Amount</label>
    <input type="text" id="inputAmount" class="input-small" value="{{amount}}" placeholder="gas (liter)" data-bind="value:amount,events:['keyup']" />


    <label for="inputPrice">Price</label>
    <input type="text" id="inputAmmount" class="input-small" value="{{price}}" placeholder="per liter" data-bind="value:price,events:['keyup']" />

    <label for="inputObservation">Observation</label>
    <textarea type="text" id="txtObservation" rows="10" class="input-xxlarge" placeholder="Something unusual?" data-bind="value:observation,events:['keyup']">{{observation}}</textarea>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#motorcycles" class="btn btn-inverse"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
