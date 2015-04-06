<h1>Contraceptive</h1>
<div id="divRegister" class="container">
    <div class="row">
        <label for="inputDate">Date</label><br />
        <input type="text" id="inputDate" class="col-xs-6 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="inputTaken">Status</label>
        <select id="selectStaus" class="col-xs-12" data-bind="value:accountFrom,events:['change']">
            <option value="NOT_TAKEN_YET">Not taken yet</option>
            <option value="TAKEN">Taken</option>
            <option value="MISSED">Missed</option>
            <option value="VOID">Void</option>
            <option value="IS_MENSTRUATING">Is menstruating</option>
        </select>
    </div>
    <div class="row">
        <label for="inputMemo">Memo</label>
        <textarea type="text" id="txtMemo" rows="10" class="col-xs-12" placeholder="Memo of transaction" data-bind="value:memo,events:['keyup']">{{memo}}</textarea>
    </div>
    <br />
    <div class="row">
        <span id="spanMessage" class="col-xs-12"></span>
    </div>
    <br />
    <a href="#contraceptives" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
    <a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
</div>
