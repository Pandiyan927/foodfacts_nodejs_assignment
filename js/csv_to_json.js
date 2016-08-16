var readline=require('readline');
var fs=require('fs');

var input = fs.createReadStream("../csv/FoodFacts_full.csv");
//var input=fs.createReadStream("../files/FoodFacts.csv");
var rdLine=readline.createInterface({
  input : input
});

var splitted_data=[];
var i=0;
var index_sugar=0;
var index_salt=0;
var index_country=0;
/*Netherlands
Canada
UK/USA
Australia
France
Germany
Spain
South Africa
*/
var barChartCountries=["Netherlands" , "Canada" , "United Kingdom" , "USA", "Australia" ,"France" , "Germany" , "Spain" , "South Africa"];

var sugar_salt=[];
var index_fat=0;
var index_protein=0;
var index_carbohydrate=0;
var northEurope=["United Kingdom", "Denmark", "Sweden" ,"Norway"]; //North Europe (United Kingdom, Denmark, Sweden and Norway)
var centralEurope=["France", "Belgium", "Germany", "Switzerland","Netherlands"];//Central Europe (France, Belgium, Germany, Switzerland and Netherlands)
var southEurope=["Portugal", "Greece", "Italy", "Spain", "Croatia","Albania"];//South Europe (Portugal, Greece, Italy, Spain, Croatia and Albania).
var regions=["North Europe","Central Europe","South Europe"];
var multi_series=[];

rdLine.on('line', function(line){
  //console.log("inside line event");
  splitted_data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //splitted_data = line.split(",");
  if(i==0)
  {
    index_country=splitted_data.indexOf("countries_en");
    index_sugar=splitted_data.indexOf("sugars_100g");
    index_salt=splitted_data.indexOf("salt_100g");

    index_fat=splitted_data.indexOf("fat_100g");
    index_protein=splitted_data.indexOf("proteins_100g");
    index_carbohydrate=splitted_data.indexOf("carbohydrates_100g");
    i++
  }
  else
  {
    for(var j=0 ; j<barChartCountries.length;j++)
    {
      if(barChartCountries[j]==splitted_data[index_country])
      {
        var value_country=splitted_data[index_country];
        var value_sugar=splitted_data[index_sugar];
        var value_salt=splitted_data[index_salt];
        if(value_sugar=="")
        {
            value_sugar=0;
        }
        if(value_salt=="")
        {
            value_salt=0;
        }
        var flag=0;
        //console.log(sugar_salt.length);
        for(var k=0; k<sugar_salt.length; k++)
        {
          if(sugar_salt[k].country_name==value_country)
          {
            sugar_salt[k].sugar_content=parseFloat(sugar_salt[k].sugar_content)+parseFloat(value_sugar);
            sugar_salt[k].salt_content=parseFloat(sugar_salt[k].salt_content)+parseFloat(value_salt);
            flag++;
            break;
          }
        }
        if(flag==0)
        {
          sugar_salt.push({"country_name":value_country,"sugar_content":parseFloat(value_sugar),"salt_content":parseFloat(value_salt)});
          //console.log(sugar_plus_salt);
        }
      }
    }



    //console.log(sugar_salt);
    //fs.writeFile('../files/salt_plus_sugar_full_new_1.json', JSON.stringify(sugar_salt) , 'utf-8');
  
  

    for(var aa=0;aa<northEurope.length;aa++)
    {
      if(northEurope[aa]==splitted_data[index_country])
      {
        var value_region="North Europe"
        var value_country_2=splitted_data[index_country];
        var value_fat=splitted_data[index_fat];
        var value_protein=splitted_data[index_protein];
        var value_carbohydrates=splitted_data[index_carbohydrate];

        if(value_fat=="")
        {
          value_fat=0;
        }
        if(value_protein=="")
        {
          value_protein=0;
        }
        if(value_carbohydrates=="")
        {
          value_carbohydrates=0;
        }

        if(multi_series[regions.indexOf(value_region)]==null)
        {
          multi_series[regions.indexOf(value_region)] = {
            "region": value_region,
            "fat" : parseFloat(value_fat),
            "proteins" : parseFloat(value_protein),
            "carbohydrates": parseFloat(value_carbohydrates)
          };
        }
        else
        {
          multi_series[regions.indexOf(value_region)].fat=multi_series[regions.indexOf(value_region)].fat+parseFloat(value_fat);
          multi_series[regions.indexOf(value_region)].proteins=multi_series[regions.indexOf(value_region)].proteins+parseFloat(value_protein);
          multi_series[regions.indexOf(value_region)].carbohydrates=multi_series[regions.indexOf(value_region)].carbohydrates+parseFloat(value_carbohydrates);
        }
      }
    }

    for(var ab=0;ab<centralEurope.length;ab++)
    {
      if(centralEurope[ab]==splitted_data[index_country])
      {
        var value_region="Central Europe"
        var value_country_2=splitted_data[index_country];
        var value_fat=splitted_data[index_fat];
        var value_protein=splitted_data[index_protein];
        var value_carbohydrates=splitted_data[index_carbohydrate];

        if(value_fat=="")
        {
          value_fat=0;
        }
        if(value_protein=="")
        {
          value_protein=0;
        }
        if(value_carbohydrates=="")
        {
          value_carbohydrates=0;
        }
        if(multi_series[regions.indexOf(value_region)]==null)
        {
          multi_series[regions.indexOf(value_region)] = {
            "region": value_region,
            "fat" : parseFloat(value_fat),
            "proteins" : parseFloat(value_protein),
            "carbohydrates": parseFloat(value_carbohydrates)
          };
        }
        else
        {
          multi_series[regions.indexOf(value_region)].fat=multi_series[regions.indexOf(value_region)].fat+parseFloat(value_fat);
          multi_series[regions.indexOf(value_region)].proteins=multi_series[regions.indexOf(value_region)].proteins+parseFloat(value_protein);
          multi_series[regions.indexOf(value_region)].carbohydrates=multi_series[regions.indexOf(value_region)].carbohydrates+parseFloat(value_carbohydrates);
        }
      }
    }

    for(var ac=0;ac<southEurope.length;ac++)
    {
      if(southEurope[ac]==splitted_data[index_country])
      {
        var value_region="South Europe"
        var value_country_2=splitted_data[index_country];
        var value_fat=splitted_data[index_fat];
        var value_protein=splitted_data[index_protein];
        var value_carbohydrates=splitted_data[index_carbohydrate];

        if(value_fat=="")
        {
          value_fat=0;
        }
        if(value_protein=="")
        {
          value_protein=0;
        }
        if(value_carbohydrates=="")
        {
          value_carbohydrates=0;
        }
        if(multi_series[regions.indexOf(value_region)]==null)
        {
          multi_series[regions.indexOf(value_region)] = {
            "region": value_region,
            "fat" : parseFloat(value_fat),
            "proteins" : parseFloat(value_protein),
            "carbohydrates": parseFloat(value_carbohydrates)
          };
        }
        else
        {
          multi_series[regions.indexOf(value_region)].fat=multi_series[regions.indexOf(value_region)].fat+parseFloat(value_fat);
          multi_series[regions.indexOf(value_region)].proteins=multi_series[regions.indexOf(value_region)].proteins+parseFloat(value_protein);
          multi_series[regions.indexOf(value_region)].carbohydrates=multi_series[regions.indexOf(value_region)].carbohydrates+parseFloat(value_carbohydrates);
        }  
      }
    }


    //fs.writeFile('../files/fat_protein_carbohydrate_full_new_1.json', JSON.stringify(multi_series) , 'utf-8');

    
    //console.log("End of program");
  }//else ends
});

rdLine.on("close" , () =>{
  fs.writeFile('../json/salt_plus_sugar_full_new_4.json', JSON.stringify(sugar_salt) , 'utf-8');
  fs.writeFile('../json/fat_protein_carbohydrate_full_new_4.json', JSON.stringify(multi_series) , 'utf-8');
});









/*

//importing modules
var readline = require('readline');
var fs = require('fs');

var input = fs.createReadStream("../files/FoodFacts.csv");
fs.writeFile('inputSreams.txt', input, function (err) {
  if (err) return console.log(err);
  //console.log('Hello World > helloworld.txt');
});

var rdLine = readline.createInterface({
  input : input
  //console.log(input)
});
rdLine.on('line', function(line){
  console.log(`Received: ${line}`);
});

*/









/*
var fs = require("fs");

var data = fs.readFileSync('hello.txt','utf8');
console.log(data);
console.log("Program ended")




fs.readFile('hello2.txt','utf8',function(err,data1){
  console.log(data1);
  //setTimeout(100)
});
fs.readFile('hello.txt','utf8',function(err,data2){
  console.log(data2);
});


console.log("Program ended")

*/
