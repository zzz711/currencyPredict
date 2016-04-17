var dataGraph = new Array();
$(document).ready(function(){
  var dates = getDates(new Date(2000,0,1),new Date());
    for(var i=0;i<dates.length;i++)
      pushData(dates[i]); $("#data").html(JSON.stringify(dataGraph[0]));
 drawGraph("AUD");
  $("#USD").click(function(){
    drawGraph("USD");
  });
  $("#AUD").click(function(){
    drawGraph("AUD");
  });
  $("#GBP").click(function(){
    drawGraph("GBP");
  });
  $("#CAD").click(function(){
    drawGraph("CAD");
  });
  bankRate();
});
function bankRate(){
  $.ajax({  url:"http://adamnathanielwhite.com/random/forex/centralBankRates/canada.json",
     
    success: function(data){
      $("#data").html(JSON.stringify(data));
    }
  });
}
function drawGraph(currency){
   var g = new Dygraph(
    // containing div
    document.getElementById("graph"),

    // CSV or path to a CSV file.
    "Month,"+currency+"/EUR\n" +
    toString(currency)
);
}
function toString(currency){
  var dates = getDates(new Date(2000,0,1),new Date());
  var string = "";
  for(var i=0;i<dates.length;i++){
    string+= dates[i] +","+ getCurrency(currency)[i] + "\n";
  }
  return string;
}
function getCurrency(currency){
  var rate = new Array();
  for(var i=0;i<dataGraph.length;i++)
    rate.push(dataGraph[i][currency]);
  return rate;
}
function pushData(date){
  $.ajax({
    url:"http://api.fixer.io/"+date,
    success: function(data){
      dataGraph.push(data.rates);
    },
    async: false
  });
}
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      var month = currentDate.getMonth()+1;
      if(month<10)
        month = "0"+ month;
        dateArray.push( (currentDate.getYear()+1900)+"-"+month+"-01")
        currentDate = currentDate.addMonth(1);
    }
    return dateArray;
}
Date.prototype.addMonth = function(month) {
    var dat = new Date(this.valueOf())
    dat.setMonth(dat.getMonth() + month);
    return dat;
}
