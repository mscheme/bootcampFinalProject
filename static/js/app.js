let tbody = d3.select("tbody");

d3.json("/data").then(data =>{
    const initial_data = data.data.slice(0,25)
    console.log(`this is initial`, initial_data)
    const loc = window.location.pathname;
    if(loc === '/predictor'){

        tbody.html("");
        const dataset = data.data
        const mapped_data = initial_data.map(item=>{
            const tbody = document.querySelector("tbody");
            tbody.innerHTML += `
            <tr>
            <td>${item.artist_name}</td>
            <td>${item.song_name}</td>
            <td>${item.year}</td>
            <td>${item.popularity}</td>
            </tr>`
        })

        d3.selectAll("#Btn").on("click", updateFiltersandBuild);
        d3.selectAll("#Btn-artist").on("click", updateFilterList)
        
        
        function updateFiltersandBuild(){
            // this function uses the values of artist and song to get the cluster id
            // prevent auto refresh
            d3.event.preventDefault();

            let dataArray = Object.values(data);
            console.log(dataArray);

            // get artist and song filter values
            artistFilter = d3.select("#exampleDataList").property("value");
            console.log('artistFliter is: ', artistFilter);

            songSelected = d3.select("#filter-songs").property("value");
            console.log('songSelected is: ', songSelected);

            // filter data based on artist and song
            let filterData = dataArray[0].filter(item => ((item.artist_name.toLowerCase().includes(artistFilter.toLowerCase())) & item.song_name == songSelected))
            console.log('this is to get the cluster number combined filter: ', filterData);

            // get cluster label
            let clusterID = filterData[0].cluster_label;
            console.log('cluster_label: ', clusterID)
            //filter data based on cluster label
            let recList = dataArray[0].filter(item => item.cluster_label == clusterID);
            console.log('recommendedList:', recList);

            buildTable(recList);
        }

        function updateFilterList(){
            // This is to update the song list drop-down based on artist entered
            // prevent auto refresh
            d3.event.preventDefault();

            let changedElement = d3.select("#exampleDataList");
            let elementValue = changedElement.property("value");

            let dataArray = Object.values(data);
            let filterData = dataArray[0].filter(item => item.artist_name.toLowerCase().includes(elementValue.toLowerCase()));
            getSonglist(filterData);

            return;
        }

        function getSonglist(data){
            // this populates the song list options
            d3.event.preventDefault();
            // clear values in the drop-down 
            d3.select("#filter-songs").html("");
            const dropList = document.querySelector("#filter-songs");
            
            // populate the song names 
            dropList.innerHTML += `<option selected>Choose A Song</option>`
            
            data.forEach((dataRow)=> {
                let row = d3.select("#filter-songs")
                let option = row.append("option")
                option.text(dataRow["song_name"]+' - ' +dataRow["artist_name"])
                option.property('value',dataRow["song_name"])
            })
            return;
        }
     
        function buildTable(data) {
            // first,clear out an exisitng data
            tbody.html("");

            // next,loop through each object in the data
            // and append a row and cells for each value in the row
            data.forEach((dataRow)=>{
                // append a row to the table body
                let row = tbody.append("tr");

                let artist_name = dataRow["artist_name"]
                let song_name = dataRow["song_name"]
                let year = dataRow["year"]
                let popularity = dataRow["popularity"]

                row.append("td").text(artist_name);
                row.append("td").text(song_name);
                row.append("td").text(year);
                row.append("td").text(popularity);
            });
        }
    }

})