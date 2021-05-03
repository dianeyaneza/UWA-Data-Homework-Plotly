var samples = ("../data/samples.json")

// initialise data on load
function init() {
    var selectedId = d3.select("#selDataset");
    d3.json(samples).then((bdata) => {
      var subj_ids = bdata.names;
      subj_ids.forEach((sample) => {
        selectedId
        .append("option")
        .text(sample)
        .property("value", sample);
      });
      
      // values to read on load based on default subject id 
      var def_subjId = subj_ids[0];
      dem_info_fill(def_subjId);
      buildCharts(def_subjId);
      buildGauge(def_subjId);
    }); 
  };

// event listener when new is is selected
function optionChanged(new_subjId){
    console.log(new_subjId);
    dem_info_fill(new_subjId);
    buildCharts(new_subjId);
    buildGauge(new_subjId);
}

// function to fill panel info
function dem_info_fill(sample)  {
    d3.json(samples).then((bdata) => {
        console.log(bdata)
        // var subj_ids = bdata.names;
        // console.log(subj_ids);
        var dem_info = bdata.metadata;
        // console.log(dem_info);
        var idArray = dem_info.filter(sampleObj => sampleObj.id == sample);
        var def_subjId = idArray[0];
        console.log(def_subjId);
        var panel = d3.select("#sample-metadata");
        var otus = bdata.samples;
        // console.log(otus)
      
        panel.html("");

        Object.entries(def_subjId).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// finction to build charts
function buildCharts(sample) {
    d3.json(samples).then((bdata) => {
        var otus = bdata.samples;
        console.log(otus)
        var idArray = otus.filter(sampleObj => sampleObj.id == sample);
        var def_subjId = idArray[0];

        var chart_ids = def_subjId.otu_ids.slice(0, 10).reverse();
        console.log(chart_ids)
        var chart_idlabels = chart_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
        console.log(`${chart_idlabels}`)
        var chart_values = def_subjId.sample_values.slice(0, 10).reverse();
        console.log(chart_values)

        // bar chart
        var trace1 = {
            type: 'bar',
            x: chart_values,
            y: chart_idlabels,
            orientation: 'h'
          };
        
          var BC = [trace1];
        
          var blayout = {
            margin: {
              l: 150,
              r: 100,
            }
          };
        
          Plotly.newPlot("bar", BC, blayout);

        //   bubble chart
          var trace2 = {
            x: chart_ids,
            y: chart_values,
            text: chart_idlabels,
            mode: 'markers',
            marker: {
              size: chart_values,
              color: chart_ids,
              colorscale: "Jet"
            }
          };
          
          var BBC = [trace2];
          
          var layout = {
            showlegend: false,
            height: 500,
            width: 1100
          };
          
          Plotly.newPlot("bubble", BBC, layout);
    });
}

// function to build gauge chart
function buildGauge(sample) {
    d3.json(samples).then((bdata) => {
        var dem_info = bdata.metadata;
        var idArray = dem_info.filter(sampleObj => sampleObj.id == sample);
        var def_subjId = idArray[0];
        console.log(def_subjId);

        var gdata = def_subjId.wfreq;
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
    });
}

// run onload
init();