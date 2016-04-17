
var dataGraph = new Array();
  var dates = getDates(new Date(2000,0,1),new Date());
  for(var i=0;i<dates.length;i++)
  $.ajax({
    url:"http://api.fixer.io/"+dates[i],
    success: function(data){
      dataGraph.push(data.rates);
    },
    async: false
  });
  drawGraph("AUD");


  $("#USD").click(function(){
    drawGraph("USD");
    var f = new Dygraph(
      document.getElementById("graph2"),
      "https://www.quandl.com/api/v3/datasets/FRED/FEDFUNDS.csv?api_key=sDBU-xbmyL1mf9zz2Gw1&start_date=2000-01-01"
    );
  });
  $("#GBP").click(function(){
    drawGraph("GBP");
    var f = new Dygraph(
      document.getElementById("graph2"),
      "https://www.quandl.com/api/v3/datasets/FRED/GBP12MD156N.csv?api_key=sDBU-xbmyL1mf9zz2Gw1&start_date=2000-01-01"
    );
  });
  $("#CAD").click(function(){
    drawGraph("CAD");
    var f = new Dygraph(
      document.getElementById("graph2"),
      "https://www.quandl.com/api/v3/datasets/BOC/V122530.csv?api_key=sDBU-xbmyL1mf9zz2Gw1&start_date=2000-01-01"
    );
  });


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
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      var month = currentDate.getMonth()+1;
      if(month<10)
        month = "0"+ month;
        dateArray.push( (currentDate.getYear()+1900)+"-"+month+"-01")
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return dateArray;
}
