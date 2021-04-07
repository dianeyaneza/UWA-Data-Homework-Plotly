var metadata;
var samples = ("../data/samples.json")

d3.json(samples).then(function(data) {
    // console.log(data)
    subj_ids = data.names;
    // console.log(subj_ids);
    dmgrphcs = data.metadata;
    otus = data.samples;
 
    subj_id_fill(subj_ids);
    // console.log(dmgrphcs);
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
    });

    // Clear any existing data before appending new data
//     d3.select("#selDataset")
//     .selectAll(null)
//     .data(data.names)
//     .enter()
//     .append('option')
//     .text(function (d) {return d;}) // text showed in the menu
//     .attr("value", function (d) {return d;}) // value kept in the menu

// //Dispolay the demographic info for the first element of the array
// optionChanged(data.metadata[0].id);

//     data = importedData;
//     metadata = importedData.metadata;

// function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("/names").then((sampleNames) => {
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
  
//       // Use the first sample from the list to build the initial plots
//       const firstSample = sampleNames[0];
//       buildCharts(firstSample);
//       buildMetadata(firstSample);
//     });
//   }

