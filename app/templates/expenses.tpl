<h1>Expenses</h1>

<div id="divRegister">
    <label for="inputDate">Date</label>
    <input type="text" id="inputDate" class="input-small dateMask" value="{{date}}" placeholder="Date of transaction" data-bind="value:date,events:['keyup']"/>

    <label for="inputAmount">Ammount</label>
    <input type="text" id="inputAmount" class="input-small" value="{{ammount}}" placeholder="Ammount of transaction" data-bind="value:ammount,events:['keyup']" />

    <label for="inputPayee">Payee</label>
    <input type="text" id="inputPayee" class="input-xlarge" value="{{payee}}" placeholder="Payee of transaction" data-bind="value:payee,events:['keyup']" />

    <label for="inputCategory">Category</label>
    <input type="text" id="inputCategory" class="input-xxlarge" value="{{category}}" placeholder="Category of transaction" data-bind="value:category,events:['keyup']" />

    <label for="inputMemo">Memo</label>
    <textarea type="text" id="txtMemo" rows="10" class="input-xxlarge" placeholder="Memo of transaction" data-bind="value:memo,events:['keyup']">{{memo}}</textarea>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#" class="btn btn-inverse"><i class="icon-home icon-white"></i> Voltar</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Enviar</a>
