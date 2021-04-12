var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
    // console.log(bdata)
    var subj_ids = bdata.names;
    // console.log(subj_ids);
    var dem_info = bdata.metadata;
    // console.log(dem_info);
    var otus = bdata.samples;
    // console.log(otus)

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
    
    function filterChosenID(dem_info) {
      return dem_info;
     }

    var defaultID = dem_info.filter(obj => obj.id == idNo);
    
    console.log(defaultID);
    
     function dem_info_fill(dem_info) {
      dem_panel = d3.select("#sample-metadata");
      dem_panel.html("");
      var idDem = dem_info.filter();
      console.log(idDem)
      // var chosenSample = idResults[0];
      
      
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("panel-body").text(`${key.toUpperCase()}: ${value}`);
      });

    }

  });




//     //  dem_info_fill(dem_info);
//     // function dem_info_fill(dem_info) {
//     //     return dem_info 
//     // }

