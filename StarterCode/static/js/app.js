var samples = ("../data/samples.json")
var i = 0



d3.json(samples).then(function(bdata) {
  // console.log(bdata)
  var subj_ids = bdata.names;
  // console.log(subj_ids);
  var dem_info = bdata.metadata;
  // console.log(dem_info);
  var otus = bdata.samples;
  // console.log(otus)

  // Set default values
  var dem_data = dem_info[i];
  // console.log(dem_info_panel)
  var charts_data = otus[i];
  // console.log(charts_data)


  // Dropdown menu to select ID working
  subj_id_fill(subj_ids);
  function subj_id_fill(subj_ids) {
    var sel_id = d3.select("#selDataset");
    sel_id.html("");
    for (var i = 0; i < subj_ids.length; i++) {
      var optionrow = sel_id.append("option");
          optionrow.text(subj_ids[i]);
          optionrow.attr("value", subj_ids[i]);
          // console.log(sel_id)
   };
   }


    // dropdown 2 try
    // function init() {
    //   var dropdownMenu = d3.select("#selDataset");
    //   d3.json(samples).then((importedData) => {
    //     var sel_id = subj_ids;
    //     sel_id.forEach((id_no)=>{
    //       dropdownMenu
    //       .append('option')
    //       .text(id_no)
    //       .property('value');
    //     });
    //   });
    // };
    
      

    //  Event listener when new ID is selected not working yet
    d3.selectAll("#selDataset").on("change", optionChanged);
    function optionChanged() {
      var sel_id = d3.selectAll("#selectOption").node();
      //Find the index of the id array matching the value of the selectedName
      dem_data.findIndex(x => x.id === parseInt(sel_id));

      // //console.log(ind);
      // //Populate Demogrpahic 
      // populateDemoGraphic();
      // //Display Horizontal Bar chart
      // plotHorizontalBar();
      // //Display Bubble chart
      // plotBubbleChart();
      // //Display Gauge chart
      // displayGaugeChart();
  }


    //  Info Panel good
    dem_info_fill(dem_data);
    function dem_info_fill(id)  {
      dem_panel = d3.select("#sample-metadata").html(`
      <p><strong>Id:</strong> ${dem_data.id}</p>
      <p><strong>Ethnicity:</strong> ${dem_data.ethnicity}</p>
      <p><strong>Gender:</strong> ${dem_data.gender}</p>
      <p><strong>Age:</strong> ${dem_data.age}</p>
      <p><strong>Location:</strong> ${dem_data.location}</p>
      <p><strong>BB Type:</strong> ${dem_data.bbtype}</p>
      <p><strong>WFREQ:</strong> ${dem_data.wfreq}</p>
      `)}


    // Bar Chart
    bar_chart_fill(charts_data)
    function bar_chart_fill() {
      var chart_values = charts_data.sample_values.slice(0, 10).reverse();
      // console.log(chart_values)
      var chart_ids = charts_data.otu_ids.slice(0, 10).reverse();
      // console.log(chart_ids)
      var chart_idlabels = chart_ids.map(d => "OTU " + d );
      // console.log(`${chart_idlabels}`)

      var trace1 = {
        type: 'bar',
        x: chart_values,
        y: chart_idlabels,
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
    }

      
    // Bubble Chart
    bubble_chart_fill(charts_data)
    function bubble_chart_fill() {
      var all_otu_ids = charts_data.otu_ids
      var all_sample_values = charts_data.sample_values
      // console.log(all_otu_ids)

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
    }


    // Gauge Chart
    gauge_chart_fill(dem_data)
    function gauge_chart_fill(){
      var gdata = dem_data.wfreq;
      // console.log(gdata)

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
    }

  });