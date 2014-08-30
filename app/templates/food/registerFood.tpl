<h1>Custom Food Register</h1>
<div id="divRegister" class="container">
    <div class="row">
        <div class=col-xs-4">
            <label for="inputCalories">Calories</label>
            <input type="text" id="inputCalories" class="input-small" value="{{calories}}" placeholder="100" data-bind="value:calories,events:['keyup']"/>
        </div>
        <div class=col-xs-4">
            <label for="inputPoints">Points</label>
            <input type="text" id="inputPoints" class="input-small" value="{{points}}" placeholder="10" data-bind="value:points,events:['keyup']"/>
        </div>
        <div id="col-xs-4">
            <label for="selectFoodGroups">Food Group</label>
            <select id="selectFoodGroups" data-bind="value:foodGroup,events:['change']">
            {{#each selectFoodGroups}}
                <option value="{{value}}">{{label}}</option>
            {{/each}}
            </select>
        </div>
    </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#foods" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
