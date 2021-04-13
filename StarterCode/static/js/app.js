var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
    // console.log(bdata)
    var subj_ids = bdata.names;
    // console.log(subj_ids);
    var dem_info = bdata.metadata;
    console.log(dem_info);
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

      

  });

