<h1>Food</h1>

<div id="divRegister">
    <label for="inputDate">Date</label>
    <input type="text" id="inputDate" class="input-small dateMask" value="{{date}}" placeholder="dd/mm/yyyy" data-bind="value:date,events:['keyup']"/>
    <br />
    <label for="inputMeal">Meal</label>
    <select id="selectMeal" data-bind="value:meal,events:['change']">
        <option value="breakfast">breakfast</option>
        <option value="lunch">lunch</option>
        <option value="afternoonSnack">afternoon snack</option>
        <option value="dinner">dinner</option>
        <option value="lateNightSnack">late night snack</option>
        <option value="Other">Other</option>
    </select>
    <br />
    <label for="inputFood">Food</label>
    <select id="selectFood" data-bind="value:food,events:['change']">
        {{#each selectFood}}
        <option value="{{value}}">{{label}}</option>
        {{/each}}
    </select>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#foods" class="btn btn-inverse"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
