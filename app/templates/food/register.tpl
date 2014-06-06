<h1>Food</h1>

<div id="divRegister">
    <label for="inputDate">Date</label>
    <input type="text" id="inputDate" class="input-small dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#foods" class="btn btn-inverse"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
