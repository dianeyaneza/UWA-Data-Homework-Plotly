var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
  // console.log(bdata)
  var subj_ids = bdata.names;
  // console.log(subj_ids);
  var dem_info = bdata.metadata;
  // console.log(dem_info);
  var otus = bdata.samples;
  console.log(otus[0])
    

  subj_id_fill(subj_ids);
  // console.log(dem_info);
  // console.log(otus);
  function subj_id_fill(subj_ids) {
    var chosenid = d3.select("#selDataset");
    chosenid.html("");
    for (var i = 0; i < subj_ids.length; i++) {
      var optionrow = chosenid.append("option");
          optionrow.text(subj_ids[i]);
          optionrow.attr("value", subj_ids[i]);
   };
   }


    //  Info Panel
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
      // console.log(d_hbotu_ids)
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

      var gdata = dem_info[0].wfreq;
      console.log(gdata)


      // Gauge Chart
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: 2,
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
          color: ['rgb(191,233,115)', 'rgb(213,198,183)', 'rgb(44, 160, 101)', 'rgb(174,143,113)',  'rgb(213,198,183)', 'rgb(77,83,168)'],
          opacity: [1, 0.8, 0.6, 0.4, 0.2],
          size: all_sample_values
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