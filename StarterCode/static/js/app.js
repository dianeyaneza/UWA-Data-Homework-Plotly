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

      // hbchart_fill(otus[0]);

      // var d_hb = otus[0];
      // d_hbdata = d_hb.sample_values.slice(0, 10);
      // d_hblabels = d_hb.otu_ids.slice(0, 10);
      // default_hbchart_labels = otus[0].otu_ids.slice(0, 10);
      // console.log(d_hbdata);
      // console.log(d_hblabes)

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

      var layout = {
        margin: {
          l: 100,
          r: 100,
        }
      };

      Plotly.newPlot("bar", dhbData, layout);

      var gdata = dem_info[0].wfreq;
      console.log(gdata)


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



      // // part of data to input
      // var traceGauge = {
      //   type: 'pie',
      //   showlegend: false,
      //   hole: 0.4,
      //   rotation: 90,
      //   values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      //   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      //   direction: 'clockwise',
      //   textinfo: 'text',
      //   textposition: 'inside',
      //   marker: {
      //     colors: ['','','','','','','','','','white'],
      //     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      //     hoverinfo: 'label'
      //   }
      // }

      // // needle
      // var degrees = 50, radius = .9;
      // var radians = degrees * Math.PI / 180;
      // var x = (-1 * radius * Math.cos(radians) * wfreqNum);
      // var y = radius * Math.sin(radians);

      // var gaugeLayout = {
      //   shapes: [{
      //     type: 'line',
      //     x0: 0.5,
      //     y0: 0.5,
      //     x1: 0.6,
      //     y1: 0.6,
      //     line: {
      //       color: 'black',
      //       width: 3
      //     }
      //   }],
      //   title: 'Chart',
      //   xaxis: {visible: false, range: [-1, 1]},
      //   yaxis: {visible: false, range: [-1, 1]}
      // }

      // var dataGauge = [traceGauge]

      // Plotly.newPlot("gauge", dataGauge, gaugeLayout);

  });

