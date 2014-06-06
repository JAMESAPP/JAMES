<h1>Expenses</h1>

<div id="divRegister">
    <label for="inputDate">Date</label>
    <input type="text" id="inputDate" class="input-small dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>

    <label for="inputAmmount">Ammount</label>
    <input type="text" id="inputAmmount" class="input-small" value="{{ammount}}" placeholder="Ammount of transaction" data-bind="value:ammount,events:['keyup']" />

    <label for="inputCategory">Category</label>
    <select id="selectCategory" data-bind="value:category,events:['change']">
        {{#each selectCategory}}
        <option value="{{value}}">{{label}}</option>
        {{/each}}
    </select>
    <label for="inputMemo">Memo</label>
    <textarea type="text" id="txtMemo" rows="10" class="input-xxlarge" placeholder="Memo of transaction" data-bind="value:memo,events:['keyup']">{{memo}}</textarea>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#expenses" class="btn btn-inverse"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
