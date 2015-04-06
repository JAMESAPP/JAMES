<h1>Contraceptives</h1>
<a href="#contraceptive/new" class="btn btn-success"><i class="icon-plus icon-white"></i> New</a>
<br />
<br />
<ul class="nav nav-tabs" role="tablist">
    <li class="active"><a href="#status" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-stats"></span></a></li>
    <li><a href="#calendarTab" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-calendar"></span></a></li>
</ul>
<div class="tab-content">
    <div id="status" class="tab-pane active">
        <table class="table table-bordered table-hover">
            <caption><strong><em>Contraceptive's Status</em></strong></caption>
            <thead>
                <tr>
    	            <!-- <th class="not&#45;taken&#45;yet">Not yet</th> -->
                    <!-- <th class="taken">Taken</th> -->
                    <!-- <th class="missed">Missed</th> -->
                    <!-- <th class="void">Void</th> -->
                    <!-- <th class="is&#45;menstruating">Menstruating</th> -->
                    <th>Status</th>
                    <th>#</th>
            	</tr>
          </thead>
          <tbody id="tbodyItem">
            <!-- <tr> -->
                <!-- <td class="not&#45;taken&#45;yet">{{notTakenYet}}</td> -->
            <!--     <td class="taken">{{taken}}</td> -->
            <!--     <td class="missed">{{missed}}</td> -->
            <!--     <td class="void">{{void}}</td> -->
            <!--     <td class="is&#45;menstruating">{{isMenstruating}}</td> -->
            <!-- </tr> -->
            <tr class="not-taken-yet">
                <td>Not taken yet</td>
                <td>{{notTakenYet}}</td>
            </tr>
            <tr class="taken">
                <td>Taken</td>
                <td>{{taken}}</td>
            </tr>
            <tr class="missed">
                <td>Missed</td>
                <td>{{missed}}</td>
            </tr>
            <tr class="void">
                <td>Void</td>
                <td>{{void}}</td>
            </tr>
            <tr class="is-menstruating">
                <td>Is Menstruating</td>
                <td>{{isMenstruating}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div id="calendarTab" class="tab-pane">
        <br />
        <div id="calendar"></div>
    </div>
</div>
