var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
  // console.log(bdata)
  var subj_ids = bdata.names;
  // console.log(subj_ids);
  var dem_info = bdata.metadata;
  // console.log(dem_info);
  var otus = bdata.samples;
  // console.log(otus)


  // Dropdown menu to select ID
  subj_id_fill(subj_ids);
  function subj_id_fill(subj_ids) {
    var chosenid = d3.select("#selDataset");
    chosenid.html("");
    for (var i = 0; i < subj_ids.length; i++) {
      var optionrow = chosenid.append("option");
          optionrow.text(subj_ids[i]);
          optionrow.attr("value", subj_ids[i]);
   };
   }

  // //  Event listener when new ID is selected not working yet
  // id_selection = d3.select("#selDataset").on("change", optionChanged);

  // // ON CHANGE: 'optionChanged' from dropdown selection
  //   function optionChanged(id_no){
  //     dem_info_fill(id_no);
  //     charts_data(id_no);
  //   };

    // // New Info Panel try 
    // function deminfo_fill(id_no){
    //   d3.json(samples).then((bdata)=>{
    //     var dem_info = bdata.metadata;
    //     var result = dem_info.filter(dem => dem.id_no.toString() === id_no)[0];
    //     var dem_panel = d3.select("#sample-metadata");
    //     dem_panel.html("");
    //     Object.defineProperties(result).forEach((key)=> {
    //       dem_panel.append("h4").text(key[0].toUpperCase()+ ": " + key[1] + "\n");
    //     });
    //   });
    // }

    //  Info Panel good
    dem_info_fill(dem_info);
    function dem_info_fill(dem_info)  {
     default_deminfo = d3.select("#sample-metadata").html(`
     <p><strong>Id:</strong> ${dem_info[0].id}</p>
     <p><strong>Ethnicity:</strong> ${dem_info[0].ethnicity}</p>
     <p><strong>Gender:</strong> ${dem_info[0].gender}</p>
     <p><strong>Age:</strong> ${dem_info[0].age}</p>
     <p><strong>Location:</strong> ${dem_info[0].location}</p>
     <p><strong>BB Type:</strong> ${dem_info[0].bbtype}</p>
     <p><strong>WFREQ:</strong> ${dem_info[0].wfreq}</p>
     `)}

      // Bar Chart
      var d_hbdata = otus[0].sample_values.slice(0, 10).reverse();
      // console.log(d_hbdata)
      var d_hbotu_ids = otus[0].otu_ids.slice(0, 10).reverse();
      console.log(d_hbotu_ids)
      var d_hblabels = d_hbotu_ids.map(d => "OTU " + d );
      console.log(`${d_hblabels}`)

      var trace1 = {
        type: 'bar',
        x: d_hbdata,
        y: d_hblabels,
        orientation: 'h'
      };

      var dhbData = [trace1];

      var blayout = {
        margin: {
          l: 150,
          r: 100,
        }
      };

      Plotly.newPlot("bar", dhbData, blayout);


      // Gauge Chart

      var gdata = dem_info[0].wfreq;
      console.log(gdata)

      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: gdata,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Washes per Week"},
          type: "indicator",
          bar: { color: "blue" },
          mode: "gauge+number",
          delta: { reference: 400 },
          gauge: { axis: { range: [null, 10] } }
        }
      ];
      
      var bblayout = { width: 500, height: 500 };
      Plotly.newPlot("gauge", data, bblayout);


      // Bubble Chart
      var all_otu_ids = otus[0].otu_ids
      var all_sample_values = otus[0].sample_values
      console.log(all_otu_ids)

      var trace1 = {
        x: all_otu_ids,
        y: all_sample_values,
        text: all_otu_ids,
        mode: 'markers',
        marker: {
          size: all_sample_values,
          color: all_sample_values,
          colorscale: "Jet"
        }
      };
      
      var data = [trace1];
      
      var layout = {
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot("bubble", data, layout);

  });