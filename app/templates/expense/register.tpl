<h1>Expenses</h1>
<div id="divRegister" class="container">
    <div class="row">
        <div class="col-xs-6">
            <label for="inputDate">Date</label><br />
            <input type="text" id="inputDate" class="col-xs-12 dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
        </div>
        <div class="col-xs-6">
            <label for="inputAmmount">Ammount</label><br />
            <input type="text" id="inputAmmount" class="col-xs-12" value="{{ammount}}" placeholder="Ammount of transaction" data-bind="value:ammount,events:['keyup']" />
        </div>
    <!-- </div> -->
    <!-- <div class="row"> -->
    </div>
    <div class="row">
        <label for="inputCategory">Category</label>
        <select id="selectCategory" class="col-xs-12" data-bind="value:category,events:['change']">
            {{#each selectCategory}}
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
    <a href="#expenses" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
    <a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
</div>
