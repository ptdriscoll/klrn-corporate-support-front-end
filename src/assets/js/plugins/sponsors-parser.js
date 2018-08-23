//parse sponsors.csv file to create cards on Our Sponsors page
klrn.parseSponsorsCSV = function(csvData) {
  if (!csvData) return;  
  
  var data = klrn.parseCSV(csvData); 
  var target = document.querySelector('#sponsor_cards'); 
  var fragment = document.createDocumentFragment() //add everything to this, then make 1 insertion
  var i, mainDiv, innerDiv, imgLink, img, graph;
  
  if (!target) return;
  //console.log(data);
  
  for (i=0;i<data.length;i++) {
    if (data[i].SPONSOR === '' || data[i].SPONSOR_TYPE === '' || 
        data[i].PROGRAMMING === '' || data[i].LOGO === '') {
      continue;
    }
    
    //create elements
    mainDiv = document.createElement('div');
    mainDiv.className = 'col-lg-2 col-md-3 col-sm-4 col-6';
    
    innerDiv = document.createElement('div');
    innerDiv.className = 'card box-shadow';
    
    if (data[i].LINK !== '') {
      imgLink = document.createElement('a'); 
      imgLink.href = data[i].LINK;
      imgLink.setAttribute('target', '_blank');
    }
    
    img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = '../assets/img/sponsors/' + data[i].LOGO;
    img.alt = data[i].SPONSOR;
    
    graph = document.createElement('p');
    graph.innerHTML = '<span>' + data[i].SPONSOR_TYPE + '</span>'
                      + '<br>' + data[i].PROGRAMMING; 
    
    //nest elements       
    mainDiv.appendChild(innerDiv);
    if (data[i].LINK !== '') {
      innerDiv.appendChild(imgLink);
      imgLink.appendChild(img);      
    }
    else {    
      innerDiv.appendChild(img);   
    }      
    innerDiv.appendChild(graph);
    
    //attach to dom fragment that will be inserted
    fragment.appendChild(mainDiv);
  }

  //insert all cards 
  target.appendChild(fragment);     
}

klrn.loadSponsors = function() {
  var request = new XMLHttpRequest();
  if (!request) return;
  
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      klrn.parseSponsorsCSV(this.responseText);
    }
  }  
  request.open('GET', '../data/sponsors.csv', true);
  request.send();    
}