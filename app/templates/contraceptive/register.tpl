<h1>COntraceptive</h1>
<div id="divRegister" class="container">
    <div class="row">
        <label for="inputDate">Date</label><br />
        <input type="text" id="inputDate" class="col-xs-6 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="inputTaken">Taken</label>
        <select id="selectAccountFrom" class="col-xs-12" data-bind="value:accountFrom,events:['change']">
            {{#each accountFrom}}
            <option value="{{value}}">{{label}}</option>
            {{/each}}
        </select>
    </div>
    <div class="row">
        <label for="inputIsMenstruating">Is menstruating?</label>
        <select id="selectAccountTo" class="col-xs-12" data-bind="value:accountTo,events:['change']">
            {{#each accountTo}}
            <option value="{{value}}">{{label}}</option>
            {{/each}}
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
