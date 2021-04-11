var samples = ("../data/samples.json")

d3.json(samples).then(function(bdata) {
    // console.log(bdata)
    subj_ids = bdata.names;
    // console.log(subj_ids);
    dem_info = bdata.metadata;
    // console.log(dem_info
    otus = bdata.samples;
    console.log(otus)

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

  });
