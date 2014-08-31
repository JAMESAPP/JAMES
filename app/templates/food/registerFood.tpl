<h1>Custom Food Register</h1>
<div id="divRegister" class="container">
   <div class="row">
        <label for="inputName">Name</label><br />
        <input type="text" id="inputName" class="input-small" value="{{name}}" placeholder="e.g. parmegiana" data-bind="value:name,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="inputCalories">Calories</label><br />
        <input type="text" id="inputCalories" class="input-small" value="{{calories}}" placeholder="100" data-bind="value:calories,events:['keyup']"/>
    </div>
    <div class="row">
        <label for="selectFoodGroups">Food Group</label><br />
        <select id="selectFoodGroups" data-bind="value:group,events:['change']">
        {{#each selectFoodGroups}}
            <option value="{{value}}">{{label}}</option>
        {{/each}}
        </select>
    </div>
</div>
<br />
<span id="spanMessage"></span>
<br />
<br />
<a href="#foods" class="btn btn-default"><i class="icon-home icon-white"></i> Go Back!</a>
<a href="#" id="btnPersist" type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i> Send</a>
