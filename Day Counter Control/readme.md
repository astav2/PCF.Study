**Day Counter Control**: https://github.com/astav2/PCF.Study/tree/master/Day%20Counter%20Control

**Demo**
![](https://github.com/astav2/PCF.Study/blob/master/Day%20Counter%20Control/DayCounterControl/Day%20Counter%20Demo.gif)

**Properties**
|Name| Description| Usage| Required| Type| Values|
|:----|:----|:----|:----|:----|:----|
|EndDate| EndDate| bound| true| DateGroup| N/A|
|showHours| showHours| input| true| Enum| Yes (0)| No (1)|
|showMinutes| showMinutes| input| true| Enum| Yes (0)| No (1)|
|showSeconds| showSeconds| input| true| Enum| Yes (0)| No (1)|
|InitialColor| indicates a postive colour range for the widget. use hex colour code. e.g"#006DFF"| input| false| SingleLine.Text| N/A|
|WarningColor| acts as alerting color. changes with days nearing end date. use hex colour formet. eg"#006DFF"| input| false| SingleLine.Text| N/A|
|AlertmeDays| give a threshold number below which the colour of widget changes from initial colour to warning colour| input| true| Whole.None| N/A|
|runAnimation| keep Yes to see seconds animation. False to put static.Negative dates are reflected only if you set this property as false| input| false| Enum| Yes (0)| No (1)|

**Release files**:
Please download the managed solution from here 
https://github.com/astav2/PCF.Study/releases/tag/v1.0.0
