var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
    // console.log(bdata)
    var subj_ids = bdata.names;
    // console.log(subj_ids);
    var dem_info = bdata.metadata;
    // console.log(dem_info);
    var otus = bdata.samples;
    
    // Default data
    def_subj_ids = subj_ids[0];
    def_dem_info = dem_info[0];
    def_otus = otus[0];

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
     dem_info_fill(def_dem_info);
     function dem_info_fill(def_dem_info)  {
      default_deminfo = d3.select("#sample-metadata").html(`
      <p><strong>Id:</strong> ${def_dem_info.id}</p>
      <p><strong>Ethnicity:</strong> ${def_dem_info.ethnicity}</p>
      <p><strong>Gender:</strong> ${def_dem_info.gender}</p>
      <p><strong>Age:</strong> ${def_dem_info.age}</p>
      <p><strong>Location:</strong> ${def_dem_info.location}</p>
      <p><strong>BB Type:</strong> ${def_dem_info.bbtype}</p>
      <p><strong>WFREQ:</strong> ${def_dem_info.wfreq}</p>
      `)}


      // Bar Chart
      var d_hbdata = def_otus.sample_values.slice(0, 10).reverse();
      // console.log(d_hbdata)
      var d_hbotu_ids = def_otus.otu_ids.slice(0, 10).reverse();
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

      var layout = {
        margin: {
          l: 100,
          r: 100,
        }
      };

      Plotly.newPlot("bar", dhbData, layout);

      var gdata = def_dem_info.wfreq;
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
      
      var layout = { width: 600, height: 400 };
      Plotly.newPlot("gauge", data, layout);


      // Bubble Chart
      var all_otu_ids = def_otus.otu_ids
      var all_sample_values = def_otus.sample_values
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